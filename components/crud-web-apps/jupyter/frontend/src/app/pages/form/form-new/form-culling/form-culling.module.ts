import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

// Kubeflow common modules
import { KubeflowModule } from 'kubeflow';

// Shared modules
import { PolicyDisplayModule } from '../../../../shared/policy-display/policy-display.module';

import { FormCullingComponent } from './form-culling.component';

@NgModule({
  declarations: [FormCullingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule,
    KubeflowModule,
    PolicyDisplayModule,
  ],
  exports: [FormCullingComponent],
})
export class FormCullingModule {}
