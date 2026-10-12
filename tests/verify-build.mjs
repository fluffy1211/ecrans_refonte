import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`))?.slice(1).find(value => value !== undefined);
const site = 'https://www.lesecranspastoutletemps.fr';
const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
assert.ok(!existsSync('dist/sitemap-index.xml') && !existsSync('dist/sitemap-0.xml'), 'Only one sitemap is published');
assert.ok(readFileSync('dist/robots.txt', 'utf8').includes(`Sitemap: ${site}/sitemap.xml`));
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
const pages = readdirSync('dist', { recursive: true }).filter(path => path.endsWith('.html'));
let variants = 0;
for (const page of pages) {
  const html = readFileSync(join('dist', page), 'utf8');
  for (const [tag] of html.matchAll(/<source\b[^>]*>/g)) {
    const source = attribute(tag, 'srcset');
    assert.ok(source && existsSync(join('dist', source)), `Missing generated image: ${source}`);
    variants++;
  }
  const robots = [...html.matchAll(/<meta\b[^>]*>/g)].map(match => match[0]).find(tag => attribute(tag, 'name') === 'robots');
  if (robots && attribute(robots, 'content')?.includes('noindex')) {
    if (page !== '404.html') assert.ok(!urls.some(url => url.includes('/mentions-legales/')));
    continue;
  }
  const tag = [...html.matchAll(/<link\b[^>]*>/g)].map(match => match[0]).find(tag => attribute(tag, 'rel') === 'canonical');
  const canonical = tag && attribute(tag, 'href');
  assert.ok(canonical && urls.includes(canonical), `Page absent from sitemap: ${page}`);
}
assert.equal(urls.length, pages.length - 2, 'Every published page occurs once in the sitemap');
for (const [minAge, maxAge] of [[6, 9], [9, 12]]) {
  const html = readFileSync(`dist/spectacle-${minAge}-${maxAge}-ans/index.html`, 'utf8');
  const script = [...html.matchAll(/(<script[^>]*>)(.*?)<\/script>/gs)].find(match => attribute(match[1], 'type') === 'application/ld+json');
  const graph = JSON.parse(script[2])['@graph'];
  const offer = graph.find(item => item['@type'] === 'Service');
  assert.equal(offer.audience.suggestedMinAge, minAge);
  assert.equal(offer.audience.suggestedMaxAge, maxAge);
  const faq = graph.find(item => item['@type'] === 'FAQPage');
  assert.equal(faq.mainEntity.length, 8);
  assert.ok(faq.mainEntity.every(item => !/<[^>]*>/.test(item.acceptedAnswer.text)));
}
console.log(`Built output verified: ${urls.length} pages, ${variants} image sources, both spectacle metadata graphs.`);
