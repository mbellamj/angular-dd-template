import { ErrorState } from './error.state.interface';
import { LoadingState } from './loading.state.interface';

export interface IProgressEvent<T> {
  progress: number;
  state: LoadingState<T> | ErrorState;
}
