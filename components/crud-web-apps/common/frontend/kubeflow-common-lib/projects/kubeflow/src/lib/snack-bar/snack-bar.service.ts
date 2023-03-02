import { Inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { SnackBarComponent } from './component/snack-bar.component';
import { SnackBarConfig, SnackType } from './types';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private dialogState = { shown: false, msg: '' };

  constructor(
    private snackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DEFAULT_OPTIONS)
    private prvDefaultConfig: MatSnackBarConfig,
  ) {}

  public close() {
    this.dialogState.shown = false;
    this.snackBar.dismiss();
  }

  public open(config: SnackBarConfig) {
    if (this.dialogState.shown && this.dialogState.msg === config.data.msg) {
      return;
    }

    this.dialogState.shown = true;
    this.dialogState.msg = config.data.msg;

    const newConfig: SnackBarConfig = {
      ...this.prvDefaultConfig,
      ...config,
    };

    this.snackBar
      .openFromComponent(SnackBarComponent, newConfig)
      .afterDismissed()
      .subscribe(() => {
        this.dialogState.shown = false;
        this.dialogState.msg = '';
      });
  }
}
