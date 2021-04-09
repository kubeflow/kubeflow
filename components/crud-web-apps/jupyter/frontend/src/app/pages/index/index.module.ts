import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IndexRokModule } from './index-rok/index-rok.module';
import { IndexDefaultModule } from './index-default/index-default.module';
import { IndexComponent } from './index.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    IndexRokModule,
    IndexDefaultModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class IndexModule {}
