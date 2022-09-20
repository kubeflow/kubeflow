import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolumeSizeComponent } from './size.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [VolumeSizeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [VolumeSizeComponent],
})
export class VolumeSizeModule {}
