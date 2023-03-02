import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsComponent } from './logs.component';
import {
  HeadingSubheadingRowModule,
  KubeflowModule,
  LogsViewerModule,
} from 'kubeflow';

@NgModule({
  declarations: [LogsComponent],
  imports: [
    CommonModule,
    KubeflowModule,
    HeadingSubheadingRowModule,
    LogsViewerModule,
  ],
  exports: [LogsComponent],
})
export class LogsModule {}
