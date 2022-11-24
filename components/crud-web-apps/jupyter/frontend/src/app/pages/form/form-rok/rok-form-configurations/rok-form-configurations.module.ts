import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModule as KfFormModule } from 'kubeflow';
import { RokFormConfigurationsComponent } from './rok-form-configurations.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [RokFormConfigurationsComponent],
  imports: [CommonModule, KfFormModule, MatFormFieldModule, MatSelectModule],
  exports: [RokFormConfigurationsComponent],
})
export class RokFormConfigurationsModule {}
