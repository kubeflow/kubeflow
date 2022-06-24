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
import { SecretResponseObject, SecretProcessedObject } from 'src/app/types';
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
  public rawData: SecretResponseObject[] = [];
  public processedData: SecretProcessedObject[] = [];
  public configsWaitingViewer = new Set<string>();

  buttons: ToolbarButton[] = [
    new ToolbarButton({
      text: `New Secret`,
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

        this.backend.getSecrets(this.currNamespace).subscribe(secrets => {
          if (!isEqual(this.rawData, secrets)) {
            this.rawData = secrets;

            // Update the frontend's state
            this.processedData = this.parseIncomingData(secrets);
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
        this.editSecretClicked(a.data);
        break;
      case 'delete':
        this.deleteSecretClicked(a.data);
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
          $localize`Secret was submitted successfully.`,
          SnackType.Success,
          2000,
        );
        this.poller.reset();
      }
    });
  }

  public editSecretClicked(secret: SecretProcessedObject) {
    const ref = this.dialog.open(FormDefaultComponent, {
      width: '600px',
      panelClass: 'form--dialog-padding',
      data: secret,
    });

    ref.afterClosed().subscribe(res => {
      if (res === DIALOG_RESP.ACCEPT) {
        this.snackBar.open(
          $localize`Secret was submitted successfully.`,
          SnackType.Success,
          2000,
        );
        this.poller.reset();
      }
    });
  }

  public deleteSecretClicked(secret: SecretProcessedObject) {
    const deleteDialogConfig: DialogConfig = {
      title: $localize`Are you sure you want to delete this secret? ${secret.name}`,
      message: $localize`Warning: All data in this secret will be lost.`,
      accept: $localize`DELETE`,
      confirmColor: 'warn',
      cancel: $localize`CANCEL`,
      error: '',
      applying: $localize`DELETING`,
      width: '600px',
    };

    const ref = this.confirmDialog.open(secret.name, deleteDialogConfig);
    const delSub = ref.componentInstance.applying$.subscribe(applying => {
      if (!applying) {
        return;
      }

      // Close the open dialog only if the DELETE request succeeded
      this.backend.deleteSecret(this.currNamespace, secret.name).subscribe({
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

        secret.status.phase = STATUS_TYPE.TERMINATING;
        secret.status.message = 'Preparing to delete the Secret...';
        secret.deleteAction = STATUS_TYPE.UNAVAILABLE;
        secret.editAction = STATUS_TYPE.UNAVAILABLE;
        this.configsWaitingViewer.delete(secret.name);
      });
    });
  }

  // Utility funcs
  public parseIncomingData(secrets: SecretResponseObject[]): SecretProcessedObject[] {
    const secretsCopy = JSON.parse(JSON.stringify(secrets)) as SecretProcessedObject[];
    for (const secret of secretsCopy) {
      secret.deleteAction = STATUS_TYPE.READY;
      secret.editAction = STATUS_TYPE.READY;
      secret.ageValue = secret.age.uptime;
      secret.ageTooltip = secret.age.timestamp;
      if (secret.labels != null)
      {
        secret.labels = secret.labels;
      }
      if (secret.annotations != null)
      {
        secret.annotations = secret.annotations;
      }
    }
    return secretsCopy;
  }
}
