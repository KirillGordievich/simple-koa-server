const DEFAULT_MAX = 100;
const DEFAULT_MIN = -100;
/**
 * Return random number
 *
 * @param ctx - Koa ctx
 * @param next - Next handler
 * @returns - Promise from the next handler
 */
export async function getRandomNumber(ctx, next) {
  const max: number = ctx.request.query.max ?? DEFAULT_MAX;
  const min: number = ctx.request.query.min ?? DEFAULT_MIN;

  ctx.body = {
    body: Math.random() * (max - min) + min,
    code: 'OK',
  };
  ctx.status = 200;

  return next();
}

export default { getRandomNumber };
