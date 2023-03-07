import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExistingVolumeComponent } from './existing-volume.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ExistingPvcModule } from './pvc/pvc.module';
import { EditorModule } from 'kubeflow';

@NgModule({
  declarations: [ExistingVolumeComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    ExistingPvcModule,
    EditorModule,
  ],
  exports: [ExistingVolumeComponent],
})
export class ExistingVolumeModule {}
