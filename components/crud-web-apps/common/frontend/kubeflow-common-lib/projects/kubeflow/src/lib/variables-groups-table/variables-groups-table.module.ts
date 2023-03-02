import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariablesGroupsTableComponent } from './variables-groups-table.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [VariablesGroupsTableComponent],
  imports: [CommonModule, MatChipsModule],
  exports: [VariablesGroupsTableComponent],
})
export class VariablesGroupsTableModule {}
