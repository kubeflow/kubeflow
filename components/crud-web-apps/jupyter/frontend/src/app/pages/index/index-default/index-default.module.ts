import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexDefaultComponent } from './index-default.component';
import { KubeflowModule } from 'kubeflow';

@NgModule({
  declarations: [IndexDefaultComponent],
  imports: [CommonModule, KubeflowModule],
  exports: [IndexDefaultComponent],
})
export class IndexDefaultModule {}
