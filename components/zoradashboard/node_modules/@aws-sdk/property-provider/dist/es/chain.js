import { __values } from "tslib";
import { ProviderError } from "./ProviderError";
/**
 * Compose a single credential provider function from multiple credential
 * providers. The first provider in the argument list will always be invoked;
 * subsequent providers in the list will be invoked in the order in which the
 * were received if the preceding provider did not successfully resolve.
 *
 * If no providers were received or no provider resolves successfully, the
 * returned promise will be rejected.
 */
export function chain() {
    var providers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        providers[_i] = arguments[_i];
    }
    return function () {
        var e_1, _a;
        var promise = Promise.reject(new ProviderError("No providers in chain"));
        var _loop_1 = function (provider) {
            promise = promise.catch(function (err) {
                if (err === null || err === void 0 ? void 0 : err.tryNextLink) {
                    return provider();
                }
                throw err;
            });
        };
        try {
            for (var providers_1 = __values(providers), providers_1_1 = providers_1.next(); !providers_1_1.done; providers_1_1 = providers_1.next()) {
                var provider = providers_1_1.value;
                _loop_1(provider);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (providers_1_1 && !providers_1_1.done && (_a = providers_1.return)) _a.call(providers_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return promise;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVoRDs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSxLQUFLO0lBQUksbUJBQWdDO1NBQWhDLFVBQWdDLEVBQWhDLHFCQUFnQyxFQUFoQyxJQUFnQztRQUFoQyw4QkFBZ0M7O0lBQ3ZELE9BQU87O1FBQ0wsSUFBSSxPQUFPLEdBQWUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7Z0NBQzFFLFFBQVE7WUFDakIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFRO2dCQUMvQixJQUFJLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxXQUFXLEVBQUU7b0JBQ3BCLE9BQU8sUUFBUSxFQUFFLENBQUM7aUJBQ25CO2dCQUVELE1BQU0sR0FBRyxDQUFDO1lBQ1osQ0FBQyxDQUFDLENBQUM7OztZQVBMLEtBQXVCLElBQUEsY0FBQSxTQUFBLFNBQVMsQ0FBQSxvQ0FBQTtnQkFBM0IsSUFBTSxRQUFRLHNCQUFBO3dCQUFSLFFBQVE7YUFRbEI7Ozs7Ozs7OztRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm92aWRlciB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5pbXBvcnQgeyBQcm92aWRlckVycm9yIH0gZnJvbSBcIi4vUHJvdmlkZXJFcnJvclwiO1xuXG4vKipcbiAqIENvbXBvc2UgYSBzaW5nbGUgY3JlZGVudGlhbCBwcm92aWRlciBmdW5jdGlvbiBmcm9tIG11bHRpcGxlIGNyZWRlbnRpYWxcbiAqIHByb3ZpZGVycy4gVGhlIGZpcnN0IHByb3ZpZGVyIGluIHRoZSBhcmd1bWVudCBsaXN0IHdpbGwgYWx3YXlzIGJlIGludm9rZWQ7XG4gKiBzdWJzZXF1ZW50IHByb3ZpZGVycyBpbiB0aGUgbGlzdCB3aWxsIGJlIGludm9rZWQgaW4gdGhlIG9yZGVyIGluIHdoaWNoIHRoZVxuICogd2VyZSByZWNlaXZlZCBpZiB0aGUgcHJlY2VkaW5nIHByb3ZpZGVyIGRpZCBub3Qgc3VjY2Vzc2Z1bGx5IHJlc29sdmUuXG4gKlxuICogSWYgbm8gcHJvdmlkZXJzIHdlcmUgcmVjZWl2ZWQgb3Igbm8gcHJvdmlkZXIgcmVzb2x2ZXMgc3VjY2Vzc2Z1bGx5LCB0aGVcbiAqIHJldHVybmVkIHByb21pc2Ugd2lsbCBiZSByZWplY3RlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoYWluPFQ+KC4uLnByb3ZpZGVyczogQXJyYXk8UHJvdmlkZXI8VD4+KTogUHJvdmlkZXI8VD4ge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGxldCBwcm9taXNlOiBQcm9taXNlPFQ+ID0gUHJvbWlzZS5yZWplY3QobmV3IFByb3ZpZGVyRXJyb3IoXCJObyBwcm92aWRlcnMgaW4gY2hhaW5cIikpO1xuICAgIGZvciAoY29uc3QgcHJvdmlkZXIgb2YgcHJvdmlkZXJzKSB7XG4gICAgICBwcm9taXNlID0gcHJvbWlzZS5jYXRjaCgoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKGVycj8udHJ5TmV4dExpbmspIHtcbiAgICAgICAgICByZXR1cm4gcHJvdmlkZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9O1xufVxuIl19