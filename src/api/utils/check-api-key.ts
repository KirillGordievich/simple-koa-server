import { Context, Next } from 'koa';
import { UNAUTHORIZED } from './codes';

/**
 * Key checking middleware
 *
 * @param ctx Koa context
 * @param next Next handler
 */
export async function checkApiKey(ctx: Context, next: Next) {
  if (ctx.headers['x-api-key'] !== ctx.decor.apiKey) {
    ctx.throw(401, { code: UNAUTHORIZED, message: 'API key is invalid' });
  }

  return next();
}
