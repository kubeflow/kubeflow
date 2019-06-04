import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { ReplaySubject, Observable } from "rxjs";
import { first } from "rxjs/operators";
import { environment } from "src/environments/environment";

import { Resp, Resource, SnackType, Volume, Config } from "../utils/types";
import { SnackBarService } from "../services/snack-bar.service";

@Injectable()
export class KubernetesService {
  constructor(private http: HttpClient, private snackBar: SnackBarService) {}

  // GETers
  getNamespaces(): Observable<string[]> {
    const src = new ReplaySubject<string[]>(1);

    const url = environment.apiUrl + `/api/namespaces`;
    this.http
      .get<Resp>(url)
      .pipe(first())
      .subscribe(
        data => {
          this.handleBackendError(data);

          const namespaces = data.namespaces;
          src.next(namespaces);
        },
        error => this.handleError(error)
      );

    return src.asObservable();
  }

  getResource(ns: string): Observable<Resource[]> {
    // Get existing PVCs in a namespace
    const url =
      environment.apiUrl + `/api/namespaces/${ns}/${environment.resource}`;
    const src = new ReplaySubject<Resource[]>(1);

    if (ns === "") {
      return src.asObservable();
    }

    this.http
      .get<Resp>(url)
      .pipe(first())
      .subscribe(
        data => {
          this.handleBackendError(data);
          const notebooks = data.notebooks as Resource[];
          src.next(notebooks);
        },
        error => this.handleError(error)
      );

    return src.asObservable();
  }

  getStorageClasses(): Observable<string[]> {
    // Get existing PVCs in a namespace
    const src = new ReplaySubject<string[]>(1);
    const url = environment.apiUrl + `/api/storageclasses`;

    this.http
      .get<Resp>(url)
      .pipe(first())
      .subscribe(
        data => {
          this.handleBackendError(data);
          const scs = data.storageclasses;
          src.next(scs);
        },
        error => this.handleError(error)
      );

    return src.asObservable();
  }

  getDefaultStorageClass(): Observable<string> {
    const src = new ReplaySubject<string>(1);
    const url = environment.apiUrl + `/api/storageclasses/default`;

    this.http
      .get<Resp>(url)
      .pipe(first())
      .subscribe(
        data => {
          this.handleBackendError(data);
          const sc = data.defaultStorageClass;
          src.next(sc);
        },
        error => this.handleError(error)
      );

    return src.asObservable();
  }

  getConfig(): Observable<Config> {
    const src = new ReplaySubject<Config>(1);
    const url = environment.apiUrl + `/api/config`;

    this.http
      .get<Resp>(url)
      .pipe(first())
      .subscribe(
        data => {
          this.handleBackendError(data);
          src.next(data.config);
        },
        error => this.handleError(error)
      );

    return src;
  }

  getVolumes(ns: string): Observable<Volume[]> {
    // Get existing PVCs in a namespace
    const url = environment.apiUrl + `/api/namespaces/${ns}/pvcs`;
    const src = new ReplaySubject<Volume[]>(1);

    if (ns === "") {
      return src.asObservable();
    }

    this.http
      .get<Resp>(url)
      .pipe(first())
      .subscribe(
        data => {
          this.handleBackendError(data);
          src.next(data.pvcs);
        },
        error => this.handleError(error)
      );

    return src.asObservable();
  }

  // Delete functions
  deleteResource(ns: string, nm: string): Observable<string> {
    const src = new ReplaySubject<string>(1);
    const url =
      environment.apiUrl +
      `/api/namespaces/${ns}/${environment.resource}/${nm}`;

    this.http
      .delete<Resp>(url)
      .pipe(first())
      .subscribe(
        data => {
          this.handleBackendError(data);
          src.next("posted");
        },
        error => this.handleError(error)
      );

    return src.asObservable();
  }

  deleteViewer(ns: string, nm: string): Observable<string> {
    const obs = new ReplaySubject<string>(1);
    const url = environment.apiUrl + `/api/namespaces/${ns}/viewers/${nm}`;

    this.http
      .delete<Resp>(url)
      .pipe(first())
      .subscribe(
        data => {
          this.handleBackendError(data);
          obs.next("posted");
        },
        error => this.handleError(error)
      );

    return obs.asObservable();
  }

  // Post Functions
  postResource(rsrc: Resource): Observable<string> {
    const src = new ReplaySubject<string>(1);
    const url =
      environment.apiUrl +
      `/api/namespaces/${rsrc.namespace}/${environment.resource}`;

    this.http
      .post<Resp>(url, rsrc)
      .pipe(first())
      .subscribe(
        data => {
          if (this.handleBackendError(data) === "success") {
            src.next("posted");
          } else {
            src.next("error");
          }
        },
        error => {
          this.handleError(error);
          src.next("error");
        }
      );

    return src.asObservable();
  }

  // ---------------------------Error Handling----------------------------------
  private handleBackendError(response: Resp): string {
    if (!response.success) {
      this.snackBar.show("Warning: " + response.log, SnackType.Warning);

      return "error";
    }
    return "success";
  }

  private handleError(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
      return "error";
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.snackBar.show(
        `${error.status}: There was an error trying to connect ` +
          `to the backend API. ${error.message}`,
        SnackType.Error
      );

      return "error";
    }
  }
}
