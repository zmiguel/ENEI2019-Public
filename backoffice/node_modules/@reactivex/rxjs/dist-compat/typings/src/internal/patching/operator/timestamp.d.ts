import { Observable } from '../../Observable';
import { SchedulerLike } from '../../types';
import { Timestamp } from '../../operators/timestamp';
/**
 * @param scheduler
 * @return {Observable<Timestamp<any>>|WebSocketSubject<T>|Observable<T>}
 * @method timestamp
 * @owner Observable
 */
export declare function timestamp<T>(this: Observable<T>, scheduler?: SchedulerLike): Observable<Timestamp<T>>;
