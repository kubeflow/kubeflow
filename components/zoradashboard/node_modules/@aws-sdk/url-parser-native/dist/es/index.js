import { parseQueryString } from "@aws-sdk/querystring-parser";
import { parse } from "url";
export var parseUrl = function (url) {
    var _a = parse(url), _b = _a.hostname, hostname = _b === void 0 ? "localhost" : _b, _c = _a.pathname, pathname = _c === void 0 ? "/" : _c, port = _a.port, _d = _a.protocol, protocol = _d === void 0 ? "https:" : _d, search = _a.search;
    var query;
    if (search) {
        query = parseQueryString(search);
    }
    return {
        hostname: hostname,
        port: port ? parseInt(port) : undefined,
        protocol: protocol,
        path: pathname,
        query: query,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFL0QsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEtBQUssQ0FBQztBQUU1QixNQUFNLENBQUMsSUFBTSxRQUFRLEdBQWMsVUFBQyxHQUFXO0lBQ3ZDLElBQUEsS0FBZ0YsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUF4RixnQkFBc0IsRUFBdEIsUUFBUSxtQkFBRyxXQUFXLEtBQUEsRUFBRSxnQkFBYyxFQUFkLFFBQVEsbUJBQUcsR0FBRyxLQUFBLEVBQUUsSUFBSSxVQUFBLEVBQUUsZ0JBQW1CLEVBQW5CLFFBQVEsbUJBQUcsUUFBUSxLQUFBLEVBQUUsTUFBTSxZQUFlLENBQUM7SUFFakcsSUFBSSxLQUFvQyxDQUFDO0lBQ3pDLElBQUksTUFBTSxFQUFFO1FBQ1YsS0FBSyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2xDO0lBRUQsT0FBTztRQUNMLFFBQVEsVUFBQTtRQUNSLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztRQUN2QyxRQUFRLFVBQUE7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssT0FBQTtLQUNOLENBQUM7QUFDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwYXJzZVF1ZXJ5U3RyaW5nIH0gZnJvbSBcIkBhd3Mtc2RrL3F1ZXJ5c3RyaW5nLXBhcnNlclwiO1xuaW1wb3J0IHsgRW5kcG9pbnQsIFF1ZXJ5UGFyYW1ldGVyQmFnLCBVcmxQYXJzZXIgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSBcInVybFwiO1xuXG5leHBvcnQgY29uc3QgcGFyc2VVcmw6IFVybFBhcnNlciA9ICh1cmw6IHN0cmluZyk6IEVuZHBvaW50ID0+IHtcbiAgY29uc3QgeyBob3N0bmFtZSA9IFwibG9jYWxob3N0XCIsIHBhdGhuYW1lID0gXCIvXCIsIHBvcnQsIHByb3RvY29sID0gXCJodHRwczpcIiwgc2VhcmNoIH0gPSBwYXJzZSh1cmwpO1xuXG4gIGxldCBxdWVyeTogUXVlcnlQYXJhbWV0ZXJCYWcgfCB1bmRlZmluZWQ7XG4gIGlmIChzZWFyY2gpIHtcbiAgICBxdWVyeSA9IHBhcnNlUXVlcnlTdHJpbmcoc2VhcmNoKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaG9zdG5hbWUsXG4gICAgcG9ydDogcG9ydCA/IHBhcnNlSW50KHBvcnQpIDogdW5kZWZpbmVkLFxuICAgIHByb3RvY29sLFxuICAgIHBhdGg6IHBhdGhuYW1lLFxuICAgIHF1ZXJ5LFxuICB9O1xufTtcbiJdfQ==