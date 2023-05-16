import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { DashboardLinks } from '../types/dashboard-links';
import { EnvInfo } from '../types/env-info';
import { Namespace } from '../types/namespace';
import { PlatformInfo } from '../types/platform-info';
import { CDBBackendService } from './backend.service';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  public platform = new ReplaySubject<PlatformInfo>(1);
  public user = new ReplaySubject<string>(1);
  public namespaces = new ReplaySubject<Namespace[]>(1);
  public dashboardLinks = new ReplaySubject<DashboardLinks>(1);

  constructor(private backend: CDBBackendService) {
    this.backend.getEnvInfo().subscribe((res: EnvInfo) => {
      if (res.user) {
        this.user.next(res.user);
      }
      if (res.platform) {
        this.platform.next(res.platform);
      }
      if (res.namespaces) {
        this.namespaces.next(res.namespaces);
      }
    });

    this.backend.getDashboardLinks().subscribe((res: DashboardLinks) => {
      this.dashboardLinks.next(res);
    });
  }
}
