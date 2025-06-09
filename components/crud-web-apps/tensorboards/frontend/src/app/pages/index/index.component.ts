import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  NamespaceService,
  ActionEvent,
  ConfirmDialogService,
  ExponentialBackoff,
  STATUS_TYPE,
  DIALOG_RESP,
  DialogConfig,
  SnackBarService,
  SnackType,
  ToolbarButton,
  PollerService,
  ToolbarButtonConfig,
  DashboardState,
  SnackBarConfig,
} from 'kubeflow';
import { defaultConfig, getStopDialogConfig } from './config';
import { environment } from '@app/environment';
import { TWABackendService } from 'src/app/services/backend.service';
import {
  TensorboardResponseObject,
  TensorboardProcessedObject,
} from 'src/app/types';
import { Observable, Subscription } from 'rxjs';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, OnDestroy {
  public currNamespace: string | string[];
  public nsSub = new Subscription();
  public pollSub = new Subscription();

  public env = environment;
  public config = defaultConfig;
  public processedData: TensorboardProcessedObject[] = [];
  public dashboardDisconnectedState = DashboardState.Disconnected;

  private newTensorBoardButton = new ToolbarButton({
    text: $localize`New TensorBoard`,
    icon: 'add',
    stroked: true,
    fn: () => {
      this.newResourceClicked();
    },
  });

  buttons: ToolbarButton[] = [this.newTensorBoardButton];

  constructor(
    public ns: NamespaceService,
    public confirmDialog: ConfirmDialogService,
    public backend: TWABackendService,
    public dialog: MatDialog,
    public snackBar: SnackBarService,
    public poller: PollerService,
  ) {}

  ngOnInit() {
    this.nsSub = this.ns.getSelectedNamespace2().subscribe(ns => {
      this.currNamespace = ns;
      this.poll(ns);
      this.newTensorBoardButton.namespaceChanged(ns, $localize`TensorBoard`);
    });
  }

  ngOnDestroy() {
    this.nsSub.unsubscribe();
    this.pollSub.unsubscribe();
  }

  public poll(ns: string | string[]) {
    this.pollSub.unsubscribe();
    this.processedData = [];

    const request = this.backend.getTensorBoards(ns);

    this.pollSub = this.poller.exponential(request).subscribe(tensorboards => {
      this.processedData = this.processIncomingData(tensorboards);
    });
  }

  public reactToAction(a: ActionEvent) {
    switch (a.action) {
      case 'delete':
        this.deleteTensorboardClicked(a.data);
        break;
      case 'start-stop':
        this.startStopClicked(a.data);
        break;
      case 'connect':
        this.connectResource(a.data);
        break;
    }
  }

  public newResourceClicked() {
    const ref = this.dialog.open(FormComponent, {
      width: '600px',
      panelClass: 'form--dialog-padding',
    });

    ref.afterClosed().subscribe(res => {
      if (res === DIALOG_RESP.ACCEPT) {
        const config: SnackBarConfig = {
          data: {
            msg: $localize`Tensorboard was submitted successfully.`,
            snackType: SnackType.Success,
          },
        };
        this.snackBar.open(config);
        this.poll(this.currNamespace);
      }
    });
  }

  public deleteTensorboardClicked(tensorboard: TensorboardProcessedObject) {
    const deleteDialogConfig: DialogConfig = {
      title: $localize`Are you sure you want to delete this Tensorboard : ${tensorboard.name} ?`,
      message: '',
      accept: $localize`DELETE`,
      confirmColor: 'warn',
      cancel: $localize`CANCEL`,
      error: '',
      applying: $localize`DELETING`,
      width: '600px',
    };

    const ref = this.confirmDialog.open(tensorboard.name, deleteDialogConfig);
    const delSub = ref.componentInstance.applying$.subscribe(applying => {
      if (!applying) {
        return;
      }

      // Close the open dialog only if the DELETE request succeeded
      this.backend
        .deleteTensorboard(tensorboard.namespace, tensorboard.name)
        .subscribe({
          next: _ => {
            // We don't want to use the namespace of the deleted object since
            // it might override the selected all-namespaces
            this.poll(this.currNamespace);
            ref.close(DIALOG_RESP.ACCEPT);
          },
          error: err => {
            const errorMsg = err;
            console.log(err);
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

        tensorboard.status.phase = STATUS_TYPE.TERMINATING;
        tensorboard.status.message =
          'Preparing to delete the Tensorboard object...';
        tensorboard.deleteAction = STATUS_TYPE.UNAVAILABLE;
      });
    });
  }

  public connectResource(tensorboard: TensorboardProcessedObject): void {
    window.open(`/tensorboard/${tensorboard.namespace}/${tensorboard.name}/`);
  }

  // Utility functions
  public processIncomingData(
    tensorboards: TensorboardResponseObject[],
  ): TensorboardProcessedObject[] {
    const tensorboardsCopy = JSON.parse(
      JSON.stringify(tensorboards),
    ) as TensorboardProcessedObject[];

    for (const tensorboard of tensorboardsCopy) {
      this.updateTensorboardFields(tensorboard);
    }
    return tensorboardsCopy;
  }

  public startStopClicked(tensorboard: TensorboardProcessedObject) {
    if (tensorboard.status.phase === STATUS_TYPE.STOPPED) {
      this.startTensorboard(tensorboard);
    } else {
      this.stopTensorboard(tensorboard);
    }
  }

  public processAgeField(tensorboard: TensorboardProcessedObject) {
    tensorboard.ageValue = tensorboard.age.uptime;
    tensorboard.ageTooltip = tensorboard.age.timestamp;
  }

  public processDeletionActionStatus(tensorboard: TensorboardProcessedObject) {
    if (tensorboard.status.phase !== STATUS_TYPE.TERMINATING) {
      tensorboard.deleteAction = STATUS_TYPE.READY;
      return;
    }

    tensorboard.deleteAction = STATUS_TYPE.TERMINATING;
  }

  public processConnectionActionStatus(
    tensorboard: TensorboardProcessedObject,
  ) {
    if (tensorboard.status.phase === STATUS_TYPE.READY) {
      tensorboard.connectAction = STATUS_TYPE.READY;
      return;
    }
    tensorboard.connectAction = STATUS_TYPE.UNAVAILABLE;
  }

  public tensorboardTrackByFn(
    index: number,
    tensorboard: TensorboardProcessedObject,
  ) {
    return `${tensorboard.name}/${tensorboard.namespace}/${tensorboard.logspath}`;
  }

  startTensorboard(tensorboard: TensorboardProcessedObject) {
    this.startTensorboardObservable(
      tensorboard.namespace,
      tensorboard.name,
    ).subscribe(_ => {
      tensorboard.status.phase = STATUS_TYPE.WAITING;
      tensorboard.status.message = 'Starting the tensorboard.';
      this.updateTensorboardFields(tensorboard);
    });
  }

  startTensorboardObservable(
    namespace: string,
    name: string,
  ): Observable<string> {
    return new Observable(subscriber => {
      this.backend.startTensorboard(namespace, name).subscribe(response => {
        const config: SnackBarConfig = {
          data: {
            msg: $localize`Starting tensorboard '${name}'...`,
            snackType: SnackType.Info,
          },
        };
        this.snackBar.open(config);

        subscriber.next(response);
        subscriber.complete();
      });
    });
  }

  stopTensorboard(tensorboard: TensorboardProcessedObject) {
    this.stopNotebookObservable(
      tensorboard.namespace,
      tensorboard.name,
    ).subscribe(result => {
      if (result !== DIALOG_RESP.ACCEPT) {
        return;
      }

      tensorboard.status.phase = STATUS_TYPE.WAITING;
      tensorboard.status.message = 'Preparing to stop the tensorboard.';
      this.updateTensorboardFields(tensorboard);
    });
  }

  stopNotebookObservable(namespace: string, name: string): Observable<string> {
    return new Observable(subscriber => {
      const stopDialogConfig = getStopDialogConfig(name);
      const ref = this.confirmDialog.open(name, stopDialogConfig);
      const stopSub = ref.componentInstance.applying$.subscribe(applying => {
        if (!applying) {
          return;
        }

        // Close the open dialog only if the request succeeded
        this.backend.stopTensorboard(namespace, name).subscribe({
          next: _ => {
            ref.close(DIALOG_RESP.ACCEPT);
            const config: SnackBarConfig = {
              data: {
                msg: $localize`Stopping tensorboard '${name}'...`,
                snackType: SnackType.Info,
              },
            };
            this.snackBar.open(config);
          },
          error: err => {
            const errorMsg = `Error ${err}`;
            stopDialogConfig.error = errorMsg;
            ref.componentInstance.applying$.next(false);
            subscriber.next(`fail`);
          },
        });

        // request has succeeded
        ref.afterClosed().subscribe(result => {
          stopSub.unsubscribe();
          subscriber.next(result);
          subscriber.complete();
        });
      });
    });
  }

  updateTensorboardFields(tensorboard: TensorboardProcessedObject) {
    this.processAgeField(tensorboard);
    this.processDeletionActionStatus(tensorboard);
    this.processConnectionActionStatus(tensorboard);
    this.processStartStopActionStatus(tensorboard);
    tensorboard.link = {
      text: tensorboard.name,
      url: `/tensorboard/${tensorboard.namespace}/${tensorboard.name}/`,
    };
  }

  processStartStopActionStatus(tensorboard: TensorboardProcessedObject) {
    // Stop button
    if (tensorboard.status.phase === STATUS_TYPE.READY) {
      return STATUS_TYPE.UNINITIALIZED;
    }

    // Start button
    if (tensorboard.status.phase === STATUS_TYPE.STOPPED) {
      return STATUS_TYPE.READY;
    }

    // If it is terminating, then the action should be disabled
    if (tensorboard.status.phase === STATUS_TYPE.TERMINATING) {
      return STATUS_TYPE.UNAVAILABLE;
    }

    // If the Notebook is not Terminating, then always allow the stop action
    return STATUS_TYPE.UNINITIALIZED;
  }
}
