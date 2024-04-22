export type Pending = { type: 'PENDING'; message?: string };
export type Loading = { type: 'LOADING'; message?: string };
export type Done<T> = { type: 'DONE'; message?: string; data: T };

export type LoadingState<T> = Pending | Loading | Done<T>;
