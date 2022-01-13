import { __assign, __read, __values } from "tslib";
import { HttpResponse } from "@aws-sdk/protocol-http";
import { buildQueryString } from "@aws-sdk/querystring-builder";
import { connect, constants } from "http2";
import { getTransformedHeaders } from "./get-transformed-headers";
import { writeRequestBody } from "./write-request-body";
var NodeHttp2Handler = /** @class */ (function () {
    function NodeHttp2Handler(_a) {
        var _b = _a === void 0 ? {} : _a, requestTimeout = _b.requestTimeout, sessionTimeout = _b.sessionTimeout;
        this.metadata = { handlerProtocol: "h2" };
        this.requestTimeout = requestTimeout;
        this.sessionTimeout = sessionTimeout;
        this.connectionPool = new Map();
    }
    NodeHttp2Handler.prototype.destroy = function () {
        var e_1, _a;
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            for (var _b = __values(this.connectionPool), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), _ = _d[0], http2Session = _d[1];
                http2Session.destroy();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.connectionPool.clear();
    };
    NodeHttp2Handler.prototype.handle = function (request, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, abortSignal = _b.abortSignal;
        return new Promise(function (resolve, reject) {
            var _a;
            // if the request was already aborted, prevent doing extra work
            if (abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.aborted) {
                var abortError = new Error("Request aborted");
                abortError.name = "AbortError";
                reject(abortError);
                return;
            }
            var hostname = request.hostname, method = request.method, port = request.port, protocol = request.protocol, path = request.path, query = request.query;
            var queryString = buildQueryString(query || {});
            // create the http2 request
            var req = _this.getSession(protocol + "//" + hostname + (port ? ":" + port : "")).request(__assign(__assign({}, request.headers), (_a = {}, _a[constants.HTTP2_HEADER_PATH] = queryString ? path + "?" + queryString : path, _a[constants.HTTP2_HEADER_METHOD] = method, _a)));
            req.on("response", function (headers) {
                var httpResponse = new HttpResponse({
                    statusCode: headers[":status"] || -1,
                    headers: getTransformedHeaders(headers),
                    body: req,
                });
                resolve({ response: httpResponse });
            });
            req.on("error", reject);
            req.on("frameError", reject);
            req.on("aborted", reject);
            var requestTimeout = _this.requestTimeout;
            if (requestTimeout) {
                req.setTimeout(requestTimeout, function () {
                    req.close();
                    var timeoutError = new Error("Stream timed out because of no activity for " + requestTimeout + " ms");
                    timeoutError.name = "TimeoutError";
                    reject(timeoutError);
                });
            }
            if (abortSignal) {
                abortSignal.onabort = function () {
                    req.close();
                    var abortError = new Error("Request aborted");
                    abortError.name = "AbortError";
                    reject(abortError);
                };
            }
            writeRequestBody(req, request);
        });
    };
    NodeHttp2Handler.prototype.getSession = function (authority) {
        var connectionPool = this.connectionPool;
        var existingSession = connectionPool.get(authority);
        if (existingSession)
            return existingSession;
        var newSession = connect(authority);
        connectionPool.set(authority, newSession);
        var sessionTimeout = this.sessionTimeout;
        if (sessionTimeout) {
            newSession.setTimeout(sessionTimeout, function () {
                newSession.close();
                connectionPool.delete(authority);
            });
        }
        return newSession;
    };
    return NodeHttp2Handler;
}());
export { NodeHttp2Handler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1odHRwMi1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL25vZGUtaHR0cDItaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUE0QixZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVoRSxPQUFPLEVBQXNCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFL0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFvQnhEO0lBTUUsMEJBQVksRUFBZ0U7WUFBaEUscUJBQThELEVBQUUsS0FBQSxFQUE5RCxjQUFjLG9CQUFBLEVBQUUsY0FBYyxvQkFBQTtRQUY1QixhQUFRLEdBQUcsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFHbkQsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLEdBQUcsRUFBOEIsQ0FBQztJQUM5RCxDQUFDO0lBRUQsa0NBQU8sR0FBUDs7O1lBQ0UsNkRBQTZEO1lBQzdELEtBQWdDLElBQUEsS0FBQSxTQUFBLElBQUksQ0FBQyxjQUFjLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQTFDLElBQUEsS0FBQSxtQkFBaUIsRUFBaEIsQ0FBQyxRQUFBLEVBQUUsWUFBWSxRQUFBO2dCQUN6QixZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDeEI7Ozs7Ozs7OztRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELGlDQUFNLEdBQU4sVUFBTyxPQUFvQixFQUFFLEVBQXdDO1FBQXJF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LENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxxQ0FBVSxHQUFsQixVQUFtQixTQUFpQjtRQUNsQyxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzNDLElBQU0sZUFBZSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEQsSUFBSSxlQUFlO1lBQUUsT0FBTyxlQUFlLENBQUM7UUFFNUMsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLGNBQWMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRTFDLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDM0MsSUFBSSxjQUFjLEVBQUU7WUFDbEIsVUFBVSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUU7Z0JBQ3BDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDbkIsY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuQyxDQUFDLENBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQTdGRCxJQTZGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBIYW5kbGVyLCBIdHRwUmVxdWVzdCwgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhd3Mtc2RrL3Byb3RvY29sLWh0dHBcIjtcbmltcG9ydCB7IGJ1aWxkUXVlcnlTdHJpbmcgfSBmcm9tIFwiQGF3cy1zZGsvcXVlcnlzdHJpbmctYnVpbGRlclwiO1xuaW1wb3J0IHsgSHR0cEhhbmRsZXJPcHRpb25zIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5pbXBvcnQgeyBDbGllbnRIdHRwMlNlc3Npb24sIGNvbm5lY3QsIGNvbnN0YW50cyB9IGZyb20gXCJodHRwMlwiO1xuXG5pbXBvcnQgeyBnZXRUcmFuc2Zvcm1lZEhlYWRlcnMgfSBmcm9tIFwiLi9nZXQtdHJhbnNmb3JtZWQtaGVhZGVyc1wiO1xuaW1wb3J0IHsgd3JpdGVSZXF1ZXN0Qm9keSB9IGZyb20gXCIuL3dyaXRlLXJlcXVlc3QtYm9keVwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGh0dHAyIG9wdGlvbnMgdGhhdCBjYW4gYmUgcGFzc2VkIHRvIGEgbm9kZSBodHRwMiBjbGllbnQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTm9kZUh0dHAySGFuZGxlck9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIG1heGltdW0gdGltZSBpbiBtaWxsaXNlY29uZHMgdGhhdCBhIHN0cmVhbSBtYXkgcmVtYWluIGlkbGUgYmVmb3JlIGl0XG4gICAqIGlzIGNsb3NlZC5cbiAgICovXG4gIHJlcXVlc3RUaW1lb3V0PzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgbWF4aW11bSB0aW1lIGluIG1pbGxpc2Vjb25kcyB0aGF0IGEgc2Vzc2lvbiBvciBzb2NrZXQgbWF5IHJlbWFpbiBpZGxlXG4gICAqIGJlZm9yZSBpdCBpcyBjbG9zZWQuXG4gICAqIGh0dHBzOi8vbm9kZWpzLm9yZy9kb2NzL2xhdGVzdC12MTIueC9hcGkvaHR0cDIuaHRtbCNodHRwMl9odHRwMnNlc3Npb25fYW5kX3NvY2tldHNcbiAgICovXG4gIHNlc3Npb25UaW1lb3V0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgTm9kZUh0dHAySGFuZGxlciBpbXBsZW1lbnRzIEh0dHBIYW5kbGVyIHtcbiAgcHJpdmF0ZSByZWFkb25seSByZXF1ZXN0VGltZW91dD86IG51bWJlcjtcbiAgcHJpdmF0ZSByZWFkb25seSBzZXNzaW9uVGltZW91dD86IG51bWJlcjtcbiAgcHJpdmF0ZSByZWFkb25seSBjb25uZWN0aW9uUG9vbDogTWFwPHN0cmluZywgQ2xpZW50SHR0cDJTZXNzaW9uPjtcbiAgcHVibGljIHJlYWRvbmx5IG1ldGFkYXRhID0geyBoYW5kbGVyUHJvdG9jb2w6IFwiaDJcIiB9O1xuXG4gIGNvbnN0cnVjdG9yKHsgcmVxdWVzdFRpbWVvdXQsIHNlc3Npb25UaW1lb3V0IH06IE5vZGVIdHRwMkhhbmRsZXJPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLnJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gICAgdGhpcy5zZXNzaW9uVGltZW91dCA9IHNlc3Npb25UaW1lb3V0O1xuICAgIHRoaXMuY29ubmVjdGlvblBvb2wgPSBuZXcgTWFwPHN0cmluZywgQ2xpZW50SHR0cDJTZXNzaW9uPigpO1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgZm9yIChjb25zdCBbXywgaHR0cDJTZXNzaW9uXSBvZiB0aGlzLmNvbm5lY3Rpb25Qb29sKSB7XG4gICAgICBodHRwMlNlc3Npb24uZGVzdHJveSgpO1xuICAgIH1cbiAgICB0aGlzLmNvbm5lY3Rpb25Qb29sLmNsZWFyKCk7XG4gIH1cblxuICBoYW5kbGUocmVxdWVzdDogSHR0cFJlcXVlc3QsIHsgYWJvcnRTaWduYWwgfTogSHR0cEhhbmRsZXJPcHRpb25zID0ge30pOiBQcm9taXNlPHsgcmVzcG9uc2U6IEh0dHBSZXNwb25zZSB9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGlmIHRoZSByZXF1ZXN0IHdhcyBhbHJlYWR5IGFib3J0ZWQsIHByZXZlbnQgZG9pbmcgZXh0cmEgd29ya1xuICAgICAgaWYgKGFib3J0U2lnbmFsPy5hYm9ydGVkKSB7XG4gICAgICAgIGNvbnN0IGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXCJSZXF1ZXN0IGFib3J0ZWRcIik7XG4gICAgICAgIGFib3J0RXJyb3IubmFtZSA9IFwiQWJvcnRFcnJvclwiO1xuICAgICAgICByZWplY3QoYWJvcnRFcnJvcik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBob3N0bmFtZSwgbWV0aG9kLCBwb3J0LCBwcm90b2NvbCwgcGF0aCwgcXVlcnkgfSA9IHJlcXVlc3Q7XG4gICAgICBjb25zdCBxdWVyeVN0cmluZyA9IGJ1aWxkUXVlcnlTdHJpbmcocXVlcnkgfHwge30pO1xuXG4gICAgICAvLyBjcmVhdGUgdGhlIGh0dHAyIHJlcXVlc3RcbiAgICAgIGNvbnN0IHJlcSA9IHRoaXMuZ2V0U2Vzc2lvbihgJHtwcm90b2NvbH0vLyR7aG9zdG5hbWV9JHtwb3J0ID8gYDoke3BvcnR9YCA6IFwiXCJ9YCkucmVxdWVzdCh7XG4gICAgICAgIC4uLnJlcXVlc3QuaGVhZGVycyxcbiAgICAgICAgW2NvbnN0YW50cy5IVFRQMl9IRUFERVJfUEFUSF06IHF1ZXJ5U3RyaW5nID8gYCR7cGF0aH0/JHtxdWVyeVN0cmluZ31gIDogcGF0aCxcbiAgICAgICAgW2NvbnN0YW50cy5IVFRQMl9IRUFERVJfTUVUSE9EXTogbWV0aG9kLFxuICAgICAgfSk7XG5cbiAgICAgIHJlcS5vbihcInJlc3BvbnNlXCIsIChoZWFkZXJzKSA9PiB7XG4gICAgICAgIGNvbnN0IGh0dHBSZXNwb25zZSA9IG5ldyBIdHRwUmVzcG9uc2Uoe1xuICAgICAgICAgIHN0YXR1c0NvZGU6IGhlYWRlcnNbXCI6c3RhdHVzXCJdIHx8IC0xLFxuICAgICAgICAgIGhlYWRlcnM6IGdldFRyYW5zZm9ybWVkSGVhZGVycyhoZWFkZXJzKSxcbiAgICAgICAgICBib2R5OiByZXEsXG4gICAgICAgIH0pO1xuICAgICAgICByZXNvbHZlKHsgcmVzcG9uc2U6IGh0dHBSZXNwb25zZSB9KTtcbiAgICAgIH0pO1xuXG4gICAgICByZXEub24oXCJlcnJvclwiLCByZWplY3QpO1xuICAgICAgcmVxLm9uKFwiZnJhbWVFcnJvclwiLCByZWplY3QpO1xuICAgICAgcmVxLm9uKFwiYWJvcnRlZFwiLCByZWplY3QpO1xuXG4gICAgICBjb25zdCByZXF1ZXN0VGltZW91dCA9IHRoaXMucmVxdWVzdFRpbWVvdXQ7XG4gICAgICBpZiAocmVxdWVzdFRpbWVvdXQpIHtcbiAgICAgICAgcmVxLnNldFRpbWVvdXQocmVxdWVzdFRpbWVvdXQsICgpID0+IHtcbiAgICAgICAgICByZXEuY2xvc2UoKTtcbiAgICAgICAgICBjb25zdCB0aW1lb3V0RXJyb3IgPSBuZXcgRXJyb3IoYFN0cmVhbSB0aW1lZCBvdXQgYmVjYXVzZSBvZiBubyBhY3Rpdml0eSBmb3IgJHtyZXF1ZXN0VGltZW91dH0gbXNgKTtcbiAgICAgICAgICB0aW1lb3V0RXJyb3IubmFtZSA9IFwiVGltZW91dEVycm9yXCI7XG4gICAgICAgICAgcmVqZWN0KHRpbWVvdXRFcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWJvcnRTaWduYWwpIHtcbiAgICAgICAgYWJvcnRTaWduYWwub25hYm9ydCA9ICgpID0+IHtcbiAgICAgICAgICByZXEuY2xvc2UoKTtcbiAgICAgICAgICBjb25zdCBhYm9ydEVycm9yID0gbmV3IEVycm9yKFwiUmVxdWVzdCBhYm9ydGVkXCIpO1xuICAgICAgICAgIGFib3J0RXJyb3IubmFtZSA9IFwiQWJvcnRFcnJvclwiO1xuICAgICAgICAgIHJlamVjdChhYm9ydEVycm9yKTtcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgd3JpdGVSZXF1ZXN0Qm9keShyZXEsIHJlcXVlc3QpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTZXNzaW9uKGF1dGhvcml0eTogc3RyaW5nKTogQ2xpZW50SHR0cDJTZXNzaW9uIHtcbiAgICBjb25zdCBjb25uZWN0aW9uUG9vbCA9IHRoaXMuY29ubmVjdGlvblBvb2w7XG4gICAgY29uc3QgZXhpc3RpbmdTZXNzaW9uID0gY29ubmVjdGlvblBvb2wuZ2V0KGF1dGhvcml0eSk7XG4gICAgaWYgKGV4aXN0aW5nU2Vzc2lvbikgcmV0dXJuIGV4aXN0aW5nU2Vzc2lvbjtcblxuICAgIGNvbnN0IG5ld1Nlc3Npb24gPSBjb25uZWN0KGF1dGhvcml0eSk7XG4gICAgY29ubmVjdGlvblBvb2wuc2V0KGF1dGhvcml0eSwgbmV3U2Vzc2lvbik7XG5cbiAgICBjb25zdCBzZXNzaW9uVGltZW91dCA9IHRoaXMuc2Vzc2lvblRpbWVvdXQ7XG4gICAgaWYgKHNlc3Npb25UaW1lb3V0KSB7XG4gICAgICBuZXdTZXNzaW9uLnNldFRpbWVvdXQoc2Vzc2lvblRpbWVvdXQsICgpID0+IHtcbiAgICAgICAgbmV3U2Vzc2lvbi5jbG9zZSgpO1xuICAgICAgICBjb25uZWN0aW9uUG9vbC5kZWxldGUoYXV0aG9yaXR5KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3U2Vzc2lvbjtcbiAgfVxufVxuIl19