"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeHttpHandler = void 0;
const protocol_http_1 = require("@aws-sdk/protocol-http");
const querystring_builder_1 = require("@aws-sdk/querystring-builder");
const http_1 = require("http");
const https_1 = require("https");
const constants_1 = require("./constants");
const get_transformed_headers_1 = require("./get-transformed-headers");
const set_connection_timeout_1 = require("./set-connection-timeout");
const set_socket_timeout_1 = require("./set-socket-timeout");
const write_request_body_1 = require("./write-request-body");
class NodeHttpHandler {
    constructor({ connectionTimeout, socketTimeout, httpAgent, httpsAgent } = {}) {
        // Node http handler is hard-coded to http/1.1: https://github.com/nodejs/node/blob/ff5664b83b89c55e4ab5d5f60068fb457f1f5872/lib/_http_server.js#L286
        this.metadata = { handlerProtocol: "http/1.1" };
        this.connectionTimeout = connectionTimeout;
        this.socketTimeout = socketTimeout;
        const keepAlive = true;
        const maxSockets = 50;
        this.httpAgent = httpAgent || new http_1.Agent({ keepAlive, maxSockets });
        this.httpsAgent = httpsAgent || new https_1.Agent({ keepAlive, maxSockets });
    }
    destroy() {
        this.httpAgent.destroy();
        this.httpsAgent.destroy();
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
            // determine which http(s) client to use
            const isSSL = request.protocol === "https:";
            const queryString = querystring_builder_1.buildQueryString(request.query || {});
            const nodeHttpsOptions = {
                headers: request.headers,
                host: request.hostname,
                method: request.method,
                path: queryString ? `${request.path}?${queryString}` : request.path,
                port: request.port,
                agent: isSSL ? this.httpsAgent : this.httpAgent,
            };
            // create the http request
            const requestFunc = isSSL ? https_1.request : http_1.request;
            const req = requestFunc(nodeHttpsOptions, (res) => {
                const httpResponse = new protocol_http_1.HttpResponse({
                    statusCode: res.statusCode || -1,
                    headers: get_transformed_headers_1.getTransformedHeaders(res.headers),
                    body: res,
                });
                resolve({ response: httpResponse });
            });
            req.on("error", (err) => {
                if (constants_1.NODEJS_TIMEOUT_ERROR_CODES.includes(err.code)) {
                    reject(Object.assign(err, { name: "TimeoutError" }));
                }
                else {
                    reject(err);
                }
            });
            // wire-up any timeout logic
            set_connection_timeout_1.setConnectionTimeout(req, reject, this.connectionTimeout);
            set_socket_timeout_1.setSocketTimeout(req, reject, this.socketTimeout);
            // wire-up abort logic
            if (abortSignal) {
                abortSignal.onabort = () => {
                    // ensure request is destroyed
                    req.abort();
                    const abortError = new Error("Request aborted");
                    abortError.name = "AbortError";
                    reject(abortError);
                };
            }
            write_request_body_1.writeRequestBody(req, request);
        });
    }
}
exports.NodeHttpHandler = NodeHttpHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1odHRwLWhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbm9kZS1odHRwLWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQWdGO0FBQ2hGLHNFQUFnRTtBQUVoRSwrQkFBNEQ7QUFDNUQsaUNBQStFO0FBRS9FLDJDQUF5RDtBQUN6RCx1RUFBa0U7QUFDbEUscUVBQWdFO0FBQ2hFLDZEQUF3RDtBQUN4RCw2REFBd0Q7QUFzQnhELE1BQWEsZUFBZTtJQVExQixZQUFZLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxVQUFVLEtBQTZCLEVBQUU7UUFIcEcscUpBQXFKO1FBQ3JJLGFBQVEsR0FBRyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsQ0FBQztRQUd6RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsSUFBSSxJQUFJLFlBQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxJQUFJLElBQUksYUFBTyxDQUFDLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFvQixFQUFFLEVBQUUsV0FBVyxLQUF5QixFQUFFO1FBQ25FLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFB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Q2pDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBakZELDBDQWlGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBIYW5kbGVyLCBIdHRwUmVxdWVzdCwgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhd3Mtc2RrL3Byb3RvY29sLWh0dHBcIjtcbmltcG9ydCB7IGJ1aWxkUXVlcnlTdHJpbmcgfSBmcm9tIFwiQGF3cy1zZGsvcXVlcnlzdHJpbmctYnVpbGRlclwiO1xuaW1wb3J0IHsgSHR0cEhhbmRsZXJPcHRpb25zIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5pbXBvcnQgeyBBZ2VudCBhcyBoQWdlbnQsIHJlcXVlc3QgYXMgaFJlcXVlc3QgfSBmcm9tIFwiaHR0cFwiO1xuaW1wb3J0IHsgQWdlbnQgYXMgaHNBZ2VudCwgcmVxdWVzdCBhcyBoc1JlcXVlc3QsIFJlcXVlc3RPcHRpb25zIH0gZnJvbSBcImh0dHBzXCI7XG5cbmltcG9ydCB7IE5PREVKU19USU1FT1VUX0VSUk9SX0NPREVTIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBnZXRUcmFuc2Zvcm1lZEhlYWRlcnMgfSBmcm9tIFwiLi9nZXQtdHJhbnNmb3JtZWQtaGVhZGVyc1wiO1xuaW1wb3J0IHsgc2V0Q29ubmVjdGlvblRpbWVvdXQgfSBmcm9tIFwiLi9zZXQtY29ubmVjdGlvbi10aW1lb3V0XCI7XG5pbXBvcnQgeyBzZXRTb2NrZXRUaW1lb3V0IH0gZnJvbSBcIi4vc2V0LXNvY2tldC10aW1lb3V0XCI7XG5pbXBvcnQgeyB3cml0ZVJlcXVlc3RCb2R5IH0gZnJvbSBcIi4vd3JpdGUtcmVxdWVzdC1ib2R5XCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgaHR0cCBvcHRpb25zIHRoYXQgY2FuIGJlIHBhc3NlZCB0byBhIG5vZGUgaHR0cCBjbGllbnQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTm9kZUh0dHBIYW5kbGVyT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgbWF4aW11bSB0aW1lIGluIG1pbGxpc2Vjb25kcyB0aGF0IHRoZSBjb25uZWN0aW9uIHBoYXNlIG9mIGEgcmVxdWVzdFxuICAgKiBtYXkgdGFrZSBiZWZvcmUgdGhlIGNvbm5lY3Rpb24gYXR0ZW1wdCBpcyBhYmFuZG9uZWQuXG4gICAqL1xuICBjb25uZWN0aW9uVGltZW91dD86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIG1heGltdW0gdGltZSBpbiBtaWxsaXNlY29uZHMgdGhhdCBhIHNvY2tldCBtYXkgcmVtYWluIGlkbGUgYmVmb3JlIGl0XG4gICAqIGlzIGNsb3NlZC5cbiAgICovXG4gIHNvY2tldFRpbWVvdXQ/OiBudW1iZXI7XG5cbiAgaHR0cEFnZW50PzogaEFnZW50O1xuICBodHRwc0FnZW50PzogaHNBZ2VudDtcbn1cblxuZXhwb3J0IGNsYXNzIE5vZGVIdHRwSGFuZGxlciBpbXBsZW1lbnRzIEh0dHBIYW5kbGVyIHtcbiAgcHJpdmF0ZSByZWFkb25seSBodHRwQWdlbnQ6IGhBZ2VudDtcbiAgcHJpdmF0ZSByZWFkb25seSBodHRwc0FnZW50OiBoc0FnZW50O1xuICBwcml2YXRlIHJlYWRvbmx5IGNvbm5lY3Rpb25UaW1lb3V0PzogbnVtYmVyO1xuICBwcml2YXRlIHJlYWRvbmx5IHNvY2tldFRpbWVvdXQ/OiBudW1iZXI7XG4gIC8vIE5vZGUgaHR0cCBoYW5kbGVyIGlzIGhhcmQtY29kZWQgdG8gaHR0cC8xLjE6IGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9ibG9iL2ZmNTY2NGI4M2I4OWM1NWU0YWI1ZDVmNjAwNjhmYjQ1N2YxZjU4NzIvbGliL19odHRwX3NlcnZlci5qcyNMMjg2XG4gIHB1YmxpYyByZWFkb25seSBtZXRhZGF0YSA9IHsgaGFuZGxlclByb3RvY29sOiBcImh0dHAvMS4xXCIgfTtcblxuICBjb25zdHJ1Y3Rvcih7IGNvbm5lY3Rpb25UaW1lb3V0LCBzb2NrZXRUaW1lb3V0LCBodHRwQWdlbnQsIGh0dHBzQWdlbnQgfTogTm9kZUh0dHBIYW5kbGVyT3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5jb25uZWN0aW9uVGltZW91dCA9IGNvbm5lY3Rpb25UaW1lb3V0O1xuICAgIHRoaXMuc29ja2V0VGltZW91dCA9IHNvY2tldFRpbWVvdXQ7XG4gICAgY29uc3Qga2VlcEFsaXZlID0gdHJ1ZTtcbiAgICBjb25zdCBtYXhTb2NrZXRzID0gNTA7XG4gICAgdGhpcy5odHRwQWdlbnQgPSBodHRwQWdlbnQgfHwgbmV3IGhBZ2VudCh7IGtlZXBBbGl2ZSwgbWF4U29ja2V0cyB9KTtcbiAgICB0aGlzLmh0dHBzQWdlbnQgPSBodHRwc0FnZW50IHx8IG5ldyBoc0FnZW50KHsga2VlcEFsaXZlLCBtYXhTb2NrZXRzIH0pO1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmh0dHBBZ2VudC5kZXN0cm95KCk7XG4gICAgdGhpcy5odHRwc0FnZW50LmRlc3Ryb3koKTtcbiAgfVxuXG4gIGhhbmRsZShyZXF1ZXN0OiBIdHRwUmVxdWVzdCwgeyBhYm9ydFNpZ25hbCB9OiBIdHRwSGFuZGxlck9wdGlvbnMgPSB7fSk6IFByb21pc2U8eyByZXNwb25zZTogSHR0cFJlc3BvbnNlIH0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gaWYgdGhlIHJlcXVlc3Qgd2FzIGFscmVhZHkgYWJvcnRlZCwgcHJldmVudCBkb2luZyBleHRyYSB3b3JrXG4gICAgICBpZiAoYWJvcnRTaWduYWw/LmFib3J0ZWQpIHtcbiAgICAgICAgY29uc3QgYWJvcnRFcnJvciA9IG5ldyBFcnJvcihcIlJlcXVlc3QgYWJvcnRlZFwiKTtcbiAgICAgICAgYWJvcnRFcnJvci5uYW1lID0gXCJBYm9ydEVycm9yXCI7XG4gICAgICAgIHJlamVjdChhYm9ydEVycm9yKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBkZXRlcm1pbmUgd2hpY2ggaHR0cChzKSBjbGllbnQgdG8gdXNlXG4gICAgICBjb25zdCBpc1NTTCA9IHJlcXVlc3QucHJvdG9jb2wgPT09IFwiaHR0cHM6XCI7XG4gICAgICBjb25zdCBxdWVyeVN0cmluZyA9IGJ1aWxkUXVlcnlTdHJpbmcocmVxdWVzdC5xdWVyeSB8fCB7fSk7XG4gICAgICBjb25zdCBub2RlSHR0cHNPcHRpb25zOiBSZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyczogcmVxdWVzdC5oZWFkZXJzLFxuICAgICAgICBob3N0OiByZXF1ZXN0Lmhvc3RuYW1lLFxuICAgICAgICBtZXRob2Q6IHJlcXVlc3QubWV0aG9kLFxuICAgICAgICBwYXRoOiBxdWVyeVN0cmluZyA/IGAke3JlcXVlc3QucGF0aH0/JHtxdWVyeVN0cmluZ31gIDogcmVxdWVzdC5wYXRoLFxuICAgICAgICBwb3J0OiByZXF1ZXN0LnBvcnQsXG4gICAgICAgIGFnZW50OiBpc1NTTCA/IHRoaXMuaHR0cHNBZ2VudCA6IHRoaXMuaHR0cEFnZW50LFxuICAgICAgfTtcblxuICAgICAgLy8gY3JlYXRlIHRoZSBodHRwIHJlcXVlc3RcbiAgICAgIGNvbnN0IHJlcXVlc3RGdW5jID0gaXNTU0wgPyBoc1JlcXVlc3QgOiBoUmVxdWVzdDtcbiAgICAgIGNvbnN0IHJlcSA9IHJlcXVlc3RGdW5jKG5vZGVIdHRwc09wdGlvbnMsIChyZXMpID0+IHtcbiAgICAgICAgY29uc3QgaHR0cFJlc3BvbnNlID0gbmV3IEh0dHBSZXNwb25zZSh7XG4gICAgICAgICAgc3RhdHVzQ29kZTogcmVzLnN0YXR1c0NvZGUgfHwgLTEsXG4gICAgICAgICAgaGVhZGVyczogZ2V0VHJhbnNmb3JtZWRIZWFkZXJzKHJlcy5oZWFkZXJzKSxcbiAgICAgICAgICBib2R5OiByZXMsXG4gICAgICAgIH0pO1xuICAgICAgICByZXNvbHZlKHsgcmVzcG9uc2U6IGh0dHBSZXNwb25zZSB9KTtcbiAgICAgIH0pO1xuXG4gICAgICByZXEub24oXCJlcnJvclwiLCAoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICBpZiAoTk9ERUpTX1RJTUVPVVRfRVJST1JfQ09ERVMuaW5jbHVkZXMoKGVyciBhcyBhbnkpLmNvZGUpKSB7XG4gICAgICAgICAgcmVqZWN0KE9iamVjdC5hc3NpZ24oZXJyLCB7IG5hbWU6IFwiVGltZW91dEVycm9yXCIgfSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gd2lyZS11cCBhbnkgdGltZW91dCBsb2dpY1xuICAgICAgc2V0Q29ubmVjdGlvblRpbWVvdXQocmVxLCByZWplY3QsIHRoaXMuY29ubmVjdGlvblRpbWVvdXQpO1xuICAgICAgc2V0U29ja2V0VGltZW91dChyZXEsIHJlamVjdCwgdGhpcy5zb2NrZXRUaW1lb3V0KTtcblxuICAgICAgLy8gd2lyZS11cCBhYm9ydCBsb2dpY1xuICAgICAgaWYgKGFib3J0U2lnbmFsKSB7XG4gICAgICAgIGFib3J0U2lnbmFsLm9uYWJvcnQgPSAoKSA9PiB7XG4gICAgICAgICAgLy8gZW5zdXJlIHJlcXVlc3QgaXMgZGVzdHJveWVkXG4gICAgICAgICAgcmVxLmFib3J0KCk7XG4gICAgICAgICAgY29uc3QgYWJvcnRFcnJvciA9IG5ldyBFcnJvcihcIlJlcXVlc3QgYWJvcnRlZFwiKTtcbiAgICAgICAgICBhYm9ydEVycm9yLm5hbWUgPSBcIkFib3J0RXJyb3JcIjtcbiAgICAgICAgICByZWplY3QoYWJvcnRFcnJvcik7XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHdyaXRlUmVxdWVzdEJvZHkocmVxLCByZXF1ZXN0KTtcbiAgICB9KTtcbiAgfVxufVxuIl19