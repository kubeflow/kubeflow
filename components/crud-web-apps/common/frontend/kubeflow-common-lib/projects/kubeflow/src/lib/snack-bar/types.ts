import { MatSnackBarConfig } from '@angular/material/snack-bar';

export enum SnackType {
  Success = 'SUCCESS',
  Error = 'ERROR',
  Warning = 'WARNING',
  Info = 'INFO',
}

export interface SnackBarConfig extends MatSnackBarConfig {
  data: {
    msg: string;
    snackType?: SnackType;
  };
}
