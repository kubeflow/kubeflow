import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CDBNamespaceService } from 'src/app/services/namespace.service';
import {
  equalUrlPaths,
  appendBackslash,
  removePrefixFrom,
  getQueryParams,
} from 'src/app/shared/utils';
import { Namespace } from 'src/app/types/namespace';
import {
  ALL_NAMESPACES_EVENT,
  NAMESPACE_SELECTED_EVENT,
  APP_CONNECTED_EVENT,
  MESSAGE,
} from '../../../../public/library';

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
    src = removePrefixFrom(src);

    /**
     * When Istio exports Services, it always expects
     * a '/' at the end. SO we'll need to make sure the
     * links propagated to the iframe end with a '/'
     */
    src = appendBackslash(src);

    /**
     * The following hacky logic appends the window.location.origin
     * when it is not present in the current src value. This is to
     * force-reload the iframe even when it receives the same value
     * with the one it already has. This is useful in the following
     * sub-case scenarios when we don't update the src value in order
     * to prevent the iframe from reloading:
     *  - User is in a WA and by clicking inside this WA, they navigate
     * to another WA. Then they want to move back to the previous WA by
     * using its left sidebar link.
     *  - User navigates inside a WA and wants to navigate to the WA's
     * index page by using its left sidebar link.
     */
    if (!this.prvSrcPath?.includes(window.location.origin)) {
      src = window.location.origin + src;
    }

    this.prvSrcPath = src;
  }

  public iframeLocation: string | undefined = 'about:blank';
  public currentNamespace: string;
  public namespaces: Namespace[];
  private urlSub: Subscription;
  private interval: any;

  constructor(private router: Router, private ns: CDBNamespaceService) {
    /**
     * On router events, we want to ensure that:
     *  - the iframe's src won't be updated when the URLs of the
     * browser and the iframe are the same in order to prevent
     * the iframe from reloading on every user click.
     *  - the iframe's src will be updated when the user clicks
     * on the left sidebar links or navigates directly to a URL.
     */
    this.urlSub = this.router.events.subscribe(event => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }

      const iframeWindow = this.iframe?.nativeElement?.contentWindow;
      const iframeUrl = iframeWindow?.location.pathname
        ? iframeWindow?.location.pathname + iframeWindow?.location.search
        : iframeWindow?.location.pathname;

      const eventUrl = removePrefixFrom(event.url);
      if (!equalUrlPaths(eventUrl, iframeUrl)) {
        this.srcPath = event.url;
      }
    });
  }

  ngAfterViewInit() {
    /**
     * We check every 100ms for changes in the Iframe's location.href,
     * In the case that this URL has a new value (that is different
     * from the stored one), we use router.navigate to mirror the new
     * URL in the browser's one. This works because Angular recognizes
     * that the same component (IframeComponent) will be used for the next
     * route as well (except if we navigate to Home) and doesn't reload.
     */
    this.interval = setInterval(() => {
      const iframeWindow = this.iframe?.nativeElement?.contentWindow;
      let currentUrl = iframeWindow?.location.href;

      if (currentUrl !== this.iframeLocation) {
        this.iframeLocation = currentUrl;
        const path = iframeWindow?.location.pathname;
        let queryParams = getQueryParams(iframeWindow?.location.search);

        /**
         * Append current namespace to query parameters before using router.navigate
         * since iframe's internal URL doesn't hold any information regarding the
         * namespace and we want to prevent it from discarding this infromation from
         * the Browser's URL.
         */
        if (!queryParams.ns) {
          queryParams.ns = this.currentNamespace;
        }

        /**
         * Contrary to comparing URLs, here we prefer an undefined string instead
         * of an empty one, because Angular's router will ignore an undefined
         * fragment while it will go ahead and append a '#' when the fragment
         * is an empty string
         */
        const fragment = iframeWindow?.location.hash?.split('#')[1];
        this.router.navigate(['/_' + path], { queryParams, fragment });
      }
    }, 100);

    this.ns.namespaces.subscribe((namespaces: Namespace[]) => {
      this.namespaces = namespaces;
    });

    this.ns.currentNamespace.subscribe((namespace: Namespace) => {
      this.currentNamespace = namespace.namespace;
      this.postNamespaceMessage();
    });

    window.addEventListener(MESSAGE, ev => {
      this.onMessageReceived(ev);
    });
  }

  ngOnDestroy() {
    if (this.urlSub) {
      this.urlSub.unsubscribe();
    }
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  private postNamespaceMessage() {
    if (this.currentNamespace === this.ns.ALL_NAMESPACES) {
      this.iframe?.nativeElement?.contentWindow?.postMessage(
        {
          type: ALL_NAMESPACES_EVENT,
          value: this.namespaces
            .map(n => n.namespace)
            .filter(n => n !== this.ns.ALL_NAMESPACES),
        },
        this.iframe.nativeElement.contentWindow.origin,
      );
    } else {
      this.iframe?.nativeElement?.contentWindow?.postMessage(
        {
          type: NAMESPACE_SELECTED_EVENT,
          value: this.currentNamespace,
        },
        this.iframe.nativeElement.contentWindow.origin,
      );
    }
  }

  // Receives a message from an iframe page and passes the selected namespace.
  private onMessageReceived(event: MessageEvent) {
    const { data } = event;
    switch (data.type) {
      case APP_CONNECTED_EVENT:
        this.postNamespaceMessage();
        break;
    }
  }
}
