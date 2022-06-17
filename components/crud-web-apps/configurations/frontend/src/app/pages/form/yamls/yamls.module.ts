import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YamlsComponent } from './yamls.component';
import { AceEditorModule } from 'ng2-ace-editor';

@NgModule({
  declarations: [YamlsComponent],
  imports: [CommonModule, AceEditorModule],
  exports: [YamlsComponent],
})
export class YamlsModule {}
