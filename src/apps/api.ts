import { config } from '../config';
import { createServer } from '../api/server';
import Decimal from 'decimal.js';
import { Server } from 'http';
import { configure, getLogger } from 'log4js';
import { ajv } from '../ajv';

// Configure logging
configure({
  appenders: { console: { type: 'console', layout: { type: 'basic' }, level: 'info' } },
  categories: { default: { appenders: ['console'], level: 'info' } },
  pm2: true,
  disableClustering: true,
});

// Configure decimal
Decimal.set({ precision: 128, rounding: Decimal.ROUND_DOWN });

// Global variables
const log = getLogger('API');
let server: Server;

/**
 * Shut the application down
 *
 * @param error Top-level error, if any
 */
async function shutdown(error?: Error) {
  // log error, if any
  if (error) {
    log.fatal(error.message);
  }

  // stop server
  if (server) {
    await new Promise((resolve) => server.close(resolve));

    log.info('stopped API');
  }

  process.exit(error ? 1 : 0);
}

/**
 * Main application startup function
 */
async function main() {
  // config validation and mutation in-place
  if (!ajv.validate('config-api.json', config)) {
    throw new Error('config validation failed: ' + ajv.errorsText(ajv.errors));
  }

  log.info('config validation passed');

  // create API and start
  const { keys } = config.api;
  const api = createServer({ log, keys });
  const { host, port } = config.api;
  server = api.listen(port, host);

  log.info('started API on %s:%d', host, port);
}

// handle signals gracefully
process.on('SIGINT', async () => shutdown());
process.on('SIGTERM', async () => shutdown());

// start the app and shut down in case of errors
void main().catch(shutdown);
