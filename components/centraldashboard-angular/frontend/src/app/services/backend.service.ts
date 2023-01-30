import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envInfo } from '../types/env-info';

@Injectable({
  providedIn: 'root',
})
export class CDBBackendService {
  constructor(private http: HttpClient) {}

  public getEnvInfo(): Observable<envInfo> {
    const url = `api/workgroup/env-info`;

    return this.http.get<envInfo>(url);
  }
}
