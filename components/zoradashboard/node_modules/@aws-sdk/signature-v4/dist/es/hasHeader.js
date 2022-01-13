import { __values } from "tslib";
export function hasHeader(soughtHeader, headers) {
    var e_1, _a;
    soughtHeader = soughtHeader.toLowerCase();
    try {
        for (var _b = __values(Object.keys(headers)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var headerName = _c.value;
            if (soughtHeader === headerName.toLowerCase()) {
                return true;
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
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzSGVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hhc0hlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTSxVQUFVLFNBQVMsQ0FBQyxZQUFvQixFQUFFLE9BQWtCOztJQUNoRSxZQUFZLEdBQUcsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUMxQyxLQUF5QixJQUFBLEtBQUEsU0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBLGdCQUFBLDRCQUFFO1lBQTFDLElBQU0sVUFBVSxXQUFBO1lBQ25CLElBQUksWUFBWSxLQUFLLFVBQVUsQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDN0MsT0FBTyxJQUFJLENBQUM7YUFDYjtTQUNGOzs7Ozs7Ozs7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIZWFkZXJCYWcgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0hlYWRlcihzb3VnaHRIZWFkZXI6IHN0cmluZywgaGVhZGVyczogSGVhZGVyQmFnKTogYm9vbGVhbiB7XG4gIHNvdWdodEhlYWRlciA9IHNvdWdodEhlYWRlci50b0xvd2VyQ2FzZSgpO1xuICBmb3IgKGNvbnN0IGhlYWRlck5hbWUgb2YgT2JqZWN0LmtleXMoaGVhZGVycykpIHtcbiAgICBpZiAoc291Z2h0SGVhZGVyID09PSBoZWFkZXJOYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cbiJdfQ==