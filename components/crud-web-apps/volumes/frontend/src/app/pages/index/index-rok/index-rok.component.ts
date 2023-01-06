import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  NamespaceService,
  ConfirmDialogService,
  DIALOG_RESP,
  SnackBarService,
  SnackType,
  RokService,
  PollerService,
} from 'kubeflow';
import { environment } from '@app/environment';
import { VWABackendService } from 'src/app/services/backend.service';
import { IndexDefaultComponent } from '../index-default/index-default.component';
import { FormRokComponent } from '../../form/form-rok/form-rok.component';
import { rokConfig } from './config';
import { Router } from '@angular/router';
import { ActionsService } from 'src/app/services/actions.service';

@Component({
  selector: 'app-index-rok',
  templateUrl: '../index-default/index-default.component.html',
  styleUrls: ['../index-default/index-default.component.scss'],
})
export class IndexRokComponent
  extends IndexDefaultComponent
  implements OnInit, OnDestroy {
  config = rokConfig;

  constructor(
    public ns: NamespaceService,
    public confirmDialog: ConfirmDialogService,
    public backend: VWABackendService,
    public dialog: MatDialog,
    public snackBar: SnackBarService,
    public rok: RokService,
    public poller: PollerService,
    public router: Router,
    public actions: ActionsService,
  ) {
    super(
      ns,
      confirmDialog,
      backend,
      dialog,
      snackBar,
      poller,
      router,
      actions,
    );
  }

  ngOnInit() {
    super.ngOnInit();

    this.rok.initCSRF();
  }

  // Functions for handling the action events
  public newResourceClicked() {
    const ref = this.dialog.open(FormRokComponent, {
      width: '600px',
      panelClass: 'form--dialog-padding',
    });

    ref.afterClosed().subscribe(res => {
      if (res === DIALOG_RESP.ACCEPT) {
        this.snackBar.open(
          'Volume was submitted successfully.',
          SnackType.Success,
          2000,
        );
        this.poll(this.currNamespace);
      }
    });
  }
}
