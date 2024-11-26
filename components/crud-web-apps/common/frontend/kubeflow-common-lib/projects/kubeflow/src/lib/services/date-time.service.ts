import { Injectable } from '@angular/core';
import pkg from 'date-fns';
import memoize from 'lodash/memoize.js';

const {
  parse,
  isEqual,
  setHours,
  setMinutes,
  setSeconds,
  distanceInWords,
  differenceInSeconds,
} = pkg;
export const defaultDateOptions: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};
export const defaultTimeOptions: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false,
};
const intlOptions = Object.assign({}, defaultDateOptions, defaultTimeOptions);

function dateTimeFormat(obj: {
  date: Date | number;
  options?: Intl.DateTimeFormatOptions;
  locale?: string;
}) {
  return new Intl.DateTimeFormat(obj.locale, obj.options).format(obj.date);
}

const memoizedDateTimeFormat = memoize(dateTimeFormat);

@Injectable({ providedIn: 'root' })
export class DateTimeService {
  constructor() {}

  public parse(date: string | number | Date): Date {
    // https://date-fns.org/v1.29.0/docs/parse
    return parse(date);
  }

  public isEqual(date1: Date, date2: Date): boolean {
    // This helper should be used whenever testing if two date objects
    // represent the same point in time is required. Note that equality
    // operators perform an identity check on Date objects, and thus do not
    // work as expected.
    return isEqual(date1, date2);
  }

  public intlFormat(
    date: Date | number | string,
    options?: Intl.DateTimeFormatOptions,
    locale?: string,
  ): string {
    if (date == null) {
      return '-';
    }
    if (typeof date === 'string') {
      date = new Date(date);
    }
    if (!options) {
      options = intlOptions;
    }
    if (!locale) {
      locale = navigator.language || 'en-US';
    }
    return memoizedDateTimeFormat({ locale, options, date });
  }

  public merge(date: string | Date, time: string): Date {
    // FIXME: Return an invalid date object or raise an error if the input
    // is invalid.
    let dateTime: Date = parse(date);
    const timeArr = time.split(':');
    let hours = parseInt(timeArr[0], 10);
    let minutes = parseInt(timeArr[1], 10);
    let seconds = parseInt(timeArr[2], 10);
    if (this.isNotValidNumber(hours) || !this.isValidHours(hours)) {
      hours = 0;
    }
    if (this.isNotValidNumber(minutes) || !this.isValidMinutes(minutes)) {
      minutes = 0;
    }
    if (this.isNotValidNumber(seconds) || !this.isValidSeconds(seconds)) {
      seconds = 0;
    }
    dateTime = setHours(dateTime, hours);
    dateTime = setMinutes(dateTime, minutes);
    dateTime = setSeconds(dateTime, seconds);
    return dateTime;
  }

  distanceInWords(
    dateToCompare: string | Date,
    date: string | Date = new Date(),
  ): string {
    return distanceInWords(date, dateToCompare, {
      includeSeconds: false,
      addSuffix: true,
    })
      .replace('about', '')
      .replace('almost', '');
  }

  private isNotValidNumber(unit: number): boolean {
    return Number.isNaN(unit);
  }

  private isValidHours(hours: number): boolean {
    return this.between(hours, 0, 24);
  }

  private isValidMinutes(minutes: number): boolean {
    return this.between(minutes, 0, 60);
  }

  private isValidSeconds(seconds: number): boolean {
    return this.between(seconds, 0, 60);
  }

  private between(x: number, min: number, max: number): boolean {
    return x >= min && x <= max;
  }

  differenceInSeconds(d1: Date, d2: Date): number {
    return differenceInSeconds(d1, d2);
  }
}
