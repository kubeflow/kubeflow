import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceTableModule } from '../resource-table/resource-table.module';
import { ConditionsTableComponent } from './conditions-table.component';

@NgModule({
  declarations: [ConditionsTableComponent],
  imports: [CommonModule, ResourceTableModule],
  exports: [ConditionsTableComponent],
})
export class ConditionsTableModule {}
