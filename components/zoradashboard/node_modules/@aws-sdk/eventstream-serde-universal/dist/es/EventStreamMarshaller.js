import { __asyncGenerator, __asyncValues, __await, __generator } from "tslib";
import { EventStreamMarshaller as EventMarshaller } from "@aws-sdk/eventstream-marshaller";
import { getChunkedStream } from "./getChunkedStream";
import { getUnmarshalledStream } from "./getUnmarshalledStream";
var EventStreamMarshaller = /** @class */ (function () {
    function EventStreamMarshaller(_a) {
        var utf8Encoder = _a.utf8Encoder, utf8Decoder = _a.utf8Decoder;
        this.eventMarshaller = new EventMarshaller(utf8Encoder, utf8Decoder);
        this.utfEncoder = utf8Encoder;
    }
    EventStreamMarshaller.prototype.deserialize = function (body, deserializer) {
        var chunkedStream = getChunkedStream(body);
        var unmarshalledStream = getUnmarshalledStream(chunkedStream, {
            eventMarshaller: this.eventMarshaller,
            deserializer: deserializer,
            toUtf8: this.utfEncoder,
        });
        return unmarshalledStream;
    };
    EventStreamMarshaller.prototype.serialize = function (input, serializer) {
        var _a;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var self = this;
        var serializedIterator = function () {
            return __asyncGenerator(this, arguments, function () {
                var input_1, input_1_1, chunk, payloadBuf, e_1_1;
                var e_1, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 7, 8, 13]);
                            input_1 = __asyncValues(input);
                            _b.label = 1;
                        case 1: return [4 /*yield*/, __await(input_1.next())];
                        case 2:
                            if (!(input_1_1 = _b.sent(), !input_1_1.done)) return [3 /*break*/, 6];
                            chunk = input_1_1.value;
                            payloadBuf = self.eventMarshaller.marshall(serializer(chunk));
                            return [4 /*yield*/, __await(payloadBuf)];
                        case 3: return [4 /*yield*/, _b.sent()];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5: return [3 /*break*/, 1];
                        case 6: return [3 /*break*/, 13];
                        case 7:
                            e_1_1 = _b.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 13];
                        case 8:
                            _b.trys.push([8, , 11, 12]);
                            if (!(input_1_1 && !input_1_1.done && (_a = input_1.return))) return [3 /*break*/, 10];
                            return [4 /*yield*/, __await(_a.call(input_1))];
                        case 9:
                            _b.sent();
                            _b.label = 10;
                        case 10: return [3 /*break*/, 12];
                        case 11:
                            if (e_1) throw e_1.error;
                            return [7 /*endfinally*/];
                        case 12: return [7 /*endfinally*/];
                        case 13: return [4 /*yield*/, __await(new Uint8Array(0))];
                        case 14: 
                        // Ending frame
                        return [4 /*yield*/, _b.sent()];
                        case 15:
                            // Ending frame
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return _a = {},
            _a[Symbol.asyncIterator] = serializedIterator,
            _a;
    };
    return EventStreamMarshaller;
}());
export { EventStreamMarshaller };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRTdHJlYW1NYXJzaGFsbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0V2ZW50U3RyZWFtTWFyc2hhbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLHFCQUFxQixJQUFJLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRzNGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBU2hFO0lBR0UsK0JBQVksRUFBMEQ7WUFBeEQsV0FBVyxpQkFBQSxFQUFFLFdBQVcsaUJBQUE7UUFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUM7SUFDaEMsQ0FBQztJQUVELDJDQUFXLEdBQVgsVUFDRSxJQUErQixFQUMvQixZQUFpRTtRQUVqRSxJQUFNLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFNLGtCQUFrQixHQUFHLHFCQUFxQixDQUFDLGFBQWEsRUFBRTtZQUM5RCxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDckMsWUFBWSxjQUFBO1lBQ1osTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVO1NBQ3hCLENBQUMsQ0FBQztRQUNILE9BQU8sa0JBQWtCLENBQUM7SUFDNUIsQ0FBQztJQUVELHlDQUFTLEdBQVQsVUFBYSxLQUF1QixFQUFFLFVBQWlDOztRQUNyRSw0REFBNEQ7UUFDNUQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQU0sa0JBQWtCLEdBQUc7Ozs7Ozs7OzRCQUNDLFVBQUEsY0FBQSxLQUFLLENBQUE7Ozs7OzRCQUFkLEtBQUssa0JBQUEsQ0FBQTs0QkFDZCxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7eURBQzlELFVBQVU7Z0NBQWhCLGdDQUFnQjs7NEJBQWhCLFNBQWdCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhEQUdiLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQzs7d0JBRHZCLGVBQWU7d0JBQ2YsZ0NBQXVCOzs0QkFEdkIsZUFBZTs0QkFDZixTQUF1QixDQUFDOzs7OztTQUN6QixDQUFDO1FBQ0Y7WUFDRSxHQUFDLE1BQU0sQ0FBQyxhQUFhLElBQUcsa0JBQWtCO2VBQzFDO0lBQ0osQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FBQyxBQXBDRCxJQW9DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50U3RyZWFtTWFyc2hhbGxlciBhcyBFdmVudE1hcnNoYWxsZXIgfSBmcm9tIFwiQGF3cy1zZGsvZXZlbnRzdHJlYW0tbWFyc2hhbGxlclwiO1xuaW1wb3J0IHsgRGVjb2RlciwgRW5jb2RlciwgRXZlbnRTdHJlYW1NYXJzaGFsbGVyIGFzIElFdmVudFN0cmVhbU1hcnNoYWxsZXIsIE1lc3NhZ2UgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcblxuaW1wb3J0IHsgZ2V0Q2h1bmtlZFN0cmVhbSB9IGZyb20gXCIuL2dldENodW5rZWRTdHJlYW1cIjtcbmltcG9ydCB7IGdldFVubWFyc2hhbGxlZFN0cmVhbSB9IGZyb20gXCIuL2dldFVubWFyc2hhbGxlZFN0cmVhbVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEV2ZW50U3RyZWFtTWFyc2hhbGxlciBleHRlbmRzIElFdmVudFN0cmVhbU1hcnNoYWxsZXIge31cblxuZXhwb3J0IGludGVyZmFjZSBFdmVudFN0cmVhbU1hcnNoYWxsZXJPcHRpb25zIHtcbiAgdXRmOEVuY29kZXI6IEVuY29kZXI7XG4gIHV0ZjhEZWNvZGVyOiBEZWNvZGVyO1xufVxuXG5leHBvcnQgY2xhc3MgRXZlbnRTdHJlYW1NYXJzaGFsbGVyIHtcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudE1hcnNoYWxsZXI6IEV2ZW50TWFyc2hhbGxlcjtcbiAgcHJpdmF0ZSByZWFkb25seSB1dGZFbmNvZGVyOiBFbmNvZGVyO1xuICBjb25zdHJ1Y3Rvcih7IHV0ZjhFbmNvZGVyLCB1dGY4RGVjb2RlciB9OiBFdmVudFN0cmVhbU1hcnNoYWxsZXJPcHRpb25zKSB7XG4gICAgdGhpcy5ldmVudE1hcnNoYWxsZXIgPSBuZXcgRXZlbnRNYXJzaGFsbGVyKHV0ZjhFbmNvZGVyLCB1dGY4RGVjb2Rlcik7XG4gICAgdGhpcy51dGZFbmNvZGVyID0gdXRmOEVuY29kZXI7XG4gIH1cblxuICBkZXNlcmlhbGl6ZTxUPihcbiAgICBib2R5OiBBc3luY0l0ZXJhYmxlPFVpbnQ4QXJyYXk+LFxuICAgIGRlc2VyaWFsaXplcjogKGlucHV0OiB7IFtldmVudDogc3RyaW5nXTogTWVzc2FnZSB9KSA9PiBQcm9taXNlPFQ+XG4gICk6IEFzeW5jSXRlcmFibGU8VD4ge1xuICAgIGNvbnN0IGNodW5rZWRTdHJlYW0gPSBnZXRDaHVua2VkU3RyZWFtKGJvZHkpO1xuICAgIGNvbnN0IHVubWFyc2hhbGxlZFN0cmVhbSA9IGdldFVubWFyc2hhbGxlZFN0cmVhbShjaHVua2VkU3RyZWFtLCB7XG4gICAgICBldmVudE1hcnNoYWxsZXI6IHRoaXMuZXZlbnRNYXJzaGFsbGVyLFxuICAgICAgZGVzZXJpYWxpemVyLFxuICAgICAgdG9VdGY4OiB0aGlzLnV0ZkVuY29kZXIsXG4gICAgfSk7XG4gICAgcmV0dXJuIHVubWFyc2hhbGxlZFN0cmVhbTtcbiAgfVxuXG4gIHNlcmlhbGl6ZTxUPihpbnB1dDogQXN5bmNJdGVyYWJsZTxUPiwgc2VyaWFsaXplcjogKGV2ZW50OiBUKSA9PiBNZXNzYWdlKTogQXN5bmNJdGVyYWJsZTxVaW50OEFycmF5PiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgY29uc3Qgc2VyaWFsaXplZEl0ZXJhdG9yID0gYXN5bmMgZnVuY3Rpb24qICgpIHtcbiAgICAgIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2YgaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcGF5bG9hZEJ1ZiA9IHNlbGYuZXZlbnRNYXJzaGFsbGVyLm1hcnNoYWxsKHNlcmlhbGl6ZXIoY2h1bmspKTtcbiAgICAgICAgeWllbGQgcGF5bG9hZEJ1ZjtcbiAgICAgIH1cbiAgICAgIC8vIEVuZGluZyBmcmFtZVxuICAgICAgeWllbGQgbmV3IFVpbnQ4QXJyYXkoMCk7XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgW1N5bWJvbC5hc3luY0l0ZXJhdG9yXTogc2VyaWFsaXplZEl0ZXJhdG9yLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==