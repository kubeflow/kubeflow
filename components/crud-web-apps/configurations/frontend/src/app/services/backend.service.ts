import { Injectable } from '@angular/core';
import { BackendService, SnackBarService } from 'kubeflow';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigResponseObject, VWABackendResponse, ConfigPostObject, SecretResponseObject, SWABackendResponse } from '../types';

@Injectable({
  providedIn: 'root',
})
export class VWABackendService extends BackendService {
  constructor(public http: HttpClient, public snackBar: SnackBarService) {
    super(http, snackBar);
  }

  public getConfigurations(namespace: string): Observable<ConfigResponseObject[]> {
    const url = `api/namespaces/${namespace}/configurations`;

    return this.http.get<VWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map((resp: VWABackendResponse) => {
        return resp.configurations;
      }),
    );
  }

  public getSecrets(namespace: string): Observable<SecretResponseObject[]> {
    const url = `api/namespaces/${namespace}/secrets`;

    return this.http.get<SWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map((resp: SWABackendResponse) => {
        return resp.secrets;
      }),
    );
  }

  public getConfigMaps(namespace: string): Observable<SecretResponseObject[]> {
    const url = `api/namespaces/${namespace}/configmaps`;

    return this.http.get<SWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map((resp: SWABackendResponse) => {
        console.log(resp)
        return resp.secrets;
      }),
    );
  }

  // POST
  public createViewer(namespace: string, viewer: string) {
    const url = `api/namespaces/${namespace}/viewers`;

    return this.http
      .post<VWABackendResponse>(url, { name: viewer })
      .pipe(catchError(error => this.handleError(error)));
  }

  public createConfig(namespace: string, configuration: ConfigPostObject) {
    const url = `api/namespaces/${namespace}/configuration`;

    return this.http
      .post<VWABackendResponse>(url, configuration)
      .pipe(catchError(error => this.handleError(error)));
  }

  public patchConfig(namespace: string, configuration: ConfigPostObject) {
    const url = `api/namespaces/${namespace}/configuration`;

    return this.http
      .patch<VWABackendResponse>(url, configuration)
      .pipe(catchError(error => this.handleError(error)));
  }

  // DELETE
  public deleteConfig(namespace: string, configuration: string) {
    const url = `api/namespaces/${namespace}/configuration/${configuration}`;

    return this.http
      .delete<VWABackendResponse>(url)
      .pipe(catchError(error => this.handleError(error, false)));
  }
}
