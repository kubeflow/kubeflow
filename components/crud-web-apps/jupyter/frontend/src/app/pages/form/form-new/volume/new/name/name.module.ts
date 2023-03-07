import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolumeNameComponent } from './name.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormModule } from 'kubeflow';

@NgModule({
  declarations: [VolumeNameComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    FormModule,
  ],
  exports: [VolumeNameComponent],
})
export class VolumeNameModule {}
