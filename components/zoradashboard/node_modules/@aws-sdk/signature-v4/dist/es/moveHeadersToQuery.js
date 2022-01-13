import { __assign, __values } from "tslib";
import { cloneRequest } from "./cloneRequest";
/**
 * @internal
 */
export function moveHeadersToQuery(request, options) {
    var e_1, _a;
    var _b;
    if (options === void 0) { options = {}; }
    var _c = typeof request.clone === "function" ? request.clone() : cloneRequest(request), headers = _c.headers, _d = _c.query, query = _d === void 0 ? {} : _d;
    try {
        for (var _e = __values(Object.keys(headers)), _f = _e.next(); !_f.done; _f = _e.next()) {
            var name = _f.value;
            var lname = name.toLowerCase();
            if (lname.substr(0, 6) === "x-amz-" && !((_b = options.unhoistableHeaders) === null || _b === void 0 ? void 0 : _b.has(lname))) {
                query[name] = headers[name];
                delete headers[name];
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return __assign(__assign({}, request), { headers: headers,
        query: query });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW92ZUhlYWRlcnNUb1F1ZXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vdmVIZWFkZXJzVG9RdWVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDOztHQUVHO0FBQ0gsTUFBTSxVQUFVLGtCQUFrQixDQUNoQyxPQUFvQixFQUNwQixPQUFrRDs7O0lBQWxELHdCQUFBLEVBQUEsWUFBa0Q7SUFFNUMsSUFBQSxLQUNKLE9BQVEsT0FBZSxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFFLE9BQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUR6RixPQUFPLGFBQUEsRUFBRSxhQUErQixFQUEvQixLQUFLLG1CQUFHLEVBQXVCLEtBQ2lELENBQUM7O1FBQ2xHLEtBQW1CLElBQUEsS0FBQSxTQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUEsZ0JBQUEsNEJBQUU7WUFBcEMsSUFBTSxJQUFJLFdBQUE7WUFDYixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDakMsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxRQUFRLElBQUksUUFBQyxPQUFPLENBQUMsa0JBQWtCLDBDQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUMsRUFBRTtnQkFDOUUsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUIsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdEI7U0FDRjs7Ozs7Ozs7O0lBRUQsNkJBQ0ssT0FBTyxLQUNWLE9BQU8sU0FBQTtRQUNQLEtBQUssT0FBQSxJQUNMO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBSZXF1ZXN0LCBRdWVyeVBhcmFtZXRlckJhZyB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5pbXBvcnQgeyBjbG9uZVJlcXVlc3QgfSBmcm9tIFwiLi9jbG9uZVJlcXVlc3RcIjtcblxuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1vdmVIZWFkZXJzVG9RdWVyeShcbiAgcmVxdWVzdDogSHR0cFJlcXVlc3QsXG4gIG9wdGlvbnM6IHsgdW5ob2lzdGFibGVIZWFkZXJzPzogU2V0PHN0cmluZz4gfSA9IHt9XG4pOiBIdHRwUmVxdWVzdCAmIHsgcXVlcnk6IFF1ZXJ5UGFyYW1ldGVyQmFnIH0ge1xuICBjb25zdCB7IGhlYWRlcnMsIHF1ZXJ5ID0ge30gYXMgUXVlcnlQYXJhbWV0ZXJCYWcgfSA9XG4gICAgdHlwZW9mIChyZXF1ZXN0IGFzIGFueSkuY2xvbmUgPT09IFwiZnVuY3Rpb25cIiA/IChyZXF1ZXN0IGFzIGFueSkuY2xvbmUoKSA6IGNsb25lUmVxdWVzdChyZXF1ZXN0KTtcbiAgZm9yIChjb25zdCBuYW1lIG9mIE9iamVjdC5rZXlzKGhlYWRlcnMpKSB7XG4gICAgY29uc3QgbG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKGxuYW1lLnN1YnN0cigwLCA2KSA9PT0gXCJ4LWFtei1cIiAmJiAhb3B0aW9ucy51bmhvaXN0YWJsZUhlYWRlcnM/LmhhcyhsbmFtZSkpIHtcbiAgICAgIHF1ZXJ5W25hbWVdID0gaGVhZGVyc1tuYW1lXTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLi4ucmVxdWVzdCxcbiAgICBoZWFkZXJzLFxuICAgIHF1ZXJ5LFxuICB9O1xufVxuIl19