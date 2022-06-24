import { Injectable } from '@angular/core';
import { BackendService, SnackBarService } from 'kubeflow';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigMapResponseObject, CMWABackendResponse, ConfigMapPostObject } from '../types';

@Injectable({
  providedIn: 'root',
})
export class CMWABackendService extends BackendService {
  constructor(public http: HttpClient, public snackBar: SnackBarService) {
    super(http, snackBar);
  }

  public getConfigMaps(namespace: string): Observable<ConfigMapResponseObject[]> {
    const url = `api/namespaces/${namespace}/configmaps`;

    return this.http.get<CMWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map((resp: CMWABackendResponse) => {
        return resp.configMaps;
      }),
    );
  }

  // POST
  public createViewer(namespace: string, viewer: string) {
    const url = `api/namespaces/${namespace}/viewers`;

    return this.http
      .post<CMWABackendResponse>(url, { name: viewer })
      .pipe(catchError(error => this.handleError(error)));
  }

  public createConfigMap(namespace: string, cmap: ConfigMapPostObject) {
    const url = `api/namespaces/${namespace}/configmap`;

    return this.http
      .post<CMWABackendResponse>(url, cmap)
      .pipe(catchError(error => this.handleError(error)));
  }

  public patchConfigMap(namespace: string, cmap: ConfigMapPostObject) {
    const url = `api/namespaces/${namespace}/configmap`;

    return this.http
      .patch<CMWABackendResponse>(url, cmap)
      .pipe(catchError(error => this.handleError(error)));
  }

  // DELETE
  public deleteConfigMap(namespace: string, cmap: string) {
    const url = `api/namespaces/${namespace}/configmap/${cmap}`;

    return this.http
      .delete<CMWABackendResponse>(url)
      .pipe(catchError(error => this.handleError(error, false)));
  }
}
