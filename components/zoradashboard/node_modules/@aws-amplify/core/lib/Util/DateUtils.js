"use strict";
/**
 * Date & time utility functions to abstract the `aws-sdk` away from users.
 * (v2 => v3 modularization is a breaking change)
 *
 * @see https://github.com/aws/aws-sdk-js/blob/6edf586dcc1de7fe8fbfbbd9a0d2b1847921e6e1/lib/util.js#L262
 */
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Comment - TODO: remove
var FIVE_MINUTES_IN_MS = 1000 * 60 * 5;
exports.DateUtils = {
    /**
     * Milliseconds to offset the date to compensate for clock skew between device & services
     */
    clockOffset: 0,
    getDateWithClockOffset: function () {
        if (exports.DateUtils.clockOffset) {
            return new Date(new Date().getTime() + exports.DateUtils.clockOffset);
        }
        else {
            return new Date();
        }
    },
    /**
     * @returns {number} Clock offset in milliseconds
     */
    getClockOffset: function () {
        return exports.DateUtils.clockOffset;
    },
    getHeaderStringFromDate: function (date) {
        if (date === void 0) { date = exports.DateUtils.getDateWithClockOffset(); }
        return date.toISOString().replace(/[:\-]|\.\d{3}/g, '');
    },
    getDateFromHeaderString: function (header) {
        var _a = __read(header.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2}).+/), 7), year = _a[1], month = _a[2], day = _a[3], hour = _a[4], minute = _a[5], second = _a[6];
        return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second)));
    },
    isClockSkewed: function (serverDate) {
        // API gateway permits client calls that are off by no more than ±5 minutes
        return (Math.abs(serverDate.getTime() - exports.DateUtils.getDateWithClockOffset().getTime()) >= FIVE_MINUTES_IN_MS);
    },
    isClockSkewError: function (error) {
        if (!error.response || !error.response.headers) {
            return false;
        }
        var headers = error.response.headers;
        return Boolean(['BadRequestException', 'InvalidSignatureException'].includes(headers['x-amzn-errortype']) &&
            (headers.date || headers.Date));
    },
    /**
     * @param {number} offset Clock offset in milliseconds
     */
    setClockOffset: function (offset) {
        exports.DateUtils.clockOffset = offset;
    },
};
//# sourceMappingURL=DateUtils.js.map