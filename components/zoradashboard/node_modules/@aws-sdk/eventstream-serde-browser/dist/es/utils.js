import { __asyncGenerator, __await, __awaiter, __generator } from "tslib";
/**
 * A util function converting ReadableStream into an async iterable.
 * Reference: https://jakearchibald.com/2017/async-iterators-and-generators/#making-streams-iterate
 */
export var readableStreamtoIterable = function (readableStream) {
    var _a;
    return (_a = {},
        _a[Symbol.asyncIterator] = function () {
            return __asyncGenerator(this, arguments, function () {
                var reader, _a, done, value;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            reader = readableStream.getReader();
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, , 9, 10]);
                            _b.label = 2;
                        case 2:
                            if (!true) return [3 /*break*/, 8];
                            return [4 /*yield*/, __await(reader.read())];
                        case 3:
                            _a = _b.sent(), done = _a.done, value = _a.value;
                            if (!done) return [3 /*break*/, 5];
                            return [4 /*yield*/, __await(void 0)];
                        case 4: return [2 /*return*/, _b.sent()];
                        case 5: return [4 /*yield*/, __await(value)];
                        case 6: return [4 /*yield*/, _b.sent()];
                        case 7:
                            _b.sent();
                            return [3 /*break*/, 2];
                        case 8: return [3 /*break*/, 10];
                        case 9:
                            reader.releaseLock();
                            return [7 /*endfinally*/];
                        case 10: return [2 /*return*/];
                    }
                });
            });
        },
        _a);
};
/**
 * A util function converting async iterable to a ReadableStream.
 */
export var iterableToReadableStream = function (asyncIterable) {
    var iterator = asyncIterable[Symbol.asyncIterator]();
    return new ReadableStream({
        pull: function (controller) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, done, value;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, iterator.next()];
                        case 1:
                            _a = _b.sent(), done = _a.done, value = _a.value;
                            if (done) {
                                return [2 /*return*/, controller.close()];
                            }
                            controller.enqueue(value);
                            return [2 /*return*/];
                    }
                });
            });
        },
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxJQUFNLHdCQUF3QixHQUFHLFVBQUksY0FBaUM7O0lBQXVCLE9BQUE7UUFDbEcsR0FBQyxNQUFNLENBQUMsYUFBYSxJQUFHOzs7Ozs7NEJBQ2hCLE1BQU0sR0FBRyxjQUFjLENBQUMsU0FBUyxFQUFFLENBQUM7Ozs7OztpQ0FFakMsSUFBSTs0QkFDZSw2QkFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUE7OzRCQUFyQyxLQUFrQixTQUFtQixFQUFuQyxJQUFJLFVBQUEsRUFBRSxLQUFLLFdBQUE7aUNBQ2YsSUFBSSxFQUFKLHdCQUFJOztnQ0FBRSxpQ0FBTzs2REFDWCxLQUFVO2dDQUFoQixnQ0FBZ0I7OzRCQUFoQixTQUFnQixDQUFDOzs7OzRCQUduQixNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7OztTQUV4QjtXQUNEO0FBYmtHLENBYWxHLENBQUM7QUFFSDs7R0FFRztBQUNILE1BQU0sQ0FBQyxJQUFNLHdCQUF3QixHQUFHLFVBQUksYUFBK0I7SUFDekUsSUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO0lBQ3ZELE9BQU8sSUFBSSxjQUFjLENBQUM7UUFDbEIsSUFBSSxZQUFDLFVBQVU7Ozs7O2dDQUNLLHFCQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQTs7NEJBQXZDLEtBQWtCLFNBQXFCLEVBQXJDLElBQUksVUFBQSxFQUFFLEtBQUssV0FBQTs0QkFDbkIsSUFBSSxJQUFJLEVBQUU7Z0NBQ1Isc0JBQU8sVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFDOzZCQUMzQjs0QkFDRCxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OztTQUMzQjtLQUNGLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSB1dGlsIGZ1bmN0aW9uIGNvbnZlcnRpbmcgUmVhZGFibGVTdHJlYW0gaW50byBhbiBhc3luYyBpdGVyYWJsZS5cbiAqIFJlZmVyZW5jZTogaHR0cHM6Ly9qYWtlYXJjaGliYWxkLmNvbS8yMDE3L2FzeW5jLWl0ZXJhdG9ycy1hbmQtZ2VuZXJhdG9ycy8jbWFraW5nLXN0cmVhbXMtaXRlcmF0ZVxuICovXG5leHBvcnQgY29uc3QgcmVhZGFibGVTdHJlYW10b0l0ZXJhYmxlID0gPFQ+KHJlYWRhYmxlU3RyZWFtOiBSZWFkYWJsZVN0cmVhbTxUPik6IEFzeW5jSXRlcmFibGU8VD4gPT4gKHtcbiAgW1N5bWJvbC5hc3luY0l0ZXJhdG9yXTogYXN5bmMgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zdCByZWFkZXIgPSByZWFkYWJsZVN0cmVhbS5nZXRSZWFkZXIoKTtcbiAgICB0cnkge1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgY29uc3QgeyBkb25lLCB2YWx1ZSB9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcbiAgICAgICAgaWYgKGRvbmUpIHJldHVybjtcbiAgICAgICAgeWllbGQgdmFsdWUgYXMgVDtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgcmVhZGVyLnJlbGVhc2VMb2NrKCk7XG4gICAgfVxuICB9LFxufSk7XG5cbi8qKlxuICogQSB1dGlsIGZ1bmN0aW9uIGNvbnZlcnRpbmcgYXN5bmMgaXRlcmFibGUgdG8gYSBSZWFkYWJsZVN0cmVhbS5cbiAqL1xuZXhwb3J0IGNvbnN0IGl0ZXJhYmxlVG9SZWFkYWJsZVN0cmVhbSA9IDxUPihhc3luY0l0ZXJhYmxlOiBBc3luY0l0ZXJhYmxlPFQ+KTogUmVhZGFibGVTdHJlYW08VD4gPT4ge1xuICBjb25zdCBpdGVyYXRvciA9IGFzeW5jSXRlcmFibGVbU3ltYm9sLmFzeW5jSXRlcmF0b3JdKCk7XG4gIHJldHVybiBuZXcgUmVhZGFibGVTdHJlYW0oe1xuICAgIGFzeW5jIHB1bGwoY29udHJvbGxlcikge1xuICAgICAgY29uc3QgeyBkb25lLCB2YWx1ZSB9ID0gYXdhaXQgaXRlcmF0b3IubmV4dCgpO1xuICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXIuY2xvc2UoKTtcbiAgICAgIH1cbiAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZSh2YWx1ZSk7XG4gICAgfSxcbiAgfSk7XG59O1xuIl19