import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModule as KfFormModule } from 'kubeflow';
import { FormDataVolumesComponent } from './form-data-volumes.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { VolumeModule } from '../volume/volume.module';

@NgModule({
  declarations: [FormDataVolumesComponent],
  imports: [
    CommonModule,
    KfFormModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonToggleModule,
    VolumeModule,
  ],
  exports: [FormDataVolumesComponent],
})
export class FormDataVolumesModule {}
