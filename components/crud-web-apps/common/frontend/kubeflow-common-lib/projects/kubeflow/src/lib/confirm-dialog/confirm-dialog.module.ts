import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './dialog/dialog.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  entryComponents: [ConfirmDialogComponent],
})
export class ConfirmDialogModule {}
