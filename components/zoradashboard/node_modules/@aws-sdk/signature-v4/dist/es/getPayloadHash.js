import { __awaiter, __generator, __values } from "tslib";
import { isArrayBuffer } from "@aws-sdk/is-array-buffer";
import { toHex } from "@aws-sdk/util-hex-encoding";
import { SHA256_HEADER, UNSIGNED_PAYLOAD } from "./constants";
/**
 * @internal
 */
export function getPayloadHash(_a, hashConstructor) {
    var headers = _a.headers, body = _a.body;
    return __awaiter(this, void 0, void 0, function () {
        var _b, _c, headerName, hashCtor, _d;
        var e_1, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    try {
                        for (_b = __values(Object.keys(headers)), _c = _b.next(); !_c.done; _c = _b.next()) {
                            headerName = _c.value;
                            if (headerName.toLowerCase() === SHA256_HEADER) {
                                return [2 /*return*/, headers[headerName]];
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_e = _b.return)) _e.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    if (!(body == undefined)) return [3 /*break*/, 1];
                    return [2 /*return*/, "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"];
                case 1:
                    if (!(typeof body === "string" || ArrayBuffer.isView(body) || isArrayBuffer(body))) return [3 /*break*/, 3];
                    hashCtor = new hashConstructor();
                    hashCtor.update(body);
                    _d = toHex;
                    return [4 /*yield*/, hashCtor.digest()];
                case 2: return [2 /*return*/, _d.apply(void 0, [_f.sent()])];
                case 3: 
                // As any defined body that is not a string or binary data is a stream, this
                // body is unsignable. Attempt to send the request with an unsigned payload,
                // which may or may not be accepted by the service.
                return [2 /*return*/, UNSIGNED_PAYLOAD];
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UGF5bG9hZEhhc2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZ2V0UGF5bG9hZEhhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUV6RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUU5RDs7R0FFRztBQUNILE1BQU0sVUFBZ0IsY0FBYyxDQUNsQyxFQUE4QixFQUM5QixlQUFnQztRQUQ5QixPQUFPLGFBQUEsRUFBRSxJQUFJLFVBQUE7Ozs7Ozs7O3dCQUdmLEtBQXlCLEtBQUEsU0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBLDRDQUFFOzRCQUFwQyxVQUFVOzRCQUNuQixJQUFJLFVBQVUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxhQUFhLEVBQUU7Z0NBQzlDLHNCQUFPLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBQzs2QkFDNUI7eUJBQ0Y7Ozs7Ozs7Ozt5QkFFRyxDQUFBLElBQUksSUFBSSxTQUFTLENBQUEsRUFBakIsd0JBQWlCO29CQUNuQixzQkFBTyxrRUFBa0UsRUFBQzs7eUJBQ2pFLENBQUEsT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBLEVBQTNFLHdCQUEyRTtvQkFDOUUsUUFBUSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7b0JBQ3ZDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2YsS0FBQSxLQUFLLENBQUE7b0JBQUMscUJBQU0sUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFBO3dCQUFwQyxzQkFBTyxrQkFBTSxTQUF1QixFQUFDLEVBQUM7O2dCQUd4Qyw0RUFBNEU7Z0JBQzVFLDRFQUE0RTtnQkFDNUUsbURBQW1EO2dCQUNuRCxzQkFBTyxnQkFBZ0IsRUFBQzs7OztDQUN6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzQXJyYXlCdWZmZXIgfSBmcm9tIFwiQGF3cy1zZGsvaXMtYXJyYXktYnVmZmVyXCI7XG5pbXBvcnQgeyBIYXNoQ29uc3RydWN0b3IsIEh0dHBSZXF1ZXN0IH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5pbXBvcnQgeyB0b0hleCB9IGZyb20gXCJAYXdzLXNkay91dGlsLWhleC1lbmNvZGluZ1wiO1xuXG5pbXBvcnQgeyBTSEEyNTZfSEVBREVSLCBVTlNJR05FRF9QQVlMT0FEIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQYXlsb2FkSGFzaChcbiAgeyBoZWFkZXJzLCBib2R5IH06IEh0dHBSZXF1ZXN0LFxuICBoYXNoQ29uc3RydWN0b3I6IEhhc2hDb25zdHJ1Y3RvclxuKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgZm9yIChjb25zdCBoZWFkZXJOYW1lIG9mIE9iamVjdC5rZXlzKGhlYWRlcnMpKSB7XG4gICAgaWYgKGhlYWRlck5hbWUudG9Mb3dlckNhc2UoKSA9PT0gU0hBMjU2X0hFQURFUikge1xuICAgICAgcmV0dXJuIGhlYWRlcnNbaGVhZGVyTmFtZV07XG4gICAgfVxuICB9XG5cbiAgaWYgKGJvZHkgPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIFwiZTNiMGM0NDI5OGZjMWMxNDlhZmJmNGM4OTk2ZmI5MjQyN2FlNDFlNDY0OWI5MzRjYTQ5NTk5MWI3ODUyYjg1NVwiO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSBcInN0cmluZ1wiIHx8IEFycmF5QnVmZmVyLmlzVmlldyhib2R5KSB8fCBpc0FycmF5QnVmZmVyKGJvZHkpKSB7XG4gICAgY29uc3QgaGFzaEN0b3IgPSBuZXcgaGFzaENvbnN0cnVjdG9yKCk7XG4gICAgaGFzaEN0b3IudXBkYXRlKGJvZHkpO1xuICAgIHJldHVybiB0b0hleChhd2FpdCBoYXNoQ3Rvci5kaWdlc3QoKSk7XG4gIH1cblxuICAvLyBBcyBhbnkgZGVmaW5lZCBib2R5IHRoYXQgaXMgbm90IGEgc3RyaW5nIG9yIGJpbmFyeSBkYXRhIGlzIGEgc3RyZWFtLCB0aGlzXG4gIC8vIGJvZHkgaXMgdW5zaWduYWJsZS4gQXR0ZW1wdCB0byBzZW5kIHRoZSByZXF1ZXN0IHdpdGggYW4gdW5zaWduZWQgcGF5bG9hZCxcbiAgLy8gd2hpY2ggbWF5IG9yIG1heSBub3QgYmUgYWNjZXB0ZWQgYnkgdGhlIHNlcnZpY2UuXG4gIHJldHVybiBVTlNJR05FRF9QQVlMT0FEO1xufVxuIl19