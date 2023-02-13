import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CDBBackendService } from 'src/app/services/backend.service';
import { envInfo } from '../../types/env-info';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );

  public buildLabel: string = 'Build';
  public buildVersion: string = environment.buildVersion;
  public buildId: string = environment.buildVersion;
  public get buildVersionWithLabel() {
    return this.computeBuildValue(this.buildLabel, this.buildVersion);
  }
  public get buildIdWithLabel() {
    return this.computeBuildValue(this.buildLabel, this.buildId);
  }
  public envInfoSub: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private backend: CDBBackendService,
  ) {}

  ngOnInit() {
    this.envInfoSub = this.backend.getEnvInfo().subscribe((res: envInfo) => {
      this.handleEnvInfo(res);
    });
  }

  ngOnDestroy(): void {
    if (this.envInfoSub) {
      this.envInfoSub.unsubscribe();
    }
  }

  handleEnvInfo(env: envInfo) {
    const { platform, user, namespaces, isClusterAdmin } = env;
    if (platform?.buildLabel) {
      this.buildLabel = platform.buildLabel;
    }
    if (platform?.buildVersion) {
      this.buildVersion = platform.buildVersion;
    }
    if (platform?.buildId) {
      this.buildId = platform.buildId;
    }
  }

  computeBuildValue(label: string, buildValue: string): string {
    return `${label} ${buildValue}`;
  }
}
