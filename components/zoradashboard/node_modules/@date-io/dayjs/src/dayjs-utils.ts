import defaultDayjs, { QUnitType } from "dayjs";
import customParseFormatPlugin from "dayjs/plugin/customParseFormat";
import localizedFormatPlugin from "dayjs/plugin/localizedFormat";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { IUtils, DateIOFormats, Unit } from "@date-io/core/IUtils";

defaultDayjs.extend(customParseFormatPlugin);
defaultDayjs.extend(localizedFormatPlugin);
defaultDayjs.extend(isBetweenPlugin);

interface Opts {
  locale?: string;
  /** Make sure that your dayjs instance extends customParseFormat and advancedFormat */
  instance?: typeof defaultDayjs;
  formats?: Partial<DateIOFormats>;
}

type Dayjs = defaultDayjs.Dayjs;
type Constructor<TDate extends Dayjs> = (
  ...args: Parameters<typeof defaultDayjs>
) => TDate;

const withLocale = <TDate extends Dayjs>(
  dayjs: any,
  locale?: string
): Constructor<TDate> => (!locale ? dayjs : (...args) => dayjs(...args).locale(locale));

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

export default class DayjsUtils<TDate extends Dayjs = Dayjs> implements IUtils<TDate> {
  public rawDayJsInstance: typeof defaultDayjs;
  public lib = "dayjs";
  public dayjs: Constructor<TDate>;
  public locale?: string;
  public formats: DateIOFormats;

  constructor({ locale, formats, instance }: Opts = {}) {
    this.rawDayJsInstance = instance || defaultDayjs;
    this.dayjs = withLocale(this.rawDayJsInstance, locale);
    this.locale = locale;

    this.formats = Object.assign({}, defaultFormats, formats);
  }

  public is12HourCycleInCurrentLocale = () => {
    /* istanbul ignore next */
    return /A|a/.test(this.rawDayJsInstance.Ls[this.locale || "en"]?.formats?.LT);
  };

  public getCurrentLocaleCode = () => {
    return this.locale || "en";
  };

  public getFormatHelperText = (format: string) => {
    // @see https://github.com/iamkun/dayjs/blob/dev/src/plugin/localizedFormat/index.js
    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?)|./g;
    return format
      .match(localFormattingTokens)
      .map((token) => {
        var firstCharacter = token[0];
        if (firstCharacter === "L") {
          /* istanbul ignore next */
          return this.rawDayJsInstance.Ls[this.locale || "en"]?.formats[token] ?? token;
        }
        return token;
      })
      .join("")
      .replace(/a/gi, "(a|p)m")
      .toLocaleLowerCase();
  };

  public parseISO = (isoString: string) => {
    return this.dayjs(isoString);
  };

  public toISO = (value: Dayjs) => {
    return value.toISOString();
  };

  public parse = (value: any, format: string) => {
    if (value === "") {
      return null;
    }

    return this.dayjs(value, format, this.locale);
  };

  public date = (value?: any) => {
    if (value === null) {
      return null;
    }

    return this.dayjs(value);
  };

  public toJsDate = (value: Dayjs) => {
    return value.toDate();
  };

  public isValid = (value: any) => {
    return this.dayjs(value).isValid();
  };

  public isNull = (date: Dayjs) => {
    return date === null;
  };

  public getDiff = (date: TDate, comparing: TDate, units?: Unit) => {
    return date.diff(comparing, units as QUnitType);
  };

  public isAfter = (date: TDate, value: TDate) => {
    return date.isAfter(value);
  };

  public isBefore = (date: TDate, value: TDate) => {
    return date.isBefore(value);
  };

  public isAfterDay = (date: TDate, value: TDate) => {
    return date.isAfter(value, "day");
  };

  public isBeforeDay = (date: Dayjs, value: Dayjs) => {
    return date.isBefore(value, "day");
  };

  public isBeforeYear = (date: Dayjs, value: Dayjs) => {
    return date.isBefore(value, "year");
  };

  public isAfterYear = (date: Dayjs, value: Dayjs) => {
    return date.isAfter(value, "year");
  };

  public startOfDay = (date: TDate) => {
    return date.clone().startOf("day") as TDate;
  };

  public endOfDay = (date: TDate) => {
    return date.clone().endOf("day") as TDate;
  };

  public format = (date: Dayjs, formatKey: keyof DateIOFormats) => {
    return this.formatByString(date, this.formats[formatKey]);
  };

  public formatByString = (date: Dayjs, formatString: string) => {
    return this.dayjs(date).format(formatString);
  };

  public formatNumber = (numberToFormat: string) => {
    return numberToFormat;
  };

  public getHours = (date: Dayjs) => {
    return date.hour();
  };

  public addSeconds = (date: TDate, count: number) => {
    return count < 0
      ? (date.subtract(Math.abs(count), "second") as TDate)
      : (date.add(count, "second") as TDate);
  };

  public addMinutes = (date: Dayjs, count: number) => {
    return count < 0
      ? (date.subtract(Math.abs(count), "minute") as TDate)
      : (date.add(count, "minute") as TDate);
  };

  public addHours = (date: Dayjs, count: number) => {
    return count < 0
      ? (date.subtract(Math.abs(count), "hour") as TDate)
      : (date.add(count, "hour") as TDate);
  };

  public addDays = (date: Dayjs, count: number) => {
    return count < 0
      ? (date.subtract(Math.abs(count), "day") as TDate)
      : (date.add(count, "day") as TDate);
  };

  public addWeeks = (date: Dayjs, count: number) => {
    return count < 0
      ? (date.subtract(Math.abs(count), "week") as TDate)
      : (date.add(count, "week") as TDate);
  };

  public addMonths = (date: Dayjs, count: number) => {
    return count < 0
      ? (date.subtract(Math.abs(count), "month") as TDate)
      : (date.add(count, "month") as TDate);
  };

  public setMonth = (date: Dayjs, count: number) => {
    return date.set("month", count) as TDate;
  };

  public setHours = (date: Dayjs, count: number) => {
    return date.set("hour", count) as TDate;
  };

  public getMinutes = (date: Dayjs) => {
    return date.minute();
  };

  public setMinutes = (date: Dayjs, count: number) => {
    return date.clone().set("minute", count) as TDate;
  };

  public getSeconds = (date: Dayjs) => {
    return date.second();
  };

  public setSeconds = (date: Dayjs, count: number) => {
    return date.clone().set("second", count) as TDate;
  };

  public getMonth = (date: Dayjs) => {
    return date.month();
  };

  public getDaysInMonth = (date: Dayjs) => {
    return date.daysInMonth();
  };

  public isSameDay = (date: Dayjs, comparing: Dayjs) => {
    return date.isSame(comparing, "day");
  };

  public isSameMonth = (date: Dayjs, comparing: Dayjs) => {
    return date.isSame(comparing, "month");
  };

  public isSameYear = (date: Dayjs, comparing: Dayjs) => {
    return date.isSame(comparing, "year");
  };

  public isSameHour = (date: Dayjs, comparing: Dayjs) => {
    return date.isSame(comparing, "hour");
  };

  public getMeridiemText = (ampm: "am" | "pm") => {
    return ampm === "am" ? "AM" : "PM";
  };

  public startOfMonth = (date: Dayjs) => {
    return date.clone().startOf("month") as TDate;
  };

  public endOfMonth = (date: Dayjs) => {
    return date.clone().endOf("month") as TDate;
  };

  public startOfWeek = (date: Dayjs) => {
    return date.clone().startOf("week") as TDate;
  };

  public endOfWeek = (date: Dayjs) => {
    return date.clone().endOf("week") as TDate;
  };

  public getNextMonth = (date: Dayjs) => {
    return date.clone().add(1, "month") as TDate;
  };

  public getPreviousMonth = (date: Dayjs) => {
    return date.clone().subtract(1, "month") as TDate;
  };

  public getMonthArray = (date: TDate) => {
    const firstMonth = date.clone().startOf("year") as TDate;
    const monthArray = [firstMonth];

    while (monthArray.length < 12) {
      const prevMonth = monthArray[monthArray.length - 1];
      monthArray.push(this.getNextMonth(prevMonth));
    }

    return monthArray;
  };

  public getYear = (date: Dayjs) => {
    return date.year();
  };

  public setYear = (date: Dayjs, year: number) => {
    return date.clone().set("year", year) as TDate;
  };

  public mergeDateAndTime = (date: TDate, time: TDate) => {
    return date.hour(time.hour()).minute(time.minute()).second(time.second()) as TDate;
  };

  public getWeekdays = () => {
    const start = this.dayjs().startOf("week");
    return [0, 1, 2, 3, 4, 5, 6].map((diff) =>
      this.formatByString(start.add(diff, "day"), "dd")
    );
  };

  public isEqual = (value: any, comparing: any) => {
    if (value === null && comparing === null) {
      return true;
    }

    return this.dayjs(value).isSame(comparing);
  };

  public getWeekArray = (date: TDate) => {
    const start = this.dayjs(date).clone().startOf("month").startOf("week") as TDate;
    const end = this.dayjs(date).clone().endOf("month").endOf("week") as TDate;

    let count = 0;
    let current = start;
    const nestedWeeks: TDate[][] = [];

    while (current.isBefore(end)) {
      const weekNumber = Math.floor(count / 7);
      nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
      nestedWeeks[weekNumber].push(current);

      current = current.clone().add(1, "day") as TDate;
      count += 1;
    }

    return nestedWeeks;
  };

  public getYearRange = (start: TDate, end: TDate) => {
    const startDate = this.dayjs(start).startOf("year");
    const endDate = this.dayjs(end).endOf("year");
    const years: TDate[] = [];

    let current = startDate;
    while (current.isBefore(endDate)) {
      years.push(current as TDate);
      current = current.clone().add(1, "year");
    }

    return years;
  };

  public isWithinRange = (date: TDate, [start, end]: [TDate, TDate]) => {
    return date.isBetween(start, end, null, "[]");
  };
}
