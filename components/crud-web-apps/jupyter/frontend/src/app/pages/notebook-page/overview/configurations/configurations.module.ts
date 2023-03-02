import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationsComponent } from './configurations.component';
import { MatDialogModule } from '@angular/material/dialog';
import {
  ContentListItemModule,
  DetailsListModule,
  HeadingSubheadingRowModule,
  EditorModule,
} from 'kubeflow';
import { ConfigurationInfoDialogComponent } from './configuration-info-dialog/configuration-info-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ConfigurationsComponent, ConfigurationInfoDialogComponent],
  imports: [
    CommonModule,
    DetailsListModule,
    ContentListItemModule,
    EditorModule,
    MatDialogModule,
    HeadingSubheadingRowModule,
    MatButtonModule,
  ],
  exports: [ConfigurationsComponent],
})
export class ConfigurationsModule {}
