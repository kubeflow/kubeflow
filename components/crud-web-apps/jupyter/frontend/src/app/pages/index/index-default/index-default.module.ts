import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexDefaultComponent } from './index-default.component';
import { KubeflowModule } from 'kubeflow';
import { ServerTypeComponent } from './server-type/server-type.component';

@NgModule({
  declarations: [IndexDefaultComponent, ServerTypeComponent],
  imports: [CommonModule, KubeflowModule, CommonModule],
  exports: [IndexDefaultComponent, ServerTypeComponent],
})
export class IndexDefaultModule {}
