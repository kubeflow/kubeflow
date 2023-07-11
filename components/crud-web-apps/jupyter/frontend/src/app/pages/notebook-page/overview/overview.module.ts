import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { MatChipsModule } from '@angular/material/chips';
import {
  KubeflowModule,
  ConditionsTableModule,
  DetailsListModule,
  HeadingSubheadingRowModule,
  ContentListItemModule,
  VariablesGroupsTableModule,
  UrlsModule,
} from 'kubeflow';
import { ConfigurationsModule } from './configurations/configurations.module';
import { VolumesComponent } from './volumes/volumes.component';

@NgModule({
  declarations: [OverviewComponent, VolumesComponent],
  imports: [
    CommonModule,
    DetailsListModule,
    ConditionsTableModule,
    HeadingSubheadingRowModule,
    KubeflowModule,
    ContentListItemModule,
    VariablesGroupsTableModule,
    ConfigurationsModule,
    UrlsModule,
    MatChipsModule,
  ],
  exports: [OverviewComponent],
})
export class OverviewModule {}
