import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { first } from 'rxjs/operators';
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
  namespaces = [];
  currNamespace: string;
  private poller: ExponentialBackoff;
  private subscriptions = new Subscription();

  @Input()
  set apiUrl(apiUrl: string) {
    this.backend.setApiUrl(apiUrl);
  }

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
    // Poll untill you get existing Namespaces
    const nsGetSub = this.poller.start().subscribe(() => {
      this.backend.getNamespaces().subscribe(namespaces => {
        this.namespaces = namespaces;
        if (
          this.currNamespace === undefined ||
          this.currNamespace.length === 0
        ) {
          return;
        }
        // stop polling
        this.namespaceService.updateSelectedNamespace(this.currNamespace);
        this.poller.stop();
        this.subscriptions.unsubscribe();
      });
    });

    this.subscriptions.add(nsGetSub);
    this.subscriptions.add(currNsSub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  namespaceChanged(namespace: string) {
    this.namespaceService.updateSelectedNamespace(namespace);
  }
}
