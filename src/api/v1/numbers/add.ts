/**
 * Return random number
 *
 * @param ctx - Koa ctx
 * @param next - Next handler
 * @returns - Promise from the next handler
 */
export async function addNumbers(ctx, next) {
  const a: number = Number(ctx.request.query.a);
  const b: number = Number(ctx.request.query.b);

  ctx.body = {
    body: a + b,
    code: 'OK',
  };
  ctx.status = 200;

  return next();
}

export default { addNumbers };
