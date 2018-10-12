import { Observable } from '../../Observable';
import { ConnectableObservable } from '../../observable/ConnectableObservable';
import { OperatorFunction, MonoTypeOperatorFunction, SchedulerLike } from '../../../internal/types';
export declare function publishReplay<T>(this: Observable<T>, bufferSize?: number, windowTime?: number, scheduler?: SchedulerLike): ConnectableObservable<T>;
export declare function publishReplay<T, R>(this: Observable<T>, bufferSize?: number, windowTime?: number, selector?: OperatorFunction<T, R>): Observable<R>;
export declare function publishReplay<T>(this: Observable<T>, bufferSize?: number, windowTime?: number, selector?: MonoTypeOperatorFunction<T>, scheduler?: SchedulerLike): Observable<T>;
