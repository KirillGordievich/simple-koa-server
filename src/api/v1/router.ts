import Router from 'koa-router';
import { checkApiKey } from '../utils/check-api-key';
import { getRandomNumber } from './numbers/get-random';
import { healthChecker } from './health-checker/live';

export const router = new Router({ prefix: '/v1' });

const checkApiKeyGeneral = checkApiKey('general');
const checkApiKeyAuxiliary = checkApiKey('auxiliary');

// todo: add validation
// numbers endpoints
router.get('/random-number', checkApiKeyGeneral, getRandomNumber);

// health check endpoints
router.get('/health-check/liveness', checkApiKeyAuxiliary, healthChecker);
