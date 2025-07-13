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
import { PolicyDisplayModule } from '../../../shared/policy-display/policy-display.module';
import { GPUPolicyDisplayModule } from '../../../shared/gpu-policy-display/gpu-policy-display.module';

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
    PolicyDisplayModule,
    GPUPolicyDisplayModule,
  ],
  exports: [OverviewComponent],
})
export class OverviewModule {}
