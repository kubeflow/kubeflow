"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chain = void 0;
const ProviderError_1 = require("./ProviderError");
/**
 * Compose a single credential provider function from multiple credential
 * providers. The first provider in the argument list will always be invoked;
 * subsequent providers in the list will be invoked in the order in which the
 * were received if the preceding provider did not successfully resolve.
 *
 * If no providers were received or no provider resolves successfully, the
 * returned promise will be rejected.
 */
function chain(...providers) {
    return () => {
        let promise = Promise.reject(new ProviderError_1.ProviderError("No providers in chain"));
        for (const provider of providers) {
            promise = promise.catch((err) => {
                if (err === null || err === void 0 ? void 0 : err.tryNextLink) {
                    return provider();
                }
                throw err;
            });
        }
        return promise;
    };
}
exports.chain = chain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsbURBQWdEO0FBRWhEOzs7Ozs7OztHQVFHO0FBQ0gsU0FBZ0IsS0FBSyxDQUFJLEdBQUcsU0FBNkI7SUFDdkQsT0FBTyxHQUFHLEVBQUU7UUFDVixJQUFJLE9BQU8sR0FBZSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksNkJBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7UUFDckYsS0FBSyxNQUFNLFFBQVEsSUFBSSxTQUFTLEVBQUU7WUFDaEMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQkFDbkMsSUFBSSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsV0FBVyxFQUFFO29CQUNwQixPQUFPLFFBQVEsRUFBRSxDQUFDO2lCQUNuQjtnQkFFRCxNQUFNLEdBQUcsQ0FBQztZQUNaLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDLENBQUM7QUFDSixDQUFDO0FBZkQsc0JBZUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm92aWRlciB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5pbXBvcnQgeyBQcm92aWRlckVycm9yIH0gZnJvbSBcIi4vUHJvdmlkZXJFcnJvclwiO1xuXG4vKipcbiAqIENvbXBvc2UgYSBzaW5nbGUgY3JlZGVudGlhbCBwcm92aWRlciBmdW5jdGlvbiBmcm9tIG11bHRpcGxlIGNyZWRlbnRpYWxcbiAqIHByb3ZpZGVycy4gVGhlIGZpcnN0IHByb3ZpZGVyIGluIHRoZSBhcmd1bWVudCBsaXN0IHdpbGwgYWx3YXlzIGJlIGludm9rZWQ7XG4gKiBzdWJzZXF1ZW50IHByb3ZpZGVycyBpbiB0aGUgbGlzdCB3aWxsIGJlIGludm9rZWQgaW4gdGhlIG9yZGVyIGluIHdoaWNoIHRoZVxuICogd2VyZSByZWNlaXZlZCBpZiB0aGUgcHJlY2VkaW5nIHByb3ZpZGVyIGRpZCBub3Qgc3VjY2Vzc2Z1bGx5IHJlc29sdmUuXG4gKlxuICogSWYgbm8gcHJvdmlkZXJzIHdlcmUgcmVjZWl2ZWQgb3Igbm8gcHJvdmlkZXIgcmVzb2x2ZXMgc3VjY2Vzc2Z1bGx5LCB0aGVcbiAqIHJldHVybmVkIHByb21pc2Ugd2lsbCBiZSByZWplY3RlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoYWluPFQ+KC4uLnByb3ZpZGVyczogQXJyYXk8UHJvdmlkZXI8VD4+KTogUHJvdmlkZXI8VD4ge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGxldCBwcm9taXNlOiBQcm9taXNlPFQ+ID0gUHJvbWlzZS5yZWplY3QobmV3IFByb3ZpZGVyRXJyb3IoXCJObyBwcm92aWRlcnMgaW4gY2hhaW5cIikpO1xuICAgIGZvciAoY29uc3QgcHJvdmlkZXIgb2YgcHJvdmlkZXJzKSB7XG4gICAgICBwcm9taXNlID0gcHJvbWlzZS5jYXRjaCgoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKGVycj8udHJ5TmV4dExpbmspIHtcbiAgICAgICAgICByZXR1cm4gcHJvdmlkZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9O1xufVxuIl19