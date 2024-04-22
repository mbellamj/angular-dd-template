import { IGenericStore } from '@core/abstracts';
import { BehaviorSubject, Observable } from 'rxjs';

export class Store<T> implements IGenericStore<T> {
  private _state$: BehaviorSubject<T>;
  public state$: Observable<T>;

  constructor(initialState: T) {
    this._state$ = new BehaviorSubject(initialState);
    this.state$ = this._state$.asObservable();
  }

  get state(): T {
    return this._state$.getValue();
  }

  /**
   * @method setState
   * @requires @param nextState
   * @returns @type void
   */
  public setState(nextState: T): void {
    this._state$.next(nextState);
  }

  /**
   * @method getState
   * @returns @type Observable<T>
   */
  public getState() {
    return this.state$;
  }

  public complete() {
    this._state$.complete();
  }
}
