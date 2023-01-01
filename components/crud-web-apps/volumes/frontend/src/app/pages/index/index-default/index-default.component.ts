import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  NamespaceService,
  ActionEvent,
  ConfirmDialogService,
  STATUS_TYPE,
  DIALOG_RESP,
  DialogConfig,
  SnackBarService,
  SnackType,
  ToolbarButton,
  PollerService,
  DashboardState,
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
    this.nsSub = this.ns.getSelectedNamespace().subscribe(ns => {
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
      case 'open-viewer':
        this.openViewerClicked(a.data);
        break;
      case 'close-viewer':
        this.closeViewerClicked(a.data);
        break;
      case 'name:link':
        if (a.data.status.phase === STATUS_TYPE.TERMINATING) {
          this.snackBar.open(
            'PVC is unavailable now.',
            SnackType.Warning,
            3000,
          );
          return;
        }
        this.router.navigate([
          `/volume/details/${a.data.namespace}/${a.data.name}`,
        ]);
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
          $localize`Volume was submitted successfully.`,
          SnackType.Success,
          2000,
        );
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

  public openViewerClicked(pvc: PVCProcessedObject) {
    console.log("clicked open viewer: ", pvc)
    if (pvc.viewer === STATUS_TYPE.READY) {
      this.openViewerWindow(pvc);
      return;
    }

    this.pvcsWaitingViewer.add(pvc.name);
    pvc.openViewerAction = this.parseViewerActionStatus(pvc);

    this.backend.createViewer(pvc.namespace, pvc.name).subscribe({
      next: res => {
        this.poll(pvc.namespace);
      },
      error: err => {
        this.pvcsWaitingViewer.delete(pvc.name);
        pvc.openViewerAction = this.parseViewerActionStatus(pvc);
      },
    });
  }

  public closeViewerClicked(pvc: PVCProcessedObject) {
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
          console.log(err);
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

        pvc.viewer = STATUS_TYPE.TERMINATING;
        pvc.closeViewerAction = STATUS_TYPE.TERMINATING;
      });
    });
  }

  public parseViewerActionStatus(pvc: PVCProcessedObject): STATUS_TYPE {
    // If the PVC is being created or there was an error, then
    // don't allow the user to edit it
    if (
      pvc.status.phase === STATUS_TYPE.UNINITIALIZED ||
      pvc.status.phase === STATUS_TYPE.WAITING ||
      pvc.status.phase === STATUS_TYPE.WARNING ||
      pvc.status.phase === STATUS_TYPE.TERMINATING ||
      pvc.status.phase === STATUS_TYPE.ERROR
    ) {
      return STATUS_TYPE.UNAVAILABLE;
    }

    // The PVC is either READY or UNAVAILABLE(WaitForFirstConsumer)

    // If the user had clicked to view the files and the viewer just
    // became ready, then open the edit window
    console.log("parseViewerActionStatus pvc: ", pvc)
    console.log("pvcsWaitingViewer: ", this.pvcsWaitingViewer)
    if (
      this.pvcsWaitingViewer.has(pvc.name) &&
      pvc.viewer === STATUS_TYPE.READY
    ) {
      this.pvcsWaitingViewer.delete(pvc.name);
      this.openViewerWindow(pvc);
      return STATUS_TYPE.READY;
    }

    // If the user clicked to view the files and the viewer
    // is still uninitialized or unavailable, then show a spinner
    if (
      this.pvcsWaitingViewer.has(pvc.name) &&
      (pvc.viewer === STATUS_TYPE.UNINITIALIZED ||
        pvc.viewer === STATUS_TYPE.WAITING)
    ) {
      return STATUS_TYPE.WAITING;
    }

    // If the user hasn't yet clicked to edit the pvc, then the viewer
    // button should be enabled
    if (
      !this.pvcsWaitingViewer.has(pvc.name) &&
      pvc.status.state === 'WaitForFirstConsumer'
    ) {
      return STATUS_TYPE.UNINITIALIZED;
    }

    return pvc.viewer;
  }

  public openViewerWindow(pvc: PVCProcessedObject) {
    const url =
      this.env.viewerUrl + `/volumesviewer/${pvc.namespace}/${pvc.name}/`;

    window.open(url, `${pvc.name}: Edit file contents`, 'height=600,width=800');
  }

  // Utility funcs
  public parseIncomingData(pvcs: PVCResponseObject[]): PVCProcessedObject[] {
    const pvcsCopy = JSON.parse(JSON.stringify(pvcs)) as PVCProcessedObject[];

    for (const pvc of pvcsCopy) {
      pvc.deleteAction = this.parseDeletionActionStatus(pvc);
      pvc.closeViewerAction = this.parseCloseViewerActionStatus(pvc);
      pvc.ageValue = pvc.age.uptime;
      pvc.ageTooltip = pvc.age.timestamp;
      pvc.openViewerAction = this.parseViewerActionStatus(pvc);
    }

    return pvcsCopy;
  }

  public parseDeletionActionStatus(pvc: PVCProcessedObject) {
    if (pvc.status.phase !== STATUS_TYPE.TERMINATING) {
      return STATUS_TYPE.READY;
    }

    return STATUS_TYPE.TERMINATING;
  }

  public parseCloseViewerActionStatus(pvc: PVCProcessedObject) {
    if (
      !this.pvcsWaitingViewer.has(pvc.name) &&
      pvc.status.state === 'WaitForFirstConsumer'
    ) {
      return STATUS_TYPE.UNINITIALIZED;
    }
    // If the PVC is being created or there was an error, then
    // don't allow the user to edit it
    if (
      pvc.status.phase === STATUS_TYPE.UNINITIALIZED ||
      pvc.status.phase === STATUS_TYPE.WAITING ||
      pvc.status.phase === STATUS_TYPE.WARNING ||
      pvc.status.phase === STATUS_TYPE.TERMINATING ||
      pvc.status.phase === STATUS_TYPE.ERROR
    ) {
      return STATUS_TYPE.UNAVAILABLE;
    }
    if (
      pvc.viewer === STATUS_TYPE.READY
    ) {
      return STATUS_TYPE.READY;
    }
    if (
      pvc.viewer === STATUS_TYPE.TERMINATING
    ) {
      return STATUS_TYPE.WAITING;
    }

    return STATUS_TYPE.UNAVAILABLE;
  }

  public pvcTrackByFn(index: number, pvc: PVCProcessedObject) {
    return `${pvc.name}/${pvc.namespace}/${pvc.capacity}`;
  }
}
