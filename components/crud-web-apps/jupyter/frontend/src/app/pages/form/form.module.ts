import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormComponent } from './form.component';
import {
  FormModule as KfFormModule,
  ImmediateErrorStateMatcher,
} from 'kubeflow';
import { FormRokModule } from './form-rok/form-rok.module';
import { FormNewModule } from './form-new/form-new.module';

@NgModule({
  declarations: [FormComponent],
  imports: [CommonModule, FormNewModule, FormRokModule],
  providers: [
    { provide: ErrorStateMatcher, useClass: ImmediateErrorStateMatcher },
  ],
})
export class FormModule {}
