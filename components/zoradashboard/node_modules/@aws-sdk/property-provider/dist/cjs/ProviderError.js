"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderError = void 0;
/**
 * An error representing a failure of an individual credential provider.
 *
 * This error class has special meaning to the {@link chain} method. If a
 * provider in the chain is rejected with an error, the chain will only proceed
 * to the next provider if the value of the `tryNextLink` property on the error
 * is truthy. This allows individual providers to halt the chain and also
 * ensures the chain will stop if an entirely unexpected error is encountered.
 */
class ProviderError extends Error {
    constructor(message, tryNextLink = true) {
        super(message);
        this.tryNextLink = tryNextLink;
    }
}
exports.ProviderError = ProviderError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvdmlkZXJFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Qcm92aWRlckVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7Ozs7OztHQVFHO0FBQ0gsTUFBYSxhQUFjLFNBQVEsS0FBSztJQUN0QyxZQUFZLE9BQWUsRUFBa0IsY0FBdUIsSUFBSTtRQUN0RSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFENEIsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO0lBRXhFLENBQUM7Q0FDRjtBQUpELHNDQUlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBbiBlcnJvciByZXByZXNlbnRpbmcgYSBmYWlsdXJlIG9mIGFuIGluZGl2aWR1YWwgY3JlZGVudGlhbCBwcm92aWRlci5cbiAqXG4gKiBUaGlzIGVycm9yIGNsYXNzIGhhcyBzcGVjaWFsIG1lYW5pbmcgdG8gdGhlIHtAbGluayBjaGFpbn0gbWV0aG9kLiBJZiBhXG4gKiBwcm92aWRlciBpbiB0aGUgY2hhaW4gaXMgcmVqZWN0ZWQgd2l0aCBhbiBlcnJvciwgdGhlIGNoYWluIHdpbGwgb25seSBwcm9jZWVkXG4gKiB0byB0aGUgbmV4dCBwcm92aWRlciBpZiB0aGUgdmFsdWUgb2YgdGhlIGB0cnlOZXh0TGlua2AgcHJvcGVydHkgb24gdGhlIGVycm9yXG4gKiBpcyB0cnV0aHkuIFRoaXMgYWxsb3dzIGluZGl2aWR1YWwgcHJvdmlkZXJzIHRvIGhhbHQgdGhlIGNoYWluIGFuZCBhbHNvXG4gKiBlbnN1cmVzIHRoZSBjaGFpbiB3aWxsIHN0b3AgaWYgYW4gZW50aXJlbHkgdW5leHBlY3RlZCBlcnJvciBpcyBlbmNvdW50ZXJlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIFByb3ZpZGVyRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZywgcHVibGljIHJlYWRvbmx5IHRyeU5leHRMaW5rOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICB9XG59XG4iXX0=