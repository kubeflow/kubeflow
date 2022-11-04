import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '@app/environment';
import {
  NamespaceService,
  ExponentialBackoff,
  ActionEvent,
  STATUS_TYPE,
  ConfirmDialogService,
  SnackBarService,
  DIALOG_RESP,
  SnackType,
  ToolbarButton,
  ToolbarButtonConfig,
  addColumn,
  removeColumn,
} from 'kubeflow';
import { JWABackendService } from 'src/app/services/backend.service';
import { Observable, Subscription, of, forkJoin } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import {
  defaultConfig,
  getDeleteDialogConfig,
  getStopDialogConfig,
  NAMESPACE_COLUMN,
} from './config';
import { isEqual } from 'lodash';
import { NotebookResponseObject, NotebookProcessedObject } from 'src/app/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-default',
  templateUrl: './index-default.component.html',
  styleUrls: ['./index-default.component.scss'],
})
export class IndexDefaultComponent implements OnInit, OnDestroy {
  env = environment;
  poller: ExponentialBackoff;

  currNamespace: string | null = null;
  allNamespaces: string[] | null = null;
  subs = new Subscription();
  currRequest = new Subscription();

  config = defaultConfig;
  rawData: NotebookResponseObject[] = [];
  processedData: NotebookProcessedObject[] = [];

  buttons: ToolbarButton[] = [this.newNotebookButton];

  public get newNotebookButton(): ToolbarButton {
    const config: ToolbarButtonConfig = {
      text: $localize`New Notebook`,
      icon: 'add',
      stroked: true,
      fn: () => {
        this.router.navigate(['/new']);
      },
    };

    if (this.currNamespace === null) {
      config.disabled = true;
    }

    return new ToolbarButton(config);
  }

  constructor(
    public ns: NamespaceService,
    public backend: JWABackendService,
    public confirmDialog: ConfirmDialogService,
    public snackBar: SnackBarService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.poller = new ExponentialBackoff({ interval: 1000, retries: 3 });

    // Poll for new data and reset the poller if different data is found
    this.subs.add(
      this.poller.start().subscribe(() => {
        this.currRequest = this.getNotebooksObservable().subscribe(
          notebooks => {
            this.updateNotebooks(notebooks);
          },
        );
      }),
    );

    // Reset the poller whenever the selected namespace changes
    this.subs.add(
      this.ns.getSelectedNamespace2().subscribe(ns => {
        if (Array.isArray(ns)) {
          this.currNamespace = null;
          this.allNamespaces = ns;
          addColumn(this.config, NAMESPACE_COLUMN, 'name');
        } else {
          this.currNamespace = ns;
          this.allNamespaces = null;
          removeColumn(this.config, 'namespace');
        }
        this.resetPolling();
        this.updateButtons();
      }),
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.poller.stop();
  }

  resetPolling() {
    this.currRequest.unsubscribe();
    this.rawData = [];
    this.processedData = [];
    this.poller.reset();
  }

  correctNamespace(notebooks: NotebookResponseObject[]): boolean {
    // Only update the current data when they are intended for the current
    // namespace. Ideally the canceled requests should not be updating the
    // state
    if (this.allNamespaces) {
      return true;
    }

    return notebooks.every((nb: NotebookResponseObject, i) => {
      return nb.namespace === this.currNamespace;
    });
  }

  updateNotebooks(notebooks) {
    // FIXME: This check is required because the ExponentialBackoff is not
    // canceling all inflight request when we reset it.
    if (!this.correctNamespace(notebooks)) {
      return;
    }

    if (isEqual(this.rawData, notebooks)) {
      return;
    }

    this.rawData = notebooks;

    // Update the frontend's state
    this.processedData = this.processIncomingData(notebooks);
    this.poller.reset();
  }

  getNotebooksObservable(): Observable<NotebookResponseObject[]> {
    if (!this.currNamespace && !this.allNamespaces) {
      return of([]);
    }

    if (this.currNamespace) {
      return this.backend.getNotebooks(this.currNamespace);
    }

    // make a request for each namespace and gather all Notebooks
    const requests: Observable<NotebookResponseObject[]>[] = [];
    for (const ns of this.allNamespaces) {
      requests.push(this.backend.getNotebooks(ns));
    }

    // wait until all requests complete
    return forkJoin(requests).pipe(
      map((notebooks: NotebookResponseObject[][]) => {
        const all = notebooks.flat();
        all.sort(this.compareNotebookNames);

        return all;
      }),
    );
  }

  compareNotebookNames(a: NotebookResponseObject, b: NotebookResponseObject) {
    if (a.name > b.name) {
      return 1;
    }

    if (a.name < b.name) {
      return -1;
    }

    return 0;
  }

  // Event handling functions
  reactToAction(a: ActionEvent) {
    switch (a.action) {
      case 'delete':
        this.deleteVolumeClicked(a.data);
        break;
      case 'connect':
        this.connectClicked(a.data);
        break;
      case 'start-stop':
        this.startStopClicked(a.data);
        break;
    }
  }

  public deleteVolumeClicked(notebook: NotebookProcessedObject) {
    const deleteDialogConfig = getDeleteDialogConfig(notebook.name);

    const ref = this.confirmDialog.open(notebook.name, deleteDialogConfig);
    const delSub = ref.componentInstance.applying$.subscribe(applying => {
      if (!applying) {
        return;
      }

      // Close the open dialog only if the DELETE request succeeded
      this.backend.deleteNotebook(this.currNamespace, notebook.name).subscribe({
        next: _ => {
          this.poller.reset();
          ref.close(DIALOG_RESP.ACCEPT);
        },
        error: err => {
          const errorMsg = err;
          deleteDialogConfig.error = errorMsg;
          ref.componentInstance.applying$.next(false);
        },
      });

      // DELETE request has succeeded
      ref.afterClosed().subscribe(res => {
        delSub.unsubscribe();
        if (res !== DIALOG_RESP.ACCEPT) {
          return;
        }

        notebook.status.phase = STATUS_TYPE.TERMINATING;
        notebook.status.message = 'Preparing to delete the Notebook...';
        this.updateNotebookFields(notebook);
      });
    });
  }

  public connectClicked(notebook: NotebookProcessedObject) {
    // Open new tab to work on the Notebook
    window.open(`/notebook/${notebook.namespace}/${notebook.name}/`);
  }

  public startStopClicked(notebook: NotebookProcessedObject) {
    if (notebook.status.phase === STATUS_TYPE.STOPPED) {
      this.startNotebook(notebook);
    } else {
      this.stopNotebook(notebook);
    }
  }

  public startNotebook(notebook: NotebookProcessedObject) {
    this.snackBar.open(
      $localize`Starting Notebook server '${notebook.name}'...`,
      SnackType.Info,
      3000,
    );

    notebook.status.phase = STATUS_TYPE.WAITING;
    notebook.status.message = 'Starting the Notebook Server...';
    this.updateNotebookFields(notebook);

    this.backend.startNotebook(notebook).subscribe(() => {
      this.poller.reset();
    });
  }

  public stopNotebook(notebook: NotebookProcessedObject) {
    const stopDialogConfig = getStopDialogConfig(notebook.name);
    const ref = this.confirmDialog.open(notebook.name, stopDialogConfig);
    const stopSub = ref.componentInstance.applying$.subscribe(applying => {
      if (!applying) {
        return;
      }

      // Close the open dialog only if the request succeeded
      this.backend.stopNotebook(notebook).subscribe({
        next: _ => {
          this.poller.reset();
          ref.close(DIALOG_RESP.ACCEPT);
        },
        error: err => {
          const errorMsg = err;
          stopDialogConfig.error = errorMsg;
          ref.componentInstance.applying$.next(false);
        },
      });

      // request has succeeded
      ref.afterClosed().subscribe(res => {
        stopSub.unsubscribe();
        if (res !== DIALOG_RESP.ACCEPT) {
          return;
        }

        this.snackBar.open(
          $localize`Stopping Notebook server '${notebook.name}'...`,
          SnackType.Info,
          3000,
        );

        notebook.status.phase = STATUS_TYPE.TERMINATING;
        notebook.status.message = 'Preparing to stop the Notebook Server...';
        this.updateNotebookFields(notebook);
      });
    });
  }

  // Data processing functions
  updateNotebookFields(notebook: NotebookProcessedObject) {
    notebook.deleteAction = this.processDeletionActionStatus(notebook);
    notebook.connectAction = this.processConnectActionStatus(notebook);
    notebook.startStopAction = this.processStartStopActionStatus(notebook);
  }

  processIncomingData(notebooks: NotebookResponseObject[]) {
    const notebooksCopy = JSON.parse(
      JSON.stringify(notebooks),
    ) as NotebookProcessedObject[];

    for (const nb of notebooksCopy) {
      this.updateNotebookFields(nb);
    }
    return notebooksCopy;
  }

  // Action handling functions
  processDeletionActionStatus(notebook: NotebookProcessedObject) {
    if (notebook.status.phase !== STATUS_TYPE.TERMINATING) {
      return STATUS_TYPE.READY;
    }

    return STATUS_TYPE.TERMINATING;
  }

  processStartStopActionStatus(notebook: NotebookProcessedObject) {
    // Stop button
    if (notebook.status.phase === STATUS_TYPE.READY) {
      return STATUS_TYPE.UNINITIALIZED;
    }

    // Start button
    if (notebook.status.phase === STATUS_TYPE.STOPPED) {
      return STATUS_TYPE.READY;
    }

    // If it is terminating, then the action should be disabled
    if (notebook.status.phase === STATUS_TYPE.TERMINATING) {
      return STATUS_TYPE.UNAVAILABLE;
    }

    // If the Notebook is not Terminating, then always allow the stop action
    return STATUS_TYPE.UNINITIALIZED;
  }

  processConnectActionStatus(notebook: NotebookProcessedObject) {
    if (notebook.status.phase !== STATUS_TYPE.READY) {
      return STATUS_TYPE.UNAVAILABLE;
    }

    return STATUS_TYPE.READY;
  }

  public notebookTrackByFn(index: number, notebook: NotebookProcessedObject) {
    return `${notebook.name}/${notebook.image}`;
  }

  private updateButtons(): void {
    this.buttons = [this.newNotebookButton];
  }
}
