import { __values } from "tslib";
import { cloneRequest } from "./cloneRequest";
import { GENERATED_HEADERS } from "./constants";
/**
 * @internal
 */
export function prepareRequest(request) {
    var e_1, _a;
    // Create a clone of the request object that does not clone the body
    request = typeof request.clone === "function" ? request.clone() : cloneRequest(request);
    try {
        for (var _b = __values(Object.keys(request.headers)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var headerName = _c.value;
            if (GENERATED_HEADERS.indexOf(headerName.toLowerCase()) > -1) {
                delete request.headers[headerName];
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
    return request;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlcGFyZVJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJlcGFyZVJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFaEQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUsY0FBYyxDQUFDLE9BQW9COztJQUNqRCxvRUFBb0U7SUFDcEUsT0FBTyxHQUFHLE9BQVEsT0FBZSxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFFLE9BQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztRQUUxRyxLQUF5QixJQUFBLEtBQUEsU0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTtZQUFsRCxJQUFNLFVBQVUsV0FBQTtZQUNuQixJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDNUQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3BDO1NBQ0Y7Ozs7Ozs7OztJQUVELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwUmVxdWVzdCB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5pbXBvcnQgeyBjbG9uZVJlcXVlc3QgfSBmcm9tIFwiLi9jbG9uZVJlcXVlc3RcIjtcbmltcG9ydCB7IEdFTkVSQVRFRF9IRUFERVJTIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmVwYXJlUmVxdWVzdChyZXF1ZXN0OiBIdHRwUmVxdWVzdCk6IEh0dHBSZXF1ZXN0IHtcbiAgLy8gQ3JlYXRlIGEgY2xvbmUgb2YgdGhlIHJlcXVlc3Qgb2JqZWN0IHRoYXQgZG9lcyBub3QgY2xvbmUgdGhlIGJvZHlcbiAgcmVxdWVzdCA9IHR5cGVvZiAocmVxdWVzdCBhcyBhbnkpLmNsb25lID09PSBcImZ1bmN0aW9uXCIgPyAocmVxdWVzdCBhcyBhbnkpLmNsb25lKCkgOiBjbG9uZVJlcXVlc3QocmVxdWVzdCk7XG5cbiAgZm9yIChjb25zdCBoZWFkZXJOYW1lIG9mIE9iamVjdC5rZXlzKHJlcXVlc3QuaGVhZGVycykpIHtcbiAgICBpZiAoR0VORVJBVEVEX0hFQURFUlMuaW5kZXhPZihoZWFkZXJOYW1lLnRvTG93ZXJDYXNlKCkpID4gLTEpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0LmhlYWRlcnNbaGVhZGVyTmFtZV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcXVlc3Q7XG59XG4iXX0=