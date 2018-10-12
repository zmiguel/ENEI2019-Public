import { Observable } from '../../Observable';
import { ObservableInput } from '../../types';
export declare function _switch<T>(this: Observable<ObservableInput<T>>): Observable<T>;
export declare function _switch<T, R>(this: Observable<T>): Observable<R>;
