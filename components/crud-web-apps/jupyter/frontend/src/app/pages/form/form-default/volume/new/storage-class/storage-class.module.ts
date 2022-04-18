import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageClassComponent } from './storage-class.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [StorageClassComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [StorageClassComponent],
})
export class StorageClassModule {}
