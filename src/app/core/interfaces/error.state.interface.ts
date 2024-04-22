export type CancelType<T> = { type: 'CANCELED'; message: T };

export type ErrorType<T> = { type: 'ERROR'; error: T };

export type ErrorState<T = Error> = ErrorType<T> | CancelType<string>;
