import { defineMiddleware } from 'astro:middleware';

const permanentRedirects: Record<string, string> = {
  '/about': '/a-propos/',
  '/about/': '/a-propos/',
  '/projet-réalisations': '/projet-realisations/',
  '/projet-réalisations/': '/projet-realisations/',
};

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const { pathname } = url;

  // Permanent redirects (old Wix URLs → new Astro URLs)
  const redirectTarget = permanentRedirects[pathname];
  if (redirectTarget) {
    url.pathname = redirectTarget;
    return Response.redirect(url.toString(), 301);
  }

  // Trailing slash enforcement (dev only — Astro handles it in prod)
  if (!import.meta.env.PROD) {
    if (
      pathname !== '/' &&
      !pathname.endsWith('/') &&
      !pathname.includes('.')
    ) {
      url.pathname = pathname + '/';
      return Response.redirect(url.toString(), 308);
    }
  }

  return next();
});
