// src/app/services/env.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EnvInfo {
  userrole: string;
}

@Injectable({ providedIn: 'root' })
export class EnvService {
  constructor(private http: HttpClient) {}

  getEnvInfo(): Observable<EnvInfo> {
    // endpoint phải khớp với backend (vd: /api/env-info hoặc /api/platform-info)
    return this.http.get<EnvInfo>('/api/workgroup/env-info');
  }
}
