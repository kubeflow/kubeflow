import { Injectable } from '@angular/core';
import {
  ConfirmDialogService,
  DIALOG_RESP,
  SnackBarService,
  SnackType,
} from 'kubeflow';
import { getDeleteDialogConfig, getStopDialogConfig } from './config';
import { JWABackendService } from './backend.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  constructor(
    public backend: JWABackendService,
    public confirmDialog: ConfirmDialogService,
    private snackBar: SnackBarService,
  ) {}

  deleteNotebook(namespace: string, name: string): Observable<string> {
    return new Observable(subscriber => {
      const deleteDialogConfig = getDeleteDialogConfig(name);

      const ref = this.confirmDialog.open(name, deleteDialogConfig);
      const delSub = ref.componentInstance.applying$.subscribe(applying => {
        if (!applying) {
          return;
        }

        // Close the open dialog only if the DELETE request succeeded
        this.backend.deleteNotebook(namespace, name).subscribe({
          next: _ => {
            ref.close(DIALOG_RESP.ACCEPT);
            const object = `${namespace}/${name}`;
            this.snackBar.open(
              `${object}: Delete request was sent.`,
              SnackType.Info,
              5000,
            );
          },
          error: err => {
            const errorMsg = `Error ${err}`;
            deleteDialogConfig.error = errorMsg;
            ref.componentInstance.applying$.next(false);
            subscriber.next(`fail`);
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

  connectToNotebook(namespace: string, name: string): void {
    // Open new tab to work on the Notebook
    window.open(`/notebook/${namespace}/${name}/`);
  }

  startNotebook(namespace: string, name: string): Observable<string> {
    return new Observable(subscriber => {
      this.backend.startNotebook(namespace, name).subscribe(response => {
        this.snackBar.open(
          $localize`Starting Notebook server '${name}'...`,
          SnackType.Info,
          3000,
        );

        subscriber.next(response);
        subscriber.complete();
      });
    });
  }

  stopNotebook(namespace: string, name: string): Observable<string> {
    return new Observable(subscriber => {
      const stopDialogConfig = getStopDialogConfig(name);
      const ref = this.confirmDialog.open(name, stopDialogConfig);
      const stopSub = ref.componentInstance.applying$.subscribe(applying => {
        if (!applying) {
          return;
        }

        // Close the open dialog only if the request succeeded
        this.backend.stopNotebook(namespace, name).subscribe({
          next: _ => {
            ref.close(DIALOG_RESP.ACCEPT);

            this.snackBar.open(
              $localize`Stopping Notebook server '${name}'...`,
              SnackType.Info,
              3000,
            );
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
}
