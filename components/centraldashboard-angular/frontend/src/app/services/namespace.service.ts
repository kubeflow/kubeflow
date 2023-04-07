import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { getQueryParams, getUrlFragment } from '../shared/utils';
import { Namespace } from '../types/namespace';
import { EnvironmentService } from './environment.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CDBNamespaceService {
  private prvNamespacesSubject = new ReplaySubject<Namespace[]>(1);
  private prvCurrentNamespaceSubject = new ReplaySubject<Namespace>(1);

  namespaces = this.prvNamespacesSubject.asObservable();
  currentNamespace = this.prvCurrentNamespaceSubject.asObservable();

  private prvUser: string;
  private prvCurrentNamespace: Namespace | undefined;

  readonly ALL_NAMESPACES_ALLOWED_LIST = [
    'jupyter',
    'volumes',
    'tensorboards',
    'katib',
    'models',
  ];
  readonly ALL_NAMESPACES = 'All namespaces';

  constructor(
    private env: EnvironmentService,
    private localStorage: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        switchMap(e => {
          return this.env.user.pipe(take(1));
        }),
        switchMap(user => {
          return this.env.namespaces.pipe(
            take(1),
            map((namespaces: Namespace[]) => {
              return {
                namespaces: namespaces.map(ns => {
                  return {
                    ...ns,
                    disabled: false,
                  };
                }),
                user,
              };
            }),
          );
        }),
      )
      .subscribe(({ namespaces, user }) => {
        this.prvUser = user;
        const allNamespacesOption = this.getAllNamespacesOption(
          this.router.url,
        );
        const newNamespaces = [allNamespacesOption, ...namespaces];
        this.prvNamespacesSubject.next(newNamespaces);
        this.setCurrentNamespace(newNamespaces, user);
      });
  }

  private setCurrentNamespace(namespaces: Namespace[], user: string) {
    const prevNamespace = this.prvCurrentNamespace;
    const newNamespace = this.getCurrentNamespace(namespaces, user);
    /*
     * We want to avoid emitting an observable when the value hasn't changed
     */
    if (newNamespace && newNamespace.namespace !== prevNamespace?.namespace) {
      this.selectNamespace(newNamespace, user);
    }
  }

  private getAllNamespacesOption(url: string): Namespace {
    let allNamespacesAllowed = false;

    url = url.includes('/_/') ? url.slice(3) : url;
    if (this.ALL_NAMESPACES_ALLOWED_LIST.find(ui => url.startsWith(ui))) {
      allNamespacesAllowed = true;
    }

    return {
      namespace: this.ALL_NAMESPACES,
      role: '',
      user: '',
      disabled: !allNamespacesAllowed,
    };
  }

  private getCurrentNamespace(
    namespaces: Namespace[],
    user: string,
  ): Namespace | undefined {
    if (!user || !namespaces) {
      return;
    }

    // See if namespace is set through the query parameters of current URL
    const newNamespaceName = this.route.snapshot.queryParams.ns;
    const newNamespace = this.getNamespaceObject(newNamespaceName, namespaces);
    if (this.validateSelectedNamespaces(newNamespace)) {
      return newNamespace;
    }

    // Restore the user's previous namespace choice from browser's local storage
    const defaultNamespaceName = this.localStorage.get(
      this.getSelectedNamespaceKey(user),
    );
    const defaultNamespace = this.getNamespaceObject(
      defaultNamespaceName,
      namespaces,
    );
    if (this.validateSelectedNamespaces(defaultNamespace)) {
      return defaultNamespace;
    }

    // Return namespace with Owner role
    const owned = namespaces.find(n => n.role == 'owner');
    if (owned) {
      return owned;
    }

    for (let ns of namespaces) {
      if (this.validateSelectedNamespaces(ns)) {
        return ns;
      }
    }
    return undefined;
  }

  private getSelectedNamespaceKey(user: string): string {
    return 'selectedNamespace/' + ((user && '.' + user) || '');
  }

  getNamespaceObject(
    namespace: string,
    namespaces: Namespace[],
  ): Namespace | undefined {
    if (!namespace || !namespaces) {
      return undefined;
    }
    return namespaces.find(ns => ns.namespace === namespace);
  }

  private validateSelectedNamespaces(
    namespace: Namespace | undefined,
  ): boolean {
    if (!namespace) {
      return false;
    }

    if (namespace.namespace === this.ALL_NAMESPACES && namespace.disabled) {
      return false;
    }

    return true;
  }

  private updateStoragedNamespace(
    namespace: Namespace | undefined,
    user: string,
  ) {
    // Save the user's choice so we are able to restore it,
    // when re-loading the page without a queryParam
    this.localStorage.set(
      this.getSelectedNamespaceKey(user),
      namespace?.namespace,
    );
  }

  selectNamespace(namespace: Namespace, user: string = this.prvUser) {
    this.prvCurrentNamespace = namespace;
    this.prvCurrentNamespaceSubject.next(namespace);
    this.updateStoragedNamespace(namespace, user);
    this.updateQueryParams(namespace.namespace);
  }

  private updateQueryParams(namespace: string) {
    const path = this.router.url;
    const url = new URL(path, window.location.origin);
    const queryParams = getQueryParams(url.search);

    const urlWithoutFragment = url.pathname;
    const fragment = getUrlFragment(path);

    queryParams.ns = namespace;
    this.router.navigate([urlWithoutFragment], {
      queryParams,
      fragment,
    });
  }
}
