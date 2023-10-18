import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  NamespaceService,
  ActionEvent,
  ConfirmDialogService,
  STATUS_TYPE,
  DIALOG_RESP,
  SnackBarService,
  SnackType,
  ToolbarButton,
  PollerService,
  DashboardState,
  SnackBarConfig,
  DialogConfig,
} from 'kubeflow';
import { defaultConfig } from './config';
import { environment } from '@app/environment';
import { VWABackendService } from 'src/app/services/backend.service';
import { PVCResponseObject, PVCProcessedObject } from 'src/app/types';
import { Subscription } from 'rxjs';
import { FormDefaultComponent } from '../../form/form-default/form-default.component';
import { Router } from '@angular/router';
import { ActionsService } from 'src/app/services/actions.service';

@Component({
  selector: 'app-index-default',
  templateUrl: './index-default.component.html',
  styleUrls: ['./index-default.component.scss'],
})
export class IndexDefaultComponent implements OnInit, OnDestroy {
  private nsSub = new Subscription();
  private pollSub = new Subscription();

  public env = environment;
  public config = defaultConfig;
  public currNamespace: string | string[];
  public processedData: PVCProcessedObject[] = [];
  public pvcsWaitingViewer = new Set<string>();
  public dashboardDisconnectedState = DashboardState.Disconnected;

  private newVolumeButton = new ToolbarButton({
    text: $localize`New Volume`,
    icon: 'add',
    stroked: true,
    fn: () => {
      this.newResourceClicked();
    },
  });

  buttons: ToolbarButton[] = [this.newVolumeButton];

  constructor(
    public ns: NamespaceService,
    public confirmDialog: ConfirmDialogService,
    public backend: VWABackendService,
    public dialog: MatDialog,
    public snackBar: SnackBarService,
    public poller: PollerService,
    public router: Router,
    public actions: ActionsService,
  ) {}

  ngOnInit() {
    this.nsSub = this.ns.getSelectedNamespace2().subscribe(ns => {
      this.currNamespace = ns;
      this.pvcsWaitingViewer = new Set<string>();
      this.poll(ns);
      this.newVolumeButton.namespaceChanged(ns, $localize`Volume`);
    });
  }

  ngOnDestroy() {
    this.nsSub.unsubscribe();
    this.pollSub.unsubscribe();
  }

  public poll(ns: string | string[]) {
    this.pollSub.unsubscribe();
    this.processedData = [];

    const request = this.backend.getPVCs(ns);

    this.pollSub = this.poller.exponential(request).subscribe(pvcs => {
      this.processedData = this.parseIncomingData(pvcs);
    });
  }

  public reactToAction(a: ActionEvent) {
    switch (a.action) {
      case 'delete':
        this.deleteVolumeClicked(a.data);
        break;
      case 'open-pvcviewer':
        this.openPVCViewerClicked(a.data);
        break;
      case 'close-pvcviewer':
        this.closePVCViewerClicked(a.data);
        break;
      case 'name:link':
        if (a.data.status.phase === STATUS_TYPE.TERMINATING) {
          a.event.stopPropagation();
          a.event.preventDefault();
          const config: SnackBarConfig = {
            data: {
              msg: 'PVC is unavailable now.',
              snackType: SnackType.Warning,
            },
          };
          this.snackBar.open(config);
          return;
        }
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
        const config: SnackBarConfig = {
          data: {
            msg: $localize`Volume was submitted successfully.`,
            snackType: SnackType.Success,
          },
          duration: 2000,
        };
        this.snackBar.open(config);
        this.poll(this.currNamespace);
      }
    });
  }

  public deleteVolumeClicked(pvc: PVCProcessedObject) {
    this.actions.deleteVolume(pvc.name, pvc.namespace).subscribe(result => {
      if (result !== DIALOG_RESP.ACCEPT) {
        return;
      }

      pvc.status.phase = STATUS_TYPE.TERMINATING;
      pvc.status.message = 'Preparing to delete the Volume...';
      pvc.deleteAction = STATUS_TYPE.UNAVAILABLE;
      this.pvcsWaitingViewer.delete(pvc.name);
    });
  }

  public openPVCViewerClicked(pvc: PVCProcessedObject) {
    if (pvc.viewer.status === STATUS_TYPE.READY) {
      this.openViewerWindow(pvc);
      return;
    }

    this.pvcsWaitingViewer.add(pvc.name);
    pvc.openPVCViewerAction = this.parseOpenPVCViewerActionStatus(pvc);

    this.backend.createViewer(pvc.namespace, pvc.name).subscribe({
      next: res => {
        this.poll(pvc.namespace);
      },
      error: err => {
        this.pvcsWaitingViewer.delete(pvc.name);
        pvc.openPVCViewerAction = this.parseOpenPVCViewerActionStatus(pvc);
      },
    });
  }

  public closePVCViewerClicked(pvc: PVCProcessedObject) {
    const closeDialogConfig: DialogConfig = {
      title: `Are you sure you want to close this viewer? ${pvc.name}`,
      message: 'Warning: Any running processes will terminate.',
      accept: 'CLOSE',
      confirmColor: 'warn',
      cancel: 'CANCEL',
      error: '',
      applying: 'CLOSING',
      width: '600px',
    };

    const ref = this.confirmDialog.open(pvc.name, closeDialogConfig);
    const delSub = ref.componentInstance.applying$.subscribe(applying => {
      if (!applying) {
        return;
      }

      // Close the open dialog only if the DELETE request succeeded
      this.backend.deleteViewer(pvc.namespace, pvc.name).subscribe({
        next: _ => {
          this.poll(pvc.namespace);
          ref.close(DIALOG_RESP.ACCEPT);
        },
        error: err => {
          // Simplify the error message
          const errorMsg = err;
          closeDialogConfig.error = errorMsg;
          ref.componentInstance.applying$.next(false);
        },
      });

      // DELETE request has succeeded
      ref.afterClosed().subscribe(res => {
        delSub.unsubscribe();
        if (res !== DIALOG_RESP.ACCEPT) {
          return;
        }

        pvc.viewer.status = STATUS_TYPE.TERMINATING;
        pvc.closePVCViewerAction = STATUS_TYPE.TERMINATING;

        this.pvcsWaitingViewer.delete(pvc.name);
      });
    });
  }

  // Utility funcs
  public parseIncomingData(pvcs: PVCResponseObject[]): PVCProcessedObject[] {
    const pvcsCopy = JSON.parse(JSON.stringify(pvcs)) as PVCProcessedObject[];

    for (const pvc of pvcsCopy) {
      pvc.deleteAction = this.parseDeletionActionStatus(pvc);
      pvc.closePVCViewerAction = this.parseClosePVCViewerActionStatus(pvc);
      pvc.openPVCViewerAction = this.parseOpenPVCViewerActionStatus(pvc);
      pvc.ageValue = pvc.age.uptime;
      pvc.ageTooltip = pvc.age.timestamp;
      pvc.link = {
        text: pvc.name,
        url: `/volume/details/${pvc.namespace}/${pvc.name}`,
      };
    }

    return pvcsCopy;
  }

  public parseDeletionActionStatus(pvc: PVCProcessedObject) {
    if (pvc.notebooks.length) {
      return STATUS_TYPE.UNAVAILABLE;
    }

    if (pvc.status.phase !== STATUS_TYPE.TERMINATING) {
      return STATUS_TYPE.READY;
    }

    return STATUS_TYPE.TERMINATING;
  }

  // Defines the status of the "Open Viewer" button
  public parseOpenPVCViewerActionStatus(pvc: PVCProcessedObject): STATUS_TYPE {
    // PVC is UNAVAILABLE but only because its waiting for a consumer
    // This shouldn't stop a viewer from being the first consumer
    const pvcWaitingForConsumer =
      pvc.status.phase === STATUS_TYPE.UNAVAILABLE &&
      pvc.status.state === 'WaitForFirstConsumer';

    if (pvc.status.phase !== STATUS_TYPE.READY && !pvcWaitingForConsumer) {
      return STATUS_TYPE.UNAVAILABLE;
    }

    // Popup is waiting for the viewer to become ready
    if (this.pvcsWaitingViewer.has(pvc.name)) {
      // Open the viewer window if it's ready
      if (pvc.viewer.status === STATUS_TYPE.READY) {
        this.pvcsWaitingViewer.delete(pvc.name);
        this.openViewerWindow(pvc);
      }
      // Show a spinner as we're waiting to the viewer to become ready
      if (
        [STATUS_TYPE.UNINITIALIZED, STATUS_TYPE.WAITING].includes(
          pvc.viewer.status,
        )
      ) {
        return STATUS_TYPE.WAITING;
      }
    }

    return pvc.viewer.status;
  }

  // Defines the status of the "Close Viewer" button
  public parseClosePVCViewerActionStatus(pvc: PVCProcessedObject) {
    // Users may always close an existing, non-terminating viewer
    switch (pvc.viewer.status) {
      case STATUS_TYPE.UNINITIALIZED:
        return STATUS_TYPE.UNAVAILABLE;
      case STATUS_TYPE.TERMINATING:
        return STATUS_TYPE.WAITING;
      default:
        return STATUS_TYPE.READY;
    }
  }

  public openViewerWindow(pvc: PVCProcessedObject) {
    const url = this.env.viewerUrl + pvc.viewer.url;

    window.open(url, `${pvc.name}: Volumes Viewer`, 'height=600,width=800');
  }

  public pvcTrackByFn(index: number, pvc: PVCProcessedObject) {
    return `${pvc.name}/${pvc.namespace}/${pvc.capacity}`;
  }
}
