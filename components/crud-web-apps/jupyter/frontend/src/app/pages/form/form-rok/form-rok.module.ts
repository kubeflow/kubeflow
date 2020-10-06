import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';

import { FormModule as KfFormModule } from 'kubeflow';
import { FormNameComponent } from '../form-default/form-name/form-name.component';
import { FormImageComponent } from '../form-default/form-image/form-image.component';
import { FormCpuRamComponent } from '../form-default/form-cpu-ram/form-cpu-ram.component';
import { FormWorkspaceVolumeComponent } from '../form-default/form-workspace-volume/form-workspace-volume.component';
import { FormDataVolumesComponent } from '../form-default/form-data-volumes/form-data-volumes.component';
import { VolumeComponent } from '../form-default/volume/volume.component';
import { FormGpusComponent } from '../form-default/form-gpus/form-gpus.component';
import { FormAdvancedOptionsComponent } from '../form-default/form-advanced-options/form-advanced-options.component';
import { FormConfigurationsComponent } from '../form-default/form-configurations/form-configurations.component';
import { FormRokComponent } from './form-rok.component';
import { FormDefaultModule } from '../form-default/form-default.module';

import { RokJupyterLabSelectorComponent } from './rok-jupyter-lab-selector/rok-jupyter-lab-selector.component';
import { RokVolumeComponent } from './rok-volume/rok-volume.component';
import { RokFormWorkspaceVolumeComponent } from './rok-form-workspace-volume/rok-form-workspace-volume.component';
import { RokFormDataVolumesComponent } from './rok-form-data-volumes/rok-form-data-volumes.component';
import { RokFormConfigurationsComponent } from './rok-form-configurations/rok-form-configurations.component';

@NgModule({
  declarations: [
    FormRokComponent,
    RokJupyterLabSelectorComponent,
    RokVolumeComponent,
    RokFormWorkspaceVolumeComponent,
    RokFormDataVolumesComponent,
    RokFormConfigurationsComponent,
  ],
  imports: [
    CommonModule,
    KfFormModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatIconModule,
    FormDefaultModule,
  ],
  exports: [FormRokComponent],
})
export class FormRokModule {}
