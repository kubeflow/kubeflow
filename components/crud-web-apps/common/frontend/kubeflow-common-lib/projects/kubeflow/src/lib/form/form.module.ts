import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSpinner,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTooltipModule,
} from '@angular/material';

import { FormSectionComponent } from './section/section.component';

import { NameNamespaceInputsComponent } from './name-namespace-inputs/name-namespace-inputs.component';
import { NameInputComponent } from './name-namespace-inputs/name-input/name-input.component';
import { IconModule } from '../icon/icon.module';
import { PositiveNumberInputComponent } from './positive-number-input/positive-number-input.component';
import { RokUrlInputComponent } from './rok-url-input/rok-url-input.component';

@NgModule({
  declarations: [
    FormSectionComponent,
    NameNamespaceInputsComponent,
    NameInputComponent,
    PositiveNumberInputComponent,
    RokUrlInputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    IconModule,
  ],
  exports: [
    FormSectionComponent,
    NameNamespaceInputsComponent,
    NameInputComponent,
    PositiveNumberInputComponent,
    RokUrlInputComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTooltipModule,
  ],
})
export class FormModule {}
