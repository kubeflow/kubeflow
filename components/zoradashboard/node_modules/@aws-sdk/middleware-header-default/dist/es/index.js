import { __assign, __values } from "tslib";
import { HttpRequest } from "@aws-sdk/protocol-http";
export function headerDefault(headerBag) {
    return function (next) {
        return function (args) {
            var e_1, _a;
            if (HttpRequest.isInstance(args.request)) {
                var headers = __assign({}, args.request.headers);
                try {
                    for (var _b = __values(Object.keys(headerBag)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var name = _c.value;
                        if (!(name in headers)) {
                            headers[name] = headerBag[name];
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return next(__assign(__assign({}, args), { request: __assign(__assign({}, args.request), { headers: headers }) }));
            }
            else {
                return next(args);
            }
        };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQU9yRCxNQUFNLFVBQVUsYUFBYSxDQUFDLFNBQTRCO0lBQ3hELE9BQU8sVUFBQyxJQUE0QjtRQUNsQyxPQUFPLFVBQUMsSUFBZ0M7O1lBQ3RDLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3hDLElBQU0sT0FBTyxnQkFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBRSxDQUFDOztvQkFFNUMsS0FBbUIsSUFBQSxLQUFBLFNBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTt3QkFBdEMsSUFBTSxJQUFJLFdBQUE7d0JBQ2IsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxFQUFFOzRCQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUNqQztxQkFDRjs7Ozs7Ozs7O2dCQUVELE9BQU8sSUFBSSx1QkFDTixJQUFJLEtBQ1AsT0FBTyx3QkFDRixJQUFJLENBQUMsT0FBTyxLQUNmLE9BQU8sU0FBQSxPQUVULENBQUM7YUFDSjtpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuQjtRQUNILENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwUmVxdWVzdCB9IGZyb20gXCJAYXdzLXNkay9wcm90b2NvbC1odHRwXCI7XG5pbXBvcnQgeyBCdWlsZEhhbmRsZXIsIEJ1aWxkSGFuZGxlckFyZ3VtZW50cywgQnVpbGRNaWRkbGV3YXJlIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSGVhZGVyRGVmYXVsdEFyZ3Mge1xuICBbaGVhZGVyOiBzdHJpbmddOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoZWFkZXJEZWZhdWx0KGhlYWRlckJhZzogSGVhZGVyRGVmYXVsdEFyZ3MpOiBCdWlsZE1pZGRsZXdhcmU8YW55LCBhbnk+IHtcbiAgcmV0dXJuIChuZXh0OiBCdWlsZEhhbmRsZXI8YW55LCBhbnk+KSA9PiB7XG4gICAgcmV0dXJuIChhcmdzOiBCdWlsZEhhbmRsZXJBcmd1bWVudHM8YW55PikgPT4ge1xuICAgICAgaWYgKEh0dHBSZXF1ZXN0LmlzSW5zdGFuY2UoYXJncy5yZXF1ZXN0KSkge1xuICAgICAgICBjb25zdCBoZWFkZXJzID0geyAuLi5hcmdzLnJlcXVlc3QuaGVhZGVycyB9O1xuXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBPYmplY3Qua2V5cyhoZWFkZXJCYWcpKSB7XG4gICAgICAgICAgaWYgKCEobmFtZSBpbiBoZWFkZXJzKSkge1xuICAgICAgICAgICAgaGVhZGVyc1tuYW1lXSA9IGhlYWRlckJhZ1tuYW1lXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dCh7XG4gICAgICAgICAgLi4uYXJncyxcbiAgICAgICAgICByZXF1ZXN0OiB7XG4gICAgICAgICAgICAuLi5hcmdzLnJlcXVlc3QsXG4gICAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5leHQoYXJncyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbn1cbiJdfQ==