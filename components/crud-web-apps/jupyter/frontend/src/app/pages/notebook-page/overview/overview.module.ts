import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import {
  KubeflowModule,
  ConditionsTableModule,
  DetailsListModule,
  HeadingSubheadingRowModule,
  ContentListItemModule,
  VariablesGroupsTableModule,
} from 'kubeflow';
import { ConfigurationsModule } from './configurations/configurations.module';

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    DetailsListModule,
    ConditionsTableModule,
    HeadingSubheadingRowModule,
    KubeflowModule,
    ContentListItemModule,
    VariablesGroupsTableModule,
    ConfigurationsModule,
  ],
  exports: [OverviewComponent],
})
export class OverviewModule {}
