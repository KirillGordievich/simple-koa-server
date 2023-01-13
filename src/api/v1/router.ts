import Router from 'koa-router';
import { checkApiKey } from '../utils/check-api-key';
import { randomNumber } from './numbers/random';
import { addNumbers } from './numbers/add'
import { healthChecker } from './health-checker/live';

export const router = new Router({ prefix: '/v1' });

const checkApiKeyGeneral = checkApiKey('general');
const checkApiKeyAuxiliary = checkApiKey('auxiliary');

// todo: add validation
// numbers endpoints
router.get('/numbers/random', checkApiKeyGeneral, randomNumber);
router.get('/numbers/add', checkApiKeyGeneral, addNumbers);

// health check endpoints
router.get('/health-check/liveness', checkApiKeyAuxiliary, healthChecker);
