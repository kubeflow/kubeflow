import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexDefaultComponent } from './index-default.component';
import {
  ResourceTableModule,
  NamespaceSelectModule,
  ConfirmDialogModule,
} from 'kubeflow';

@NgModule({
  declarations: [IndexDefaultComponent],
  imports: [
    CommonModule,
    ResourceTableModule,
    NamespaceSelectModule,
    ConfirmDialogModule,
  ],
  exports: [IndexDefaultComponent],
})
export class IndexDefaultModule {}
