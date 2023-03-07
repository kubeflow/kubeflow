import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkGroupsTableComponent } from './link-groups-table.component';
import { UrlsModule } from 'kubeflow';

@NgModule({
  declarations: [LinkGroupsTableComponent],
  imports: [CommonModule, UrlsModule],
  exports: [LinkGroupsTableComponent],
})
export class LinkGroupsTableModule {}
