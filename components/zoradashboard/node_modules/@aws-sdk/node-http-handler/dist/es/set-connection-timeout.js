export var setConnectionTimeout = function (request, reject, timeoutInMs) {
    if (timeoutInMs === void 0) { timeoutInMs = 0; }
    if (!timeoutInMs) {
        return;
    }
    request.on("socket", function (socket) {
        if (socket.connecting) {
            // Throw a connecting timeout error unless a connection is made within x time.
            var timeoutId_1 = setTimeout(function () {
                // destroy the request.
                request.destroy();
                reject(Object.assign(new Error("Socket timed out without establishing a connection within " + timeoutInMs + " ms"), {
                    name: "TimeoutError",
                }));
            }, timeoutInMs);
            // if the connection was established, cancel the timeout.
            socket.on("connect", function () {
                clearTimeout(timeoutId_1);
            });
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LWNvbm5lY3Rpb24tdGltZW91dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXQtY29ubmVjdGlvbi10aW1lb3V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE1BQU0sQ0FBQyxJQUFNLG9CQUFvQixHQUFHLFVBQUMsT0FBc0IsRUFBRSxNQUE0QixFQUFFLFdBQWU7SUFBZiw0QkFBQSxFQUFBLGVBQWU7SUFDeEcsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUNoQixPQUFPO0tBQ1I7SUFFRCxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFDLE1BQWM7UUFDbEMsSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQ3JCLDhFQUE4RTtZQUM5RSxJQUFNLFdBQVMsR0FBRyxVQUFVLENBQUM7Z0JBQzNCLHVCQUF1QjtnQkFDdkIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNsQixNQUFNLENBQ0osTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQywrREFBNkQsV0FBVyxRQUFLLENBQUMsRUFBRTtvQkFDdEcsSUFBSSxFQUFFLGNBQWM7aUJBQ3JCLENBQUMsQ0FDSCxDQUFDO1lBQ0osQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBRWhCLHlEQUF5RDtZQUN6RCxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRTtnQkFDbkIsWUFBWSxDQUFDLFdBQVMsQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENsaWVudFJlcXVlc3QgfSBmcm9tIFwiaHR0cFwiO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSBcIm5ldFwiO1xuXG5leHBvcnQgY29uc3Qgc2V0Q29ubmVjdGlvblRpbWVvdXQgPSAocmVxdWVzdDogQ2xpZW50UmVxdWVzdCwgcmVqZWN0OiAoZXJyOiBFcnJvcikgPT4gdm9pZCwgdGltZW91dEluTXMgPSAwKSA9PiB7XG4gIGlmICghdGltZW91dEluTXMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICByZXF1ZXN0Lm9uKFwic29ja2V0XCIsIChzb2NrZXQ6IFNvY2tldCkgPT4ge1xuICAgIGlmIChzb2NrZXQuY29ubmVjdGluZykge1xuICAgICAgLy8gVGhyb3cgYSBjb25uZWN0aW5nIHRpbWVvdXQgZXJyb3IgdW5sZXNzIGEgY29ubmVjdGlvbiBpcyBtYWRlIHdpdGhpbiB4IHRpbWUuXG4gICAgICBjb25zdCB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gZGVzdHJveSB0aGUgcmVxdWVzdC5cbiAgICAgICAgcmVxdWVzdC5kZXN0cm95KCk7XG4gICAgICAgIHJlamVjdChcbiAgICAgICAgICBPYmplY3QuYXNzaWduKG5ldyBFcnJvcihgU29ja2V0IHRpbWVkIG91dCB3aXRob3V0IGVzdGFibGlzaGluZyBhIGNvbm5lY3Rpb24gd2l0aGluICR7dGltZW91dEluTXN9IG1zYCksIHtcbiAgICAgICAgICAgIG5hbWU6IFwiVGltZW91dEVycm9yXCIsXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0sIHRpbWVvdXRJbk1zKTtcblxuICAgICAgLy8gaWYgdGhlIGNvbm5lY3Rpb24gd2FzIGVzdGFibGlzaGVkLCBjYW5jZWwgdGhlIHRpbWVvdXQuXG4gICAgICBzb2NrZXQub24oXCJjb25uZWN0XCIsICgpID0+IHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufTtcbiJdfQ==