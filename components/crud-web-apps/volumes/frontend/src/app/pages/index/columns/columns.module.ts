import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { OpenPVCViewerButtonComponent } from './open-pvcviewer-button/open-pvcviewer-button.component';
import { ClosePVCViewerButtonComponent } from './close-pvcviewer-button/close-pvcviewer-button.component';
import { IconModule, KubeflowModule, UrlsModule } from 'kubeflow';
import { UsedByComponent } from './used-by/used-by.component';

@NgModule({
  declarations: [
    OpenPVCViewerButtonComponent,
    ClosePVCViewerButtonComponent,
    DeleteButtonComponent,
    UsedByComponent,
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    IconModule,
    KubeflowModule,
    UrlsModule,
  ],
  exports: [
    OpenPVCViewerButtonComponent,
    ClosePVCViewerButtonComponent,
    DeleteButtonComponent,
    UsedByComponent,
  ],
})
export class ColumnsModule {}
