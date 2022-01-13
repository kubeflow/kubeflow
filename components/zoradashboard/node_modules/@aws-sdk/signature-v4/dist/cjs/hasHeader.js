"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasHeader = void 0;
function hasHeader(soughtHeader, headers) {
    soughtHeader = soughtHeader.toLowerCase();
    for (const headerName of Object.keys(headers)) {
        if (soughtHeader === headerName.toLowerCase()) {
            return true;
        }
    }
    return false;
}
exports.hasHeader = hasHeader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzSGVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hhc0hlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxTQUFnQixTQUFTLENBQUMsWUFBb0IsRUFBRSxPQUFrQjtJQUNoRSxZQUFZLEdBQUcsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzFDLEtBQUssTUFBTSxVQUFVLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUM3QyxJQUFJLFlBQVksS0FBSyxVQUFVLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDN0MsT0FBTyxJQUFJLENBQUM7U0FDYjtLQUNGO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBVEQsOEJBU0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIZWFkZXJCYWcgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0hlYWRlcihzb3VnaHRIZWFkZXI6IHN0cmluZywgaGVhZGVyczogSGVhZGVyQmFnKTogYm9vbGVhbiB7XG4gIHNvdWdodEhlYWRlciA9IHNvdWdodEhlYWRlci50b0xvd2VyQ2FzZSgpO1xuICBmb3IgKGNvbnN0IGhlYWRlck5hbWUgb2YgT2JqZWN0LmtleXMoaGVhZGVycykpIHtcbiAgICBpZiAoc291Z2h0SGVhZGVyID09PSBoZWFkZXJOYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cbiJdfQ==