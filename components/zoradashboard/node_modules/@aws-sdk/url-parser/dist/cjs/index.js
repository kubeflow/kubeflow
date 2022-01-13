"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUrl = void 0;
const querystring_parser_1 = require("@aws-sdk/querystring-parser");
const parseUrl = (url) => {
    const { hostname, pathname, port, protocol, search } = new URL(url);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0VBQStEO0FBR3hELE1BQU0sUUFBUSxHQUFjLENBQUMsR0FBVyxFQUFZLEVBQUU7SUFDM0QsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVwRSxJQUFJLEtBQW9DLENBQUM7SUFDekMsSUFBSSxNQUFNLEVBQUU7UUFDVixLQUFLLEdBQUcscUNBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDbEM7SUFFRCxPQUFPO1FBQ0wsUUFBUTtRQUNSLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztRQUN2QyxRQUFRO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLO0tBQ04sQ0FBQztBQUNKLENBQUMsQ0FBQztBQWZXLFFBQUEsUUFBUSxZQWVuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBhcnNlUXVlcnlTdHJpbmcgfSBmcm9tIFwiQGF3cy1zZGsvcXVlcnlzdHJpbmctcGFyc2VyXCI7XG5pbXBvcnQgeyBFbmRwb2ludCwgUXVlcnlQYXJhbWV0ZXJCYWcsIFVybFBhcnNlciB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5leHBvcnQgY29uc3QgcGFyc2VVcmw6IFVybFBhcnNlciA9ICh1cmw6IHN0cmluZyk6IEVuZHBvaW50ID0+IHtcbiAgY29uc3QgeyBob3N0bmFtZSwgcGF0aG5hbWUsIHBvcnQsIHByb3RvY29sLCBzZWFyY2ggfSA9IG5ldyBVUkwodXJsKTtcblxuICBsZXQgcXVlcnk6IFF1ZXJ5UGFyYW1ldGVyQmFnIHwgdW5kZWZpbmVkO1xuICBpZiAoc2VhcmNoKSB7XG4gICAgcXVlcnkgPSBwYXJzZVF1ZXJ5U3RyaW5nKHNlYXJjaCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGhvc3RuYW1lLFxuICAgIHBvcnQ6IHBvcnQgPyBwYXJzZUludChwb3J0KSA6IHVuZGVmaW5lZCxcbiAgICBwcm90b2NvbCxcbiAgICBwYXRoOiBwYXRobmFtZSxcbiAgICBxdWVyeSxcbiAgfTtcbn07XG4iXX0=