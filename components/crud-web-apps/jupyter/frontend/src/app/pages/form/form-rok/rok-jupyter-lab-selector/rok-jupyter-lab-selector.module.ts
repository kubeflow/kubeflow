import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModule as KfFormModule } from 'kubeflow';
import { RokJupyterLabSelectorComponent } from './rok-jupyter-lab-selector.component';

@NgModule({
  declarations: [RokJupyterLabSelectorComponent],
  imports: [CommonModule, KfFormModule],
  exports: [RokJupyterLabSelectorComponent],
})
export class RokJupyterLabSelectorModule {}
