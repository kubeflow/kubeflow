import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IndexDefaultComponent2 } from './index-default2.component';
import { KubeflowModule } from 'kubeflow';
import {MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [IndexDefaultComponent2],
  imports: [CommonModule, KubeflowModule, MatDialogModule, FormsModule, MatFormFieldModule],
  exports: [IndexDefaultComponent2],
})
export class IndexDefaultModule2 {}
