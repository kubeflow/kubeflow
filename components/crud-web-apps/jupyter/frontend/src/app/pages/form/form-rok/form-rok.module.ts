import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';

import {
  FormModule as KfFormModule,
  TitleActionsToolbarModule,
} from 'kubeflow';
import { FormRokComponent } from './form-rok.component';
import { FormDefaultModule } from '../form-default/form-default.module';

import { RokJupyterLabSelectorComponent } from './rok-jupyter-lab-selector/rok-jupyter-lab-selector.component';
import { RokFormConfigurationsComponent } from './rok-form-configurations/rok-form-configurations.component';

@NgModule({
  declarations: [
    FormRokComponent,
    RokJupyterLabSelectorComponent,
    RokFormConfigurationsComponent,
  ],
  imports: [
    CommonModule,
    KfFormModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatIconModule,
    TitleActionsToolbarModule,
    FormDefaultModule,
    TitleActionsToolbarModule,
  ],
  exports: [FormRokComponent],
})
export class FormRokModule {}
