import Router from 'koa-router';
import Koa from 'koa/lib/application';
import bodyParser from 'koa-bodyparser';
import { router as v1 } from './v1/router';
import { decorateContext } from './utils/decorate-context';
import { errorHandler } from './utils/error-handler';

/**
 * Create a new Koa app
 *
 * @param decorations Context decorations
 * @returns Koa app
 */
export function createServer(decorations: Record<string, unknown> = {}) {
  // set up the main router
  const router = new Router({ prefix: '/api' });
  router.use(v1.routes());

  const app = new Koa();

  app.use(errorHandler);
  app.use(decorateContext(decorations));
  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}
