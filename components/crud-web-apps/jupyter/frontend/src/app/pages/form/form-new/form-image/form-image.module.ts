import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModule as KfFormModule } from 'kubeflow';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormImageComponent } from './form-image.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [FormImageComponent],
  imports: [
    CommonModule,
    KfFormModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatIconModule,
    MatCheckboxModule,
    MatExpansionModule,
  ],
  exports: [FormImageComponent],
})
export class FormImageModule {}
