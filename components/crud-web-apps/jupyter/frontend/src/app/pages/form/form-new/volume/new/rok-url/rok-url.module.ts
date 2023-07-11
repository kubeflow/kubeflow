import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RokUrlComponent } from './rok-url.component';
import { FormModule } from 'kubeflow';

@NgModule({
  declarations: [RokUrlComponent],
  imports: [CommonModule, FormModule],
  exports: [RokUrlComponent],
})
export class RokUrlModule {}
