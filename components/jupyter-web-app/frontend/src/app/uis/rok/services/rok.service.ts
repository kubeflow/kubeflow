import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";

import { environment } from "src/environments/environment";
import { Resp, SnackType, emptyVolume, Volume } from "src/app/utils/types";
import { SnackBarService } from "src/app/services/snack-bar.service";
import { ReplaySubject, Observable } from "rxjs";
import { first } from "rxjs/operators";
import {
  RokToken,
  RokResponse,
  JupyterLab,
  emptyJupyterLab
} from "../utils/types";

@Injectable({
  providedIn: "root"
})
export class RokService {
  constructor(private http: HttpClient, private snackBar: SnackBarService) {}

  public getRokSecret(ns: string): Observable<RokToken> {
    // Get the Token needed for Rok Api requests
    const src = new ReplaySubject<RokToken>(1);
    const url = environment.apiUrl + `/api/rok/namespaces/${ns}/token`;

    this.http
      .get<RokResponse>(url)
      .pipe(first())
      .subscribe(
        data => {
          this.handleBackendError(data);
          src.next(data.token);
        },
        error => {
          this.handleError(error);
          src.next({ name: "rok-token-name", value: "" });
        }
      );

    return src.asObservable();
  }

  public getJupyterLab(url: string, token: string): Observable<JupyterLab> {
    // Get the Token needed for Rok Api requests
    const src = new ReplaySubject<any>(1);
    const baseUrl = url.substring(0, url.lastIndexOf("/") + 1);

    this.http
      .head<RokResponse>(url, {
        headers: new HttpHeaders({
          "X-Auth-Token": token
        }),
        observe: "response"
      })
      .pipe(first())
      .subscribe(
        resp => {
          const headers = resp.headers;
          const notebook: JupyterLab = emptyJupyterLab();

          // Fill the notebook with the info from the response
          notebook.image = this.getHeader(headers, "X-Object-Meta-image");
          notebook.cpu = this.getHeader(headers, "X-Object-Meta-cpu");
          notebook.memory = this.getHeader(headers, "X-Object-Meta-memory");
          notebook.extra = this.getHeader(
            headers,
            "X-Object-Meta-extraResources"
          );

          // Workspace Volume
          let version = this.getHeader(
            headers,
            "X-Object-Group-Member-0-Version"
          );
          let obj = this.getHeader(headers, "X-Object-Group-Member-0-Object");
          notebook.wsvolume.extraFields = {
            "rok-url": baseUrl + obj + "?version=" + version
          };

          // Data Volumes
          const vols_num = this.getHeader(
            headers,
            "X-Object-Group-Member-Count"
          );
          for (let i = 1; i < parseInt(vols_num); i++) {
            version = this.getHeader(
              headers,
              "X-Object-Group-Member-" + i + "-Version"
            );
            obj = this.getHeader(
              headers,
              "X-Object-Group-Member-" + i + "-Object"
            );

            const vol = emptyVolume();
            vol.extraFields = {
              "rok-url": baseUrl + obj + "?version=" + version
            };
            notebook.dtvolumes.push(vol);
          }

          src.next(notebook);
        },
        error => this.handleError(error)
      );

    return src.asObservable();
  }

  public getVolume(url: string, token: string): Observable<Volume> {
    const src = new ReplaySubject<Volume>(1);

    this.http
      .head<RokResponse>(url, {
        headers: new HttpHeaders({
          "X-Auth-Token": token
        }),
        observe: "response"
      })
      .pipe(first())
      .subscribe(
        resp => {
          const headers = resp.headers;
          const volume: Volume = emptyVolume();

          // Fill the notebook with the info from the response
          volume.name = this.getHeader(headers, "X-Object-Meta-dataset");
          if (volume.name === null) {
            volume.name = this.getHeader(headers, "X-Object-Meta-workspace");
          }

          let size = parseInt(this.getHeader(headers, "Content-Length"));
          size = size / Math.pow(1024, 3);
          volume.size = size.toString() + "Gi";

          volume.path = this.getHeader(headers, "X-Object-Meta-mountpoint");

          src.next(volume);
        },
        error => this.handleError(error)
      );

    return src.asObservable();
  }

  // -----------------------------Utils-----------------------------------------
  private getHeader(obj: HttpHeaders, key: string) {
    if (obj.get(key) === null) {
      return null;
    }
    return decodeURIComponent(obj.get(key));
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
      console.error("A Client error occurred:", error.error.message);
      this.snackBar.show(
        `A Client error occured: ${error.error.message}`,
        SnackType.Error
      );
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.snackBar.show(
        `${error.status}: There was an error trying to connect ` +
          `to the backend API. ${error.message}`,
        SnackType.Error
      );
    }

    return "error";
  }
}
