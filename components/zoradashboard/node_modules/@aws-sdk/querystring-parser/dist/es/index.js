import { __read, __values } from "tslib";
export function parseQueryString(querystring) {
    var e_1, _a;
    var query = {};
    querystring = querystring.replace(/^\?/, "");
    if (querystring) {
        try {
            for (var _b = __values(querystring.split("&")), _c = _b.next(); !_c.done; _c = _b.next()) {
                var pair = _c.value;
                var _d = __read(pair.split("="), 2), key = _d[0], _e = _d[1], value = _e === void 0 ? null : _e;
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
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return query;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxXQUFtQjs7SUFDbEQsSUFBTSxLQUFLLEdBQXNCLEVBQUUsQ0FBQztJQUNwQyxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFN0MsSUFBSSxXQUFXLEVBQUU7O1lBQ2YsS0FBbUIsSUFBQSxLQUFBLFNBQUEsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTtnQkFBdEMsSUFBTSxJQUFJLFdBQUE7Z0JBQ1QsSUFBQSxLQUFBLE9BQXNCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUEsRUFBcEMsR0FBRyxRQUFBLEVBQUUsVUFBWSxFQUFaLEtBQUssbUJBQUcsSUFBSSxLQUFtQixDQUFDO2dCQUMxQyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzlCLElBQUksS0FBSyxFQUFFO29CQUNULEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbkM7Z0JBQ0QsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFO29CQUNuQixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2lCQUNwQjtxQkFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ25DLEtBQUssQ0FBQyxHQUFHLENBQW1CLENBQUMsSUFBSSxDQUFDLEtBQWUsQ0FBQyxDQUFDO2lCQUNyRDtxQkFBTTtvQkFDTCxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFXLEVBQUUsS0FBZSxDQUFDLENBQUM7aUJBQ3REO2FBQ0Y7Ozs7Ozs7OztLQUNGO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVlcnlQYXJhbWV0ZXJCYWcgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUXVlcnlTdHJpbmcocXVlcnlzdHJpbmc6IHN0cmluZyk6IFF1ZXJ5UGFyYW1ldGVyQmFnIHtcbiAgY29uc3QgcXVlcnk6IFF1ZXJ5UGFyYW1ldGVyQmFnID0ge307XG4gIHF1ZXJ5c3RyaW5nID0gcXVlcnlzdHJpbmcucmVwbGFjZSgvXlxcPy8sIFwiXCIpO1xuXG4gIGlmIChxdWVyeXN0cmluZykge1xuICAgIGZvciAoY29uc3QgcGFpciBvZiBxdWVyeXN0cmluZy5zcGxpdChcIiZcIikpIHtcbiAgICAgIGxldCBba2V5LCB2YWx1ZSA9IG51bGxdID0gcGFpci5zcGxpdChcIj1cIik7XG4gICAgICBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQoa2V5KTtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB2YWx1ZSA9IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gICAgICB9XG4gICAgICBpZiAoIShrZXkgaW4gcXVlcnkpKSB7XG4gICAgICAgIHF1ZXJ5W2tleV0gPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShxdWVyeVtrZXldKSkge1xuICAgICAgICAocXVlcnlba2V5XSBhcyBBcnJheTxzdHJpbmc+KS5wdXNoKHZhbHVlIGFzIHN0cmluZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBxdWVyeVtrZXldID0gW3F1ZXJ5W2tleV0gYXMgc3RyaW5nLCB2YWx1ZSBhcyBzdHJpbmddO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBxdWVyeTtcbn1cbiJdfQ==