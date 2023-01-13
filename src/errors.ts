import VError from 'verror';
import { JsonObject } from 'type-fest';

export type ErrorOptions = {
  cause?: Error;
  message?: string;
  info?: Record<string, unknown>;
};

export type ErrorJSON = {
  error: string;
  message: string;
  info: JsonObject | null;
};

export class AbstractError extends VError {
  /**
   * @param options - Error options
   * @param options.cause - Cause of this error
   * @param options.message - Error message
   * @param options.info - Any additional info
   */
  constructor({ cause, message, info }: ErrorOptions = {}) {
    super({ cause, info }, message);
  }

  /**
   * Convert this error to a JSON object
   *
   * @returns {Object} - Error as JSON object
   */
  toJSON(): ErrorJSON {
    const info = VError.info(this);
    return {
      error: this.name,
      message: this.message,
      info: Object.keys(info).length ? info : null,
    };
  }
}

export class BadRequestError extends AbstractError {
  public readonly name: string = 'BadRequestError';
}

export class ConfigurationError extends AbstractError {
  public readonly name: string = 'ConfigurationError';
}

export class NotFoundError extends AbstractError {
  public readonly name: string = 'NotFoundError';
}

export class UnauthorizedError extends AbstractError {
  public readonly name: string = 'UnauthorizedError';
}
