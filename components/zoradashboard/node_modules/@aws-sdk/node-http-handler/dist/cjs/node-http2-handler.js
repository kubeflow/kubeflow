"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeHttp2Handler = void 0;
const protocol_http_1 = require("@aws-sdk/protocol-http");
const querystring_builder_1 = require("@aws-sdk/querystring-builder");
const http2_1 = require("http2");
const get_transformed_headers_1 = require("./get-transformed-headers");
const write_request_body_1 = require("./write-request-body");
class NodeHttp2Handler {
    constructor({ requestTimeout, sessionTimeout } = {}) {
        this.metadata = { handlerProtocol: "h2" };
        this.requestTimeout = requestTimeout;
        this.sessionTimeout = sessionTimeout;
        this.connectionPool = new Map();
    }
    destroy() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [_, http2Session] of this.connectionPool) {
            http2Session.destroy();
        }
        this.connectionPool.clear();
    }
    handle(request, { abortSignal } = {}) {
        return new Promise((resolve, reject) => {
            // if the request was already aborted, prevent doing extra work
            if (abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.aborted) {
                const abortError = new Error("Request aborted");
                abortError.name = "AbortError";
                reject(abortError);
                return;
            }
            const { hostname, method, port, protocol, path, query } = request;
            const queryString = querystring_builder_1.buildQueryString(query || {});
            // create the http2 request
            const req = this.getSession(`${protocol}//${hostname}${port ? `:${port}` : ""}`).request({
                ...request.headers,
                [http2_1.constants.HTTP2_HEADER_PATH]: queryString ? `${path}?${queryString}` : path,
                [http2_1.constants.HTTP2_HEADER_METHOD]: method,
            });
            req.on("response", (headers) => {
                const httpResponse = new protocol_http_1.HttpResponse({
                    statusCode: headers[":status"] || -1,
                    headers: get_transformed_headers_1.getTransformedHeaders(headers),
                    body: req,
                });
                resolve({ response: httpResponse });
            });
            req.on("error", reject);
            req.on("frameError", reject);
            req.on("aborted", reject);
            const requestTimeout = this.requestTimeout;
            if (requestTimeout) {
                req.setTimeout(requestTimeout, () => {
                    req.close();
                    const timeoutError = new Error(`Stream timed out because of no activity for ${requestTimeout} ms`);
                    timeoutError.name = "TimeoutError";
                    reject(timeoutError);
                });
            }
            if (abortSignal) {
                abortSignal.onabort = () => {
                    req.close();
                    const abortError = new Error("Request aborted");
                    abortError.name = "AbortError";
                    reject(abortError);
                };
            }
            write_request_body_1.writeRequestBody(req, request);
        });
    }
    getSession(authority) {
        const connectionPool = this.connectionPool;
        const existingSession = connectionPool.get(authority);
        if (existingSession)
            return existingSession;
        const newSession = http2_1.connect(authority);
        connectionPool.set(authority, newSession);
        const sessionTimeout = this.sessionTimeout;
        if (sessionTimeout) {
            newSession.setTimeout(sessionTimeout, () => {
                newSession.close();
                connectionPool.delete(authority);
            });
        }
        return newSession;
    }
}
exports.NodeHttp2Handler = NodeHttp2Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1odHRwMi1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL25vZGUtaHR0cDItaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBZ0Y7QUFDaEYsc0VBQWdFO0FBRWhFLGlDQUErRDtBQUUvRCx1RUFBa0U7QUFDbEUsNkRBQXdEO0FBb0J4RCxNQUFhLGdCQUFnQjtJQU0zQixZQUFZLEVBQUUsY0FBYyxFQUFFLGNBQWMsS0FBOEIsRUFBRTtRQUY1RCxhQUFRLEdBQUcsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFHbkQsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLEdBQUcsRUFBOEIsQ0FBQztJQUM5RCxDQUFDO0lBRUQsT0FBTztRQUNMLDZEQUE2RDtRQUM3RCxLQUFLLE1BQU0sQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNuRCxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDeEI7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBb0IsRUFBRSxFQUFFLFdBQVcsS0FBeUIsRUFBRTtRQUNuRSxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLCtEQUErRDtZQUMvRCxJQUFJLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxPQUFPLEVBQUU7Z0JBQ3hCLE1BQU0sVUFBVSxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQ2hELFVBQVUsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO2dCQUMvQixNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7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QUFFLFVBQVUsQ0FBQyxDQUFDO1FBRTFDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDM0MsSUFBSSxjQUFjLEVBQUU7WUFDbEIsVUFBVSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFO2dCQUN6QyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ25CLGNBQWMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Q0FDRjtBQTdGRCw0Q0E2RkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwSGFuZGxlciwgSHR0cFJlcXVlc3QsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYXdzLXNkay9wcm90b2NvbC1odHRwXCI7XG5pbXBvcnQgeyBidWlsZFF1ZXJ5U3RyaW5nIH0gZnJvbSBcIkBhd3Mtc2RrL3F1ZXJ5c3RyaW5nLWJ1aWxkZXJcIjtcbmltcG9ydCB7IEh0dHBIYW5kbGVyT3B0aW9ucyB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuaW1wb3J0IHsgQ2xpZW50SHR0cDJTZXNzaW9uLCBjb25uZWN0LCBjb25zdGFudHMgfSBmcm9tIFwiaHR0cDJcIjtcblxuaW1wb3J0IHsgZ2V0VHJhbnNmb3JtZWRIZWFkZXJzIH0gZnJvbSBcIi4vZ2V0LXRyYW5zZm9ybWVkLWhlYWRlcnNcIjtcbmltcG9ydCB7IHdyaXRlUmVxdWVzdEJvZHkgfSBmcm9tIFwiLi93cml0ZS1yZXF1ZXN0LWJvZHlcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBodHRwMiBvcHRpb25zIHRoYXQgY2FuIGJlIHBhc3NlZCB0byBhIG5vZGUgaHR0cDIgY2xpZW50LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5vZGVIdHRwMkhhbmRsZXJPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBtYXhpbXVtIHRpbWUgaW4gbWlsbGlzZWNvbmRzIHRoYXQgYSBzdHJlYW0gbWF5IHJlbWFpbiBpZGxlIGJlZm9yZSBpdFxuICAgKiBpcyBjbG9zZWQuXG4gICAqL1xuICByZXF1ZXN0VGltZW91dD86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIG1heGltdW0gdGltZSBpbiBtaWxsaXNlY29uZHMgdGhhdCBhIHNlc3Npb24gb3Igc29ja2V0IG1heSByZW1haW4gaWRsZVxuICAgKiBiZWZvcmUgaXQgaXMgY2xvc2VkLlxuICAgKiBodHRwczovL25vZGVqcy5vcmcvZG9jcy9sYXRlc3QtdjEyLngvYXBpL2h0dHAyLmh0bWwjaHR0cDJfaHR0cDJzZXNzaW9uX2FuZF9zb2NrZXRzXG4gICAqL1xuICBzZXNzaW9uVGltZW91dD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIE5vZGVIdHRwMkhhbmRsZXIgaW1wbGVtZW50cyBIdHRwSGFuZGxlciB7XG4gIHByaXZhdGUgcmVhZG9ubHkgcmVxdWVzdFRpbWVvdXQ/OiBudW1iZXI7XG4gIHByaXZhdGUgcmVhZG9ubHkgc2Vzc2lvblRpbWVvdXQ/OiBudW1iZXI7XG4gIHByaXZhdGUgcmVhZG9ubHkgY29ubmVjdGlvblBvb2w6IE1hcDxzdHJpbmcsIENsaWVudEh0dHAyU2Vzc2lvbj47XG4gIHB1YmxpYyByZWFkb25seSBtZXRhZGF0YSA9IHsgaGFuZGxlclByb3RvY29sOiBcImgyXCIgfTtcblxuICBjb25zdHJ1Y3Rvcih7IHJlcXVlc3RUaW1lb3V0LCBzZXNzaW9uVGltZW91dCB9OiBOb2RlSHR0cDJIYW5kbGVyT3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5yZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuICAgIHRoaXMuc2Vzc2lvblRpbWVvdXQgPSBzZXNzaW9uVGltZW91dDtcbiAgICB0aGlzLmNvbm5lY3Rpb25Qb29sID0gbmV3IE1hcDxzdHJpbmcsIENsaWVudEh0dHAyU2Vzc2lvbj4oKTtcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgIGZvciAoY29uc3QgW18sIGh0dHAyU2Vzc2lvbl0gb2YgdGhpcy5jb25uZWN0aW9uUG9vbCkge1xuICAgICAgaHR0cDJTZXNzaW9uLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgdGhpcy5jb25uZWN0aW9uUG9vbC5jbGVhcigpO1xuICB9XG5cbiAgaGFuZGxlKHJlcXVlc3Q6IEh0dHBSZXF1ZXN0LCB7IGFib3J0U2lnbmFsIH06IEh0dHBIYW5kbGVyT3B0aW9ucyA9IHt9KTogUHJvbWlzZTx7IHJlc3BvbnNlOiBIdHRwUmVzcG9uc2UgfT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBpZiB0aGUgcmVxdWVzdCB3YXMgYWxyZWFkeSBhYm9ydGVkLCBwcmV2ZW50IGRvaW5nIGV4dHJhIHdvcmtcbiAgICAgIGlmIChhYm9ydFNpZ25hbD8uYWJvcnRlZCkge1xuICAgICAgICBjb25zdCBhYm9ydEVycm9yID0gbmV3IEVycm9yKFwiUmVxdWVzdCBhYm9ydGVkXCIpO1xuICAgICAgICBhYm9ydEVycm9yLm5hbWUgPSBcIkFib3J0RXJyb3JcIjtcbiAgICAgICAgcmVqZWN0KGFib3J0RXJyb3IpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgaG9zdG5hbWUsIG1ldGhvZCwgcG9ydCwgcHJvdG9jb2wsIHBhdGgsIHF1ZXJ5IH0gPSByZXF1ZXN0O1xuICAgICAgY29uc3QgcXVlcnlTdHJpbmcgPSBidWlsZFF1ZXJ5U3RyaW5nKHF1ZXJ5IHx8IHt9KTtcblxuICAgICAgLy8gY3JlYXRlIHRoZSBodHRwMiByZXF1ZXN0XG4gICAgICBjb25zdCByZXEgPSB0aGlzLmdldFNlc3Npb24oYCR7cHJvdG9jb2x9Ly8ke2hvc3RuYW1lfSR7cG9ydCA/IGA6JHtwb3J0fWAgOiBcIlwifWApLnJlcXVlc3Qoe1xuICAgICAgICAuLi5yZXF1ZXN0LmhlYWRlcnMsXG4gICAgICAgIFtjb25zdGFudHMuSFRUUDJfSEVBREVSX1BBVEhdOiBxdWVyeVN0cmluZyA/IGAke3BhdGh9PyR7cXVlcnlTdHJpbmd9YCA6IHBhdGgsXG4gICAgICAgIFtjb25zdGFudHMuSFRUUDJfSEVBREVSX01FVEhPRF06IG1ldGhvZCxcbiAgICAgIH0pO1xuXG4gICAgICByZXEub24oXCJyZXNwb25zZVwiLCAoaGVhZGVycykgPT4ge1xuICAgICAgICBjb25zdCBodHRwUmVzcG9uc2UgPSBuZXcgSHR0cFJlc3BvbnNlKHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiBoZWFkZXJzW1wiOnN0YXR1c1wiXSB8fCAtMSxcbiAgICAgICAgICBoZWFkZXJzOiBnZXRUcmFuc2Zvcm1lZEhlYWRlcnMoaGVhZGVycyksXG4gICAgICAgICAgYm9keTogcmVxLFxuICAgICAgICB9KTtcbiAgICAgICAgcmVzb2x2ZSh7IHJlc3BvbnNlOiBodHRwUmVzcG9uc2UgfSk7XG4gICAgICB9KTtcblxuICAgICAgcmVxLm9uKFwiZXJyb3JcIiwgcmVqZWN0KTtcbiAgICAgIHJlcS5vbihcImZyYW1lRXJyb3JcIiwgcmVqZWN0KTtcbiAgICAgIHJlcS5vbihcImFib3J0ZWRcIiwgcmVqZWN0KTtcblxuICAgICAgY29uc3QgcmVxdWVzdFRpbWVvdXQgPSB0aGlzLnJlcXVlc3RUaW1lb3V0O1xuICAgICAgaWYgKHJlcXVlc3RUaW1lb3V0KSB7XG4gICAgICAgIHJlcS5zZXRUaW1lb3V0KHJlcXVlc3RUaW1lb3V0LCAoKSA9PiB7XG4gICAgICAgICAgcmVxLmNsb3NlKCk7XG4gICAgICAgICAgY29uc3QgdGltZW91dEVycm9yID0gbmV3IEVycm9yKGBTdHJlYW0gdGltZWQgb3V0IGJlY2F1c2Ugb2Ygbm8gYWN0aXZpdHkgZm9yICR7cmVxdWVzdFRpbWVvdXR9IG1zYCk7XG4gICAgICAgICAgdGltZW91dEVycm9yLm5hbWUgPSBcIlRpbWVvdXRFcnJvclwiO1xuICAgICAgICAgIHJlamVjdCh0aW1lb3V0RXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFib3J0U2lnbmFsKSB7XG4gICAgICAgIGFib3J0U2lnbmFsLm9uYWJvcnQgPSAoKSA9PiB7XG4gICAgICAgICAgcmVxLmNsb3NlKCk7XG4gICAgICAgICAgY29uc3QgYWJvcnRFcnJvciA9IG5ldyBFcnJvcihcIlJlcXVlc3QgYWJvcnRlZFwiKTtcbiAgICAgICAgICBhYm9ydEVycm9yLm5hbWUgPSBcIkFib3J0RXJyb3JcIjtcbiAgICAgICAgICByZWplY3QoYWJvcnRFcnJvcik7XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHdyaXRlUmVxdWVzdEJvZHkocmVxLCByZXF1ZXN0KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U2Vzc2lvbihhdXRob3JpdHk6IHN0cmluZyk6IENsaWVudEh0dHAyU2Vzc2lvbiB7XG4gICAgY29uc3QgY29ubmVjdGlvblBvb2wgPSB0aGlzLmNvbm5lY3Rpb25Qb29sO1xuICAgIGNvbnN0IGV4aXN0aW5nU2Vzc2lvbiA9IGNvbm5lY3Rpb25Qb29sLmdldChhdXRob3JpdHkpO1xuICAgIGlmIChleGlzdGluZ1Nlc3Npb24pIHJldHVybiBleGlzdGluZ1Nlc3Npb247XG5cbiAgICBjb25zdCBuZXdTZXNzaW9uID0gY29ubmVjdChhdXRob3JpdHkpO1xuICAgIGNvbm5lY3Rpb25Qb29sLnNldChhdXRob3JpdHksIG5ld1Nlc3Npb24pO1xuXG4gICAgY29uc3Qgc2Vzc2lvblRpbWVvdXQgPSB0aGlzLnNlc3Npb25UaW1lb3V0O1xuICAgIGlmIChzZXNzaW9uVGltZW91dCkge1xuICAgICAgbmV3U2Vzc2lvbi5zZXRUaW1lb3V0KHNlc3Npb25UaW1lb3V0LCAoKSA9PiB7XG4gICAgICAgIG5ld1Nlc3Npb24uY2xvc2UoKTtcbiAgICAgICAgY29ubmVjdGlvblBvb2wuZGVsZXRlKGF1dGhvcml0eSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld1Nlc3Npb247XG4gIH1cbn1cbiJdfQ==