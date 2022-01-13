"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchHttpHandler = void 0;
const protocol_http_1 = require("@aws-sdk/protocol-http");
const querystring_builder_1 = require("@aws-sdk/querystring-builder");
const request_timeout_1 = require("./request-timeout");
class FetchHttpHandler {
    constructor({ requestTimeout } = {}) {
        this.requestTimeout = requestTimeout;
    }
    destroy() {
        // Do nothing. TLS and HTTP/2 connection pooling is handled by the browser.
    }
    handle(request, { abortSignal } = {}) {
        const requestTimeoutInMs = this.requestTimeout;
        // if the request was already aborted, prevent doing extra work
        if (abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.aborted) {
            const abortError = new Error("Request aborted");
            abortError.name = "AbortError";
            return Promise.reject(abortError);
        }
        let path = request.path;
        if (request.query) {
            const queryString = querystring_builder_1.buildQueryString(request.query);
            if (queryString) {
                path += `?${queryString}`;
            }
        }
        const { port, method } = request;
        const url = `${request.protocol}//${request.hostname}${port ? `:${port}` : ""}${path}`;
        // Request constructor doesn't allow GET/HEAD request with body
        // ref: https://github.com/whatwg/fetch/issues/551
        const body = method === "GET" || method === "HEAD" ? undefined : request.body;
        const requestOptions = {
            body,
            headers: new Headers(request.headers),
            method: method,
        };
        // some browsers support abort signal
        if (typeof AbortController !== "undefined") {
            requestOptions["signal"] = abortSignal;
        }
        const fetchRequest = new Request(url, requestOptions);
        const raceOfPromises = [
            fetch(fetchRequest).then((response) => {
                const fetchHeaders = response.headers;
                const transformedHeaders = {};
                for (const pair of fetchHeaders.entries()) {
                    transformedHeaders[pair[0]] = pair[1];
                }
                const hasReadableStream = response.body !== undefined;
                // Return the response with buffered body
                if (!hasReadableStream) {
                    return response.blob().then((body) => ({
                        response: new protocol_http_1.HttpResponse({
                            headers: transformedHeaders,
                            statusCode: response.status,
                            body,
                        }),
                    }));
                }
                // Return the response with streaming body
                return {
                    response: new protocol_http_1.HttpResponse({
                        headers: transformedHeaders,
                        statusCode: response.status,
                        body: response.body,
                    }),
                };
            }),
            request_timeout_1.requestTimeout(requestTimeoutInMs),
        ];
        if (abortSignal) {
            raceOfPromises.push(new Promise((resolve, reject) => {
                abortSignal.onabort = () => {
                    const abortError = new Error("Request aborted");
                    abortError.name = "AbortError";
                    reject(abortError);
                };
            }));
        }
        return Promise.race(raceOfPromises);
    }
}
exports.FetchHttpHandler = FetchHttpHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2gtaHR0cC1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ZldGNoLWh0dHAtaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBZ0Y7QUFDaEYsc0VBQWdFO0FBR2hFLHVEQUFtRDtBQWVuRCxNQUFhLGdCQUFnQjtJQUczQixZQUFZLEVBQUUsY0FBYyxLQUE4QixFQUFFO1FBQzFELElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxPQUFPO1FBQ0wsMkVBQTJFO0lBQzdFLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBb0IsRUFBRSxFQUFFLFdBQVcsS0FBeUIsRUFBRTtRQUNuRSxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFFL0MsK0RBQStEO1FBQy9ELElBQUksV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLE9BQU8sRUFBRTtZQUN4QixNQUFNLFVBQVUsR0FBRyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2hELFVBQVUsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO1lBQy9CLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNuQztRQUVELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ2pCLE1BQU0sV0FBVyxHQUFHLHNDQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRCxJQUFJLFdBQVcsRUFBRTtnQkFDZixJQUFJLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQzthQUMzQjtTQUNGO1FBRUQsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDakMsTUFBTSxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDdkYsK0RBQStEO1FBQy9ELGtEQUFrRDtRQUNsRCxNQUFNLElBQUksR0FBRyxNQUFNLEtBQUssS0FBSyxJQUFJLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUM5RSxNQUFNLGNBQWMsR0FBZ0I7WUFDbEMsSUFBSTtZQUNKLE9BQU8sRUFBRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ3JDLE1BQU0sRUFBRSxNQUFNO1NBQ2YsQ0FBQztRQUVGLHFDQUFxQztRQUNyQyxJQUFJLE9BQU8sZUFBZSxLQUFLLFdBQVcsRUFBRTtZQUN6QyxjQUFzQixDQUFDLFFBQVEsQ0FBQyxHQUFHLFdBQVcsQ0FBQztTQUNqRDtRQUVELE1BQU0sWUFBWSxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN0RCxNQUFNLGNBQWMsR0FBRztZQUNyQixLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQ3BDLE1BQU0sWUFBWSxHQUFRLFFBQVEsQ0FBQyxPQUFPLENBQUM7Z0JBQzNDLE1BQU0sa0JBQWtCLEdBQWMsRUFBRSxDQUFDO2dCQUV6QyxLQUFLLE1BQU0sSUFBSSxJQUFxQixZQUFZLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQzFELGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDdkM7Z0JBRUQsTUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQztnQkFFdEQseUNBQXlDO2dCQUN6QyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7b0JBQ3RCLE9BQU8sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDckMsUUFBUSxFQUFFLElBQUksNEJBQVksQ0FBQzs0QkFDekIsT0FBTyxFQUFFLGtCQUFrQjs0QkFDM0IsVUFBVSxFQUFFLFFBQVEsQ0FBQyxNQUFNOzRCQUMzQixJQUFJO3lCQUNMLENBQUM7cUJBQ0gsQ0FBQyxDQUFDLENBQUM7aUJBQ0w7Z0JBQ0QsMENBQTBDO2dCQUMxQyxPQUFPO29CQUNMLFFBQVEsRUFBRSxJQUFJLDRCQUFZLENBQUM7d0JBQ3pCLE9BQU8sRUFBRSxrQkFBa0I7d0JBQzNCLFVBQVUsRUFBRSxRQUFRLENBQUMsTUFBTTt3QkFDM0IsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO3FCQUNwQixDQUFDO2lCQUNILENBQUM7WUFDSixDQUFDLENBQUM7WUFDRixnQ0FBYyxDQUFDLGtCQUFrQixDQUFDO1NBQ25DLENBQUM7UUFDRixJQUFJLFdBQVcsRUFBRTtZQUNmLGNBQWMsQ0FBQyxJQUFJLENBQ2pCLElBQUksT0FBTyxDQUFRLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUNyQyxXQUFXLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRTtvQkFDekIsTUFBTSxVQUFVLEdBQUcsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQkFDaEQsVUFBVSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7b0JBQy9CLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDckIsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FBQztTQUNIO1FBQ0QsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Q0FDRjtBQTNGRCw0Q0EyRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwSGFuZGxlciwgSHR0cFJlcXVlc3QsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYXdzLXNkay9wcm90b2NvbC1odHRwXCI7XG5pbXBvcnQgeyBidWlsZFF1ZXJ5U3RyaW5nIH0gZnJvbSBcIkBhd3Mtc2RrL3F1ZXJ5c3RyaW5nLWJ1aWxkZXJcIjtcbmltcG9ydCB7IEhlYWRlckJhZywgSHR0cEhhbmRsZXJPcHRpb25zIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5cbmltcG9ydCB7IHJlcXVlc3RUaW1lb3V0IH0gZnJvbSBcIi4vcmVxdWVzdC10aW1lb3V0XCI7XG5cbmRlY2xhcmUgbGV0IEFib3J0Q29udHJvbGxlcjogYW55O1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGh0dHAgb3B0aW9ucyB0aGF0IGNhbiBiZSBwYXNzZWQgdG8gYSBicm93c2VyIGh0dHAgY2xpZW50LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEZldGNoSHR0cEhhbmRsZXJPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGEgcmVxdWVzdCBjYW4gdGFrZSBiZWZvcmUgYmVpbmcgYXV0b21hdGljYWxseVxuICAgKiB0ZXJtaW5hdGVkLlxuICAgKi9cbiAgcmVxdWVzdFRpbWVvdXQ/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBGZXRjaEh0dHBIYW5kbGVyIGltcGxlbWVudHMgSHR0cEhhbmRsZXIge1xuICBwcml2YXRlIHJlYWRvbmx5IHJlcXVlc3RUaW1lb3V0PzogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHsgcmVxdWVzdFRpbWVvdXQgfTogRmV0Y2hIdHRwSGFuZGxlck9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMucmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgLy8gRG8gbm90aGluZy4gVExTIGFuZCBIVFRQLzIgY29ubmVjdGlvbiBwb29saW5nIGlzIGhhbmRsZWQgYnkgdGhlIGJyb3dzZXIuXG4gIH1cblxuICBoYW5kbGUocmVxdWVzdDogSHR0cFJlcXVlc3QsIHsgYWJvcnRTaWduYWwgfTogSHR0cEhhbmRsZXJPcHRpb25zID0ge30pOiBQcm9taXNlPHsgcmVzcG9uc2U6IEh0dHBSZXNwb25zZSB9PiB7XG4gICAgY29uc3QgcmVxdWVzdFRpbWVvdXRJbk1zID0gdGhpcy5yZXF1ZXN0VGltZW91dDtcblxuICAgIC8vIGlmIHRoZSByZXF1ZXN0IHdhcyBhbHJlYWR5IGFib3J0ZWQsIHByZXZlbnQgZG9pbmcgZXh0cmEgd29ya1xuICAgIGlmIChhYm9ydFNpZ25hbD8uYWJvcnRlZCkge1xuICAgICAgY29uc3QgYWJvcnRFcnJvciA9IG5ldyBFcnJvcihcIlJlcXVlc3QgYWJvcnRlZFwiKTtcbiAgICAgIGFib3J0RXJyb3IubmFtZSA9IFwiQWJvcnRFcnJvclwiO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuICAgIH1cblxuICAgIGxldCBwYXRoID0gcmVxdWVzdC5wYXRoO1xuICAgIGlmIChyZXF1ZXN0LnF1ZXJ5KSB7XG4gICAgICBjb25zdCBxdWVyeVN0cmluZyA9IGJ1aWxkUXVlcnlTdHJpbmcocmVxdWVzdC5xdWVyeSk7XG4gICAgICBpZiAocXVlcnlTdHJpbmcpIHtcbiAgICAgICAgcGF0aCArPSBgPyR7cXVlcnlTdHJpbmd9YDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB7IHBvcnQsIG1ldGhvZCB9ID0gcmVxdWVzdDtcbiAgICBjb25zdCB1cmwgPSBgJHtyZXF1ZXN0LnByb3RvY29sfS8vJHtyZXF1ZXN0Lmhvc3RuYW1lfSR7cG9ydCA/IGA6JHtwb3J0fWAgOiBcIlwifSR7cGF0aH1gO1xuICAgIC8vIFJlcXVlc3QgY29uc3RydWN0b3IgZG9lc24ndCBhbGxvdyBHRVQvSEVBRCByZXF1ZXN0IHdpdGggYm9keVxuICAgIC8vIHJlZjogaHR0cHM6Ly9naXRodWIuY29tL3doYXR3Zy9mZXRjaC9pc3N1ZXMvNTUxXG4gICAgY29uc3QgYm9keSA9IG1ldGhvZCA9PT0gXCJHRVRcIiB8fCBtZXRob2QgPT09IFwiSEVBRFwiID8gdW5kZWZpbmVkIDogcmVxdWVzdC5ib2R5O1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zOiBSZXF1ZXN0SW5pdCA9IHtcbiAgICAgIGJvZHksXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyhyZXF1ZXN0LmhlYWRlcnMpLFxuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgfTtcblxuICAgIC8vIHNvbWUgYnJvd3NlcnMgc3VwcG9ydCBhYm9ydCBzaWduYWxcbiAgICBpZiAodHlwZW9mIEFib3J0Q29udHJvbGxlciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgKHJlcXVlc3RPcHRpb25zIGFzIGFueSlbXCJzaWduYWxcIl0gPSBhYm9ydFNpZ25hbDtcbiAgICB9XG5cbiAgICBjb25zdCBmZXRjaFJlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwsIHJlcXVlc3RPcHRpb25zKTtcbiAgICBjb25zdCByYWNlT2ZQcm9taXNlcyA9IFtcbiAgICAgIGZldGNoKGZldGNoUmVxdWVzdCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgY29uc3QgZmV0Y2hIZWFkZXJzOiBhbnkgPSByZXNwb25zZS5oZWFkZXJzO1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm1lZEhlYWRlcnM6IEhlYWRlckJhZyA9IHt9O1xuXG4gICAgICAgIGZvciAoY29uc3QgcGFpciBvZiA8QXJyYXk8c3RyaW5nW10+PmZldGNoSGVhZGVycy5lbnRyaWVzKCkpIHtcbiAgICAgICAgICB0cmFuc2Zvcm1lZEhlYWRlcnNbcGFpclswXV0gPSBwYWlyWzFdO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaGFzUmVhZGFibGVTdHJlYW0gPSByZXNwb25zZS5ib2R5ICE9PSB1bmRlZmluZWQ7XG5cbiAgICAgICAgLy8gUmV0dXJuIHRoZSByZXNwb25zZSB3aXRoIGJ1ZmZlcmVkIGJvZHlcbiAgICAgICAgaWYgKCFoYXNSZWFkYWJsZVN0cmVhbSkge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5ibG9iKCkudGhlbigoYm9keSkgPT4gKHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBuZXcgSHR0cFJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgaGVhZGVyczogdHJhbnNmb3JtZWRIZWFkZXJzLFxuICAgICAgICAgICAgICBzdGF0dXNDb2RlOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgICAgIGJvZHksXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmV0dXJuIHRoZSByZXNwb25zZSB3aXRoIHN0cmVhbWluZyBib2R5XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcmVzcG9uc2U6IG5ldyBIdHRwUmVzcG9uc2Uoe1xuICAgICAgICAgICAgaGVhZGVyczogdHJhbnNmb3JtZWRIZWFkZXJzLFxuICAgICAgICAgICAgc3RhdHVzQ29kZTogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICAgYm9keTogcmVzcG9uc2UuYm9keSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfTtcbiAgICAgIH0pLFxuICAgICAgcmVxdWVzdFRpbWVvdXQocmVxdWVzdFRpbWVvdXRJbk1zKSxcbiAgICBdO1xuICAgIGlmIChhYm9ydFNpZ25hbCkge1xuICAgICAgcmFjZU9mUHJvbWlzZXMucHVzaChcbiAgICAgICAgbmV3IFByb21pc2U8bmV2ZXI+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBhYm9ydFNpZ25hbC5vbmFib3J0ID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYWJvcnRFcnJvciA9IG5ldyBFcnJvcihcIlJlcXVlc3QgYWJvcnRlZFwiKTtcbiAgICAgICAgICAgIGFib3J0RXJyb3IubmFtZSA9IFwiQWJvcnRFcnJvclwiO1xuICAgICAgICAgICAgcmVqZWN0KGFib3J0RXJyb3IpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yYWNlKHJhY2VPZlByb21pc2VzKTtcbiAgfVxufVxuIl19