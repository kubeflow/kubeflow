import { Injectable } from '@angular/core';
import { BackendService, SnackBarService } from 'kubeflow';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  TensorboardResponseObject,
  TWABackendResponse,
  TensorboardPostObject,
  PodDefault,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class TWABackendService extends BackendService {
  constructor(public http: HttpClient, public snackBar: SnackBarService) {
    super(http, snackBar);
  }
  // GET Tensorboards
  private getNamespacedTensorboards(
    namespace: string,
  ): Observable<TensorboardResponseObject[]> {
    const url = `api/namespaces/${namespace}/tensorboards`;

    return this.http.get<TWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map((resp: TWABackendResponse) => resp.tensorboards),
    );
  }

  private getTensorBoardsAllNamespaces(
    namespaces: string[],
  ): Observable<TensorboardResponseObject[]> {
    return this.getObjectsAllNamespaces(
      this.getNamespacedTensorboards.bind(this),
      namespaces,
    );
  }

  public getTensorBoards(
    ns: string | string[],
  ): Observable<TensorboardResponseObject[]> {
    if (Array.isArray(ns)) {
      return this.getTensorBoardsAllNamespaces(ns);
    }

    return this.getNamespacedTensorboards(ns);
  }

  // GET PVC names
  public getPVCNames(namespace: string): Observable<string[]> {
    const url = `api/namespaces/${namespace}/pvcs`;

    return this.http.get<TWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map((resp: TWABackendResponse) => resp.pvcs),
    );
  }

  public getPodDefaults(ns: string): Observable<PodDefault[]> {
    // Get existing PodDefaults in a namespace
    const url = `api/namespaces/${ns}/poddefaults`;

    return this.http.get<TWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map((resp: TWABackendResponse) => resp.poddefaults),
    );
  }

  // POST
  public createTensorboard(
    namespace: string,
    tensorboard: TensorboardPostObject,
  ) {
    const url = `api/namespaces/${namespace}/tensorboards`;

    return this.http
      .post<TWABackendResponse>(url, tensorboard)
      .pipe(catchError(error => this.handleError(error)));
  }

  // DELETE
  public deleteTensorboard(namespace: string, tensorboard: string) {
    const url = `api/namespaces/${namespace}/tensorboards/${tensorboard}`;

    return this.http
      .delete<TWABackendResponse>(url)
      .pipe(catchError(error => this.handleError(error, false)));
  }

  // PATCH
  public startTensorboard(namespace: string, name: string): Observable<string> {
    const url = `api/namespaces/${namespace}/tensorboards/${name}`;

    return this.http.patch<TWABackendResponse>(url, { stopped: false }).pipe(
      catchError(error => this.handleError(error)),
      map(_ => 'started'),
    );
  }

  public stopTensorboard(namespace: string, name: string): Observable<string> {
    const url = `api/namespaces/${namespace}/tensorboards/${name}`;

    return this.http.patch<TWABackendResponse>(url, { stopped: true }).pipe(
      catchError(error => this.handleError(error, false)),
      map(_ => 'stopped'),
    );
  }
}
