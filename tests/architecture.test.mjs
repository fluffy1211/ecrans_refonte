import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, utimesSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';
import { createSitemap } from '../scripts/sitemap.mjs';
import { prepareImages, imageSources, publishImages } from '../src/lib/images.mjs';
import { spectacleMetadata, canonicalOrganizationId } from '../src/lib/schema.ts';

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'ecrans-architecture-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  return root;
}

test('spectacle metadata preserves age, company, FAQ text and canonical breadcrumb', () => {
  for (const [minAge, maxAge] of [[6, 9], [9, 12]]) {
    const name = `Spectacle ${minAge}-${maxAge} ans`;
    const metadata = spectacleMetadata({ name, description: 'Synopsis', path: `/spectacle-${minAge}-${maxAge}-ans/`,
      minAge, maxAge, faq: [{ q: 'Où ?', a: '<a href="/contact/">Contact</a> en PACA.' }] });
    assert.equal(metadata[0].provider['@id'], canonicalOrganizationId);
    assert.equal(metadata[0].audience.suggestedMinAge, minAge);
    assert.equal(metadata[0].audience.suggestedMaxAge, maxAge);
    assert.equal(metadata[1].mainEntity[0].acceptedAnswer.text, 'Contact en PACA.');
    assert.equal(metadata[2].itemListElement[1].item, `https://www.lesecranspastoutletemps.fr/spectacle-${minAge}-${maxAge}-ans/`);
  }
});

test('sitemap discovers new and nested pages, excluding error and dynamic routes without Git', t => {
  const root = fixture(t);
  mkdirSync(join(root, 'src/pages/atelier'), { recursive: true });
  for (const file of ['index.astro', 'contact.astro', 'nouvelle.astro', '404.astro', '[slug].astro', 'atelier/index.astro', 'private.astro']) {
    writeFileSync(join(root, 'src/pages', file), '---\n---\n');
  }
  writeFileSync(join(root, 'src/pages/private.astro'), '<Layout noindex={true} />');
  const xml = createSitemap('https://example.fr', root);
  assert.equal((xml.match(/<url>/g) ?? []).length, 4);
  assert.ok(xml.includes('<loc>https://example.fr/</loc>'));
  assert.ok(xml.includes('<loc>https://example.fr/atelier/</loc>'));
  assert.ok(xml.includes('<loc>https://example.fr/nouvelle/</loc>'));
  assert.ok(!xml.includes('404') && !xml.includes('slug') && !xml.includes('private') && !xml.includes('lastmod'));
});

test('shared metadata changes update the published sitemap date', t => {
  const root = fixture(t);
  mkdirSync(join(root, 'src/pages'), { recursive: true });
  mkdirSync(join(root, 'src/lib'), { recursive: true });
  writeFileSync(join(root, 'src/pages/index.astro'), 'Home');
  const git = (args, date) => execFileSync('git', args, { cwd: root, stdio: 'ignore', env: {
    ...process.env, GIT_AUTHOR_NAME: 'Test', GIT_AUTHOR_EMAIL: 'test@example.fr',
    GIT_COMMITTER_NAME: 'Test', GIT_COMMITTER_EMAIL: 'test@example.fr',
    ...(date ? { GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date } : {}),
  } });
  git(['init']); git(['add', '.']); git(['-c', 'commit.gpgsign=false', 'commit', '-m', 'Page'], '2026-01-01T12:00:00Z');
  writeFileSync(join(root, 'src/lib/schema.ts'), 'Metadata');
  git(['add', '.']); git(['-c', 'commit.gpgsign=false', 'commit', '-m', 'Shared metadata'], '2026-01-02T12:00:00Z');
  assert.ok(createSitemap('https://example.fr', root).includes('<lastmod>2026-01-02</lastmod>'));
});

test('image preparation refreshes changed content even with unchanged timestamps, then publishes exact outputs', async t => {
  const root = fixture(t);
  const source = join(root, 'sources'); const generated = join(root, 'generated'); const output = join(root, 'dist');
  mkdirSync(source);
  const file = join(source, 'photo.png');
  const create = color => sharp({ create: { width: 8, height: 8, channels: 3, background: color } }).png().toFile(file);
  await create('red');
  const time = new Date('2026-01-01T00:00:00Z'); utimesSync(file, time, time);
  await prepareImages(source, generated);
  const before = readFileSync(join(generated, 'photo.webp'));
  await create('blue'); utimesSync(file, time, time);
  await prepareImages(source, generated);
  assert.notDeepEqual(readFileSync(join(generated, 'photo.webp')), before);
  const cached = readFileSync(join(generated, 'photo.webp'));
  await prepareImages(source, generated);
  assert.deepEqual(readFileSync(join(generated, 'photo.webp')), cached);
  assert.deepEqual(imageSources('/images/photo.png', source, generated).map(value => value.type), ['image/webp']);
  publishImages(output, generated);
  assert.deepEqual(readFileSync(join(output, 'photo.webp')), readFileSync(join(generated, 'photo.webp')));
  rmSync(file); await prepareImages(source, generated);
  assert.deepEqual(imageSources('/images/photo.png', source, generated), []);
});

test('image preparation prefers the original over a stale WebP and fails on corrupt inputs', async t => {
  const root = fixture(t);
  const source = join(root, 'sources'); const generated = join(root, 'generated');
  mkdirSync(source);
  await sharp({ create: { width: 7, height: 5, channels: 3, background: 'red' } }).png().toFile(join(source, 'photo.png'));
  writeFileSync(join(source, 'photo.webp'), 'invalid stale derivative');
  await prepareImages(source, generated);
  assert.equal((await sharp(join(generated, 'photo.webp')).metadata()).width, 7);
  assert.deepEqual(imageSources('/images/missing.jpg', source, generated), []);
  assert.deepEqual(imageSources('/images/photo.avif', source, generated), []);
  writeFileSync(join(source, 'broken.jpg'), 'invalid source');
  await assert.rejects(prepareImages(source, generated), /Image conversion failed/);
  assert.ok(!existsSync(join(generated, 'broken.webp.tmp')));
});
