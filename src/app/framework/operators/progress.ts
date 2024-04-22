import { HttpEvent } from '@angular/common/http';
import { IProgressEvent } from '@core/interfaces/progress.interface';
import { Observable, distinctUntilChanged, scan } from 'rxjs';
import { isHttpProgressEvent, isHttpResponse } from './http';

export const getProgressEventState = <T = unknown>(
  progressEvent: IProgressEvent<T>,
  event: HttpEvent<T>,
): IProgressEvent<T> => {
  if (isHttpProgressEvent(event)) {
    return {
      progress: event.total
        ? Math.round((100 * event.loaded) / event.total)
        : progressEvent.progress,
      state: { type: 'LOADING', message: 'in progress' },
    };
  }

  if (isHttpResponse<T>(event)) {
    return {
      progress: 100,
      state: { type: 'DONE', data: event.body as T, message: 'done' },
    };
  }

  return progressEvent;
};

export function progress<T>(): (source: Observable<HttpEvent<T>>) => Observable<IProgressEvent<T>> {
  const initialState: IProgressEvent<T> = {
    state: { type: 'PENDING', message: 'request pending...' },
    progress: 0,
  };

  return (source) =>
    source.pipe(
      scan(getProgressEventState, initialState),
      distinctUntilChanged((a, b) => a.state === b.state && a.progress === b.progress),
    );
}
