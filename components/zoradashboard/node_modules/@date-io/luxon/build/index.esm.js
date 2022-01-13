import { DateTime, Settings, Info } from 'luxon';

var defaultFormats = {
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
var LuxonUtils = /** @class */ (function () {
    function LuxonUtils(_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, locale = _b.locale, formats = _b.formats;
        this.lib = "luxon";
        this.date = function (value) {
            if (typeof value === "undefined") {
                return DateTime.local();
            }
            if (value === null) {
                return null;
            }
            if (typeof value === "string") {
                return DateTime.fromJSDate(new Date(value), { locale: _this.locale });
            }
            if (value instanceof DateTime) {
                return value;
            }
            return DateTime.fromJSDate(value, { locale: _this.locale });
        };
        this.toJsDate = function (value) {
            return value.toJSDate();
        };
        this.parseISO = function (isoString) {
            return DateTime.fromISO(isoString);
        };
        this.toISO = function (value) {
            return value.toISO({ format: "extended" });
        };
        this.parse = function (value, formatString) {
            if (value === "") {
                return null;
            }
            return DateTime.fromFormat(value, formatString, { locale: _this.locale });
        };
        /* istanbul ignore next */
        this.is12HourCycleInCurrentLocale = function () {
            var _a, _b;
            if (typeof Intl === "undefined" || typeof Intl.DateTimeFormat === "undefined") {
                return true; // Luxon defaults to en-US if Intl not found
            }
            return Boolean((_b = (_a = new Intl.DateTimeFormat(_this.locale, { hour: "numeric" })) === null || _a === void 0 ? void 0 : _a.resolvedOptions()) === null || _b === void 0 ? void 0 : _b.hour12);
        };
        this.getFormatHelperText = function (format) {
            // Unfortunately there is no way for luxon to retrieve readable formats from localized format
            return "";
        };
        /* istanbul ignore next */
        this.getCurrentLocaleCode = function () {
            return _this.locale || Settings.defaultLocale;
        };
        this.addSeconds = function (date, count) {
            return count < 0
                ? date.minus({ seconds: Math.abs(count) })
                : date.plus({ seconds: count });
        };
        this.addMinutes = function (date, count) {
            return count < 0
                ? date.minus({ minutes: Math.abs(count) })
                : date.plus({ minutes: count });
        };
        this.addHours = function (date, count) {
            return count < 0
                ? date.minus({ hours: Math.abs(count) })
                : date.plus({ hours: count });
        };
        this.addDays = function (date, count) {
            return count < 0 ? date.minus({ days: Math.abs(count) }) : date.plus({ days: count });
        };
        this.addWeeks = function (date, count) {
            return count < 0
                ? date.minus({ weeks: Math.abs(count) })
                : date.plus({ weeks: count });
        };
        this.addMonths = function (date, count) {
            return count < 0
                ? date.minus({ months: Math.abs(count) })
                : date.plus({ months: count });
        };
        this.isValid = function (value) {
            if (value instanceof DateTime) {
                return value.isValid;
            }
            if (value === null) {
                return false;
            }
            return _this.date(value).isValid;
        };
        this.isEqual = function (value, comparing) {
            if (value === null && comparing === null) {
                return true;
            }
            // make sure that null will not be passed to this.date
            if (value === null || comparing === null) {
                return false;
            }
            return _this.date(value).equals(_this.date(comparing));
        };
        this.isSameDay = function (date, comparing) {
            return date.hasSame(comparing, "day");
        };
        this.isSameMonth = function (date, comparing) {
            return date.hasSame(comparing, "month");
        };
        this.isSameYear = function (date, comparing) {
            return date.hasSame(comparing, "year");
        };
        this.isSameHour = function (date, comparing) {
            return date.hasSame(comparing, "hour");
        };
        this.isAfter = function (value, comparing) {
            return value > comparing;
        };
        this.isBefore = function (value, comparing) {
            return value < comparing;
        };
        this.isBeforeDay = function (value, comparing) {
            var diff = value.diff(comparing.startOf("day"), "days").toObject();
            return diff.days < 0;
        };
        this.isAfterDay = function (value, comparing) {
            var diff = value.diff(comparing.endOf("day"), "days").toObject();
            return diff.days > 0;
        };
        this.isBeforeYear = function (value, comparing) {
            var diff = value.diff(comparing.startOf("year"), "years").toObject();
            return diff.years < 0;
        };
        this.isAfterYear = function (value, comparing) {
            var diff = value.diff(comparing.endOf("year"), "years").toObject();
            return diff.years > 0;
        };
        this.getDiff = function (value, comparing, unit) {
            if (typeof comparing === "string") {
                comparing = DateTime.fromJSDate(new Date(comparing));
            }
            if (unit) {
                return Math.floor(value.diff(comparing).as(unit));
            }
            return value.diff(comparing).as("millisecond");
        };
        this.startOfDay = function (value) {
            return value.startOf("day");
        };
        this.endOfDay = function (value) {
            return value.endOf("day");
        };
        this.format = function (date, formatKey) {
            return _this.formatByString(date, _this.formats[formatKey]);
        };
        this.formatByString = function (date, format) {
            return date.setLocale(_this.locale).toFormat(format);
        };
        this.formatNumber = function (numberToFormat) {
            return numberToFormat;
        };
        this.getHours = function (value) {
            return value.get("hour");
        };
        this.setHours = function (value, count) {
            return value.set({ hour: count });
        };
        this.getMinutes = function (value) {
            return value.get("minute");
        };
        this.setMinutes = function (value, count) {
            return value.set({ minute: count });
        };
        this.getSeconds = function (value) {
            return value.get("second");
        };
        this.setSeconds = function (value, count) {
            return value.set({ second: count });
        };
        this.getMonth = function (value) {
            // See https://github.com/moment/luxon/blob/master/docs/moment.md#major-functional-differences
            return value.get("month") - 1;
        };
        this.getDaysInMonth = function (value) {
            return value.daysInMonth;
        };
        this.setMonth = function (value, count) {
            return value.set({ month: count + 1 });
        };
        this.getYear = function (value) {
            return value.get("year");
        };
        this.setYear = function (value, year) {
            return value.set({ year: year });
        };
        this.mergeDateAndTime = function (date, time) {
            return date.set({
                second: time.second,
                hour: time.hour,
                minute: time.minute,
            });
        };
        this.startOfMonth = function (value) {
            return value.startOf("month");
        };
        this.endOfMonth = function (value) {
            return value.endOf("month");
        };
        this.startOfWeek = function (value) {
            return value.startOf("week");
        };
        this.endOfWeek = function (value) {
            return value.endOf("week");
        };
        this.getNextMonth = function (value) {
            return value.plus({ months: 1 });
        };
        this.getPreviousMonth = function (value) {
            return value.minus({ months: 1 });
        };
        this.getMonthArray = function (date) {
            var firstMonth = _this.date(date).startOf("year");
            var monthArray = [firstMonth];
            while (monthArray.length < 12) {
                var prevMonth = monthArray[monthArray.length - 1];
                monthArray.push(_this.getNextMonth(prevMonth));
            }
            return monthArray;
        };
        this.getWeekdays = function () {
            return Info.weekdaysFormat("narrow", { locale: _this.locale });
        };
        this.getWeekArray = function (date) {
            var days = date
                .endOf("month")
                .endOf("week")
                .diff(date.startOf("month").startOf("week"), "days")
                .toObject().days;
            var weeks = [];
            new Array(Math.round(days))
                .fill(0)
                .map(function (_, i) { return i; })
                .map(function (day) { return date.startOf("month").startOf("week").plus({ days: day }); })
                .forEach(function (v, i) {
                if (i === 0 || (i % 7 === 0 && i > 6)) {
                    weeks.push([v]);
                    return;
                }
                weeks[weeks.length - 1].push(v);
            });
            return weeks;
        };
        this.getYearRange = function (start, end) {
            var startDate = _this.date(start).startOf("year");
            var endDate = _this.date(end).endOf("year");
            var current = startDate;
            var years = [];
            while (current < endDate) {
                years.push(current);
                current = current.plus({ year: 1 });
            }
            return years;
        };
        this.getMeridiemText = function (ampm) {
            return Info.meridiems({ locale: _this.locale }).find(function (v) { return v.toLowerCase() === ampm.toLowerCase(); });
        };
        this.isNull = function (date) {
            return date === null;
        };
        this.isWithinRange = function (date, _a) {
            var start = _a[0], end = _a[1];
            return (date.equals(start) ||
                date.equals(end) ||
                (_this.isAfter(date, start) && _this.isBefore(date, end)));
        };
        this.locale = locale || "en-US";
        this.formats = Object.assign({}, defaultFormats, formats);
    }
    return LuxonUtils;
}());

export default LuxonUtils;
