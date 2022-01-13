import { __extends } from "tslib";
/**
 * An error representing a failure of an individual credential provider.
 *
 * This error class has special meaning to the {@link chain} method. If a
 * provider in the chain is rejected with an error, the chain will only proceed
 * to the next provider if the value of the `tryNextLink` property on the error
 * is truthy. This allows individual providers to halt the chain and also
 * ensures the chain will stop if an entirely unexpected error is encountered.
 */
var ProviderError = /** @class */ (function (_super) {
    __extends(ProviderError, _super);
    function ProviderError(message, tryNextLink) {
        if (tryNextLink === void 0) { tryNextLink = true; }
        var _this = _super.call(this, message) || this;
        _this.tryNextLink = tryNextLink;
        return _this;
    }
    return ProviderError;
}(Error));
export { ProviderError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvdmlkZXJFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Qcm92aWRlckVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7R0FRRztBQUNIO0lBQW1DLGlDQUFLO0lBQ3RDLHVCQUFZLE9BQWUsRUFBa0IsV0FBMkI7UUFBM0IsNEJBQUEsRUFBQSxrQkFBMkI7UUFBeEUsWUFDRSxrQkFBTSxPQUFPLENBQUMsU0FDZjtRQUY0QyxpQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7O0lBRXhFLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUFKRCxDQUFtQyxLQUFLLEdBSXZDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBbiBlcnJvciByZXByZXNlbnRpbmcgYSBmYWlsdXJlIG9mIGFuIGluZGl2aWR1YWwgY3JlZGVudGlhbCBwcm92aWRlci5cbiAqXG4gKiBUaGlzIGVycm9yIGNsYXNzIGhhcyBzcGVjaWFsIG1lYW5pbmcgdG8gdGhlIHtAbGluayBjaGFpbn0gbWV0aG9kLiBJZiBhXG4gKiBwcm92aWRlciBpbiB0aGUgY2hhaW4gaXMgcmVqZWN0ZWQgd2l0aCBhbiBlcnJvciwgdGhlIGNoYWluIHdpbGwgb25seSBwcm9jZWVkXG4gKiB0byB0aGUgbmV4dCBwcm92aWRlciBpZiB0aGUgdmFsdWUgb2YgdGhlIGB0cnlOZXh0TGlua2AgcHJvcGVydHkgb24gdGhlIGVycm9yXG4gKiBpcyB0cnV0aHkuIFRoaXMgYWxsb3dzIGluZGl2aWR1YWwgcHJvdmlkZXJzIHRvIGhhbHQgdGhlIGNoYWluIGFuZCBhbHNvXG4gKiBlbnN1cmVzIHRoZSBjaGFpbiB3aWxsIHN0b3AgaWYgYW4gZW50aXJlbHkgdW5leHBlY3RlZCBlcnJvciBpcyBlbmNvdW50ZXJlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIFByb3ZpZGVyRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZywgcHVibGljIHJlYWRvbmx5IHRyeU5leHRMaW5rOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICB9XG59XG4iXX0=