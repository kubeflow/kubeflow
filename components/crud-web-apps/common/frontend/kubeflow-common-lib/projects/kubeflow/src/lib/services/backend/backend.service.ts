import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { throwError, Observable, of, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BackendResponse } from './types';
import { SnackType } from '../../snack-bar/types';
import { SnackBarService } from '../../snack-bar/snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  apiUrl = '';
  username: string;

  constructor(public http: HttpClient, public snackBar: SnackBarService) {}

  // GETers
  public getUsername(): Observable<string> {
    const url = `info`;

    return this.http.get<BackendResponse>(url).pipe(
      catchError(error => this.handleError(error, false)),
      map((data: BackendResponse) => data.user),
    );
  }

  public getNamespaces(
    showSnackBar = true,
    url?: string,
  ): Observable<string[]> {
    return this.http.get<BackendResponse>(url ? url : 'api/namespaces').pipe(
      catchError(error => this.handleError(error, showSnackBar)),
      map((data: BackendResponse | string[]) =>
        (data as BackendResponse).namespaces
          ? (data as BackendResponse).namespaces
          : (data as string[]),
      ),
    );
  }

  public getStorageClasses(showSnackBar = true): Observable<string[]> {
    // Get existing PVCs in a namespace
    const url = `api/storageclasses`;

    return this.http.get<BackendResponse>(url).pipe(
      catchError(error => this.handleError(error, showSnackBar)),
      map((data: BackendResponse) => data.storageClasses),
    );
  }

  public getDefaultStorageClass(showSnackBar = true): Observable<string> {
    const url = `api/storageclasses/default`;

    return this.http.get<BackendResponse>(url).pipe(
      catchError(error => this.handleError(error, showSnackBar)),
      map((data: BackendResponse) => data.defaultStorageClass),
    );
  }

  public getObjectsAllNamespaces<T>(
    obsFn: (ns: string) => Observable<T[]>,
    ns: string | string[],
  ): Observable<T[]> {
    if (!ns) {
      return of([]);
    }

    if (!Array.isArray(ns)) {
      return obsFn(ns);
    }

    // make a request for each namespace and gather all Notebooks
    const requests: Observable<T[]>[] = [];
    for (const namespace of ns) {
      requests.push(obsFn(namespace));
    }

    // wait until all requests complete
    return forkJoin(requests).pipe(
      map((objects: T[][]) => {
        const all = objects.flat();
        all.sort(this.sortCompareFn);

        return all;
      }),
    );
  }

  private sortCompareFn(a: any, b: any): number {
    const name1 = a.name || a.metadata.name;
    const name2 = b.name || b.metadata.name;

    if (name1 > name2) {
      return 1;
    }

    if (name1 < name2) {
      return -1;
    }

    return 0;
  }

  // ---------------------------Error Handling---------------------------------
  public getBackendErrorLog(error: HttpErrorResponse): string {
    if (error.error === null) {
      return error.message;
    } else {
      // Show the message the backend has sent
      return error.error.log;
    }
  }

  public getErrorMessage(
    error: HttpErrorResponse | ErrorEvent | string,
  ): string {
    if (typeof error === 'string') {
      return error;
    }

    if (error instanceof HttpErrorResponse) {
      if (this.getBackendErrorLog(error) !== undefined) {
        return this.getBackendErrorLog(error);
      }

      return `${error.status}: ${error.message}`;
    }

    if (error instanceof ErrorEvent) {
      return error.message;
    }

    return `Unexpected error encountered`;
  }

  public getSnackErrorMessage(
    error: HttpErrorResponse | ErrorEvent | string,
  ): string {
    if (typeof error === 'string') {
      return $localize`An error occurred: ${error}`;
    }

    if (error.error instanceof ErrorEvent) {
      return $localize`Client error: ${error.error.message}`;
    }

    if (error instanceof HttpErrorResponse) {
      // In case of status code 0 or negative, Http module couldn't
      // connect to the backend
      if (error.status <= 0) {
        return $localize`Could not connect to the backend.`;
      }

      return `[${error.status}] ${this.getBackendErrorLog(error)}\n${
        error.url
      }`;
    }

    if (error instanceof ErrorEvent) {
      return error.message;
    }

    return $localize`Unexpected error encountered`;
  }

  public handleError(
    error: HttpErrorResponse | ErrorEvent | string,
    showSnackBar = true,
  ) {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(error);
    if (showSnackBar) {
      this.snackBar.open(this.getSnackErrorMessage(error), SnackType.Error);
    }

    return throwError(this.getErrorMessage(error));
  }
}
