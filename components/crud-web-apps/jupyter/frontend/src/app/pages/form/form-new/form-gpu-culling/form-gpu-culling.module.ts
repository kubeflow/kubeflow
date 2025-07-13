import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FormModule as KfFormModule } from 'kubeflow';

// Shared modules
import { GPUPolicyDisplayModule } from '../../../../shared/gpu-policy-display/gpu-policy-display.module';

import { FormGPUCullingComponent } from './form-gpu-culling.component';

@NgModule({
  declarations: [FormGPUCullingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    KfFormModule,
    GPUPolicyDisplayModule,
  ],
  exports: [FormGPUCullingComponent],
})
export class FormGPUCullingModule {}
