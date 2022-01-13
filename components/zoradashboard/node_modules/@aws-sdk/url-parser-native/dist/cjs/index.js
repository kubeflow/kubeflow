"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUrl = void 0;
const querystring_parser_1 = require("@aws-sdk/querystring-parser");
const url_1 = require("url");
const parseUrl = (url) => {
    const { hostname = "localhost", pathname = "/", port, protocol = "https:", search } = url_1.parse(url);
    let query;
    if (search) {
        query = querystring_parser_1.parseQueryString(search);
    }
    return {
        hostname,
        port: port ? parseInt(port) : undefined,
        protocol,
        path: pathname,
        query,
    };
};
exports.parseUrl = parseUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0VBQStEO0FBRS9ELDZCQUE0QjtBQUVyQixNQUFNLFFBQVEsR0FBYyxDQUFDLEdBQVcsRUFBWSxFQUFFO0lBQzNELE1BQU0sRUFBRSxRQUFRLEdBQUcsV0FBVyxFQUFFLFFBQVEsR0FBRyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRyxRQUFRLEVBQUUsTUFBTSxFQUFFLEdBQUcsV0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWpHLElBQUksS0FBb0MsQ0FBQztJQUN6QyxJQUFJLE1BQU0sRUFBRTtRQUNWLEtBQUssR0FBRyxxQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNsQztJQUVELE9BQU87UUFDTCxRQUFRO1FBQ1IsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO1FBQ3ZDLFFBQVE7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUs7S0FDTixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBZlcsUUFBQSxRQUFRLFlBZW5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcGFyc2VRdWVyeVN0cmluZyB9IGZyb20gXCJAYXdzLXNkay9xdWVyeXN0cmluZy1wYXJzZXJcIjtcbmltcG9ydCB7IEVuZHBvaW50LCBRdWVyeVBhcmFtZXRlckJhZywgVXJsUGFyc2VyIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gXCJ1cmxcIjtcblxuZXhwb3J0IGNvbnN0IHBhcnNlVXJsOiBVcmxQYXJzZXIgPSAodXJsOiBzdHJpbmcpOiBFbmRwb2ludCA9PiB7XG4gIGNvbnN0IHsgaG9zdG5hbWUgPSBcImxvY2FsaG9zdFwiLCBwYXRobmFtZSA9IFwiL1wiLCBwb3J0LCBwcm90b2NvbCA9IFwiaHR0cHM6XCIsIHNlYXJjaCB9ID0gcGFyc2UodXJsKTtcblxuICBsZXQgcXVlcnk6IFF1ZXJ5UGFyYW1ldGVyQmFnIHwgdW5kZWZpbmVkO1xuICBpZiAoc2VhcmNoKSB7XG4gICAgcXVlcnkgPSBwYXJzZVF1ZXJ5U3RyaW5nKHNlYXJjaCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGhvc3RuYW1lLFxuICAgIHBvcnQ6IHBvcnQgPyBwYXJzZUludChwb3J0KSA6IHVuZGVmaW5lZCxcbiAgICBwcm90b2NvbCxcbiAgICBwYXRoOiBwYXRobmFtZSxcbiAgICBxdWVyeSxcbiAgfTtcbn07XG4iXX0=