"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ConsoleLogger_1 = require("../Logger/ConsoleLogger");
var logger = new ConsoleLogger_1.ConsoleLogger('Util');
var NonRetryableError = /** @class */ (function (_super) {
    __extends(NonRetryableError, _super);
    function NonRetryableError(message) {
        var _this = _super.call(this, message) || this;
        _this.nonRetryable = true;
        return _this;
    }
    return NonRetryableError;
}(Error));
exports.NonRetryableError = NonRetryableError;
var isNonRetryableError = function (obj) {
    var key = 'nonRetryable';
    return obj && obj[key];
};
/**
 * @private
 * Internal use of Amplify only
 */
function retry(functionToRetry, args, delayFn, attempt) {
    if (attempt === void 0) { attempt = 1; }
    return __awaiter(this, void 0, void 0, function () {
        var err_1, retryIn_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof functionToRetry !== 'function') {
                        throw Error('functionToRetry must be a function');
                    }
                    logger.debug(functionToRetry.name + " attempt #" + attempt + " with this vars: " + JSON.stringify(args));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 8]);
                    return [4 /*yield*/, functionToRetry.apply(void 0, __spread(args))];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    err_1 = _a.sent();
                    logger.debug("error on " + functionToRetry.name, err_1);
                    if (isNonRetryableError(err_1)) {
                        logger.debug(functionToRetry.name + " non retryable error", err_1);
                        throw err_1;
                    }
                    retryIn_1 = delayFn(attempt, args, err_1);
                    logger.debug(functionToRetry.name + " retrying in " + retryIn_1 + " ms");
                    if (!(retryIn_1 !== false)) return [3 /*break*/, 6];
                    return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, retryIn_1); })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, retry(functionToRetry, args, delayFn, attempt + 1)];
                case 5: return [2 /*return*/, _a.sent()];
                case 6: throw err_1;
                case 7: return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.retry = retry;
var MAX_DELAY_MS = 5 * 60 * 1000;
function jitteredBackoff(maxDelayMs) {
    var BASE_TIME_MS = 100;
    var JITTER_FACTOR = 100;
    return function (attempt) {
        var delay = Math.pow(2, attempt) * BASE_TIME_MS + JITTER_FACTOR * Math.random();
        return delay > maxDelayMs ? false : delay;
    };
}
/**
 * @private
 * Internal use of Amplify only
 */
exports.jitteredExponentialRetry = function (functionToRetry, args, maxDelayMs) {
    if (maxDelayMs === void 0) { maxDelayMs = MAX_DELAY_MS; }
    return retry(functionToRetry, args, jitteredBackoff(maxDelayMs));
};
//# sourceMappingURL=Retry.js.map