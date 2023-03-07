import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentListItemComponent } from './content-list-item.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [ContentListItemComponent],
  imports: [CommonModule, MatDividerModule, MatTooltipModule],
  exports: [ContentListItemComponent],
})
export class ContentListItemModule {}
