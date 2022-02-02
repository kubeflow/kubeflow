import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimeComponent } from './date-time.component';
import { PopoverModule } from '../popover/popover.module';
import { ToDatePipe } from './to-date.pipe';
import { DetailsListModule } from '../details-list/details-list.module';

@NgModule({
  declarations: [DateTimeComponent, ToDatePipe],
  imports: [CommonModule, PopoverModule, DetailsListModule],
  exports: [DateTimeComponent, ToDatePipe],
})
export class DateTimeModule {}
