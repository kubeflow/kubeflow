import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ExistingVolumeModule } from './existing/existing-volume.module';
import { VolumeMountModule } from './mount/mount.module';
import { NewVolumeModule } from './new/new.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    ExistingVolumeModule,
    VolumeMountModule,
    NewVolumeModule,
  ],
  exports: [ExistingVolumeModule, VolumeMountModule, NewVolumeModule],
})
export class VolumeModule {}
