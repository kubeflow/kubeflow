import { Injectable } from '@angular/core';
import { BackendService, SnackBarService } from 'kubeflow';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AccelerateDatasetResponseObject, VWABackendResponse, AccelerateDatasetPostObject } from '../types';

@Injectable({
  providedIn: 'root',
})
export class VWABackendService extends BackendService {
  constructor(public http: HttpClient, public snackBar: SnackBarService) {
    super(http, snackBar);
  }

  public getAccelerateDatasets(namespace: string): Observable<AccelerateDatasetResponseObject[]> {
    const url = `api/namespaces/${namespace}/acceleratedatasets`;

    return this.http.get<VWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map((resp: VWABackendResponse) => {
        return resp.datasets;
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

    //POST
  public createAccelerateDataset(namespace: string, acceleratedataset: AccelerateDatasetPostObject) {
    const url = `api/namespaces/${namespace}/acceleratedataset`;

    return this.http
      .post<VWABackendResponse>(url, acceleratedataset)
      .pipe(catchError(error => this.handleError(error)));
  }

  public patchAccelerateDataset(namespace: string, dataset: AccelerateDatasetPostObject) {
    const url = `api/namespaces/${namespace}/acceleratedataset`;

    return this.http
      .patch<VWABackendResponse>(url, dataset)
      .pipe(catchError(error => this.handleError(error)));
  }

  // DELETE
  public deleteAccelerateDataset(namespace: string, acceleratedataset: string) {
    const url = `api/namespaces/${namespace}/acceleratedatasets/${acceleratedataset}`;

    return this.http
      .delete<VWABackendResponse>(url)
      .pipe(catchError(error => this.handleError(error, false)));
  }
}
