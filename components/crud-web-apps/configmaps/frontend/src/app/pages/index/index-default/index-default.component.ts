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
import { CMWABackendService } from 'src/app/services/backend.service';
import { ConfigMapResponseObject, ConfigMapProcessedObject } from 'src/app/types';
import { Subscription } from 'rxjs';
import { isEqual } from 'lodash';
import { FormDefaultComponent } from '../../form/form-default/form-default.component';

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
  public rawData: ConfigMapResponseObject[] = [];
  public processedData: ConfigMapProcessedObject[] = [];
  public configsWaitingViewer = new Set<string>();

  buttons: ToolbarButton[] = [
    new ToolbarButton({
      text: `New ConfigMap`,
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
    public backend: CMWABackendService,
    public dialog: MatDialog,
    public snackBar: SnackBarService,
  ) {}

  ngOnInit() {
    this.poller = new ExponentialBackoff({ interval: 100000, retries: 3 });

    // Poll for new data and reset the poller if different data is found
    this.subs.add(
      this.poller.start().subscribe(() => {
        if (!this.currNamespace) {
          return;
        }

        this.backend.getConfigMaps(this.currNamespace).subscribe(configMaps => {
          if (!isEqual(this.rawData, configMaps)) {
            this.rawData = configMaps;

            // Update the frontend's state
            this.processedData = this.parseIncomingData(configMaps);
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
        this.editConfigMapClicked(a.data);
        break;
      case 'delete':
        this.deleteConfigMapClicked(a.data);
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
          $localize`ConfigMap was submitted successfully.`,
          SnackType.Success,
          2000,
        );
        this.poller.reset();
      }
    });
  }

  public editConfigMapClicked(configMap: ConfigMapProcessedObject) {
    const ref = this.dialog.open(FormDefaultComponent, {
      width: '600px',
      panelClass: 'form--dialog-padding',
      data: configMap,
    });

    ref.afterClosed().subscribe(res => {
      if (res === DIALOG_RESP.ACCEPT) {
        this.snackBar.open(
          $localize`ConfigMap was submitted successfully.`,
          SnackType.Success,
          2000,
        );
        this.poller.reset();
      }
    });
  }

  public deleteConfigMapClicked(configMap: ConfigMapProcessedObject) {
    const deleteDialogConfig: DialogConfig = {
      title: $localize`Are you sure you want to delete this configMap? ${configMap.name}`,
      message: $localize`Warning: All data in this configMap will be lost.`,
      accept: $localize`DELETE`,
      confirmColor: 'warn',
      cancel: $localize`CANCEL`,
      error: '',
      applying: $localize`DELETING`,
      width: '600px',
    };

    const ref = this.confirmDialog.open(configMap.name, deleteDialogConfig);
    const delSub = ref.componentInstance.applying$.subscribe(applying => {
      if (!applying) {
        return;
      }

      // Close the open dialog only if the DELETE request succeeded
      this.backend.deleteConfigMap(this.currNamespace, configMap.name).subscribe({
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

        configMap.status.phase = STATUS_TYPE.TERMINATING;
        configMap.status.message = 'Preparing to delete the ConfigMap...';
        configMap.deleteAction = STATUS_TYPE.UNAVAILABLE;
        configMap.editAction = STATUS_TYPE.UNAVAILABLE;
        this.configsWaitingViewer.delete(configMap.name);
      });
    });
  }

  // Utility funcs
  public parseIncomingData(configMaps: ConfigMapResponseObject[]): ConfigMapProcessedObject[] {
    const configMapsCopy = JSON.parse(JSON.stringify(configMaps)) as ConfigMapProcessedObject[];

    for (const configMap of configMapsCopy) {
      configMap.deleteAction = STATUS_TYPE.READY;
      configMap.editAction = STATUS_TYPE.READY;
      configMap.ageValue = configMap.age.uptime;
      configMap.ageTooltip = configMap.age.timestamp;
      if (configMap.labels != null){
        configMap.labels = JSON.stringify(configMap.labels);
      }
      if (configMap.data != null){
        configMap.data = JSON.stringify(configMap.data);
      }
      if (configMap.annotations != null){
        configMap.annotations = JSON.stringify(configMap.annotations);
      }
    }

    return configMapsCopy;
  }
}
