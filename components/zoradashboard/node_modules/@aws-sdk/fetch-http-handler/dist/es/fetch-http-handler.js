import { __values } from "tslib";
import { HttpResponse } from "@aws-sdk/protocol-http";
import { buildQueryString } from "@aws-sdk/querystring-builder";
import { requestTimeout } from "./request-timeout";
var FetchHttpHandler = /** @class */ (function () {
    function FetchHttpHandler(_a) {
        var _b = _a === void 0 ? {} : _a, requestTimeout = _b.requestTimeout;
        this.requestTimeout = requestTimeout;
    }
    FetchHttpHandler.prototype.destroy = function () {
        // Do nothing. TLS and HTTP/2 connection pooling is handled by the browser.
    };
    FetchHttpHandler.prototype.handle = function (request, _a) {
        var _b = _a === void 0 ? {} : _a, abortSignal = _b.abortSignal;
        var requestTimeoutInMs = this.requestTimeout;
        // if the request was already aborted, prevent doing extra work
        if (abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.aborted) {
            var abortError = new Error("Request aborted");
            abortError.name = "AbortError";
            return Promise.reject(abortError);
        }
        var path = request.path;
        if (request.query) {
            var queryString = buildQueryString(request.query);
            if (queryString) {
                path += "?" + queryString;
            }
        }
        var port = request.port, method = request.method;
        var url = request.protocol + "//" + request.hostname + (port ? ":" + port : "") + path;
        // Request constructor doesn't allow GET/HEAD request with body
        // ref: https://github.com/whatwg/fetch/issues/551
        var body = method === "GET" || method === "HEAD" ? undefined : request.body;
        var requestOptions = {
            body: body,
            headers: new Headers(request.headers),
            method: method,
        };
        // some browsers support abort signal
        if (typeof AbortController !== "undefined") {
            requestOptions["signal"] = abortSignal;
        }
        var fetchRequest = new Request(url, requestOptions);
        var raceOfPromises = [
            fetch(fetchRequest).then(function (response) {
                var e_1, _a;
                var fetchHeaders = response.headers;
                var transformedHeaders = {};
                try {
                    for (var _b = __values(fetchHeaders.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var pair = _c.value;
                        transformedHeaders[pair[0]] = pair[1];
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                var hasReadableStream = response.body !== undefined;
                // Return the response with buffered body
                if (!hasReadableStream) {
                    return response.blob().then(function (body) { return ({
                        response: new HttpResponse({
                            headers: transformedHeaders,
                            statusCode: response.status,
                            body: body,
                        }),
                    }); });
                }
                // Return the response with streaming body
                return {
                    response: new HttpResponse({
                        headers: transformedHeaders,
                        statusCode: response.status,
                        body: response.body,
                    }),
                };
            }),
            requestTimeout(requestTimeoutInMs),
        ];
        if (abortSignal) {
            raceOfPromises.push(new Promise(function (resolve, reject) {
                abortSignal.onabort = function () {
                    var abortError = new Error("Request aborted");
                    abortError.name = "AbortError";
                    reject(abortError);
                };
            }));
        }
        return Promise.race(raceOfPromises);
    };
    return FetchHttpHandler;
}());
export { FetchHttpHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2gtaHR0cC1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ZldGNoLWh0dHAtaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUE0QixZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUdoRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFlbkQ7SUFHRSwwQkFBWSxFQUFnRDtZQUFoRCxxQkFBOEMsRUFBRSxLQUFBLEVBQTlDLGNBQWMsb0JBQUE7UUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDdkMsQ0FBQztJQUVELGtDQUFPLEdBQVA7UUFDRSwyRUFBMkU7SUFDN0UsQ0FBQztJQUVELGlDQUFNLEdBQU4sVUFBTyxPQUFvQixFQUFFLEVBQXdDO1lBQXhDLHFCQUFzQyxFQUFFLEtBQUEsRUFBdEMsV0FBVyxpQkFBQTtRQUN4QyxJQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFFL0MsK0RBQStEO1FBQy9ELElBQUksV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLE9BQU8sRUFBRTtZQUN4QixJQUFNLFVBQVUsR0FBRyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2hELFVBQVUsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO1lBQy9CLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNuQztRQUVELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ2pCLElBQU0sV0FBVyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRCxJQUFJLFdBQVcsRUFBRTtnQkFDZixJQUFJLElB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Q0FBQyxjQUFjLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBM0ZELElBMkZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cEhhbmRsZXIsIEh0dHBSZXF1ZXN0LCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGF3cy1zZGsvcHJvdG9jb2wtaHR0cFwiO1xuaW1wb3J0IHsgYnVpbGRRdWVyeVN0cmluZyB9IGZyb20gXCJAYXdzLXNkay9xdWVyeXN0cmluZy1idWlsZGVyXCI7XG5pbXBvcnQgeyBIZWFkZXJCYWcsIEh0dHBIYW5kbGVyT3B0aW9ucyB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5pbXBvcnQgeyByZXF1ZXN0VGltZW91dCB9IGZyb20gXCIuL3JlcXVlc3QtdGltZW91dFwiO1xuXG5kZWNsYXJlIGxldCBBYm9ydENvbnRyb2xsZXI6IGFueTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBodHRwIG9wdGlvbnMgdGhhdCBjYW4gYmUgcGFzc2VkIHRvIGEgYnJvd3NlciBodHRwIGNsaWVudC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGZXRjaEh0dHBIYW5kbGVyT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBhIHJlcXVlc3QgY2FuIHRha2UgYmVmb3JlIGJlaW5nIGF1dG9tYXRpY2FsbHlcbiAgICogdGVybWluYXRlZC5cbiAgICovXG4gIHJlcXVlc3RUaW1lb3V0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgRmV0Y2hIdHRwSGFuZGxlciBpbXBsZW1lbnRzIEh0dHBIYW5kbGVyIHtcbiAgcHJpdmF0ZSByZWFkb25seSByZXF1ZXN0VGltZW91dD86IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcih7IHJlcXVlc3RUaW1lb3V0IH06IEZldGNoSHR0cEhhbmRsZXJPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLnJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIC8vIERvIG5vdGhpbmcuIFRMUyBhbmQgSFRUUC8yIGNvbm5lY3Rpb24gcG9vbGluZyBpcyBoYW5kbGVkIGJ5IHRoZSBicm93c2VyLlxuICB9XG5cbiAgaGFuZGxlKHJlcXVlc3Q6IEh0dHBSZXF1ZXN0LCB7IGFib3J0U2lnbmFsIH06IEh0dHBIYW5kbGVyT3B0aW9ucyA9IHt9KTogUHJvbWlzZTx7IHJlc3BvbnNlOiBIdHRwUmVzcG9uc2UgfT4ge1xuICAgIGNvbnN0IHJlcXVlc3RUaW1lb3V0SW5NcyA9IHRoaXMucmVxdWVzdFRpbWVvdXQ7XG5cbiAgICAvLyBpZiB0aGUgcmVxdWVzdCB3YXMgYWxyZWFkeSBhYm9ydGVkLCBwcmV2ZW50IGRvaW5nIGV4dHJhIHdvcmtcbiAgICBpZiAoYWJvcnRTaWduYWw/LmFib3J0ZWQpIHtcbiAgICAgIGNvbnN0IGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXCJSZXF1ZXN0IGFib3J0ZWRcIik7XG4gICAgICBhYm9ydEVycm9yLm5hbWUgPSBcIkFib3J0RXJyb3JcIjtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiAgICB9XG5cbiAgICBsZXQgcGF0aCA9IHJlcXVlc3QucGF0aDtcbiAgICBpZiAocmVxdWVzdC5xdWVyeSkge1xuICAgICAgY29uc3QgcXVlcnlTdHJpbmcgPSBidWlsZFF1ZXJ5U3RyaW5nKHJlcXVlc3QucXVlcnkpO1xuICAgICAgaWYgKHF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgIHBhdGggKz0gYD8ke3F1ZXJ5U3RyaW5nfWA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgeyBwb3J0LCBtZXRob2QgfSA9IHJlcXVlc3Q7XG4gICAgY29uc3QgdXJsID0gYCR7cmVxdWVzdC5wcm90b2NvbH0vLyR7cmVxdWVzdC5ob3N0bmFtZX0ke3BvcnQgPyBgOiR7cG9ydH1gIDogXCJcIn0ke3BhdGh9YDtcbiAgICAvLyBSZXF1ZXN0IGNvbnN0cnVjdG9yIGRvZXNuJ3QgYWxsb3cgR0VUL0hFQUQgcmVxdWVzdCB3aXRoIGJvZHlcbiAgICAvLyByZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS93aGF0d2cvZmV0Y2gvaXNzdWVzLzU1MVxuICAgIGNvbnN0IGJvZHkgPSBtZXRob2QgPT09IFwiR0VUXCIgfHwgbWV0aG9kID09PSBcIkhFQURcIiA/IHVuZGVmaW5lZCA6IHJlcXVlc3QuYm9keTtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9uczogUmVxdWVzdEluaXQgPSB7XG4gICAgICBib2R5LFxuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnMocmVxdWVzdC5oZWFkZXJzKSxcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgIH07XG5cbiAgICAvLyBzb21lIGJyb3dzZXJzIHN1cHBvcnQgYWJvcnQgc2lnbmFsXG4gICAgaWYgKHR5cGVvZiBBYm9ydENvbnRyb2xsZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIChyZXF1ZXN0T3B0aW9ucyBhcyBhbnkpW1wic2lnbmFsXCJdID0gYWJvcnRTaWduYWw7XG4gICAgfVxuXG4gICAgY29uc3QgZmV0Y2hSZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgY29uc3QgcmFjZU9mUHJvbWlzZXMgPSBbXG4gICAgICBmZXRjaChmZXRjaFJlcXVlc3QpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGNvbnN0IGZldGNoSGVhZGVyczogYW55ID0gcmVzcG9uc2UuaGVhZGVycztcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtZWRIZWFkZXJzOiBIZWFkZXJCYWcgPSB7fTtcblxuICAgICAgICBmb3IgKGNvbnN0IHBhaXIgb2YgPEFycmF5PHN0cmluZ1tdPj5mZXRjaEhlYWRlcnMuZW50cmllcygpKSB7XG4gICAgICAgICAgdHJhbnNmb3JtZWRIZWFkZXJzW3BhaXJbMF1dID0gcGFpclsxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGhhc1JlYWRhYmxlU3RyZWFtID0gcmVzcG9uc2UuYm9keSAhPT0gdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIFJldHVybiB0aGUgcmVzcG9uc2Ugd2l0aCBidWZmZXJlZCBib2R5XG4gICAgICAgIGlmICghaGFzUmVhZGFibGVTdHJlYW0pIHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYmxvYigpLnRoZW4oKGJvZHkpID0+ICh7XG4gICAgICAgICAgICByZXNwb25zZTogbmV3IEh0dHBSZXNwb25zZSh7XG4gICAgICAgICAgICAgIGhlYWRlcnM6IHRyYW5zZm9ybWVkSGVhZGVycyxcbiAgICAgICAgICAgICAgc3RhdHVzQ29kZTogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICAgICBib2R5LFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJldHVybiB0aGUgcmVzcG9uc2Ugd2l0aCBzdHJlYW1pbmcgYm9keVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHJlc3BvbnNlOiBuZXcgSHR0cFJlc3BvbnNlKHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHRyYW5zZm9ybWVkSGVhZGVycyxcbiAgICAgICAgICAgIHN0YXR1c0NvZGU6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgIGJvZHk6IHJlc3BvbnNlLmJvZHksXG4gICAgICAgICAgfSksXG4gICAgICAgIH07XG4gICAgICB9KSxcbiAgICAgIHJlcXVlc3RUaW1lb3V0KHJlcXVlc3RUaW1lb3V0SW5NcyksXG4gICAgXTtcbiAgICBpZiAoYWJvcnRTaWduYWwpIHtcbiAgICAgIHJhY2VPZlByb21pc2VzLnB1c2goXG4gICAgICAgIG5ldyBQcm9taXNlPG5ldmVyPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgYWJvcnRTaWduYWwub25hYm9ydCA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXCJSZXF1ZXN0IGFib3J0ZWRcIik7XG4gICAgICAgICAgICBhYm9ydEVycm9yLm5hbWUgPSBcIkFib3J0RXJyb3JcIjtcbiAgICAgICAgICAgIHJlamVjdChhYm9ydEVycm9yKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmFjZShyYWNlT2ZQcm9taXNlcyk7XG4gIH1cbn1cbiJdfQ==