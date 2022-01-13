import { DateTime, Settings, Info } from "luxon";
import { IUtils, DateIOFormats, Unit } from "@date-io/core/IUtils";

const defaultFormats: DateIOFormats = {
  dayOfMonth: "d",
  fullDate: "DD",
  fullDateWithWeekday: "DDDD",
  fullDateTime: "ff",
  fullDateTime12h: "DD, hh:mm a",
  fullDateTime24h: "DD, T",
  fullTime: "t",
  fullTime12h: "hh:mm a",
  fullTime24h: "HH:mm",
  hours12h: "hh",
  hours24h: "HH",
  keyboardDate: "D",
  keyboardDateTime: "D t",
  keyboardDateTime12h: "D hh:mm a",
  keyboardDateTime24h: "D T",
  minutes: "mm",
  seconds: "ss",
  month: "LLLL",
  monthAndDate: "MMMM d",
  monthAndYear: "LLLL yyyy",
  monthShort: "MMM",
  weekday: "cccc",
  weekdayShort: "ccc",
  normalDate: "d MMMM",
  normalDateWithWeekday: "EEE, MMM d",
  shortDate: "MMM d",
  year: "yyyy",
};

export default class LuxonUtils implements IUtils<DateTime> {
  public lib = "luxon";
  public locale: string;
  public formats: DateIOFormats;

  constructor({
    locale,
    formats,
  }: { formats?: Partial<DateIOFormats>; locale?: string } = {}) {
    this.locale = locale || "en-US";
    this.formats = Object.assign({}, defaultFormats, formats);
  }

  public date = (value?: any) => {
    if (typeof value === "undefined") {
      return DateTime.local();
    }

    if (value === null) {
      return null;
    }

    if (typeof value === "string") {
      return DateTime.fromJSDate(new Date(value), { locale: this.locale });
    }

    if (value instanceof DateTime) {
      return value;
    }

    return DateTime.fromJSDate(value, { locale: this.locale });
  };

  public toJsDate = (value: DateTime) => {
    return value.toJSDate();
  };

  public parseISO = (isoString: string) => {
    return DateTime.fromISO(isoString);
  };

  public toISO = (value: DateTime) => {
    return value.toISO({ format: "extended" });
  };

  public parse = (value: string, formatString: string) => {
    if (value === "") {
      return null;
    }

    return DateTime.fromFormat(value, formatString, { locale: this.locale });
  };

  /* istanbul ignore next */
  public is12HourCycleInCurrentLocale = () => {
    if (typeof Intl === "undefined" || typeof Intl.DateTimeFormat === "undefined") {
      return true; // Luxon defaults to en-US if Intl not found
    }

    return Boolean(
      new Intl.DateTimeFormat(this.locale, { hour: "numeric" })?.resolvedOptions()?.hour12
    );
  };

  public getFormatHelperText = (format: string) => {
    // Unfortunately there is no way for luxon to retrieve readable formats from localized format
    return "";
  };

  /* istanbul ignore next */
  public getCurrentLocaleCode = () => {
    return this.locale || Settings.defaultLocale;
  };

  public addSeconds = (date: DateTime, count: number) => {
    return count < 0
      ? date.minus({ seconds: Math.abs(count) })
      : date.plus({ seconds: count });
  };

  public addMinutes = (date: DateTime, count: number) => {
    return count < 0
      ? date.minus({ minutes: Math.abs(count) })
      : date.plus({ minutes: count });
  };

  public addHours = (date: DateTime, count: number) => {
    return count < 0
      ? date.minus({ hours: Math.abs(count) })
      : date.plus({ hours: count });
  };

  public addDays = (date: DateTime, count: number) => {
    return count < 0 ? date.minus({ days: Math.abs(count) }) : date.plus({ days: count });
  };

  public addWeeks = (date: DateTime, count: number) => {
    return count < 0
      ? date.minus({ weeks: Math.abs(count) })
      : date.plus({ weeks: count });
  };

  public addMonths = (date: DateTime, count: number) => {
    return count < 0
      ? date.minus({ months: Math.abs(count) })
      : date.plus({ months: count });
  };

  public isValid = (value: any) => {
    if (value instanceof DateTime) {
      return value.isValid;
    }

    if (value === null) {
      return false;
    }

    return this.date(value).isValid;
  };

  public isEqual = (value: any, comparing: any) => {
    if (value === null && comparing === null) {
      return true;
    }

    // make sure that null will not be passed to this.date
    if (value === null || comparing === null) {
      return false;
    }

    return this.date(value).equals(this.date(comparing));
  };

  public isSameDay = (date: DateTime, comparing: DateTime) => {
    return date.hasSame(comparing, "day");
  };

  public isSameMonth = (date: DateTime, comparing: DateTime) => {
    return date.hasSame(comparing, "month");
  };

  public isSameYear = (date: DateTime, comparing: DateTime) => {
    return date.hasSame(comparing, "year");
  };

  public isSameHour = (date: DateTime, comparing: DateTime) => {
    return date.hasSame(comparing, "hour");
  };

  public isAfter = (value: DateTime, comparing: DateTime) => {
    return value > comparing;
  };

  public isBefore = (value: DateTime, comparing: DateTime) => {
    return value < comparing;
  };

  public isBeforeDay = (value: DateTime, comparing: DateTime) => {
    const diff = value.diff(comparing.startOf("day"), "days").toObject();
    return diff.days! < 0;
  };

  public isAfterDay = (value: DateTime, comparing: DateTime) => {
    const diff = value.diff(comparing.endOf("day"), "days").toObject();
    return diff.days! > 0;
  };

  public isBeforeYear = (value: DateTime, comparing: DateTime) => {
    const diff = value.diff(comparing.startOf("year"), "years").toObject();
    return diff.years! < 0;
  };

  public isAfterYear = (value: DateTime, comparing: DateTime) => {
    const diff = value.diff(comparing.endOf("year"), "years").toObject();
    return diff.years! > 0;
  };

  public getDiff = (value: DateTime, comparing: DateTime | string, unit?: Unit) => {
    if (typeof comparing === "string") {
      comparing = DateTime.fromJSDate(new Date(comparing));
    }

    if (unit) {
      return Math.floor(value.diff(comparing).as(unit));
    }
    return value.diff(comparing).as("millisecond");
  };

  public startOfDay = (value: DateTime) => {
    return value.startOf("day");
  };

  public endOfDay = (value: DateTime) => {
    return value.endOf("day");
  };

  public format = (date: DateTime, formatKey: keyof DateIOFormats) => {
    return this.formatByString(date, this.formats[formatKey]);
  };

  public formatByString = (date: DateTime, format: string) => {
    return date.setLocale(this.locale).toFormat(format);
  };

  public formatNumber = (numberToFormat: string) => {
    return numberToFormat;
  };

  public getHours = (value: DateTime) => {
    return value.get("hour");
  };

  public setHours = (value: DateTime, count: number) => {
    return value.set({ hour: count });
  };

  public getMinutes = (value: DateTime) => {
    return value.get("minute");
  };

  public setMinutes = (value: DateTime, count: number) => {
    return value.set({ minute: count });
  };

  public getSeconds = (value: DateTime) => {
    return value.get("second");
  };

  public setSeconds = (value: DateTime, count: number) => {
    return value.set({ second: count });
  };

  public getMonth = (value: DateTime) => {
    // See https://github.com/moment/luxon/blob/master/docs/moment.md#major-functional-differences
    return value.get("month") - 1;
  };

  public getDaysInMonth = (value: DateTime) => {
    return value.daysInMonth;
  };

  public setMonth = (value: DateTime, count: number) => {
    return value.set({ month: count + 1 });
  };

  public getYear = (value: DateTime) => {
    return value.get("year");
  };

  public setYear = (value: DateTime, year: number) => {
    return value.set({ year });
  };

  public mergeDateAndTime = (date: DateTime, time: DateTime) => {
    return date.set({
      second: time.second,
      hour: time.hour,
      minute: time.minute,
    });
  };

  public startOfMonth = (value: DateTime) => {
    return value.startOf("month");
  };

  public endOfMonth = (value: DateTime) => {
    return value.endOf("month");
  };

  public startOfWeek = (value: DateTime) => {
    return value.startOf("week");
  };

  public endOfWeek = (value: DateTime) => {
    return value.endOf("week");
  };

  public getNextMonth = (value: DateTime) => {
    return value.plus({ months: 1 });
  };

  public getPreviousMonth = (value: DateTime) => {
    return value.minus({ months: 1 });
  };

  public getMonthArray = (date: DateTime) => {
    const firstMonth = this.date(date).startOf("year");
    const monthArray = [firstMonth];

    while (monthArray.length < 12) {
      const prevMonth = monthArray[monthArray.length - 1];
      monthArray.push(this.getNextMonth(prevMonth));
    }

    return monthArray;
  };

  public getWeekdays = () => {
    return Info.weekdaysFormat("narrow", { locale: this.locale });
  };

  public getWeekArray = (date: DateTime) => {
    const { days } = date
      .endOf("month")
      .endOf("week")
      .diff(date.startOf("month").startOf("week"), "days")
      .toObject();

    const weeks: DateTime[][] = [];
    new Array<number>(Math.round(days!))
      .fill(0)
      .map((_, i) => i)
      .map((day) => date.startOf("month").startOf("week").plus({ days: day }))
      .forEach((v, i) => {
        if (i === 0 || (i % 7 === 0 && i > 6)) {
          weeks.push([v]);
          return;
        }

        weeks[weeks.length - 1].push(v);
      });

    return weeks;
  };

  public getYearRange = (start: DateTime, end: DateTime) => {
    const startDate = this.date(start).startOf("year");
    const endDate = this.date(end).endOf("year");

    let current = startDate;
    const years: DateTime[] = [];

    while (current < endDate) {
      years.push(current);
      current = current.plus({ year: 1 });
    }

    return years;
  };

  public getMeridiemText = (ampm: "am" | "pm") => {
    return Info.meridiems({ locale: this.locale }).find(
      (v) => v.toLowerCase() === ampm.toLowerCase()
    )!;
  };

  public isNull = (date: DateTime | null) => {
    return date === null;
  };

  public isWithinRange = (date: DateTime, [start, end]: [DateTime, DateTime]) => {
    return (
      date.equals(start) ||
      date.equals(end) ||
      (this.isAfter(date, start) && this.isBefore(date, end))
    );
  };
}
