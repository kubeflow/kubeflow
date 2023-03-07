import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolumeDetailsPageComponent } from './volume-details-page.component';
import { KubeflowModule } from 'kubeflow';
import { MatTabsModule } from '@angular/material/tabs';
import { OverviewModule } from './overview/overview.module';
import { EventsModule } from './events/events.module';
import { YamlModule } from './yaml/yaml.module';

@NgModule({
  declarations: [VolumeDetailsPageComponent],
  imports: [
    CommonModule,
    KubeflowModule,
    MatTabsModule,
    OverviewModule,
    EventsModule,
    YamlModule,
  ],
})
export class VolumeDetailsPageModule {}
