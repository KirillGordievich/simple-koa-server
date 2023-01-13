/**
 * Check if service is alive
 *
 * @param ctx - Koa ctx
 * @param next - Next handler
 * @returns - Promise from the next handler
 */
export async function healthChecker(ctx, next) {
  ctx.body = {
    code: 'OK',
  };
  ctx.status = 200;

  return next();
}

export default { healthChecker };
