import { Observable } from '../../Observable';
import { ObservableInput } from '../../types';
export declare function exhaust<T>(this: Observable<ObservableInput<T>>): Observable<T>;
export declare function exhaust<T, R>(this: Observable<T>): Observable<R>;
