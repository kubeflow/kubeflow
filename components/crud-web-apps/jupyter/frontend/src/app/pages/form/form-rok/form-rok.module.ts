import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormModule as KfFormModule,
  TitleActionsToolbarModule,
} from 'kubeflow';
import { FormRokComponent } from './form-rok.component';
import { FormAdvancedOptionsModule } from '../form-new/form-advanced-options/form-advanced-options.module';
import { FormAffinityTolerationsModule } from '../form-new/form-affinity-tolerations/form-affinity-tolerations.module';
import { FormCpuRamModule } from '../form-new/form-cpu-ram/form-cpu-ram.module';
import { FormConfigurationsModule } from '../form-new/form-configurations/form-configurations.module';
import { FormDataVolumesModule } from '../form-new/form-data-volumes/form-data-volumes.module';
import { FormGpusModule } from '../form-new/form-gpus/form-gpus.module';
import { FormImageModule } from '../form-new/form-image/form-image.module';
import { FormNameModule } from '../form-new/form-name/form-name.module';
import { FormWorkspaceVolumeModule } from '../form-new/form-workspace-volume/form-workspace-volume.module';
import { RokFormConfigurationsModule } from './rok-form-configurations/rok-form-configurations.module';
import { RokJupyterLabSelectorModule } from './rok-jupyter-lab-selector/rok-jupyter-lab-selector.module';

@NgModule({
  declarations: [FormRokComponent],
  imports: [
    CommonModule,
    KfFormModule,
    TitleActionsToolbarModule,
    FormAdvancedOptionsModule,
    FormAffinityTolerationsModule,
    FormConfigurationsModule,
    FormCpuRamModule,
    FormDataVolumesModule,
    FormGpusModule,
    FormImageModule,
    FormNameModule,
    FormWorkspaceVolumeModule,
    RokFormConfigurationsModule,
    RokJupyterLabSelectorModule,
  ],
  exports: [FormRokComponent],
})
export class FormRokModule {}
