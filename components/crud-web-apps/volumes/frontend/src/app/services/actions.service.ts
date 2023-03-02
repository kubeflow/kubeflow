import { Injectable } from '@angular/core';
import {
  ConfirmDialogService,
  DialogConfig,
  DIALOG_RESP,
  SnackBarConfig,
  SnackBarService,
  SnackType,
} from 'kubeflow';
import { Observable } from 'rxjs';
import { VWABackendService } from './backend.service';

@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  constructor(
    public confirmDialog: ConfirmDialogService,
    public backend: VWABackendService,
    public snackBar: SnackBarService,
  ) {}

  deleteVolume(name: string, namespace: string): Observable<string> {
    return new Observable(subscriber => {
      const deleteDialogConfig = this.getDeleteDialogConfig(name);

      const ref = this.confirmDialog.open(name, deleteDialogConfig);
      const delSub = ref.componentInstance.applying$.subscribe(applying => {
        if (!applying) {
          return;
        }

        // Close the open dialog only if the DELETE request succeeded
        this.backend.deletePVC(namespace, name).subscribe({
          next: _ => {
            ref.close(DIALOG_RESP.ACCEPT);

            const object = `${namespace}/${name}`;
            const config: SnackBarConfig = {
              data: {
                msg: `${object}: Delete request was sent.`,
                snackType: SnackType.Info,
              },
            };
            this.snackBar.open(config);
          },
          error: err => {
            const errorMsg = `Error ${err}`;
            deleteDialogConfig.error = errorMsg;
            ref.componentInstance.applying$.next(false);
            subscriber.next('fail');
          },
        });

        // DELETE request has succeeded
        ref.afterClosed().subscribe(result => {
          delSub.unsubscribe();
          subscriber.next(result);
          subscriber.complete();
        });
      });
    });
  }

  private getDeleteDialogConfig(name: string): DialogConfig {
    return {
      title: $localize`Are you sure you want to delete this volume? ${name}`,
      message: $localize`Warning: All data in this volume will be lost.`,
      accept: $localize`DELETE`,
      confirmColor: 'warn',
      cancel: $localize`CANCEL`,
      error: '',
      applying: $localize`DELETING`,
      width: '600px',
    };
  }
}
