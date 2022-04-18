import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRokComponent } from './index-rok.component';
import { IndexDefaultComponent } from '../index-default/index-default.component';
import { KubeflowModule } from 'kubeflow';
import { IndexDefaultModule } from '../index-default/index-default.module';

@NgModule({
  declarations: [IndexRokComponent],
  imports: [CommonModule, KubeflowModule, IndexDefaultModule],
  exports: [IndexRokComponent],
})
export class IndexRokModule {}
