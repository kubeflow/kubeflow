import defaultMoment, { LongDateFormatKey } from "moment";
import { IUtils, DateIOFormats, Unit } from "@date-io/core/IUtils";

interface Opts {
  locale?: string;
  instance?: typeof defaultMoment;
  formats?: Partial<DateIOFormats>;
}

type Moment = defaultMoment.Moment;
const defaultFormats: DateIOFormats = {
  normalDateWithWeekday: "ddd, MMM D",
  normalDate: "D MMMM",
  shortDate: "MMM D",
  monthAndDate: "MMMM D",
  dayOfMonth: "D",
  year: "YYYY",
  month: "MMMM",
  monthShort: "MMM",
  monthAndYear: "MMMM YYYY",
  weekday: "dddd",
  weekdayShort: "ddd",
  minutes: "mm",
  hours12h: "hh",
  hours24h: "HH",
  seconds: "ss",
  fullTime: "LT",
  fullTime12h: "hh:mm A",
  fullTime24h: "HH:mm",
  fullDate: "ll",
  fullDateWithWeekday: "dddd, LL",
  fullDateTime: "lll",
  fullDateTime12h: "ll hh:mm A",
  fullDateTime24h: "ll HH:mm",
  keyboardDate: "L",
  keyboardDateTime: "L LT",
  keyboardDateTime12h: "L hh:mm A",
  keyboardDateTime24h: "L HH:mm",
};

export default class MomentUtils implements IUtils<defaultMoment.Moment> {
  public moment: typeof defaultMoment;
  public lib = "moment";
  public locale?: string;
  public formats: DateIOFormats;

  constructor({ locale, formats, instance }: Opts = {}) {
    this.moment = instance || defaultMoment;
    this.locale = locale;

    this.formats = Object.assign({}, defaultFormats, formats);
  }

  public is12HourCycleInCurrentLocale = () => {
    return /A|a/.test(this.moment().localeData().longDateFormat("LT"));
  };

  public getFormatHelperText = (format: string) => {
    // @see https://github.com/moment/moment/blob/develop/src/lib/format/format.js#L6
    const localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})|./g;
    return format
      .match(localFormattingTokens)
      .map((token) => {
        const firstCharacter = token[0];
        if (firstCharacter === "L" || firstCharacter === ";") {
          return this.moment.localeData().longDateFormat(token as LongDateFormatKey);
        }

        return token;
      })
      .join("")
      .replace(/a/gi, "(a|p)m")
      .toLocaleLowerCase();
  };

  public getCurrentLocaleCode = () => {
    return this.locale || this.moment.locale();
  };

  public parseISO = (isoString: string) => {
    return this.moment(isoString, true);
  };

  public toISO = (value: Moment) => {
    return value.toISOString();
  };

  public parse = (value: string, format: string) => {
    if (value === "") {
      return null;
    }

    if (this.locale) {
      return this.moment(value, format, this.locale, true);
    }

    return this.moment(value, format, true);
  };

  public date = (value?: any) => {
    if (value === null) {
      return null;
    }

    const moment = this.moment(value);
    moment.locale(this.locale);

    return moment;
  };

  public toJsDate = (value: Moment) => {
    return value.toDate();
  };

  public isValid = (value: any) => {
    return this.moment(value).isValid();
  };

  public isNull = (date: Moment) => {
    return date === null;
  };

  public getDiff = (date: Moment, comparing: Moment | string, unit?: Unit) => {
    return date.diff(comparing, unit);
  };

  public isAfter = (date: Moment, value: Moment) => {
    return date.isAfter(value);
  };

  public isBefore = (date: Moment, value: Moment) => {
    return date.isBefore(value);
  };

  public isAfterDay = (date: Moment, value: Moment) => {
    return date.isAfter(value, "day");
  };

  public isBeforeDay = (date: Moment, value: Moment) => {
    return date.isBefore(value, "day");
  };

  public isBeforeYear = (date: Moment, value: Moment) => {
    return date.isBefore(value, "year");
  };

  public isAfterYear = (date: Moment, value: Moment) => {
    return date.isAfter(value, "year");
  };

  public startOfDay = (date: Moment) => {
    return date.clone().startOf("day");
  };

  public endOfDay = (date: Moment) => {
    return date.clone().endOf("day");
  };

  public format = (date: Moment, formatKey: keyof DateIOFormats) => {
    return this.formatByString(date, this.formats[formatKey]);
  };

  public formatByString = (date: Moment, formatString: string) => {
    const clonedDate = date.clone();
    clonedDate.locale(this.locale);
    return clonedDate.format(formatString);
  };

  public formatNumber = (numberToFormat: string) => {
    return numberToFormat;
  };

  public getHours = (date: Moment) => {
    return date.get("hours");
  };

  public addSeconds = (date: Moment, count: number) => {
    return count < 0
      ? date.clone().subtract(Math.abs(count), "seconds")
      : date.clone().add(count, "seconds");
  };

  public addMinutes = (date: Moment, count: number) => {
    return count < 0
      ? date.clone().subtract(Math.abs(count), "minutes")
      : date.clone().add(count, "minutes");
  };

  public addHours = (date: Moment, count: number) => {
    return count < 0
      ? date.clone().subtract(Math.abs(count), "hours")
      : date.clone().add(count, "hours");
  };

  public addDays = (date: Moment, count: number) => {
    return count < 0
      ? date.clone().subtract(Math.abs(count), "days")
      : date.clone().add(count, "days");
  };

  public addWeeks = (date: Moment, count: number) => {
    return count < 0
      ? date.clone().subtract(Math.abs(count), "weeks")
      : date.clone().add(count, "weeks");
  };

  public addMonths = (date: Moment, count: number) => {
    return count < 0
      ? date.clone().subtract(Math.abs(count), "months")
      : date.clone().add(count, "months");
  };

  public setHours = (date: Moment, count: number) => {
    return date.clone().hours(count);
  };

  public getMinutes = (date: Moment) => {
    return date.get("minutes");
  };

  public setMinutes = (date: Moment, count: number) => {
    return date.clone().minutes(count);
  };

  public getSeconds = (date: Moment) => {
    return date.get("seconds");
  };

  public setSeconds = (date: Moment, count: number) => {
    return date.clone().seconds(count);
  };

  public getMonth = (date: Moment) => {
    return date.get("month");
  };

  public getDaysInMonth = (date: Moment) => {
    return date.daysInMonth();
  };

  public isSameDay = (date: Moment, comparing: Moment) => {
    return date.isSame(comparing, "day");
  };

  public isSameMonth = (date: Moment, comparing: Moment) => {
    return date.isSame(comparing, "month");
  };

  public isSameYear = (date: Moment, comparing: Moment) => {
    return date.isSame(comparing, "year");
  };

  public isSameHour = (date: Moment, comparing: Moment) => {
    return date.isSame(comparing, "hour");
  };

  public setMonth = (date: Moment, count: number) => {
    return date.clone().month(count);
  };

  public getMeridiemText = (ampm: "am" | "pm") => {
    if (this.is12HourCycleInCurrentLocale()) {
      // AM/PM translation only possible in those who have 12 hour cycle in locale.
      return this.moment.localeData().meridiem(ampm === "am" ? 0 : 13, 0, false);
    }

    return ampm === "am" ? "AM" : "PM"; // fallback for de, ru, ...etc
  };

  public startOfMonth = (date: Moment) => {
    return date.clone().startOf("month");
  };

  public endOfMonth = (date: Moment) => {
    return date.clone().endOf("month");
  };

  public startOfWeek = (date: Moment) => {
    return date.clone().startOf("week");
  };

  public endOfWeek = (date: Moment) => {
    return date.clone().endOf("week");
  };

  public getNextMonth = (date: Moment) => {
    return date.clone().add(1, "month");
  };

  public getPreviousMonth = (date: Moment) => {
    return date.clone().subtract(1, "month");
  };

  public getMonthArray = (date: Moment) => {
    const firstMonth = date.clone().startOf("year");
    const monthArray = [firstMonth];

    while (monthArray.length < 12) {
      const prevMonth = monthArray[monthArray.length - 1];
      monthArray.push(this.getNextMonth(prevMonth));
    }

    return monthArray;
  };

  public getYear = (date: Moment) => {
    return date.get("year");
  };

  public setYear = (date: Moment, year: number) => {
    return date.clone().set("year", year);
  };

  public mergeDateAndTime = (date: Moment, time: Moment) => {
    return date.hour(time.hour()).minute(time.minute()).second(time.second());
  };

  public getWeekdays = () => {
    return this.moment.weekdaysShort(true);
  };

  public isEqual = (value: any, comparing: any) => {
    if (value === null && comparing === null) {
      return true;
    }

    return this.moment(value).isSame(comparing);
  };

  public getWeekArray = (date: Moment) => {
    const start = date.clone().startOf("month").startOf("week");
    const end = date.clone().endOf("month").endOf("week");

    let count = 0;
    let current = start;
    const nestedWeeks: Moment[][] = [];

    while (current.isBefore(end)) {
      const weekNumber = Math.floor(count / 7);
      nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
      nestedWeeks[weekNumber].push(current);

      current = current.clone().add(1, "day");
      count += 1;
    }

    return nestedWeeks;
  };

  public getYearRange = (start: Moment, end: Moment) => {
    const startDate = this.moment(start).startOf("year");
    const endDate = this.moment(end).endOf("year");
    const years: Moment[] = [];

    let current = startDate;
    while (current.isBefore(endDate)) {
      years.push(current);
      current = current.clone().add(1, "year");
    }

    return years;
  };

  public isWithinRange = (date: Moment, [start, end]: [Moment, Moment]) => {
    return date.isBetween(start, end, null, "[]");
  };
}
