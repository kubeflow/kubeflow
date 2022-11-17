import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceTableModule } from '../resource-table/resource-table.module';
import { ConditionsTableComponent } from './conditions-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ConditionsTableComponent],
  imports: [CommonModule, ResourceTableModule, BrowserAnimationsModule],
  exports: [ConditionsTableComponent],
})
export class ConditionsTableModule {}
