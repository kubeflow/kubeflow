import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export function forEachHttpHeader(
  headers: HttpHeaders,
  cb: (name: string, value: string) => void,
) {
  headers.keys().forEach(name => {
    // FIXME: A header name can have more than one values. We must use the
    // getAll() method if we want to support more values.
    const value = headers.get(name) as string;
    cb(name, value);
  });
}

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (!(event instanceof HttpResponse)) {
          return event;
        }
        const evHeaders = event.headers;
        const h: { [key: string]: string } = {};
        forEachHttpHeader(evHeaders, (name, value) => {
          if (
            name.startsWith('x-object-meta-') ||
            value === 'x-container-throw-ref'
          ) {
            value = decodeURIComponent(value);
          }
          h[name] = value;
        });
        return event.clone({
          headers: new HttpHeaders(h),
        });
      }),
    );
  }
}
