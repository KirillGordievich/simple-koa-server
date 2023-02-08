import Router from 'koa-router';
import { checkApiKey } from '../utils/check-api-key';
import { randomNumber } from './numbers/random';
import { addNumbers } from './numbers/add'
import { healthChecker } from './health-checker/live';

export const router = new Router({ prefix: '/v1' });

// general endpoints
router.get('/number/random', checkApiKey, randomNumber);
router.get('/number/add', checkApiKey, addNumbers);

// health check endpoints
router.get('/health-check/liveness', checkApiKey, healthChecker);
