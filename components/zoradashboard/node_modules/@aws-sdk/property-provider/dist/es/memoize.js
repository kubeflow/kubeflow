import { __awaiter, __generator } from "tslib";
export var memoize = function (provider, isExpired, requiresRefresh) {
    var result;
    var hasResult;
    if (isExpired === undefined) {
        // This is a static memoization; no need to incorporate refreshing
        return function () {
            if (!hasResult) {
                result = provider();
                hasResult = true;
            }
            return result;
        };
    }
    var isConstant = false;
    return function () { return __awaiter(void 0, void 0, void 0, function () {
        var resolved;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!hasResult) {
                        result = provider();
                        hasResult = true;
                    }
                    if (isConstant) {
                        return [2 /*return*/, result];
                    }
                    return [4 /*yield*/, result];
                case 1:
                    resolved = _a.sent();
                    if (requiresRefresh && !requiresRefresh(resolved)) {
                        isConstant = true;
                        return [2 /*return*/, resolved];
                    }
                    if (isExpired(resolved)) {
                        return [2 /*return*/, (result = provider())];
                    }
                    return [2 /*return*/, resolved];
            }
        });
    }); };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtb2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZW1vaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUEwQ0EsTUFBTSxDQUFDLElBQU0sT0FBTyxHQUFvQixVQUN0QyxRQUFxQixFQUNyQixTQUFvQyxFQUNwQyxlQUEwQztJQUUxQyxJQUFJLE1BQVcsQ0FBQztJQUNoQixJQUFJLFNBQWtCLENBQUM7SUFDdkIsSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO1FBQzNCLGtFQUFrRTtRQUNsRSxPQUFPO1lBQ0wsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDZCxNQUFNLEdBQUcsUUFBUSxFQUFFLENBQUM7Z0JBQ3BCLFNBQVMsR0FBRyxJQUFJLENBQUM7YUFDbEI7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLENBQUM7S0FDSDtJQUVELElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztJQUV2QixPQUFPOzs7OztvQkFDTCxJQUFJLENBQUMsU0FBUyxFQUFFO3dCQUNkLE1BQU0sR0FBRyxRQUFRLEVBQUUsQ0FBQzt3QkFDcEIsU0FBUyxHQUFHLElBQUksQ0FBQztxQkFDbEI7b0JBQ0QsSUFBSSxVQUFVLEVBQUU7d0JBQ2Qsc0JBQU8sTUFBTSxFQUFDO3FCQUNmO29CQUVnQixxQkFBTSxNQUFNLEVBQUE7O29CQUF2QixRQUFRLEdBQUcsU0FBWTtvQkFDN0IsSUFBSSxlQUFlLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEVBQUU7d0JBQ2pELFVBQVUsR0FBRyxJQUFJLENBQUM7d0JBQ2xCLHNCQUFPLFFBQVEsRUFBQztxQkFDakI7b0JBQ0QsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7d0JBQ3ZCLHNCQUFPLENBQUMsTUFBTSxHQUFHLFFBQVEsRUFBRSxDQUFDLEVBQUM7cUJBQzlCO29CQUNELHNCQUFPLFFBQVEsRUFBQzs7O1NBQ2pCLENBQUM7QUFDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm92aWRlciB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5pbnRlcmZhY2UgTWVtb2l6ZU92ZXJsb2FkIHtcbiAgLyoqXG4gICAqXG4gICAqIERlY29yYXRlcyBhIHByb3ZpZGVyIGZ1bmN0aW9uIHdpdGggZWl0aGVyIHN0YXRpYyBtZW1vaXphdGlvbi5cbiAgICpcbiAgICogVG8gY3JlYXRlIGEgc3RhdGljYWxseSBtZW1vaXplZCBwcm92aWRlciwgc3VwcGx5IGEgcHJvdmlkZXIgYXMgdGhlIG9ubHlcbiAgICogYXJndW1lbnQgdG8gdGhpcyBmdW5jdGlvbi4gVGhlIHByb3ZpZGVyIHdpbGwgYmUgaW52b2tlZCBvbmNlLCBhbmQgYWxsXG4gICAqIGludm9jYXRpb25zIG9mIHRoZSBwcm92aWRlciByZXR1cm5lZCBieSBgbWVtb2l6ZWAgd2lsbCByZXR1cm4gdGhlIHNhbWVcbiAgICogcHJvbWlzZSBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSBwcm92aWRlciBUaGUgcHJvdmlkZXIgd2hvc2UgcmVzdWx0IHNob3VsZCBiZSBjYWNoZWQgaW5kZWZpbml0ZWx5LlxuICAgKi9cbiAgPFQ+KHByb3ZpZGVyOiBQcm92aWRlcjxUPik6IFByb3ZpZGVyPFQ+O1xuXG4gIC8qKlxuICAgKiBEZWNvcmF0ZXMgYSBwcm92aWRlciBmdW5jdGlvbiB3aXRoIHJlZnJlc2hpbmcgbWVtb2l6YXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSBwcm92aWRlciAgICAgICAgICBUaGUgcHJvdmlkZXIgd2hvc2UgcmVzdWx0IHNob3VsZCBiZSBjYWNoZWQuXG4gICAqIEBwYXJhbSBpc0V4cGlyZWQgICAgICAgICBBIGZ1bmN0aW9uIHRoYXQgd2lsbCBldmFsdWF0ZSB0aGUgcmVzb2x2ZWQgdmFsdWUgYW5kXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRlcm1pbmUgaWYgaXQgaXMgZXhwaXJlZC4gRm9yIGV4YW1wbGUsIHdoZW5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgIG1lbW9pemluZyBBV1MgY3JlZGVudGlhbCBwcm92aWRlcnMsIHRoaXMgZnVuY3Rpb25cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgIHNob3VsZCByZXR1cm4gYHRydWVgIHdoZW4gdGhlIGNyZWRlbnRpYWwnc1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwaXJhdGlvbiBpcyBpbiB0aGUgcGFzdCAob3IgdmVyeSBuZWFyIGZ1dHVyZSkgYW5kXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICogQHBhcmFtIHJlcXVpcmVzUmVmcmVzaCAgIEEgZnVuY3Rpb24gdGhhdCB3aWxsIGV2YWx1YXRlIHRoZSByZXNvbHZlZCB2YWx1ZSBhbmRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgIGRldGVybWluZSBpZiBpdCByZXByZXNlbnRzIHN0YXRpYyB2YWx1ZSBvciBvbmUgdGhhdFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgd2lsbCBldmVudHVhbGx5IG5lZWQgdG8gYmUgcmVmcmVzaGVkLiBGb3IgZXhhbXBsZSxcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgIEFXUyBjcmVkZW50aWFscyB0aGF0IGhhdmUgbm8gZGVmaW5lZCBleHBpcmF0aW9uIHdpbGxcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgIG5ldmVyIG5lZWQgdG8gYmUgcmVmcmVzaGVkLCBzbyB0aGlzIGZ1bmN0aW9uIHdvdWxkXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYHRydWVgIGlmIHRoZSBjcmVkZW50aWFscyByZXNvbHZlZCBieSB0aGVcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVybHlpbmcgcHJvdmlkZXIgaGFkIGFuIGV4cGlyYXRpb24gYW5kIGBmYWxzZWBcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyd2lzZS5cbiAgICovXG4gIDxUPihcbiAgICBwcm92aWRlcjogUHJvdmlkZXI8VD4sXG4gICAgaXNFeHBpcmVkOiAocmVzb2x2ZWQ6IFQpID0+IGJvb2xlYW4sXG4gICAgcmVxdWlyZXNSZWZyZXNoPzogKHJlc29sdmVkOiBUKSA9PiBib29sZWFuXG4gICk6IFByb3ZpZGVyPFQ+O1xufVxuXG5leHBvcnQgY29uc3QgbWVtb2l6ZTogTWVtb2l6ZU92ZXJsb2FkID0gPFQ+KFxuICBwcm92aWRlcjogUHJvdmlkZXI8VD4sXG4gIGlzRXhwaXJlZD86IChyZXNvbHZlZDogVCkgPT4gYm9vbGVhbixcbiAgcmVxdWlyZXNSZWZyZXNoPzogKHJlc29sdmVkOiBUKSA9PiBib29sZWFuXG4pOiBQcm92aWRlcjxUPiA9PiB7XG4gIGxldCByZXN1bHQ6IGFueTtcbiAgbGV0IGhhc1Jlc3VsdDogYm9vbGVhbjtcbiAgaWYgKGlzRXhwaXJlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gVGhpcyBpcyBhIHN0YXRpYyBtZW1vaXphdGlvbjsgbm8gbmVlZCB0byBpbmNvcnBvcmF0ZSByZWZyZXNoaW5nXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmICghaGFzUmVzdWx0KSB7XG4gICAgICAgIHJlc3VsdCA9IHByb3ZpZGVyKCk7XG4gICAgICAgIGhhc1Jlc3VsdCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH1cblxuICBsZXQgaXNDb25zdGFudCA9IGZhbHNlO1xuXG4gIHJldHVybiBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFoYXNSZXN1bHQpIHtcbiAgICAgIHJlc3VsdCA9IHByb3ZpZGVyKCk7XG4gICAgICBoYXNSZXN1bHQgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoaXNDb25zdGFudCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCByZXNvbHZlZCA9IGF3YWl0IHJlc3VsdDtcbiAgICBpZiAocmVxdWlyZXNSZWZyZXNoICYmICFyZXF1aXJlc1JlZnJlc2gocmVzb2x2ZWQpKSB7XG4gICAgICBpc0NvbnN0YW50ID0gdHJ1ZTtcbiAgICAgIHJldHVybiByZXNvbHZlZDtcbiAgICB9XG4gICAgaWYgKGlzRXhwaXJlZChyZXNvbHZlZCkpIHtcbiAgICAgIHJldHVybiAocmVzdWx0ID0gcHJvdmlkZXIoKSk7XG4gICAgfVxuICAgIHJldHVybiByZXNvbHZlZDtcbiAgfTtcbn07XG4iXX0=