import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NamespaceService } from '../services/namespace.service';
import { BackendService } from '../services/backend/backend.service';
import { ExponentialBackoff } from '../polling/exponential-backoff';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-namespace-select',
  templateUrl: './namespace-select.component.html',
  styleUrls: ['./namespace-select.component.scss'],
})
export class NamespaceSelectComponent implements OnInit, OnDestroy {
  @Input()
  namespacesUrl: string;

  namespaces = [];
  currNamespace: string;
  allNamespaces: string[];

  private poller: ExponentialBackoff;
  private subscriptions = new Subscription();

  constructor(
    private namespaceService: NamespaceService,
    private backend: BackendService,
  ) {
    this.poller = new ExponentialBackoff();
  }

  ngOnInit() {
    // Keep track of the selected namespace
    const currNsSub = this.namespaceService
      .getSelectedNamespace()
      .subscribe(namespace => {
        this.currNamespace = namespace;
      });

    this.backend
      .getNamespaces(true, this.namespacesUrl)
      .subscribe(namespaces => {
        this.namespaces = namespaces;
        if (!this.currNamespace) {
          return;
        }

        this.namespaceService.updateSelectedNamespace(this.currNamespace);
      });

    this.subscriptions.add(currNsSub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  namespaceChanged(namespace: string) {
    if (namespace === '{all}') {
      this.namespaceService.selectedNamespace2$.next(this.namespaces);
      return;
    }

    this.namespaceService.updateSelectedNamespace(namespace);
  }
}
