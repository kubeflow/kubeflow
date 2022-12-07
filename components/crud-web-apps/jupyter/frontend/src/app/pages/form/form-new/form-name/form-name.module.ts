import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModule as KfFormModule } from 'kubeflow';
import { FormNameComponent } from './form-name.component';

@NgModule({
  declarations: [FormNameComponent],
  imports: [CommonModule, KfFormModule],
  exports: [FormNameComponent],
})
export class FormNameModule {}
