import Ajv from 'ajv/dist/2020';
import ajvFormats from 'ajv-formats';

import configApiSchema from './schemas/config-api.json';

export const ajv = new Ajv({ coerceTypes: true, allErrors: true });
ajvFormats(ajv);

ajv.addSchema(configApiSchema);
