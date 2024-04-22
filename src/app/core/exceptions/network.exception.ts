import { extractErrorMessage } from './utils';

const DEFAULT_MESSAGE = 'Network unavailable';

export class NetworkException extends Error {
  constructor(cause?: unknown) {
    super(extractErrorMessage(cause, DEFAULT_MESSAGE));
    this.name = NetworkException.name;
  }
}
