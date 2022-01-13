"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUrl = void 0;
const querystring_builder_1 = require("@aws-sdk/querystring-builder");
function formatUrl(request) {
    const { port, query } = request;
    let { protocol, path, hostname } = request;
    if (protocol && protocol.substr(-1) !== ":") {
        protocol += ":";
    }
    if (port) {
        hostname += `:${port}`;
    }
    if (path && path.charAt(0) !== "/") {
        path = `/${path}`;
    }
    let queryString = query ? querystring_builder_1.buildQueryString(query) : "";
    if (queryString && queryString[0] !== "?") {
        queryString = `?${queryString}`;
    }
    return `${protocol}//${hostname}${path}${queryString}`;
}
exports.formatUrl = formatUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0VBQWdFO0FBR2hFLFNBQWdCLFNBQVMsQ0FBQyxPQUFnRDtJQUN4RSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUNoQyxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFDM0MsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtRQUMzQyxRQUFRLElBQUksR0FBRyxDQUFDO0tBQ2pCO0lBQ0QsSUFBSSxJQUFJLEVBQUU7UUFDUixRQUFRLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztLQUN4QjtJQUNELElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1FBQ2xDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0tBQ25CO0lBQ0QsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxzQ0FBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3ZELElBQUksV0FBVyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7UUFDekMsV0FBVyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7S0FDakM7SUFDRCxPQUFPLEdBQUcsUUFBUSxLQUFLLFFBQVEsR0FBRyxJQUFJLEdBQUcsV0FBVyxFQUFFLENBQUM7QUFDekQsQ0FBQztBQWpCRCw4QkFpQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBidWlsZFF1ZXJ5U3RyaW5nIH0gZnJvbSBcIkBhd3Mtc2RrL3F1ZXJ5c3RyaW5nLWJ1aWxkZXJcIjtcbmltcG9ydCB7IEh0dHBSZXF1ZXN0IH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRVcmwocmVxdWVzdDogT21pdDxIdHRwUmVxdWVzdCwgXCJoZWFkZXJzXCIgfCBcIm1ldGhvZFwiPik6IHN0cmluZyB7XG4gIGNvbnN0IHsgcG9ydCwgcXVlcnkgfSA9IHJlcXVlc3Q7XG4gIGxldCB7IHByb3RvY29sLCBwYXRoLCBob3N0bmFtZSB9ID0gcmVxdWVzdDtcbiAgaWYgKHByb3RvY29sICYmIHByb3RvY29sLnN1YnN0cigtMSkgIT09IFwiOlwiKSB7XG4gICAgcHJvdG9jb2wgKz0gXCI6XCI7XG4gIH1cbiAgaWYgKHBvcnQpIHtcbiAgICBob3N0bmFtZSArPSBgOiR7cG9ydH1gO1xuICB9XG4gIGlmIChwYXRoICYmIHBhdGguY2hhckF0KDApICE9PSBcIi9cIikge1xuICAgIHBhdGggPSBgLyR7cGF0aH1gO1xuICB9XG4gIGxldCBxdWVyeVN0cmluZyA9IHF1ZXJ5ID8gYnVpbGRRdWVyeVN0cmluZyhxdWVyeSkgOiBcIlwiO1xuICBpZiAocXVlcnlTdHJpbmcgJiYgcXVlcnlTdHJpbmdbMF0gIT09IFwiP1wiKSB7XG4gICAgcXVlcnlTdHJpbmcgPSBgPyR7cXVlcnlTdHJpbmd9YDtcbiAgfVxuICByZXR1cm4gYCR7cHJvdG9jb2x9Ly8ke2hvc3RuYW1lfSR7cGF0aH0ke3F1ZXJ5U3RyaW5nfWA7XG59XG4iXX0=