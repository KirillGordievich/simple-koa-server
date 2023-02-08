import { Context, Next } from 'koa';

/**
 * Produce a key checking middleware
 *
 * @param type Key type
 * @returns Key checking middleware
 */
export function checkApiKey(type: 'general' | 'auxiliary') {
  return async function (ctx: Context, next: Next) {
    const keys = ctx.decor.keys as Record<string, string>;

    if (ctx.headers['x-api-key'] !== keys[type]) {
      ctx.throw(401, 'api key mismatch');
    }

    return next();
  };
}
