import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexDefaultComponent } from './index-default.component';
import { KubeflowModule } from 'kubeflow';
import { ServerTypeComponent } from './server-type/server-type.component';

import { FormsModule } from '@angular/forms';
import {MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [IndexDefaultComponent, ServerTypeComponent],
  imports: [CommonModule, KubeflowModule, MatDialogModule, FormsModule, MatFormFieldModule],
  exports: [IndexDefaultComponent, ServerTypeComponent],
})
export class IndexDefaultModule {}
