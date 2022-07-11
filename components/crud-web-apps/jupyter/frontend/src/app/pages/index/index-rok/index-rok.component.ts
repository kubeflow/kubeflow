import { Component, OnInit } from '@angular/core';
import { environment } from '@app/environment';
import {
  RokService,
  NamespaceService,
  SnackBarService,
  ConfirmDialogService,
  PollerService,
} from 'kubeflow';
import { JWABackendService } from 'src/app/services/backend.service';
import { Router } from '@angular/router';
import { IndexDefaultComponent } from '../index-default/index-default.component';
import { ActionsService } from 'src/app/services/actions.service';

@Component({
  selector: 'app-index-rok',
  templateUrl: '../index-default/index-default.component.html',
  styleUrls: ['../index-default/index-default.component.scss'],
})
export class IndexRokComponent extends IndexDefaultComponent implements OnInit {
  constructor(
    private rok: RokService,
    public ns: NamespaceService,
    public backend: JWABackendService,
    public confirmDialog: ConfirmDialogService,
    public popup: SnackBarService,
    public router: Router,
    public poller: PollerService,
    public actions: ActionsService,
  ) {
    super(ns, backend, confirmDialog, popup, router, poller, actions);

    this.rok.initCSRF();
  }
}
