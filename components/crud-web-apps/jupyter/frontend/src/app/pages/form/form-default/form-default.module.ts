import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';

import { FormDefaultComponent } from './form-default.component';
import { FormNameComponent } from './form-name/form-name.component';
import { FormImageComponent } from './form-image/form-image.component';
import { FormCpuRamComponent } from './form-cpu-ram/form-cpu-ram.component';
import { FormGpusComponent } from './form-gpus/form-gpus.component';
import { FormAdvancedOptionsComponent } from './form-advanced-options/form-advanced-options.component';

import {
  FormModule as KfFormModule,
  TitleActionsToolbarModule,
} from 'kubeflow';
import { FormWorkspaceVolumeComponent } from './form-workspace-volume/form-workspace-volume.component';
import { FormDataVolumesComponent } from './form-data-volumes/form-data-volumes.component';
import { FormConfigurationsComponent } from './form-configurations/form-configurations.component';
import { FormAffinityTolerationsComponent } from './form-affinity-tolerations/form-affinity-tolerations.component';
import { VolumeModule } from './volume/volume.module';

@NgModule({
  declarations: [
    FormDefaultComponent,
    FormNameComponent,
    FormImageComponent,
    FormCpuRamComponent,
    FormWorkspaceVolumeComponent,
    FormDataVolumesComponent,
    FormGpusComponent,
    FormAdvancedOptionsComponent,
    FormConfigurationsComponent,
    FormAffinityTolerationsComponent,
  ],
  imports: [
    CommonModule,
    KfFormModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonToggleModule,
    TitleActionsToolbarModule,
    VolumeModule,
  ],
  exports: [
    FormDefaultComponent,
    FormNameComponent,
    FormImageComponent,
    FormCpuRamComponent,
    FormWorkspaceVolumeComponent,
    FormDataVolumesComponent,
    FormGpusComponent,
    FormAdvancedOptionsComponent,
    FormConfigurationsComponent,
    FormAffinityTolerationsComponent,
  ],
})
export class FormDefaultModule {}
