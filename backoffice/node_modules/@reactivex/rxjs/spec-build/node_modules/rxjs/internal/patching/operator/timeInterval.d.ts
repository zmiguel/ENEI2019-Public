import { Observable } from '../../Observable';
import { SchedulerLike } from '../../types';
import { TimeInterval } from '../../operators/timeInterval';
export { TimeInterval };
/**
 * @param scheduler
 * @return {Observable<TimeInterval<any>>|WebSocketSubject<T>|Observable<T>}
 * @method timeInterval
 * @owner Observable
 */
export declare function timeInterval<T>(this: Observable<T>, scheduler?: SchedulerLike): Observable<TimeInterval<T>>;
