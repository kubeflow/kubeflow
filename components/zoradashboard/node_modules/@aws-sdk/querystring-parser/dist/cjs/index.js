"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQueryString = void 0;
function parseQueryString(querystring) {
    const query = {};
    querystring = querystring.replace(/^\?/, "");
    if (querystring) {
        for (const pair of querystring.split("&")) {
            let [key, value = null] = pair.split("=");
            key = decodeURIComponent(key);
            if (value) {
                value = decodeURIComponent(value);
            }
            if (!(key in query)) {
                query[key] = value;
            }
            else if (Array.isArray(query[key])) {
                query[key].push(value);
            }
            else {
                query[key] = [query[key], value];
            }
        }
    }
    return query;
}
exports.parseQueryString = parseQueryString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsU0FBZ0IsZ0JBQWdCLENBQUMsV0FBbUI7SUFDbEQsTUFBTSxLQUFLLEdBQXNCLEVBQUUsQ0FBQztJQUNwQyxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFN0MsSUFBSSxXQUFXLEVBQUU7UUFDZixLQUFLLE1BQU0sSUFBSSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUIsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsS0FBSyxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ25DO1lBQ0QsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFO2dCQUNuQixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQ3BCO2lCQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDbkMsS0FBSyxDQUFDLEdBQUcsQ0FBbUIsQ0FBQyxJQUFJLENBQUMsS0FBZSxDQUFDLENBQUM7YUFDckQ7aUJBQU07Z0JBQ0wsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBVyxFQUFFLEtBQWUsQ0FBQyxDQUFDO2FBQ3REO1NBQ0Y7S0FDRjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQXRCRCw0Q0FzQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWVyeVBhcmFtZXRlckJhZyB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VRdWVyeVN0cmluZyhxdWVyeXN0cmluZzogc3RyaW5nKTogUXVlcnlQYXJhbWV0ZXJCYWcge1xuICBjb25zdCBxdWVyeTogUXVlcnlQYXJhbWV0ZXJCYWcgPSB7fTtcbiAgcXVlcnlzdHJpbmcgPSBxdWVyeXN0cmluZy5yZXBsYWNlKC9eXFw/LywgXCJcIik7XG5cbiAgaWYgKHF1ZXJ5c3RyaW5nKSB7XG4gICAgZm9yIChjb25zdCBwYWlyIG9mIHF1ZXJ5c3RyaW5nLnNwbGl0KFwiJlwiKSkge1xuICAgICAgbGV0IFtrZXksIHZhbHVlID0gbnVsbF0gPSBwYWlyLnNwbGl0KFwiPVwiKTtcbiAgICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChrZXkpO1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHZhbHVlID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmICghKGtleSBpbiBxdWVyeSkpIHtcbiAgICAgICAgcXVlcnlba2V5XSA9IHZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHF1ZXJ5W2tleV0pKSB7XG4gICAgICAgIChxdWVyeVtrZXldIGFzIEFycmF5PHN0cmluZz4pLnB1c2godmFsdWUgYXMgc3RyaW5nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXJ5W2tleV0gPSBbcXVlcnlba2V5XSBhcyBzdHJpbmcsIHZhbHVlIGFzIHN0cmluZ107XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHF1ZXJ5O1xufVxuIl19