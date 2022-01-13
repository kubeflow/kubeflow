"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.headerDefault = void 0;
const protocol_http_1 = require("@aws-sdk/protocol-http");
function headerDefault(headerBag) {
    return (next) => {
        return (args) => {
            if (protocol_http_1.HttpRequest.isInstance(args.request)) {
                const headers = { ...args.request.headers };
                for (const name of Object.keys(headerBag)) {
                    if (!(name in headers)) {
                        headers[name] = headerBag[name];
                    }
                }
                return next({
                    ...args,
                    request: {
                        ...args.request,
                        headers,
                    },
                });
            }
            else {
                return next(args);
            }
        };
    };
}
exports.headerDefault = headerDefault;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQXFEO0FBT3JELFNBQWdCLGFBQWEsQ0FBQyxTQUE0QjtJQUN4RCxPQUFPLENBQUMsSUFBNEIsRUFBRSxFQUFFO1FBQ3RDLE9BQU8sQ0FBQyxJQUFnQyxFQUFFLEVBQUU7WUFDMUMsSUFBSSwyQkFBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3hDLE1BQU0sT0FBTyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUU1QyxLQUFLLE1BQU0sSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ3pDLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsRUFBRTt3QkFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDakM7aUJBQ0Y7Z0JBRUQsT0FBTyxJQUFJLENBQUM7b0JBQ1YsR0FBRyxJQUFJO29CQUNQLE9BQU8sRUFBRTt3QkFDUCxHQUFHLElBQUksQ0FBQyxPQUFPO3dCQUNmLE9BQU87cUJBQ1I7aUJBQ0YsQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbkI7UUFDSCxDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7QUFDSixDQUFDO0FBeEJELHNDQXdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBSZXF1ZXN0IH0gZnJvbSBcIkBhd3Mtc2RrL3Byb3RvY29sLWh0dHBcIjtcbmltcG9ydCB7IEJ1aWxkSGFuZGxlciwgQnVpbGRIYW5kbGVyQXJndW1lbnRzLCBCdWlsZE1pZGRsZXdhcmUgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBIZWFkZXJEZWZhdWx0QXJncyB7XG4gIFtoZWFkZXI6IHN0cmluZ106IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhlYWRlckRlZmF1bHQoaGVhZGVyQmFnOiBIZWFkZXJEZWZhdWx0QXJncyk6IEJ1aWxkTWlkZGxld2FyZTxhbnksIGFueT4ge1xuICByZXR1cm4gKG5leHQ6IEJ1aWxkSGFuZGxlcjxhbnksIGFueT4pID0+IHtcbiAgICByZXR1cm4gKGFyZ3M6IEJ1aWxkSGFuZGxlckFyZ3VtZW50czxhbnk+KSA9PiB7XG4gICAgICBpZiAoSHR0cFJlcXVlc3QuaXNJbnN0YW5jZShhcmdzLnJlcXVlc3QpKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSB7IC4uLmFyZ3MucmVxdWVzdC5oZWFkZXJzIH07XG5cbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIE9iamVjdC5rZXlzKGhlYWRlckJhZykpIHtcbiAgICAgICAgICBpZiAoIShuYW1lIGluIGhlYWRlcnMpKSB7XG4gICAgICAgICAgICBoZWFkZXJzW25hbWVdID0gaGVhZGVyQmFnW25hbWVdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0KHtcbiAgICAgICAgICAuLi5hcmdzLFxuICAgICAgICAgIHJlcXVlc3Q6IHtcbiAgICAgICAgICAgIC4uLmFyZ3MucmVxdWVzdCxcbiAgICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV4dChhcmdzKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xufVxuIl19