import defaultMoment from 'moment';

var defaultFormats = {
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
var MomentUtils = /** @class */ (function () {
    function MomentUtils(_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, locale = _b.locale, formats = _b.formats, instance = _b.instance;
        this.lib = "moment";
        this.is12HourCycleInCurrentLocale = function () {
            return /A|a/.test(_this.moment().localeData().longDateFormat("LT"));
        };
        this.getFormatHelperText = function (format) {
            // @see https://github.com/moment/moment/blob/develop/src/lib/format/format.js#L6
            var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})|./g;
            return format
                .match(localFormattingTokens)
                .map(function (token) {
                var firstCharacter = token[0];
                if (firstCharacter === "L" || firstCharacter === ";") {
                    return _this.moment.localeData().longDateFormat(token);
                }
                return token;
            })
                .join("")
                .replace(/a/gi, "(a|p)m")
                .toLocaleLowerCase();
        };
        this.getCurrentLocaleCode = function () {
            return _this.locale || _this.moment.locale();
        };
        this.parseISO = function (isoString) {
            return _this.moment(isoString, true);
        };
        this.toISO = function (value) {
            return value.toISOString();
        };
        this.parse = function (value, format) {
            if (value === "") {
                return null;
            }
            if (_this.locale) {
                return _this.moment(value, format, _this.locale, true);
            }
            return _this.moment(value, format, true);
        };
        this.date = function (value) {
            if (value === null) {
                return null;
            }
            var moment = _this.moment(value);
            moment.locale(_this.locale);
            return moment;
        };
        this.toJsDate = function (value) {
            return value.toDate();
        };
        this.isValid = function (value) {
            return _this.moment(value).isValid();
        };
        this.isNull = function (date) {
            return date === null;
        };
        this.getDiff = function (date, comparing, unit) {
            return date.diff(comparing, unit);
        };
        this.isAfter = function (date, value) {
            return date.isAfter(value);
        };
        this.isBefore = function (date, value) {
            return date.isBefore(value);
        };
        this.isAfterDay = function (date, value) {
            return date.isAfter(value, "day");
        };
        this.isBeforeDay = function (date, value) {
            return date.isBefore(value, "day");
        };
        this.isBeforeYear = function (date, value) {
            return date.isBefore(value, "year");
        };
        this.isAfterYear = function (date, value) {
            return date.isAfter(value, "year");
        };
        this.startOfDay = function (date) {
            return date.clone().startOf("day");
        };
        this.endOfDay = function (date) {
            return date.clone().endOf("day");
        };
        this.format = function (date, formatKey) {
            return _this.formatByString(date, _this.formats[formatKey]);
        };
        this.formatByString = function (date, formatString) {
            var clonedDate = date.clone();
            clonedDate.locale(_this.locale);
            return clonedDate.format(formatString);
        };
        this.formatNumber = function (numberToFormat) {
            return numberToFormat;
        };
        this.getHours = function (date) {
            return date.get("hours");
        };
        this.addSeconds = function (date, count) {
            return count < 0
                ? date.clone().subtract(Math.abs(count), "seconds")
                : date.clone().add(count, "seconds");
        };
        this.addMinutes = function (date, count) {
            return count < 0
                ? date.clone().subtract(Math.abs(count), "minutes")
                : date.clone().add(count, "minutes");
        };
        this.addHours = function (date, count) {
            return count < 0
                ? date.clone().subtract(Math.abs(count), "hours")
                : date.clone().add(count, "hours");
        };
        this.addDays = function (date, count) {
            return count < 0
                ? date.clone().subtract(Math.abs(count), "days")
                : date.clone().add(count, "days");
        };
        this.addWeeks = function (date, count) {
            return count < 0
                ? date.clone().subtract(Math.abs(count), "weeks")
                : date.clone().add(count, "weeks");
        };
        this.addMonths = function (date, count) {
            return count < 0
                ? date.clone().subtract(Math.abs(count), "months")
                : date.clone().add(count, "months");
        };
        this.setHours = function (date, count) {
            return date.clone().hours(count);
        };
        this.getMinutes = function (date) {
            return date.get("minutes");
        };
        this.setMinutes = function (date, count) {
            return date.clone().minutes(count);
        };
        this.getSeconds = function (date) {
            return date.get("seconds");
        };
        this.setSeconds = function (date, count) {
            return date.clone().seconds(count);
        };
        this.getMonth = function (date) {
            return date.get("month");
        };
        this.getDaysInMonth = function (date) {
            return date.daysInMonth();
        };
        this.isSameDay = function (date, comparing) {
            return date.isSame(comparing, "day");
        };
        this.isSameMonth = function (date, comparing) {
            return date.isSame(comparing, "month");
        };
        this.isSameYear = function (date, comparing) {
            return date.isSame(comparing, "year");
        };
        this.isSameHour = function (date, comparing) {
            return date.isSame(comparing, "hour");
        };
        this.setMonth = function (date, count) {
            return date.clone().month(count);
        };
        this.getMeridiemText = function (ampm) {
            if (_this.is12HourCycleInCurrentLocale()) {
                // AM/PM translation only possible in those who have 12 hour cycle in locale.
                return _this.moment.localeData().meridiem(ampm === "am" ? 0 : 13, 0, false);
            }
            return ampm === "am" ? "AM" : "PM"; // fallback for de, ru, ...etc
        };
        this.startOfMonth = function (date) {
            return date.clone().startOf("month");
        };
        this.endOfMonth = function (date) {
            return date.clone().endOf("month");
        };
        this.startOfWeek = function (date) {
            return date.clone().startOf("week");
        };
        this.endOfWeek = function (date) {
            return date.clone().endOf("week");
        };
        this.getNextMonth = function (date) {
            return date.clone().add(1, "month");
        };
        this.getPreviousMonth = function (date) {
            return date.clone().subtract(1, "month");
        };
        this.getMonthArray = function (date) {
            var firstMonth = date.clone().startOf("year");
            var monthArray = [firstMonth];
            while (monthArray.length < 12) {
                var prevMonth = monthArray[monthArray.length - 1];
                monthArray.push(_this.getNextMonth(prevMonth));
            }
            return monthArray;
        };
        this.getYear = function (date) {
            return date.get("year");
        };
        this.setYear = function (date, year) {
            return date.clone().set("year", year);
        };
        this.mergeDateAndTime = function (date, time) {
            return date.hour(time.hour()).minute(time.minute()).second(time.second());
        };
        this.getWeekdays = function () {
            return _this.moment.weekdaysShort(true);
        };
        this.isEqual = function (value, comparing) {
            if (value === null && comparing === null) {
                return true;
            }
            return _this.moment(value).isSame(comparing);
        };
        this.getWeekArray = function (date) {
            var start = date.clone().startOf("month").startOf("week");
            var end = date.clone().endOf("month").endOf("week");
            var count = 0;
            var current = start;
            var nestedWeeks = [];
            while (current.isBefore(end)) {
                var weekNumber = Math.floor(count / 7);
                nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
                nestedWeeks[weekNumber].push(current);
                current = current.clone().add(1, "day");
                count += 1;
            }
            return nestedWeeks;
        };
        this.getYearRange = function (start, end) {
            var startDate = _this.moment(start).startOf("year");
            var endDate = _this.moment(end).endOf("year");
            var years = [];
            var current = startDate;
            while (current.isBefore(endDate)) {
                years.push(current);
                current = current.clone().add(1, "year");
            }
            return years;
        };
        this.isWithinRange = function (date, _a) {
            var start = _a[0], end = _a[1];
            return date.isBetween(start, end, null, "[]");
        };
        this.moment = instance || defaultMoment;
        this.locale = locale;
        this.formats = Object.assign({}, defaultFormats, formats);
    }
    return MomentUtils;
}());

export default MomentUtils;
