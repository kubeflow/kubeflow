"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTransientError = exports.isThrottlingError = exports.isClockSkewError = exports.isRetryableByTrait = void 0;
const constants_1 = require("./constants");
const isRetryableByTrait = (error) => error.$retryable !== undefined;
exports.isRetryableByTrait = isRetryableByTrait;
const isClockSkewError = (error) => constants_1.CLOCK_SKEW_ERROR_CODES.includes(error.name);
exports.isClockSkewError = isClockSkewError;
const isThrottlingError = (error) => {
    var _a, _b;
    return ((_a = error.$metadata) === null || _a === void 0 ? void 0 : _a.httpStatusCode) === 429 ||
        constants_1.THROTTLING_ERROR_CODES.includes(error.name) ||
        ((_b = error.$retryable) === null || _b === void 0 ? void 0 : _b.throttling) == true;
};
exports.isThrottlingError = isThrottlingError;
const isTransientError = (error) => {
    var _a;
    return constants_1.TRANSIENT_ERROR_CODES.includes(error.name) ||
        constants_1.TRANSIENT_ERROR_STATUS_CODES.includes(((_a = error.$metadata) === null || _a === void 0 ? void 0 : _a.httpStatusCode) || 0);
};
exports.isTransientError = isTransientError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsMkNBS3FCO0FBRWQsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLEtBQWUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUM7QUFBekUsUUFBQSxrQkFBa0Isc0JBQXVEO0FBRS9FLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxLQUFlLEVBQUUsRUFBRSxDQUFDLGtDQUFzQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFBcEYsUUFBQSxnQkFBZ0Isb0JBQW9FO0FBRTFGLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxLQUFlLEVBQUUsRUFBRTs7SUFDbkQsT0FBQSxPQUFBLEtBQUssQ0FBQyxTQUFTLDBDQUFFLGNBQWMsTUFBSyxHQUFHO1FBQ3ZDLGtDQUFzQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzNDLE9BQUEsS0FBSyxDQUFDLFVBQVUsMENBQUUsVUFBVSxLQUFJLElBQUksQ0FBQTtDQUFBLENBQUM7QUFIMUIsUUFBQSxpQkFBaUIscUJBR1M7QUFFaEMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEtBQWUsRUFBRSxFQUFFOztJQUNsRCxPQUFBLGlDQUFxQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzFDLHdDQUE0QixDQUFDLFFBQVEsQ0FBQyxPQUFBLEtBQUssQ0FBQyxTQUFTLDBDQUFFLGNBQWMsS0FBSSxDQUFDLENBQUMsQ0FBQTtDQUFBLENBQUM7QUFGakUsUUFBQSxnQkFBZ0Isb0JBRWlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2RrRXJyb3IgfSBmcm9tIFwiQGF3cy1zZGsvc21pdGh5LWNsaWVudFwiO1xuXG5pbXBvcnQge1xuICBDTE9DS19TS0VXX0VSUk9SX0NPREVTLFxuICBUSFJPVFRMSU5HX0VSUk9SX0NPREVTLFxuICBUUkFOU0lFTlRfRVJST1JfQ09ERVMsXG4gIFRSQU5TSUVOVF9FUlJPUl9TVEFUVVNfQ09ERVMsXG59IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgY29uc3QgaXNSZXRyeWFibGVCeVRyYWl0ID0gKGVycm9yOiBTZGtFcnJvcikgPT4gZXJyb3IuJHJldHJ5YWJsZSAhPT0gdW5kZWZpbmVkO1xuXG5leHBvcnQgY29uc3QgaXNDbG9ja1NrZXdFcnJvciA9IChlcnJvcjogU2RrRXJyb3IpID0+IENMT0NLX1NLRVdfRVJST1JfQ09ERVMuaW5jbHVkZXMoZXJyb3IubmFtZSk7XG5cbmV4cG9ydCBjb25zdCBpc1Rocm90dGxpbmdFcnJvciA9IChlcnJvcjogU2RrRXJyb3IpID0+XG4gIGVycm9yLiRtZXRhZGF0YT8uaHR0cFN0YXR1c0NvZGUgPT09IDQyOSB8fFxuICBUSFJPVFRMSU5HX0VSUk9SX0NPREVTLmluY2x1ZGVzKGVycm9yLm5hbWUpIHx8XG4gIGVycm9yLiRyZXRyeWFibGU/LnRocm90dGxpbmcgPT0gdHJ1ZTtcblxuZXhwb3J0IGNvbnN0IGlzVHJhbnNpZW50RXJyb3IgPSAoZXJyb3I6IFNka0Vycm9yKSA9PlxuICBUUkFOU0lFTlRfRVJST1JfQ09ERVMuaW5jbHVkZXMoZXJyb3IubmFtZSkgfHxcbiAgVFJBTlNJRU5UX0VSUk9SX1NUQVRVU19DT0RFUy5pbmNsdWRlcyhlcnJvci4kbWV0YWRhdGE/Lmh0dHBTdGF0dXNDb2RlIHx8IDApO1xuIl19