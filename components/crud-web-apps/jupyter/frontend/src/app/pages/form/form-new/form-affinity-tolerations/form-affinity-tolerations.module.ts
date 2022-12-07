import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModule as KfFormModule } from 'kubeflow';
import { FormAffinityTolerationsComponent } from './form-affinity-tolerations.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [FormAffinityTolerationsComponent],
  imports: [
    CommonModule,
    KfFormModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [FormAffinityTolerationsComponent],
})
export class FormAffinityTolerationsModule {}
