import addDays from "date-fns/addDays";
import addSeconds from "date-fns/addSeconds";
import addMinutes from "date-fns/addMinutes";
import addHours from "date-fns/addHours";
import addWeeks from "date-fns/addWeeks";
import addMonths from "date-fns/addMonths";
import addYears from "date-fns/addYears";
import differenceInYears from "date-fns/differenceInYears";
import differenceInQuarters from "date-fns/differenceInQuarters";
import differenceInMonths from "date-fns/differenceInMonths";
import differenceInWeeks from "date-fns/differenceInWeeks";
import differenceInDays from "date-fns/differenceInDays";
import differenceInHours from "date-fns/differenceInHours";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInSeconds from "date-fns/differenceInSeconds";
import differenceInMilliseconds from "date-fns/differenceInMilliseconds";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import endOfDay from "date-fns/endOfDay";
import endOfWeek from "date-fns/endOfWeek";
import endOfYear from "date-fns/endOfYear";
import format from "date-fns/format";
import getHours from "date-fns/getHours";
import getSeconds from "date-fns/getSeconds";
import getYear from "date-fns/getYear";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isEqual from "date-fns/isEqual";
import isSameDay from "date-fns/isSameDay";
import isSameYear from "date-fns/isSameYear";
import isSameMonth from "date-fns/isSameMonth";
import isSameHour from "date-fns/isSameHour";
import isValid from "date-fns/isValid";
import dateFnsParse from "date-fns/parse";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setMonth from "date-fns/setMonth";
import getDay from "date-fns/getDay";
import getDaysInMonth from "date-fns/getDaysInMonth";
import setSeconds from "date-fns/setSeconds";
import setYear from "date-fns/setYear";
import startOfDay from "date-fns/startOfDay";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import startOfWeek from "date-fns/startOfWeek";
import startOfYear from "date-fns/startOfYear";
import parseISO from "date-fns/parseISO";
import formatISO from "date-fns/formatISO";
import { IUtils, DateIOFormats, Unit } from "@date-io/core/IUtils";
import isWithinInterval from "date-fns/isWithinInterval";
import longFormatters from "date-fns/_lib/format/longFormatters";
import defaultLocale from "date-fns/locale/en-US";

type Locale = typeof defaultLocale;

const defaultFormats: DateIOFormats = {
  dayOfMonth: "d",
  fullDate: "PP",
  fullDateWithWeekday: "PPPP",
  fullDateTime: "PP p",
  fullDateTime12h: "PP hh:mm aaa",
  fullDateTime24h: "PP HH:mm",
  fullTime: "p",
  fullTime12h: "hh:mm aaa",
  fullTime24h: "HH:mm",
  hours12h: "hh",
  hours24h: "HH",
  keyboardDate: "P",
  keyboardDateTime: "P p",
  keyboardDateTime12h: "P hh:mm aaa",
  keyboardDateTime24h: "P HH:mm",
  minutes: "mm",
  month: "LLLL",
  monthAndDate: "MMMM d",
  monthAndYear: "LLLL yyyy",
  monthShort: "MMM",
  weekday: "EEEE",
  weekdayShort: "EEE",
  normalDate: "d MMMM",
  normalDateWithWeekday: "EEE, MMM d",
  seconds: "ss",
  shortDate: "MMM d",
  year: "yyyy",
};

export default class DateFnsUtils implements IUtils<Date> {
  public lib = "date-fns";
  public locale?: Locale;
  public formats: DateIOFormats;

  constructor({
    locale,
    formats,
  }: { formats?: Partial<DateIOFormats>; locale?: Locale } = {}) {
    this.locale = locale;
    this.formats = Object.assign({}, defaultFormats, formats);
  }

  // Note: date-fns input types are more lenient than this adapter, so we need to expose our more
  // strict signature and delegate to the more lenient signature. Otherwise, we have downstream type errors upon usage.
  public is12HourCycleInCurrentLocale = () => {
    if (this.locale) {
      return /a/.test(this.locale.formatLong.time());
    }

    // By default date-fns is using en-US locale with am/pm enabled
    return true;
  };

  public getFormatHelperText = (format: string) => {
    // @see https://github.com/date-fns/date-fns/blob/master/src/format/index.js#L31
    const longFormatRegexp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
    const locale = this.locale || defaultLocale;
    return format
      .match(longFormatRegexp)
      .map((token) => {
        const firstCharacter = token[0];
        if (firstCharacter === "p" || firstCharacter === "P") {
          const longFormatter = longFormatters[firstCharacter];
          return longFormatter(token, locale.formatLong, {});
        }
        return token;
      })
      .join("")
      .replace(/(aaa|aa|a)/g, "(a|p)m")
      .toLocaleLowerCase();
  };

  public parseISO = (isoString: string) => {
    return parseISO(isoString);
  };

  public toISO = (value: Date) => {
    return formatISO(value, { format: "extended" });
  };

  public getCurrentLocaleCode = () => {
    return this.locale?.code || "en-US";
  };

  public addSeconds = (value: Date, count: number) => {
    return addSeconds(value, count);
  };

  public addMinutes = (value: Date, count: number) => {
    return addMinutes(value, count);
  };

  public addHours = (value: Date, count: number) => {
    return addHours(value, count);
  };

  public addDays = (value: Date, count: number) => {
    return addDays(value, count);
  };

  public addWeeks = (value: Date, count: number) => {
    return addWeeks(value, count);
  };

  public addMonths = (value: Date, count: number) => {
    return addMonths(value, count);
  };

  public isValid = (value: any) => {
    return isValid(this.date(value));
  };

  public getDiff = (value: Date, comparing: Date | string, unit?: Unit) => {
    switch (unit) {
      case "years":
        return differenceInYears(value, this.date(comparing));
      case "quarters":
        return differenceInQuarters(value, this.date(comparing));
      case "months":
        return differenceInMonths(value, this.date(comparing));
      case "weeks":
        return differenceInWeeks(value, this.date(comparing));
      case "days":
        return differenceInDays(value, this.date(comparing));
      case "hours":
        return differenceInHours(value, this.date(comparing));
      case "minutes":
        return differenceInMinutes(value, this.date(comparing));
      case "seconds":
        return differenceInSeconds(value, this.date(comparing));
      default: {
        return differenceInMilliseconds(value, this.date(comparing));
      }
    }
  };

  public isAfter = (value: Date, comparing: Date) => {
    return isAfter(value, comparing);
  };

  public isBefore = (value: Date, comparing: Date) => {
    return isBefore(value, comparing);
  };

  public startOfDay = (value: Date) => {
    return startOfDay(value);
  };

  public endOfDay = (value: Date) => {
    return endOfDay(value);
  };

  public getHours = (value: Date) => {
    return getHours(value);
  };

  public setHours = (value: Date, count: number) => {
    return setHours(value, count);
  };

  public setMinutes = (value: Date, count: number) => {
    return setMinutes(value, count);
  };

  public getSeconds = (value: Date) => {
    return getSeconds(value);
  };

  public setSeconds = (value: Date, count: number) => {
    return setSeconds(value, count);
  };

  public isSameDay = (value: Date, comparing: Date) => {
    return isSameDay(value, comparing);
  };

  public isSameMonth = (value: Date, comparing: Date) => {
    return isSameMonth(value, comparing);
  };

  public isSameYear = (value: Date, comparing: Date) => {
    return isSameYear(value, comparing);
  };

  public isSameHour = (value: Date, comparing: Date) => {
    return isSameHour(value, comparing);
  };

  public startOfMonth = (value: Date) => {
    return startOfMonth(value);
  };

  public endOfMonth = (value: Date) => {
    return endOfMonth(value);
  };

  public startOfWeek = (value: Date) => {
    return startOfWeek(value, { locale: this.locale });
  };

  public endOfWeek = (value: Date) => {
    return endOfWeek(value, { locale: this.locale });
  };

  public getYear = (value: Date) => {
    return getYear(value);
  };

  public setYear = (value: Date, count: number) => {
    return setYear(value, count);
  };

  public date = (value?: any) => {
    if (typeof value === "undefined") {
      return new Date();
    }

    if (value === null) {
      return null;
    }

    return new Date(value);
  };

  public toJsDate = (value: Date) => {
    return value;
  };

  public parse = (value: string, formatString: string) => {
    if (value === "") {
      return null;
    }

    return dateFnsParse(value, formatString, new Date(), { locale: this.locale });
  };

  public format = (date: Date, formatKey: keyof DateIOFormats) => {
    return this.formatByString(date, this.formats[formatKey]);
  };

  public formatByString = (date: Date, formatString: string) => {
    return format(date, formatString, { locale: this.locale });
  };

  public isEqual = (date: any, comparing: any) => {
    if (date === null && comparing === null) {
      return true;
    }

    return isEqual(date, comparing);
  };

  public isNull = (date: Date) => {
    return date === null;
  };

  public isAfterDay = (date: Date, value: Date) => {
    return isAfter(date, endOfDay(value));
  };

  public isBeforeDay = (date: Date, value: Date) => {
    return isBefore(date, startOfDay(value));
  };

  public isBeforeYear = (date: Date, value: Date) => {
    return isBefore(date, startOfYear(value));
  };

  public isAfterYear = (date: Date, value: Date) => {
    return isAfter(date, endOfYear(value));
  };

  public isWithinRange = (date: Date, [start, end]: [Date, Date]) => {
    return isWithinInterval(date, { start, end });
  };

  public formatNumber = (numberToFormat: string) => {
    return numberToFormat;
  };

  public getMinutes = (date: Date) => {
    return date.getMinutes();
  };

  public getMonth = (date: Date) => {
    return date.getMonth();
  };

  public getDaysInMonth = (date: Date) => {
    return getDaysInMonth(date);
  };

  public setMonth = (date: Date, count: number) => {
    return setMonth(date, count);
  };

  public getMeridiemText = (ampm: "am" | "pm") => {
    return ampm === "am" ? "AM" : "PM";
  };

  public getNextMonth = (date: Date) => {
    return addMonths(date, 1);
  };

  public getPreviousMonth = (date: Date) => {
    return addMonths(date, -1);
  };

  public getMonthArray = (date: Date) => {
    const firstMonth = startOfYear(date);
    const monthArray = [firstMonth];

    while (monthArray.length < 12) {
      const prevMonth = monthArray[monthArray.length - 1];
      monthArray.push(this.getNextMonth(prevMonth));
    }

    return monthArray;
  };

  public mergeDateAndTime = (date: Date, time: Date) => {
    return this.setSeconds(
      this.setMinutes(this.setHours(date, this.getHours(time)), this.getMinutes(time)),
      this.getSeconds(time)
    );
  };

  public getWeekdays = () => {
    const now = new Date();
    return eachDayOfInterval({
      start: startOfWeek(now, { locale: this.locale }),
      end: endOfWeek(now, { locale: this.locale }),
    }).map((day) => this.formatByString(day, "EEEEEE"));
  };

  public getWeekArray = (date: Date) => {
    const start = startOfWeek(startOfMonth(date), { locale: this.locale });
    const end = endOfWeek(endOfMonth(date), { locale: this.locale });

    let count = 0;
    let current = start;
    const nestedWeeks: Date[][] = [];
    let lastDay = null;
    while (isBefore(current, end)) {
      const weekNumber = Math.floor(count / 7);
      nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
      const day = getDay(current);
      if (lastDay !== day) {
        lastDay = day;
        nestedWeeks[weekNumber].push(current);
        count += 1;
      }
      current = addDays(current, 1);
    }
    return nestedWeeks;
  };

  public getYearRange = (start: Date, end: Date) => {
    const startDate = startOfYear(start);
    const endDate = endOfYear(end);
    const years: Date[] = [];

    let current = startDate;
    while (isBefore(current, endDate)) {
      years.push(current);
      current = addYears(current, 1);
    }

    return years;
  };
}
