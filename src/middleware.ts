import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  if (import.meta.env.PROD) {
    return next();
  }

  const url = new URL(context.request.url);
  const { pathname } = url;

  if (
    pathname !== '/' &&
    !pathname.endsWith('/') &&
    !pathname.includes('.')
  ) {
    url.pathname = pathname + '/';
    return Response.redirect(url.toString(), 308);
  }

  return next();
});
