"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestTimeout = void 0;
function requestTimeout(timeoutInMs = 0) {
    return new Promise((resolve, reject) => {
        if (timeoutInMs) {
            setTimeout(() => {
                const timeoutError = new Error(`Request did not complete within ${timeoutInMs} ms`);
                timeoutError.name = "TimeoutError";
                reject(timeoutError);
            }, timeoutInMs);
        }
    });
}
exports.requestTimeout = requestTimeout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC10aW1lb3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JlcXVlc3QtdGltZW91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxTQUFnQixjQUFjLENBQUMsV0FBVyxHQUFHLENBQUM7SUFDNUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxJQUFJLFdBQVcsRUFBRTtZQUNmLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsTUFBTSxZQUFZLEdBQUcsSUFBSSxLQUFLLENBQUMsbUNBQW1DLFdBQVcsS0FBSyxDQUFDLENBQUM7Z0JBQ3BGLFlBQVksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDO2dCQUNuQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdkIsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1NBQ2pCO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBVkQsd0NBVUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gcmVxdWVzdFRpbWVvdXQodGltZW91dEluTXMgPSAwKTogUHJvbWlzZTxuZXZlcj4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmICh0aW1lb3V0SW5Ncykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRpbWVvdXRFcnJvciA9IG5ldyBFcnJvcihgUmVxdWVzdCBkaWQgbm90IGNvbXBsZXRlIHdpdGhpbiAke3RpbWVvdXRJbk1zfSBtc2ApO1xuICAgICAgICB0aW1lb3V0RXJyb3IubmFtZSA9IFwiVGltZW91dEVycm9yXCI7XG4gICAgICAgIHJlamVjdCh0aW1lb3V0RXJyb3IpO1xuICAgICAgfSwgdGltZW91dEluTXMpO1xuICAgIH1cbiAgfSk7XG59XG4iXX0=