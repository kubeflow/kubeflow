import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YamlComponent } from './yaml.component';
import { MatTabsModule } from '@angular/material/tabs';
import { EditorModule, KubeflowModule } from 'kubeflow';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [YamlComponent],
  imports: [
    CommonModule,
    EditorModule,
    MatTabsModule,
    KubeflowModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  exports: [YamlComponent],
})
export class YamlModule {}
