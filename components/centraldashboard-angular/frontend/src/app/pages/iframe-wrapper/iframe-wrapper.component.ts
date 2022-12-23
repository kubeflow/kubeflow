import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-iframe-wrapper',
  templateUrl: './iframe-wrapper.component.html',
  styleUrls: ['./iframe-wrapper.component.scss'],
})
export class IframeWrapperComponent implements AfterViewInit, OnDestroy {
  @ViewChild('iframe') iframe: ElementRef<HTMLIFrameElement>;

  public prvSrcPath: string;
  get srcPath(): string {
    return this.prvSrcPath;
  }
  set srcPath(src: string) {
    /*
     * The following hacky logic ensures that the Iframe will reload,
     * even when it receives values for src that are the same with the
     * one it already has. This is because, in order to avoid the iframe
     * reloading constantly, its src is not updated on each navigation
     * a user does.
     */
    if (window.location.origin) {
      if (!this.prvSrcPath?.includes(window.location.origin)) {
        src = window.location.origin + src;
      }
    }

    this.prvSrcPath = src;
    // Some KF distributions need a trailing slash "/" in order to resolve paths
    this.prvSrcPath += this.prvSrcPath?.endsWith('/') ? '' : '/';
  }
  public iframeLocation: string | undefined = 'about:blank';
  private urlSub: Subscription;
  private interval: any;

  constructor(private router: Router) {
    this.urlSub = this.router.events.subscribe(event => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }

      const iframeWindow = this.iframe?.nativeElement?.contentWindow;
      let iframeUrl = iframeWindow?.location.pathname;
      if (iframeUrl) {
        // Include URL's query parameters
        iframeUrl += iframeWindow?.location.search;
      }

      if (!this.equalUrlPaths(event.url, iframeUrl)) {
        this.srcPath = event.url;
      }
    });
  }

  equalUrlPaths(firstUrl: string, secondUrl: string | undefined) {
    if (!firstUrl && !secondUrl) {
      console.warn(`Got undefined URLs ${firstUrl} and ${secondUrl}`);
      return true;
    }
    if (!firstUrl || !secondUrl) {
      return false;
    }
    firstUrl += firstUrl?.endsWith('/') ? '' : '/';
    secondUrl += secondUrl?.endsWith('/') ? '' : '/';
    return firstUrl === secondUrl;
  }

  ngAfterViewInit() {
    this.interval = setInterval(() => {
      let currentUrl = this.iframe?.nativeElement?.contentWindow?.location.href;

      if (currentUrl !== this.iframeLocation) {
        this.iframeLocation = currentUrl;
        const path =
          this.iframe?.nativeElement?.contentWindow?.location.pathname;
        const queryParams = this.getQueryParams(
          this.iframe?.nativeElement?.contentWindow?.location.search,
        );
        this.router.navigate([path], { queryParams });
      }
    }, 100);
  }

  getQueryParams(locationSearch: string | undefined): {
    [key: string]: string;
  } {
    const searchParams = new URLSearchParams(locationSearch);
    const queryParams: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });
    return queryParams;
  }

  ngOnDestroy() {
    if (this.urlSub) {
      this.urlSub.unsubscribe();
    }
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  onLoad(ev: Event) {
    setTimeout(() => {
      this.iframe?.nativeElement?.contentWindow?.postMessage(
        { type: 'namespace-selected', value: 'kubeflow-user' },
        '*',
      );
    }, 4000);
  }
}
