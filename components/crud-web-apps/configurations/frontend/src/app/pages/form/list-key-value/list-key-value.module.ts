import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListKeyValueComponent } from './list-key-value.component';

import { MatIconModule } from '@angular/material/icon';

import { FormModule } from 'kubeflow';

@NgModule({
  declarations: [ListKeyValueComponent],
  imports: [CommonModule, FormModule, MatIconModule],
  exports: [ListKeyValueComponent],
})
export class ListKeyValueModule {}
