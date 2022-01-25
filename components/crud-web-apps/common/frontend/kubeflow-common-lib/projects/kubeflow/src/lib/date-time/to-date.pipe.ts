import { Pipe, PipeTransform, Optional } from '@angular/core';
import {
  DateTimeService,
  defaultDateOptions,
  defaultTimeOptions,
} from '../services/date-time.service';

@Pipe({ name: 'libToDate' })
export class ToDatePipe implements PipeTransform {
  constructor(private dtService: DateTimeService) {}
  transform(value: string | Date, type?: string): string {
    if (!value) {
      return '';
    }

    try {
      const toDate = new Date(value as string);
      let options: Intl.DateTimeFormatOptions;

      if (type === 'date') {
        options = defaultDateOptions;
      } else if (type === 'time') {
        options = defaultTimeOptions;
      }
      return this.dtService.intlFormat(toDate, options);
    } catch (error) {
      console.error('ToDatePipe value:', value);
      console.error(error);
      return '';
    }
  }
}
