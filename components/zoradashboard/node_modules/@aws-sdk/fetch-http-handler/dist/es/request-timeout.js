export function requestTimeout(timeoutInMs) {
    if (timeoutInMs === void 0) { timeoutInMs = 0; }
    return new Promise(function (resolve, reject) {
        if (timeoutInMs) {
            setTimeout(function () {
                var timeoutError = new Error("Request did not complete within " + timeoutInMs + " ms");
                timeoutError.name = "TimeoutError";
                reject(timeoutError);
            }, timeoutInMs);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC10aW1lb3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JlcXVlc3QtdGltZW91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFVBQVUsY0FBYyxDQUFDLFdBQWU7SUFBZiw0QkFBQSxFQUFBLGVBQWU7SUFDNUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1FBQ2pDLElBQUksV0FBVyxFQUFFO1lBQ2YsVUFBVSxDQUFDO2dCQUNULElBQU0sWUFBWSxHQUFHLElBQUksS0FBSyxDQUFDLHFDQUFtQyxXQUFXLFFBQUssQ0FBQyxDQUFDO2dCQUNwRixZQUFZLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQztnQkFDbkMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztTQUNqQjtJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0VGltZW91dCh0aW1lb3V0SW5NcyA9IDApOiBQcm9taXNlPG5ldmVyPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKHRpbWVvdXRJbk1zKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgdGltZW91dEVycm9yID0gbmV3IEVycm9yKGBSZXF1ZXN0IGRpZCBub3QgY29tcGxldGUgd2l0aGluICR7dGltZW91dEluTXN9IG1zYCk7XG4gICAgICAgIHRpbWVvdXRFcnJvci5uYW1lID0gXCJUaW1lb3V0RXJyb3JcIjtcbiAgICAgICAgcmVqZWN0KHRpbWVvdXRFcnJvcik7XG4gICAgICB9LCB0aW1lb3V0SW5Ncyk7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==