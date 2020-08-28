import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceTableComponent } from './resource-table.component';
import {
  MatTableModule,
  MatDividerModule,
  MatCardModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
} from '@angular/material';
import { StatusComponent } from './status/status.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActionComponent } from './action/action.component';
import { MatChipsModule } from '@angular/material/chips';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActionButtonComponent } from './action-button/action-button.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatMenuModule,
    FontAwesomeModule,
    MatIconModule,
    IconModule,
  ],
  declarations: [
    ResourceTableComponent,
    StatusComponent,
    ActionComponent,
    ActionButtonComponent,
  ],
  exports: [ResourceTableComponent],
})
export class ResourceTableModule {}
