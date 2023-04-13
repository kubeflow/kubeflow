import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { StatusInfoComponent } from './status-info.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [StatusInfoComponent],
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule, IconModule],
  exports: [StatusInfoComponent],
})
export class StatusInfoModule {}
