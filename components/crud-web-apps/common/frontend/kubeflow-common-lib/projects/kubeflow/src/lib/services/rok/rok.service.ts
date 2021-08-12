import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { SnackBarService } from '../../snack-bar/snack-bar.service';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { RokSettings } from './types';
import { BackendResponse } from '../backend/types';

@Injectable({
  providedIn: 'root',
})
export class RokService extends BackendService {
  private csrfToken = '';

  constructor(public http: HttpClient, public dialog: SnackBarService) {
    super(http, dialog);
  }

  public initCSRF() {
    if (this.csrfToken.length !== 0) {
      return;
    }

    console.log('Setting up CSRF protection for Rok');
    this.http
      .get<RokSettings>('/rok/services/settings')
      .pipe(
        catchError(error => this.handleError(error, true)),
        map((settings: RokSettings) => {
          console.log('Got back Rok settings:');
          console.log(settings);
          console.log(`Using token: ${settings.static_token}`);

          if (settings.static_token === null) {
            console.warn(`Using null token for CSRF protection!`);
          }

          this.csrfToken = settings.static_token;
        }),
      )
      .subscribe();
  }

  public rokRespIsValid(resp: HttpResponse<any>) {
    const rokUrl = resp.headers.get('X-Object-Rok-URL');
    const objectUrl = resp.headers.get('X-Object-URL');

    if (rokUrl === null || rokUrl !== objectUrl) {
      throw new ErrorEvent('Bad Rok URL', {
        message: `'${resp.url}' is not a valid Rok URL`,
      });
    }
  }

  public getObjectMetadata(
    url: string,
    showSnackBar = true,
  ): Observable<HttpHeaders> {
    console.log(`Making a HEAD to '${url} to get Object Metadata`);

    return this.http
      .head<any>(url, {
        headers: new HttpHeaders({
          'X-Auth-Token': this.csrfToken,
        }),
        observe: 'response',
      })
      .pipe(
        tap(resp => this.rokRespIsValid(resp)),
        catchError(error => this.handleError(error, showSnackBar)),
        map((resp: HttpResponse<any>) => {
          console.log(`Metadata for object in url: ${url}`);
          console.log(resp.headers);

          return resp.headers;
        }),
      );
  }

  public getRokManagedStorageClasses(
    showSnackBar = true,
  ): Observable<string[]> {
    // Get existing PVCs in a namespace
    const url = `api/rok/storageclasses`;

    return this.http.get<BackendResponse>(url).pipe(
      catchError(error => this.handleError(error, showSnackBar)),
      map((data: BackendResponse) => {
        return data.storageClasses;
      }),
    );
  }
}
