import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { GPUPolicyDisplayComponent } from './gpu-policy-display.component';

@NgModule({
  declarations: [GPUPolicyDisplayComponent],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [GPUPolicyDisplayComponent],
})
export class GPUPolicyDisplayModule {}
