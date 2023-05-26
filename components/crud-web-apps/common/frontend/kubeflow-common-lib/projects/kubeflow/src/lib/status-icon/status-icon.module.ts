import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { StatusIconComponent } from './status-icon.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [StatusIconComponent],
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule, IconModule],
  exports: [StatusIconComponent],
})
export class StatusIconModule {}
