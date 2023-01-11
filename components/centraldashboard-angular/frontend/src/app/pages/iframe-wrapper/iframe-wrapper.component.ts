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

  private prvSrcPath: string;
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
    src = this.removePrefixFrom(src);

    if (window.location.origin) {
      if (!this.prvSrcPath?.includes(window.location.origin)) {
        src = window.location.origin + src;
      }
    }

    /**
     * When Istio exports Services, it always expects
     * a '/' at the end. SO we'll need to make sure the
     * links propagated to the iframe end with a '/'
     */
    this.prvSrcPath = this.appendBackslash(src);
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
      const iframeUrl = iframeWindow?.location.pathname
        ? iframeWindow?.location.pathname + iframeWindow?.location.search
        : iframeWindow?.location.pathname;

      const eventUrl = this.removePrefixFrom(event.url);
      if (!this.equalUrlPaths(eventUrl, iframeUrl)) {
        this.srcPath = event.url;
      }
    });
  }

  removePrefixFrom(url: string) {
    return url.includes('/_') ? url.slice(2) : url;
  }

  /**
   * We treat URLs with or without a trailing slash as the same
   * URL. Thus, in order to compare URLs, we need to append
   * a '/' at the end of both URLs if there is none to avoid
   * false statements in cases where they only differ in the
   * trailing slash.
   */
  equalUrlPaths(firstUrl: string, secondUrl: string | undefined) {
    if (!firstUrl && !secondUrl) {
      console.warn(`Got undefined URLs ${firstUrl} and ${secondUrl}`);
      return true;
    }
    if (!firstUrl || !secondUrl) {
      return false;
    }
    firstUrl = this.appendBackslash(firstUrl);
    secondUrl = this.appendBackslash(secondUrl);
    return firstUrl === secondUrl;
  }

  appendBackslash(url: string): string {
    url += url?.endsWith('/') ? '' : '/';
    return url;
  }

  ngAfterViewInit() {
    this.interval = setInterval(() => {
      const iframeWindow = this.iframe?.nativeElement?.contentWindow;
      let currentUrl = iframeWindow?.location.href;

      if (currentUrl !== this.iframeLocation) {
        this.iframeLocation = currentUrl;
        const path = iframeWindow?.location.pathname;
        const queryParams = this.getQueryParams(iframeWindow?.location.search);
        this.router.navigate(['/_' + path], { queryParams });
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
