import { Injectable } from '@angular/core';
import { BackendService, SnackBarService } from 'kubeflow';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PVCResponseObject, VWABackendResponse, PVCPostObject } from '../types';
import { V1PersistentVolumeClaim, V1Pod } from '@kubernetes/client-node';
import { EventObject } from '../types/event';

@Injectable({
  providedIn: 'root',
})
export class VWABackendService extends BackendService {
  constructor(public http: HttpClient, public snackBar: SnackBarService) {
    super(http, snackBar);
  }

  private getNamespacedPVCs(
    namespace: string,
  ): Observable<PVCResponseObject[]> {
    const url = `api/namespaces/${namespace}/pvcs`;

    return this.http.get<VWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map((resp: VWABackendResponse) => resp.pvcs),
    );
  }

  private getPVCsAllNamespaces(
    namespaces: string[],
  ): Observable<PVCResponseObject[]> {
    return this.getObjectsAllNamespaces(
      this.getNamespacedPVCs.bind(this),
      namespaces,
    );
  }

  public getPVCs(ns: string | string[]): Observable<PVCResponseObject[]> {
    if (!Array.isArray(ns)) {
      return this.getNamespacedPVCs(ns);
    }

    return this.getPVCsAllNamespaces(ns);
  }

  public getPVC(
    namespace: string,
    pvcName: string,
  ): Observable<V1PersistentVolumeClaim> {
    const url = `api/namespaces/${namespace}/pvcs/${pvcName}`;

    return this.http.get<VWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map((resp: VWABackendResponse) => resp.pvc),
    );
  }

  public getPVCEvents(pvc: V1PersistentVolumeClaim): Observable<EventObject[]> {
    const namespace = pvc.metadata.namespace;
    const pvcName = pvc.metadata.name;
    const url = `api/namespaces/${namespace}/pvcs/${pvcName}/events`;

    return this.http.get<VWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map((resp: VWABackendResponse) => resp.events),
    );
  }

  public getPodsUsingPVC(pvc: V1PersistentVolumeClaim): Observable<V1Pod[]> {
    const namespace = pvc.metadata.namespace;
    const pvcName = pvc.metadata.name;
    const url = `api/namespaces/${namespace}/pvcs/${pvcName}/pods`;

    return this.http.get<VWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map((resp: VWABackendResponse) => resp.pods),
    );
  }

  // POST
  public createViewer(namespace: string, viewer: string) {
    const url = `api/namespaces/${namespace}/viewers`;

    return this.http
      .post<VWABackendResponse>(url, { name: viewer })
      .pipe(catchError(error => this.handleError(error)));
  }

  public createPVC(namespace: string, pvc: PVCPostObject) {
    const url = `api/namespaces/${namespace}/pvcs`;

    return this.http
      .post<VWABackendResponse>(url, pvc)
      .pipe(catchError(error => this.handleError(error)));
  }

  // DELETE
  public deletePVC(namespace: string, pvc: string) {
    const url = `api/namespaces/${namespace}/pvcs/${pvc}`;

    return this.http
      .delete<VWABackendResponse>(url)
      .pipe(catchError(error => this.handleError(error, false)));
  }

  public deleteViewer(namespace: string, pvc: string) {
    const url = `api/namespaces/${namespace}/viewers/${pvc}`;

    return this.http
      .delete<VWABackendResponse>(url)
      .pipe(catchError(error => this.handleError(error, false)));
  }
}
