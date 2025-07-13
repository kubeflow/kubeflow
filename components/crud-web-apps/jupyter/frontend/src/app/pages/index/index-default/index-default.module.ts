import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

import { IndexDefaultComponent } from './index-default.component';
import { KubeflowModule } from 'kubeflow';
import { ServerTypeComponent } from './server-type/server-type.component';
import { GPUCullingStatusComponent } from './gpu-culling-status/gpu-culling-status.component';

@NgModule({
  declarations: [IndexDefaultComponent, ServerTypeComponent, GPUCullingStatusComponent],
  imports: [
    CommonModule,
    KubeflowModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatButtonModule
  ],
  exports: [IndexDefaultComponent, ServerTypeComponent, GPUCullingStatusComponent],
})
export class IndexDefaultModule {}
