import { __awaiter, __generator } from "tslib";
import { fromBase64 } from "@aws-sdk/util-base64-browser";
//reference: https://snack.expo.io/r1JCSWRGU
export var streamCollector = function (stream) {
    if (typeof Blob === "function" && stream instanceof Blob) {
        return collectBlob(stream);
    }
    return collectStream(stream);
};
function collectBlob(blob) {
    return __awaiter(this, void 0, void 0, function () {
        var base64, arrayBuffer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readToBase64(blob)];
                case 1:
                    base64 = _a.sent();
                    arrayBuffer = fromBase64(base64);
                    return [2 /*return*/, new Uint8Array(arrayBuffer)];
            }
        });
    });
}
function collectStream(stream) {
    return __awaiter(this, void 0, void 0, function () {
        var res, reader, isDone, _a, done, value, prior;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    res = new Uint8Array(0);
                    reader = stream.getReader();
                    isDone = false;
                    _b.label = 1;
                case 1:
                    if (!!isDone) return [3 /*break*/, 3];
                    return [4 /*yield*/, reader.read()];
                case 2:
                    _a = _b.sent(), done = _a.done, value = _a.value;
                    if (value) {
                        prior = res;
                        res = new Uint8Array(prior.length + value.length);
                        res.set(prior);
                        res.set(value, prior.length);
                    }
                    isDone = done;
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, res];
            }
        });
    });
}
function readToBase64(blob) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onloadend = function () {
            var _a;
            // reference: https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
            // response from readAsDataURL is always prepended with "data:*/*;base64,"
            if (reader.readyState !== 2) {
                return reject(new Error("Reader aborted too early"));
            }
            var result = ((_a = reader.result) !== null && _a !== void 0 ? _a : "");
            // Response can include only 'data:' for empty blob, return empty string in this case.
            // Otherwise, return the string after ','
            var commaIndex = result.indexOf(",");
            var dataOffset = commaIndex > -1 ? commaIndex + 1 : result.length;
            resolve(result.substring(dataOffset));
        };
        reader.onabort = function () { return reject(new Error("Read aborted")); };
        reader.onerror = function () { return reject(reader.error); };
        // reader.readAsArrayBuffer is not always available
        reader.readAsDataURL(blob);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtLWNvbGxlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJlYW0tY29sbGVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsNENBQTRDO0FBQzVDLE1BQU0sQ0FBQyxJQUFNLGVBQWUsR0FBb0IsVUFBQyxNQUE2QjtJQUM1RSxJQUFJLE9BQU8sSUFBSSxLQUFLLFVBQVUsSUFBSSxNQUFNLFlBQVksSUFBSSxFQUFFO1FBQ3hELE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzVCO0lBRUQsT0FBTyxhQUFhLENBQUMsTUFBd0IsQ0FBQyxDQUFDO0FBQ2pELENBQUMsQ0FBQztBQUVGLFNBQWUsV0FBVyxDQUFDLElBQVU7Ozs7O3dCQUNwQixxQkFBTSxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUE7O29CQUFqQyxNQUFNLEdBQUcsU0FBd0I7b0JBQ2pDLFdBQVcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3ZDLHNCQUFPLElBQUksVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFDOzs7O0NBQ3BDO0FBRUQsU0FBZSxhQUFhLENBQUMsTUFBc0I7Ozs7OztvQkFDN0MsR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QixNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUM5QixNQUFNLEdBQUcsS0FBSyxDQUFDOzs7eUJBQ1osQ0FBQyxNQUFNO29CQUNZLHFCQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBQTs7b0JBQXJDLEtBQWtCLFNBQW1CLEVBQW5DLElBQUksVUFBQSxFQUFFLEtBQUssV0FBQTtvQkFDbkIsSUFBSSxLQUFLLEVBQUU7d0JBQ0gsS0FBSyxHQUFHLEdBQUcsQ0FBQzt3QkFDbEIsR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNsRCxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNmLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDOUI7b0JBQ0QsTUFBTSxHQUFHLElBQUksQ0FBQzs7d0JBRWhCLHNCQUFPLEdBQUcsRUFBQzs7OztDQUNaO0FBRUQsU0FBUyxZQUFZLENBQUMsSUFBVTtJQUM5QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07UUFDakMsSUFBTSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUNoQyxNQUFNLENBQUMsU0FBUyxHQUFHOztZQUNqQix1RkFBdUY7WUFDdkYsMEVBQTBFO1lBQzFFLElBQUksTUFBTSxDQUFDLFVBQVUsS0FBSyxDQUFDLEVBQUU7Z0JBQzNCLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQzthQUN0RDtZQUNELElBQU0sTUFBTSxHQUFHLE9BQUMsTUFBTSxDQUFDLE1BQU0sbUNBQUksRUFBRSxDQUFXLENBQUM7WUFDL0Msc0ZBQXNGO1lBQ3RGLHlDQUF5QztZQUN6QyxJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLElBQU0sVUFBVSxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNwRSxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQztRQUNGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsY0FBTSxPQUFBLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFqQyxDQUFpQyxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxPQUFPLEdBQUcsY0FBTSxPQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQXBCLENBQW9CLENBQUM7UUFDNUMsbURBQW1EO1FBQ25ELE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RyZWFtQ29sbGVjdG9yIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5pbXBvcnQgeyBmcm9tQmFzZTY0IH0gZnJvbSBcIkBhd3Mtc2RrL3V0aWwtYmFzZTY0LWJyb3dzZXJcIjtcblxuLy9yZWZlcmVuY2U6IGh0dHBzOi8vc25hY2suZXhwby5pby9yMUpDU1dSR1VcbmV4cG9ydCBjb25zdCBzdHJlYW1Db2xsZWN0b3I6IFN0cmVhbUNvbGxlY3RvciA9IChzdHJlYW06IEJsb2IgfCBSZWFkYWJsZVN0cmVhbSk6IFByb21pc2U8VWludDhBcnJheT4gPT4ge1xuICBpZiAodHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJiBzdHJlYW0gaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgcmV0dXJuIGNvbGxlY3RCbG9iKHN0cmVhbSk7XG4gIH1cblxuICByZXR1cm4gY29sbGVjdFN0cmVhbShzdHJlYW0gYXMgUmVhZGFibGVTdHJlYW0pO1xufTtcblxuYXN5bmMgZnVuY3Rpb24gY29sbGVjdEJsb2IoYmxvYjogQmxvYik6IFByb21pc2U8VWludDhBcnJheT4ge1xuICBjb25zdCBiYXNlNjQgPSBhd2FpdCByZWFkVG9CYXNlNjQoYmxvYik7XG4gIGNvbnN0IGFycmF5QnVmZmVyID0gZnJvbUJhc2U2NChiYXNlNjQpO1xuICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjb2xsZWN0U3RyZWFtKHN0cmVhbTogUmVhZGFibGVTdHJlYW0pOiBQcm9taXNlPFVpbnQ4QXJyYXk+IHtcbiAgbGV0IHJlcyA9IG5ldyBVaW50OEFycmF5KDApO1xuICBjb25zdCByZWFkZXIgPSBzdHJlYW0uZ2V0UmVhZGVyKCk7XG4gIGxldCBpc0RvbmUgPSBmYWxzZTtcbiAgd2hpbGUgKCFpc0RvbmUpIHtcbiAgICBjb25zdCB7IGRvbmUsIHZhbHVlIH0gPSBhd2FpdCByZWFkZXIucmVhZCgpO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgY29uc3QgcHJpb3IgPSByZXM7XG4gICAgICByZXMgPSBuZXcgVWludDhBcnJheShwcmlvci5sZW5ndGggKyB2YWx1ZS5sZW5ndGgpO1xuICAgICAgcmVzLnNldChwcmlvcik7XG4gICAgICByZXMuc2V0KHZhbHVlLCBwcmlvci5sZW5ndGgpO1xuICAgIH1cbiAgICBpc0RvbmUgPSBkb25lO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbmZ1bmN0aW9uIHJlYWRUb0Jhc2U2NChibG9iOiBCbG9iKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiB7XG4gICAgICAvLyByZWZlcmVuY2U6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9GaWxlUmVhZGVyL3JlYWRBc0RhdGFVUkxcbiAgICAgIC8vIHJlc3BvbnNlIGZyb20gcmVhZEFzRGF0YVVSTCBpcyBhbHdheXMgcHJlcGVuZGVkIHdpdGggXCJkYXRhOiovKjtiYXNlNjQsXCJcbiAgICAgIGlmIChyZWFkZXIucmVhZHlTdGF0ZSAhPT0gMikge1xuICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIlJlYWRlciBhYm9ydGVkIHRvbyBlYXJseVwiKSk7XG4gICAgICB9XG4gICAgICBjb25zdCByZXN1bHQgPSAocmVhZGVyLnJlc3VsdCA/PyBcIlwiKSBhcyBzdHJpbmc7XG4gICAgICAvLyBSZXNwb25zZSBjYW4gaW5jbHVkZSBvbmx5ICdkYXRhOicgZm9yIGVtcHR5IGJsb2IsIHJldHVybiBlbXB0eSBzdHJpbmcgaW4gdGhpcyBjYXNlLlxuICAgICAgLy8gT3RoZXJ3aXNlLCByZXR1cm4gdGhlIHN0cmluZyBhZnRlciAnLCdcbiAgICAgIGNvbnN0IGNvbW1hSW5kZXggPSByZXN1bHQuaW5kZXhPZihcIixcIik7XG4gICAgICBjb25zdCBkYXRhT2Zmc2V0ID0gY29tbWFJbmRleCA+IC0xID8gY29tbWFJbmRleCArIDEgOiByZXN1bHQubGVuZ3RoO1xuICAgICAgcmVzb2x2ZShyZXN1bHQuc3Vic3RyaW5nKGRhdGFPZmZzZXQpKTtcbiAgICB9O1xuICAgIHJlYWRlci5vbmFib3J0ID0gKCkgPT4gcmVqZWN0KG5ldyBFcnJvcihcIlJlYWQgYWJvcnRlZFwiKSk7XG4gICAgcmVhZGVyLm9uZXJyb3IgPSAoKSA9PiByZWplY3QocmVhZGVyLmVycm9yKTtcbiAgICAvLyByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIgaXMgbm90IGFsd2F5cyBhdmFpbGFibGVcbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKTtcbiAgfSk7XG59XG4iXX0=