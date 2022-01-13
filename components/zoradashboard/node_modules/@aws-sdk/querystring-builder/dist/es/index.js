import { __values } from "tslib";
import { escapeUri } from "@aws-sdk/util-uri-escape";
export function buildQueryString(query) {
    var e_1, _a;
    var parts = [];
    try {
        for (var _b = __values(Object.keys(query).sort()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            var value = query[key];
            key = escapeUri(key);
            if (Array.isArray(value)) {
                for (var i = 0, iLen = value.length; i < iLen; i++) {
                    parts.push(key + "=" + escapeUri(value[i]));
                }
            }
            else {
                var qsEntry = key;
                if (value || typeof value === "string") {
                    qsEntry += "=" + escapeUri(value);
                }
                parts.push(qsEntry);
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
    return parts.join("&");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVyRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsS0FBd0I7O0lBQ3ZELElBQU0sS0FBSyxHQUFhLEVBQUUsQ0FBQzs7UUFDM0IsS0FBZ0IsSUFBQSxLQUFBLFNBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQSxnQkFBQSw0QkFBRTtZQUF0QyxJQUFJLEdBQUcsV0FBQTtZQUNWLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDbEQsS0FBSyxDQUFDLElBQUksQ0FBSSxHQUFHLFNBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBRyxDQUFDLENBQUM7aUJBQzdDO2FBQ0Y7aUJBQU07Z0JBQ0wsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDO2dCQUNsQixJQUFJLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7b0JBQ3RDLE9BQU8sSUFBSSxNQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUcsQ0FBQztpQkFDbkM7Z0JBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNyQjtTQUNGOzs7Ozs7Ozs7SUFFRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDekIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1ZXJ5UGFyYW1ldGVyQmFnIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5pbXBvcnQgeyBlc2NhcGVVcmkgfSBmcm9tIFwiQGF3cy1zZGsvdXRpbC11cmktZXNjYXBlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFF1ZXJ5U3RyaW5nKHF1ZXJ5OiBRdWVyeVBhcmFtZXRlckJhZyk6IHN0cmluZyB7XG4gIGNvbnN0IHBhcnRzOiBzdHJpbmdbXSA9IFtdO1xuICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMocXVlcnkpLnNvcnQoKSkge1xuICAgIGNvbnN0IHZhbHVlID0gcXVlcnlba2V5XTtcbiAgICBrZXkgPSBlc2NhcGVVcmkoa2V5KTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBpTGVuID0gdmFsdWUubGVuZ3RoOyBpIDwgaUxlbjsgaSsrKSB7XG4gICAgICAgIHBhcnRzLnB1c2goYCR7a2V5fT0ke2VzY2FwZVVyaSh2YWx1ZVtpXSl9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBxc0VudHJ5ID0ga2V5O1xuICAgICAgaWYgKHZhbHVlIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBxc0VudHJ5ICs9IGA9JHtlc2NhcGVVcmkodmFsdWUpfWA7XG4gICAgICB9XG4gICAgICBwYXJ0cy5wdXNoKHFzRW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKFwiJlwiKTtcbn1cbiJdfQ==