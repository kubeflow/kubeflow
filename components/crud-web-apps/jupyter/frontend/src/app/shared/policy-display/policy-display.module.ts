import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material modules
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PolicyDisplayComponent } from './policy-display.component';

@NgModule({
  declarations: [PolicyDisplayComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
  ],
  exports: [PolicyDisplayComponent],
})
export class PolicyDisplayModule {}
