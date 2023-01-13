import Router from 'koa-router';
import { checkApiKey } from '../utils/check-api-key';
import { getRandomNumber } from './numbers/random';
import { add } from './numbers/add'
import { healthChecker } from './health-checker/live';

export const router = new Router({ prefix: '/v1' });

const checkApiKeyGeneral = checkApiKey('general');
const checkApiKeyAuxiliary = checkApiKey('auxiliary');

// todo: add validation
// numbers endpoints
router.get('/numbers/random', checkApiKeyGeneral, getRandomNumber);
router.get('/numbers/add', checkApiKeyGeneral, add);

// health check endpoints
router.get('/health-check/liveness', checkApiKeyAuxiliary, healthChecker);
