import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRokComponent } from './index-rok.component';
import { IndexDefaultComponent } from '../index-default/index-default.component';
import {
  ResourceTableModule,
  NamespaceSelectModule,
  ConfirmDialogModule,
} from 'kubeflow';
import { IndexDefaultModule } from '../index-default/index-default.module';

@NgModule({
  declarations: [IndexRokComponent],
  imports: [
    CommonModule,
    ResourceTableModule,
    NamespaceSelectModule,
    ConfirmDialogModule,
    IndexDefaultModule,
  ],
  exports: [IndexRokComponent],
})
export class IndexRokModule {}
