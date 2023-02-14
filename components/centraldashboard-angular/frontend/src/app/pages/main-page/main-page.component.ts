import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CDBBackendService } from 'src/app/services/backend.service';
import { envInfo } from '../../types/env-info';
import { DashboardLinks, Link, MenuLink } from 'src/app/types/dashboard-links';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
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
  public menuLinks: MenuLink[];
  public externalLinks: any[];
  public quickLinks: Link[];
  public documentationItems: Link[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private backend: CDBBackendService,
  ) {}

  ngOnInit() {
    this.backend.getEnvInfo().subscribe((res: envInfo) => {
      this.handleEnvInfo(res);
    });

    this.backend.getDashboardLinks().subscribe((res: DashboardLinks) => {
      this.handleDashboardLinks(res);
    });
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

  handleDashboardLinks(links: DashboardLinks) {
    const { menuLinks, externalLinks, quickLinks, documentationItems } = links;
    this.menuLinks = menuLinks || [];
    this.externalLinks = externalLinks || [];
    this.quickLinks = quickLinks || [];
    this.documentationItems = documentationItems || [];
  }

  getUrlPath(url: string) {
    const urlWithoutFragment = url.split('#')[0];
    return this.appendPrefix(urlWithoutFragment);
  }

  getUrlFragment(url: string): string {
    const fragment = url.split('#')[1];
    return fragment;
  }

  appendPrefix(url: string): string {
    return '/_' + url;
  }
}
