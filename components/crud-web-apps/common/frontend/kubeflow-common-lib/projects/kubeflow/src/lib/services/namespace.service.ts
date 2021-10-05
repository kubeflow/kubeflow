import { Injectable } from '@angular/core';
import {
  ReplaySubject,
  Subscription,
  fromEvent,
  BehaviorSubject,
  Observable,
  Subject,
  merge,
} from 'rxjs';
import { DashboardState } from '../enums/dashboard';

declare global {
  interface Window {
    centraldashboard: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class NamespaceService {
  private currNamespace: string;
  private allNamespaces: string[];

  // Observable string sources
  private selectedNamespaceSource = new ReplaySubject<string>(1);
  private dashboardConnectedSource = new BehaviorSubject<DashboardState>(
    DashboardState.Connecting,
  );

  // Observable string streams
  selectedNamespace$ = this.selectedNamespaceSource.asObservable();
  selectedNamespace2$ = new ReplaySubject<string | string[]>(1);
  dashboardConnected$ = this.dashboardConnectedSource.asObservable();

  constructor() {
    fromEvent(window, 'load').subscribe(_ => {
      if (
        window.centraldashboard &&
        window.centraldashboard.CentralDashboardEventHandler
      ) {
        // Init method will invoke the callback with the event handler instance
        // and a boolean indicating whether the page is iframed or not
        window.centraldashboard.CentralDashboardEventHandler.init(
          (cdeh, isIframed) => {
            // Binds a callback that gets invoked anytime the Dashboard's
            // namespace is changed
            cdeh.onNamespaceSelected = this.updateSelectedNamespace.bind(this);
            cdeh.onAllNamespacesSelected = this.updateAllSelectedNamespaces.bind(
              this,
            );
          },
        );

        this.dashboardConnectedSource.next(DashboardState.Connected);
        return;
      }

      this.dashboardConnectedSource.next(DashboardState.Disconnected);

      if (this.currNamespace === undefined) {
        this.updateSelectedNamespace('kubeflow-user');
      }
    });
  }

  // GETers
  getSelectedNamespace(): Observable<string> {
    return this.selectedNamespace$;
  }

  getSelectedNamespace2(): Observable<string | string[]> {
    return this.selectedNamespace2$;
  }

  // Service message commands
  updateSelectedNamespace(namespace: string) {
    if (namespace.length !== 0) {
      this.currNamespace = namespace;
      this.selectedNamespaceSource.next(namespace);
      this.selectedNamespace2$.next(namespace);
    }
  }

  updateAllSelectedNamespaces(namespaces: string[]) {
    this.allNamespaces = namespaces;
    this.selectedNamespace2$.next(namespaces);
  }

  dashboardConnected() {
    return (
      window.parent.location.pathname !== window.location.pathname &&
      window.centraldashboard
    );
  }
}
