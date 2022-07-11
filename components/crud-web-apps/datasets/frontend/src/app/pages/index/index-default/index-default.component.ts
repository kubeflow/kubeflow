import { Component, OnInit } from '@angular/core';
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
} from 'kubeflow';
import { defaultConfig } from './config';
import { environment } from '@app/environment';
import { VWABackendService } from 'src/app/services/backend.service';
import { AccelerateDatasetResponseObject, AccelerateDatasetProcessedObject } from 'src/app/types';
import { Subscription } from 'rxjs';
import { isEqual } from 'lodash';
import { FormDefaultComponent } from '../../form/form-default/form-default.component';
import { Console } from 'console';

@Component({
  selector: 'app-index-default',
  templateUrl: './index-default.component.html',
  styleUrls: ['./index-default.component.scss'],
})
export class IndexDefaultComponent implements OnInit {
  public env = environment;
  public poller: ExponentialBackoff;

  public currNamespace = '';
  public subs = new Subscription();

  public config = defaultConfig;
  public rawData: AccelerateDatasetResponseObject[] = [];
  public processedData: AccelerateDatasetProcessedObject[] = [];
  public configsWaitingViewer = new Set<string>();

  buttons: ToolbarButton[] = [
    new ToolbarButton({
      text: `New S3 Accelerate`,
      icon: 'add',
      stroked: true,
      fn: () => {
        this.newResourceClicked();
      },
    }),
  ];

  constructor(
    public ns: NamespaceService,
    public confirmDialog: ConfirmDialogService,
    public backend: VWABackendService,
    public dialog: MatDialog,
    public snackBar: SnackBarService,
  ) {}

  ngOnInit() {
    this.poller = new ExponentialBackoff({ interval: 1000000, retries: 3 });

    // Poll for new data and reset the poller if different data is found
    this.subs.add(
      this.poller.start().subscribe(() => {
        if (!this.currNamespace) {
          return;
        }

        this.backend.getAccelerateDatasets(this.currNamespace).subscribe(datasets => {
          if (!isEqual(this.rawData, datasets)) {
            this.rawData = datasets;
            // Update the frontend's state
            this.processedData = this.parseIncomingData(datasets);
            this.poller.reset();
          }
        });
      }),
    );

    // Reset the poller whenever the selected namespace changes
    this.subs.add(
      this.ns.getSelectedNamespace().subscribe(ns => {
        this.currNamespace = ns;
        this.configsWaitingViewer = new Set<string>();
        this.poller.reset();
      }),
    );
  }

  public reactToAction(a: ActionEvent) {
    switch (a.action) {
      case 'edit':
        this.editDatasetClicked(a.data);
        break;
      case 'delete':
        this.deleteDatasetClicked(a.data);
        break;
    }
  }

  // Functions for handling the action events
  public newResourceClicked() {
    const ref = this.dialog.open(FormDefaultComponent, {
      width: '600px',
      panelClass: 'form--dialog-padding',
    });

    ref.afterClosed().subscribe(res => {
      if (res === DIALOG_RESP.ACCEPT) {
        this.snackBar.open(
          $localize`Dataset was submitted successfully.`,
          SnackType.Success,
          2000,
        );
        this.poller.reset();
      }
    });
  }

  public editDatasetClicked(dataset: AccelerateDatasetProcessedObject) {
    const ref = this.dialog.open(FormDefaultComponent, {
      width: '600px',
      panelClass: 'form--dialog-padding',
      data: dataset,
    });

    ref.afterClosed().subscribe(res => {
      if (res === DIALOG_RESP.ACCEPT) {
        this.snackBar.open(
          $localize`Dataset was submitted successfully.`,
          SnackType.Success,
          2000,
        );
        this.poller.reset();
      }
    });
  }

  public deleteDatasetClicked(dataset: AccelerateDatasetProcessedObject) {
    const deleteDialogConfig: DialogConfig = {
      title: $localize`Are you sure you want to delete this Dataset? ${dataset.name}`,
      message: $localize`Warning: All data in this configuration will be lost.`,
      accept: $localize`DELETE`,
      confirmColor: 'warn',
      cancel: $localize`CANCEL`,
      error: '',
      applying: $localize`DELETING`,
      width: '600px',
    };
    const ref = this.confirmDialog.open(dataset.name, deleteDialogConfig);
    const delSub = ref.componentInstance.applying$.subscribe(applying => {
      if (!applying) {
        return;
      }

      // Close the open dialog only if the DELETE request succeeded
      this.backend.deleteAccelerateDataset(this.currNamespace, dataset.name).subscribe({
        next: _ => {
          this.poller.reset();
          ref.close(DIALOG_RESP.ACCEPT);
        },
        error: err => {
          // Simplify the error message
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

        dataset.status.phase = STATUS_TYPE.TERMINATING;
        dataset.status.message = 'Preparing to delete the Config...';
        dataset.deleteAction = STATUS_TYPE.UNAVAILABLE;
        dataset.editAction = STATUS_TYPE.UNAVAILABLE;
        this.configsWaitingViewer.delete(dataset.name);
      });
    });
  }

  // Utility funcs
  public parseIncomingData(datasets: AccelerateDatasetResponseObject[]): AccelerateDatasetProcessedObject[] {
    const datasetsCopy = JSON.parse(JSON.stringify(datasets)) as AccelerateDatasetProcessedObject[];
    for (const dataset of datasetsCopy) {
      dataset.deleteAction = STATUS_TYPE.READY;
      dataset.editAction = STATUS_TYPE.READY;
      dataset.ageValue = dataset.age.uptime;
      dataset.ageTooltip = dataset.age.timestamp;
    }

    return datasetsCopy;
  }
}
