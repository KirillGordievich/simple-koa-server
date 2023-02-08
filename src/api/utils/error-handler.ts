import { Context, Next } from 'koa';

/**
 * Catch errors from downstream middleware
 * and map them to a meaningful API response
 *
 * @param ctx Koa context
 * @param next Next function
 */
export async function errorHandler(ctx: Context, next: Next) {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = {
      error: error.message || 'Internal sever error',
      code: error.code || 'ABORTED',
    };
  }
}
