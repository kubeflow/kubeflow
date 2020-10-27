import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SnackBarService, SnackType } from 'kubeflow';
import { Volume } from 'src/app/types';

@Component({
  selector: 'app-form-workspace-volume',
  templateUrl: './form-workspace-volume.component.html',
  styleUrls: ['./form-workspace-volume.component.scss'],
})
export class FormWorkspaceVolumeComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  private readOnlyPrv = false;

  @Input() parentForm: FormGroup;
  @Input() pvcs: Volume[];
  @Input() storageClasses: string[];
  @Input() defaultStorageClass: boolean;
  @Input()
  get readonly() {
    return this.readOnlyPrv;
  }
  set readonly(b) {
    this.readOnlyPrv = b;
  }

  constructor(private snackBar: SnackBarService) {}

  ngOnInit() {
    // Show a warning if no persistent storage is provided
    this.subscriptions.add(
      this.parentForm
        .get('noWorkspace')
        .valueChanges.subscribe((b: boolean) => {
          // close the snackbar if deselected
          if (!b) {
            this.snackBar.close();
          } else {
            const msg =
              'Your workspace will not be persistent. You will lose all ' +
              'data in it, if your notebook is terminated for any reason.';
            this.snackBar.open(msg, SnackType.Warning, 0);
          }
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.snackBar.close();
  }
}
