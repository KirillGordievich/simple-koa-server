import { Context, Next } from 'koa';

/**
 * Produce a middleware decorating context with the provided parameters
 *
 * @param decorations Decorations to attach
 * @returns Decorating middleware
 */
export function decorateContext(decorations: Record<string, unknown>) {
  /**
   * Decorate context
   *
   * @param ctx Koa context
   * @param next Next function
   */
  return async function (ctx: Context, next: Next) {
    ctx.decor = decorations;
    return next();
  };
}
