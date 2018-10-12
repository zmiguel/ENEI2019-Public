import { Observable } from '../../Observable';
import { ObservableInput } from '../../types';
export declare function mergeAll<T>(this: Observable<ObservableInput<T>>, concurrent?: number): Observable<T>;
export declare function mergeAll<T, R>(this: Observable<T>, concurrent?: number): Observable<R>;
