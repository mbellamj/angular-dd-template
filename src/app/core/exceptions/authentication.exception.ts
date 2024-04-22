import { extractErrorMessage } from './utils';

const DEFAULT_MESSAGE = 'authentication failed';

export class AuthenticationException extends Error {
  constructor(cause?: unknown) {
    super(extractErrorMessage(cause, DEFAULT_MESSAGE));
    this.name = AuthenticationException.name;
  }
}
