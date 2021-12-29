import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorStateMatcher } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FormDefaultModule } from './form-default/form-default.module';
import { FormComponent } from './form.component';
import { FormRokComponent } from './form-rok/form-rok.component';

import {
  FormModule as KfFormModule,
  ImmediateErrorStateMatcher,
} from 'kubeflow';
import { FormRokModule } from './form-rok/form-rok.module';

@NgModule({
  declarations: [FormComponent],
  imports: [CommonModule, FormDefaultModule, FormRokModule],
  providers: [
    { provide: ErrorStateMatcher, useClass: ImmediateErrorStateMatcher },
  ],
})
export class FormModule {}
