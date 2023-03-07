import { Injectable } from '@angular/core';
import {
  ConfirmDialogService,
  DIALOG_RESP,
  SnackBarConfig,
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
            const config: SnackBarConfig = {
              data: {
                msg: `${object}: Delete request was sent.`,
                snackType: SnackType.Info,
              },
              duration: 5000,
            };
            this.snackBar.open(config);
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
        const config: SnackBarConfig = {
          data: {
            msg: $localize`Starting Notebook server '${name}'...`,
            snackType: SnackType.Info,
          },
        };
        this.snackBar.open(config);

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
            const config: SnackBarConfig = {
              data: {
                msg: $localize`Stopping Notebook server '${name}'...`,
                snackType: SnackType.Info,
              },
            };
            this.snackBar.open(config);
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
