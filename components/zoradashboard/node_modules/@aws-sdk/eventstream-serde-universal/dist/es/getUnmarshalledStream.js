import { __asyncGenerator, __asyncValues, __await, __generator } from "tslib";
export function getUnmarshalledStream(source, options) {
    var _a;
    return _a = {},
        _a[Symbol.asyncIterator] = function () {
            return __asyncGenerator(this, arguments, function () {
                var source_1, source_1_1, chunk, message, messageType, unmodeledError, code, exception, deserializedException, error, event, deserialized, e_1_1;
                var _a, _b;
                var e_1, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 12, 13, 18]);
                            source_1 = __asyncValues(source);
                            _d.label = 1;
                        case 1: return [4 /*yield*/, __await(source_1.next())];
                        case 2:
                            if (!(source_1_1 = _d.sent(), !source_1_1.done)) return [3 /*break*/, 11];
                            chunk = source_1_1.value;
                            message = options.eventMarshaller.unmarshall(chunk);
                            messageType = message.headers[":message-type"].value;
                            if (!(messageType === "error")) return [3 /*break*/, 3];
                            unmodeledError = new Error(message.headers[":error-message"].value || "UnknownError");
                            unmodeledError.name = message.headers[":error-code"].value;
                            throw unmodeledError;
                        case 3:
                            if (!(messageType === "exception")) return [3 /*break*/, 5];
                            code = message.headers[":exception-type"].value;
                            exception = (_a = {}, _a[code] = message, _a);
                            return [4 /*yield*/, __await(options.deserializer(exception))];
                        case 4:
                            deserializedException = _d.sent();
                            if (deserializedException.$unknown) {
                                error = new Error(options.toUtf8(message.body));
                                error.name = code;
                                throw error;
                            }
                            throw deserializedException[code];
                        case 5:
                            if (!(messageType === "event")) return [3 /*break*/, 9];
                            event = (_b = {},
                                _b[message.headers[":event-type"].value] = message,
                                _b);
                            return [4 /*yield*/, __await(options.deserializer(event))];
                        case 6:
                            deserialized = _d.sent();
                            if (deserialized.$unknown)
                                return [3 /*break*/, 10];
                            return [4 /*yield*/, __await(deserialized)];
                        case 7: return [4 /*yield*/, _d.sent()];
                        case 8:
                            _d.sent();
                            return [3 /*break*/, 10];
                        case 9: throw Error("Unrecognizable event type: " + message.headers[":event-type"].value);
                        case 10: return [3 /*break*/, 1];
                        case 11: return [3 /*break*/, 18];
                        case 12:
                            e_1_1 = _d.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 18];
                        case 13:
                            _d.trys.push([13, , 16, 17]);
                            if (!(source_1_1 && !source_1_1.done && (_c = source_1.return))) return [3 /*break*/, 15];
                            return [4 /*yield*/, __await(_c.call(source_1))];
                        case 14:
                            _d.sent();
                            _d.label = 15;
                        case 15: return [3 /*break*/, 17];
                        case 16:
                            if (e_1) throw e_1.error;
                            return [7 /*endfinally*/];
                        case 17: return [7 /*endfinally*/];
                        case 18: return [2 /*return*/];
                    }
                });
            });
        },
        _a;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VW5tYXJzaGFsbGVkU3RyZWFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2dldFVubWFyc2hhbGxlZFN0cmVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBU0EsTUFBTSxVQUFVLHFCQUFxQixDQUNuQyxNQUFpQyxFQUNqQyxPQUFxQzs7SUFFckM7UUFDRSxHQUFDLE1BQU0sQ0FBQyxhQUFhLElBQUc7Ozs7Ozs7Ozs0QkFDSSxXQUFBLGNBQUEsTUFBTSxDQUFBOzs7Ozs0QkFBZixLQUFLLG1CQUFBLENBQUE7NEJBQ2QsT0FBTyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUMzQyxXQUFXLEdBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsTUFBckMsQ0FBc0M7aUNBQzVELENBQUEsV0FBVyxLQUFLLE9BQU8sQ0FBQSxFQUF2Qix3QkFBdUI7NEJBRW5CLGNBQWMsR0FBRyxJQUFJLEtBQUssQ0FBRSxPQUFPLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBZ0IsSUFBSSxjQUFjLENBQUMsQ0FBQzs0QkFDeEcsY0FBYyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQWUsQ0FBQzs0QkFDckUsTUFBTSxjQUFjLENBQUM7O2lDQUNaLENBQUEsV0FBVyxLQUFLLFdBQVcsQ0FBQSxFQUEzQix3QkFBMkI7NEJBRTlCLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsS0FBZSxDQUFDOzRCQUMxRCxTQUFTLGFBQUssR0FBQyxJQUFJLElBQUcsT0FBTyxLQUFFLENBQUM7NEJBRVIsNkJBQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBQTs7NEJBQTdELHFCQUFxQixHQUFHLFNBQXFDOzRCQUNuRSxJQUFJLHFCQUFxQixDQUFDLFFBQVEsRUFBRTtnQ0FFNUIsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0NBQ3RELEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dDQUNsQixNQUFNLEtBQUssQ0FBQzs2QkFDYjs0QkFDRCxNQUFNLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDOztpQ0FDekIsQ0FBQSxXQUFXLEtBQUssT0FBTyxDQUFBLEVBQXZCLHdCQUF1Qjs0QkFDMUIsS0FBSztnQ0FDVCxHQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBZSxJQUFHLE9BQU87bUNBQzFELENBQUM7NEJBQ21CLDZCQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUE7OzRCQUFoRCxZQUFZLEdBQUcsU0FBaUM7NEJBQ3RELElBQUksWUFBWSxDQUFDLFFBQVE7Z0NBQUUseUJBQVM7eURBQzlCLFlBQVk7Z0NBQWxCLGdDQUFrQjs7NEJBQWxCLFNBQWtCLENBQUM7O2dDQUVuQixNQUFNLEtBQUssQ0FBQyxnQ0FBOEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFPLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FHdkY7V0FDRDtBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudFN0cmVhbU1hcnNoYWxsZXIgYXMgRXZlbnRNYXJzaGFsbGVyIH0gZnJvbSBcIkBhd3Mtc2RrL2V2ZW50c3RyZWFtLW1hcnNoYWxsZXJcIjtcbmltcG9ydCB7IEVuY29kZXIsIE1lc3NhZ2UgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcblxuZXhwb3J0IHR5cGUgVW5tYXJzaGFsbGVkU3RyZWFtT3B0aW9uczxUPiA9IHtcbiAgZXZlbnRNYXJzaGFsbGVyOiBFdmVudE1hcnNoYWxsZXI7XG4gIGRlc2VyaWFsaXplcjogKGlucHV0OiB7IFtuYW1lOiBzdHJpbmddOiBNZXNzYWdlIH0pID0+IFByb21pc2U8VD47XG4gIHRvVXRmODogRW5jb2Rlcjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVbm1hcnNoYWxsZWRTdHJlYW08VCBleHRlbmRzIHsgW2tleTogc3RyaW5nXTogYW55IH0+KFxuICBzb3VyY2U6IEFzeW5jSXRlcmFibGU8VWludDhBcnJheT4sXG4gIG9wdGlvbnM6IFVubWFyc2hhbGxlZFN0cmVhbU9wdGlvbnM8VD5cbik6IEFzeW5jSXRlcmFibGU8VD4ge1xuICByZXR1cm4ge1xuICAgIFtTeW1ib2wuYXN5bmNJdGVyYXRvcl06IGFzeW5jIGZ1bmN0aW9uKiAoKSB7XG4gICAgICBmb3IgYXdhaXQgKGNvbnN0IGNodW5rIG9mIHNvdXJjZSkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gb3B0aW9ucy5ldmVudE1hcnNoYWxsZXIudW5tYXJzaGFsbChjaHVuayk7XG4gICAgICAgIGNvbnN0IHsgdmFsdWU6IG1lc3NhZ2VUeXBlIH0gPSBtZXNzYWdlLmhlYWRlcnNbXCI6bWVzc2FnZS10eXBlXCJdO1xuICAgICAgICBpZiAobWVzc2FnZVR5cGUgPT09IFwiZXJyb3JcIikge1xuICAgICAgICAgIC8vIFVubW9kZWxlZCBleGNlcHRpb24gaW4gZXZlbnRcbiAgICAgICAgICBjb25zdCB1bm1vZGVsZWRFcnJvciA9IG5ldyBFcnJvcigobWVzc2FnZS5oZWFkZXJzW1wiOmVycm9yLW1lc3NhZ2VcIl0udmFsdWUgYXMgc3RyaW5nKSB8fCBcIlVua25vd25FcnJvclwiKTtcbiAgICAgICAgICB1bm1vZGVsZWRFcnJvci5uYW1lID0gbWVzc2FnZS5oZWFkZXJzW1wiOmVycm9yLWNvZGVcIl0udmFsdWUgYXMgc3RyaW5nO1xuICAgICAgICAgIHRocm93IHVubW9kZWxlZEVycm9yO1xuICAgICAgICB9IGVsc2UgaWYgKG1lc3NhZ2VUeXBlID09PSBcImV4Y2VwdGlvblwiKSB7XG4gICAgICAgICAgLy8gRm9yIG1vZGVsZWQgZXhjZXB0aW9uLCBwdXNoIGl0IHRvIGRlc2VyaWFsaXplciBhbmQgdGhyb3cgYWZ0ZXIgZGVzZXJpYWxpemluZ1xuICAgICAgICAgIGNvbnN0IGNvZGUgPSBtZXNzYWdlLmhlYWRlcnNbXCI6ZXhjZXB0aW9uLXR5cGVcIl0udmFsdWUgYXMgc3RyaW5nO1xuICAgICAgICAgIGNvbnN0IGV4Y2VwdGlvbiA9IHsgW2NvZGVdOiBtZXNzYWdlIH07XG4gICAgICAgICAgLy8gR2V0IHBhcnNlZCBleGNlcHRpb24gZXZlbnQgaW4ga2V5KGVycm9yIGNvZGUpIHZhbHVlKHN0cnVjdHVyZWQgZXJyb3IpIHBhaXIuXG4gICAgICAgICAgY29uc3QgZGVzZXJpYWxpemVkRXhjZXB0aW9uID0gYXdhaXQgb3B0aW9ucy5kZXNlcmlhbGl6ZXIoZXhjZXB0aW9uKTtcbiAgICAgICAgICBpZiAoZGVzZXJpYWxpemVkRXhjZXB0aW9uLiR1bmtub3duKSB7XG4gICAgICAgICAgICAvL3RoaXMgaXMgYW4gdW5tb2RlbGVkIGV4Y2VwdGlvbiB0aGVuIHRyeSBwYXJzaW5nIGl0IHdpdGggYmVzdCBlZmZvcnRcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKG9wdGlvbnMudG9VdGY4KG1lc3NhZ2UuYm9keSkpO1xuICAgICAgICAgICAgZXJyb3IubmFtZSA9IGNvZGU7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZGVzZXJpYWxpemVkRXhjZXB0aW9uW2NvZGVdO1xuICAgICAgICB9IGVsc2UgaWYgKG1lc3NhZ2VUeXBlID09PSBcImV2ZW50XCIpIHtcbiAgICAgICAgICBjb25zdCBldmVudCA9IHtcbiAgICAgICAgICAgIFttZXNzYWdlLmhlYWRlcnNbXCI6ZXZlbnQtdHlwZVwiXS52YWx1ZSBhcyBzdHJpbmddOiBtZXNzYWdlLFxuICAgICAgICAgIH07XG4gICAgICAgICAgY29uc3QgZGVzZXJpYWxpemVkID0gYXdhaXQgb3B0aW9ucy5kZXNlcmlhbGl6ZXIoZXZlbnQpO1xuICAgICAgICAgIGlmIChkZXNlcmlhbGl6ZWQuJHVua25vd24pIGNvbnRpbnVlO1xuICAgICAgICAgIHlpZWxkIGRlc2VyaWFsaXplZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcihgVW5yZWNvZ25pemFibGUgZXZlbnQgdHlwZTogJHttZXNzYWdlLmhlYWRlcnNbXCI6ZXZlbnQtdHlwZVwiXS52YWx1ZX1gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gIH07XG59XG4iXX0=