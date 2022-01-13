"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidHostname = void 0;
function isValidHostname(hostname) {
    const hostPattern = /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/;
    return hostPattern.test(hostname);
}
exports.isValidHostname = isValidHostname;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNWYWxpZEhvc3RuYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2lzVmFsaWRIb3N0bmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxTQUFnQixlQUFlLENBQUMsUUFBZ0I7SUFDOUMsTUFBTSxXQUFXLEdBQUcsaUNBQWlDLENBQUM7SUFDdEQsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFIRCwwQ0FHQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkSG9zdG5hbWUoaG9zdG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBjb25zdCBob3N0UGF0dGVybiA9IC9eW2EtejAtOV1bYS16MC05XFwuXFwtXSpbYS16MC05XSQvO1xuICByZXR1cm4gaG9zdFBhdHRlcm4udGVzdChob3N0bmFtZSk7XG59XG4iXX0=