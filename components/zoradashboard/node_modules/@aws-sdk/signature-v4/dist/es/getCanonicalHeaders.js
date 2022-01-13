import { __values } from "tslib";
import { ALWAYS_UNSIGNABLE_HEADERS, PROXY_HEADER_PATTERN, SEC_HEADER_PATTERN } from "./constants";
/**
 * @internal
 */
export function getCanonicalHeaders(_a, unsignableHeaders, signableHeaders) {
    var e_1, _b;
    var headers = _a.headers;
    var canonical = {};
    try {
        for (var _c = __values(Object.keys(headers).sort()), _d = _c.next(); !_d.done; _d = _c.next()) {
            var headerName = _d.value;
            var canonicalHeaderName = headerName.toLowerCase();
            if (canonicalHeaderName in ALWAYS_UNSIGNABLE_HEADERS || (unsignableHeaders === null || unsignableHeaders === void 0 ? void 0 : unsignableHeaders.has(canonicalHeaderName)) ||
                PROXY_HEADER_PATTERN.test(canonicalHeaderName) ||
                SEC_HEADER_PATTERN.test(canonicalHeaderName)) {
                if (!signableHeaders || (signableHeaders && !signableHeaders.has(canonicalHeaderName))) {
                    continue;
                }
            }
            canonical[canonicalHeaderName] = headers[headerName].trim().replace(/\s+/g, " ");
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return canonical;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q2Fub25pY2FsSGVhZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nZXRDYW5vbmljYWxIZWFkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsb0JBQW9CLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFbEc7O0dBRUc7QUFDSCxNQUFNLFVBQVUsbUJBQW1CLENBQ2pDLEVBQXdCLEVBQ3hCLGlCQUErQixFQUMvQixlQUE2Qjs7UUFGM0IsT0FBTyxhQUFBO0lBSVQsSUFBTSxTQUFTLEdBQWMsRUFBRSxDQUFDOztRQUNoQyxLQUF5QixJQUFBLEtBQUEsU0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBLGdCQUFBLDRCQUFFO1lBQWpELElBQU0sVUFBVSxXQUFBO1lBQ25CLElBQU0sbUJBQW1CLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3JELElBQ0UsbUJBQW1CLElBQUkseUJBQXlCLEtBQ2hELGlCQUFpQixhQUFqQixpQkFBaUIsdUJBQWpCLGlCQUFpQixDQUFFLEdBQUcsQ0FBQyxtQkFBbUIsRUFBQztnQkFDM0Msb0JBQW9CLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDO2dCQUM5QyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsRUFDNUM7Z0JBQ0EsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxFQUFFO29CQUN0RixTQUFTO2lCQUNWO2FBQ0Y7WUFFRCxTQUFTLENBQUMsbUJBQW1CLENBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNsRjs7Ozs7Ozs7O0lBRUQsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhlYWRlckJhZywgSHR0cFJlcXVlc3QgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcblxuaW1wb3J0IHsgQUxXQVlTX1VOU0lHTkFCTEVfSEVBREVSUywgUFJPWFlfSEVBREVSX1BBVFRFUk4sIFNFQ19IRUFERVJfUEFUVEVSTiB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2Fub25pY2FsSGVhZGVycyhcbiAgeyBoZWFkZXJzIH06IEh0dHBSZXF1ZXN0LFxuICB1bnNpZ25hYmxlSGVhZGVycz86IFNldDxzdHJpbmc+LFxuICBzaWduYWJsZUhlYWRlcnM/OiBTZXQ8c3RyaW5nPlxuKTogSGVhZGVyQmFnIHtcbiAgY29uc3QgY2Fub25pY2FsOiBIZWFkZXJCYWcgPSB7fTtcbiAgZm9yIChjb25zdCBoZWFkZXJOYW1lIG9mIE9iamVjdC5rZXlzKGhlYWRlcnMpLnNvcnQoKSkge1xuICAgIGNvbnN0IGNhbm9uaWNhbEhlYWRlck5hbWUgPSBoZWFkZXJOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKFxuICAgICAgY2Fub25pY2FsSGVhZGVyTmFtZSBpbiBBTFdBWVNfVU5TSUdOQUJMRV9IRUFERVJTIHx8XG4gICAgICB1bnNpZ25hYmxlSGVhZGVycz8uaGFzKGNhbm9uaWNhbEhlYWRlck5hbWUpIHx8XG4gICAgICBQUk9YWV9IRUFERVJfUEFUVEVSTi50ZXN0KGNhbm9uaWNhbEhlYWRlck5hbWUpIHx8XG4gICAgICBTRUNfSEVBREVSX1BBVFRFUk4udGVzdChjYW5vbmljYWxIZWFkZXJOYW1lKVxuICAgICkge1xuICAgICAgaWYgKCFzaWduYWJsZUhlYWRlcnMgfHwgKHNpZ25hYmxlSGVhZGVycyAmJiAhc2lnbmFibGVIZWFkZXJzLmhhcyhjYW5vbmljYWxIZWFkZXJOYW1lKSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2Fub25pY2FsW2Nhbm9uaWNhbEhlYWRlck5hbWVdID0gaGVhZGVyc1toZWFkZXJOYW1lXS50cmltKCkucmVwbGFjZSgvXFxzKy9nLCBcIiBcIik7XG4gIH1cblxuICByZXR1cm4gY2Fub25pY2FsO1xufVxuIl19