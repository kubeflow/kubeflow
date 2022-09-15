import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { IconModule, KubeflowModule, UrlsModule } from 'kubeflow';

@NgModule({
  declarations: [DeleteButtonComponent],
  imports: [
    CommonModule,
    MatTooltipModule,
    IconModule,
    KubeflowModule,
    UrlsModule,
  ],
  exports: [DeleteButtonComponent],
})
export class ColumnsModule {}
