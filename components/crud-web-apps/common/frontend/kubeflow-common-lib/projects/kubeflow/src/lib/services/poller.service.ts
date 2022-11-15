import { Injectable } from '@angular/core';
import { never, Observable, of } from 'rxjs';
import { expand, delay, tap, concatMap, filter } from 'rxjs/operators';
import { isEqual } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class PollerService {
  constructor() {}

  public exponential<T>(obs: Observable<T>): Observable<T> {
    let period = 1;
    let currData: any;

    /*
    * The poller$ observable is pushing values in an exponential manner.
    * The `expand` operator is emitting values by using the value from the
    * previous emit. In our case we also use delay with a dynamic period
    * to achieve resetable exponential delay.
    */
    const poller$ = of(1).pipe(expand(x => of(period).pipe(delay(x * 1000))));

    const request$ = poller$.pipe(
      concatMap(() => obs),
      tap(() => (period = Math.min(period * 2, 8))),
      filter(data => !isEqual(data, currData)),
      tap(data => {
        // new data detected
        if (currData) {
          period = 1;
        }

        currData = data;
      }),
    );

    return request$;
  }
}
