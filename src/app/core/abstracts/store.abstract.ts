import { Observable } from 'rxjs';

export abstract class IGenericStore<T> {
  abstract setState(nextState: T): void;
  abstract getState(): Observable<T>;
}
