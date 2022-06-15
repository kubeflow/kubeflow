import { Injectable } from '@angular/core';
import { BackendService, SnackBarService } from 'kubeflow';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SecretResponseObject, VWABackendResponse, SecretPostObject } from '../types';

@Injectable({
  providedIn: 'root',
})
export class VWABackendService extends BackendService {
  constructor(public http: HttpClient, public snackBar: SnackBarService) {
    super(http, snackBar);
  }

  public getSecrets(namespace: string): Observable<SecretResponseObject[]> {
    const url = `api/namespaces/${namespace}/secrets`;

    return this.http.get<VWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map((resp: VWABackendResponse) => {
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

  public createSecret(namespace: string, secret: SecretPostObject) {
    const url = `api/namespaces/${namespace}/secret`;

    return this.http
      .post<VWABackendResponse>(url, secret)
      .pipe(catchError(error => this.handleError(error)));
  }

  public patchSecret(namespace: string, secret: SecretPostObject) {
    const url = `api/namespaces/${namespace}/secret`;

    return this.http
      .patch<VWABackendResponse>(url, secret)
      .pipe(catchError(error => this.handleError(error)));
  }

  // DELETE
  public deleteSecret(namespace: string, secret: string) {
    const url = `api/namespaces/${namespace}/secret/${secret}`;

    return this.http
      .delete<VWABackendResponse>(url)
      .pipe(catchError(error => this.handleError(error, false)));
  }
}
