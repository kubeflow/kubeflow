import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleActionsToolbarComponent } from './title-actions-toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [TitleActionsToolbarComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  exports: [TitleActionsToolbarComponent],
})
export class TitleActionsToolbarModule {}
