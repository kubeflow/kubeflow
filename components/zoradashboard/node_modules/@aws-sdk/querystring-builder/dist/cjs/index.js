"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildQueryString = void 0;
const util_uri_escape_1 = require("@aws-sdk/util-uri-escape");
function buildQueryString(query) {
    const parts = [];
    for (let key of Object.keys(query).sort()) {
        const value = query[key];
        key = util_uri_escape_1.escapeUri(key);
        if (Array.isArray(value)) {
            for (let i = 0, iLen = value.length; i < iLen; i++) {
                parts.push(`${key}=${util_uri_escape_1.escapeUri(value[i])}`);
            }
        }
        else {
            let qsEntry = key;
            if (value || typeof value === "string") {
                qsEntry += `=${util_uri_escape_1.escapeUri(value)}`;
            }
            parts.push(qsEntry);
        }
    }
    return parts.join("&");
}
exports.buildQueryString = buildQueryString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsOERBQXFEO0FBRXJELFNBQWdCLGdCQUFnQixDQUFDLEtBQXdCO0lBQ3ZELE1BQU0sS0FBSyxHQUFhLEVBQUUsQ0FBQztJQUMzQixLQUFLLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDekMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLEdBQUcsR0FBRywyQkFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNsRCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLDJCQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzdDO1NBQ0Y7YUFBTTtZQUNMLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUNsQixJQUFJLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQ3RDLE9BQU8sSUFBSSxJQUFJLDJCQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQzthQUNuQztZQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDckI7S0FDRjtJQUVELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBbkJELDRDQW1CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1ZXJ5UGFyYW1ldGVyQmFnIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5pbXBvcnQgeyBlc2NhcGVVcmkgfSBmcm9tIFwiQGF3cy1zZGsvdXRpbC11cmktZXNjYXBlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFF1ZXJ5U3RyaW5nKHF1ZXJ5OiBRdWVyeVBhcmFtZXRlckJhZyk6IHN0cmluZyB7XG4gIGNvbnN0IHBhcnRzOiBzdHJpbmdbXSA9IFtdO1xuICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMocXVlcnkpLnNvcnQoKSkge1xuICAgIGNvbnN0IHZhbHVlID0gcXVlcnlba2V5XTtcbiAgICBrZXkgPSBlc2NhcGVVcmkoa2V5KTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBpTGVuID0gdmFsdWUubGVuZ3RoOyBpIDwgaUxlbjsgaSsrKSB7XG4gICAgICAgIHBhcnRzLnB1c2goYCR7a2V5fT0ke2VzY2FwZVVyaSh2YWx1ZVtpXSl9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBxc0VudHJ5ID0ga2V5O1xuICAgICAgaWYgKHZhbHVlIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBxc0VudHJ5ICs9IGA9JHtlc2NhcGVVcmkodmFsdWUpfWA7XG4gICAgICB9XG4gICAgICBwYXJ0cy5wdXNoKHFzRW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKFwiJlwiKTtcbn1cbiJdfQ==