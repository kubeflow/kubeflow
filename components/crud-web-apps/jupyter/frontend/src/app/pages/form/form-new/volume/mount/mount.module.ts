import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolumeMountComponent } from './mount.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [VolumeMountComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [VolumeMountComponent],
})
export class VolumeMountModule {}
