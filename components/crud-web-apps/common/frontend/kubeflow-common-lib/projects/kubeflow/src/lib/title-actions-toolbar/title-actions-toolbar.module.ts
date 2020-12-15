import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleActionsToolbarComponent } from './title-actions-toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [TitleActionsToolbarComponent],
  imports: [CommonModule, MatIconModule, MatDividerModule, MatButtonModule],
  exports: [TitleActionsToolbarComponent],
})
export class TitleActionsToolbarModule {}
