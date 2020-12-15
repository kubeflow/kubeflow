import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PanelComponent],
  imports: [CommonModule, MatIconModule],
  exports: [PanelComponent],
})
export class PanelModule {}
