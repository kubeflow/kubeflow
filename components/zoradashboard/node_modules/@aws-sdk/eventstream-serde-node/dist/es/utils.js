import { __asyncGenerator, __await, __generator } from "tslib";
/**
 * Convert object stream piped in into an async iterable. This
 * daptor should be deprecated when Node stream iterator is stable.
 * Caveat: this adaptor won't have backpressure to inwards stream
 *
 * Reference: https://nodejs.org/docs/latest-v11.x/api/stream.html#stream_readable_symbol_asynciterator
 */
export function readabletoIterable(readStream) {
    return __asyncGenerator(this, arguments, function readabletoIterable_1() {
        var streamEnded, generationEnded, records, value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    streamEnded = false;
                    generationEnded = false;
                    records = new Array();
                    readStream.on("error", function (err) {
                        if (!streamEnded) {
                            streamEnded = true;
                        }
                        if (err) {
                            throw err;
                        }
                    });
                    readStream.on("data", function (data) {
                        records.push(data);
                    });
                    readStream.on("end", function () {
                        streamEnded = true;
                    });
                    _a.label = 1;
                case 1:
                    if (!!generationEnded) return [3 /*break*/, 6];
                    return [4 /*yield*/, __await(new Promise(function (resolve) { return setTimeout(function () { return resolve(records.shift()); }, 0); }))];
                case 2:
                    value = _a.sent();
                    if (!value) return [3 /*break*/, 5];
                    return [4 /*yield*/, __await(value)];
                case 3: return [4 /*yield*/, _a.sent()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    generationEnded = streamEnded && records.length === 0;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBOzs7Ozs7R0FNRztBQUVILE1BQU0sVUFBaUIsa0JBQWtCLENBQUksVUFBb0I7Ozs7OztvQkFDM0QsV0FBVyxHQUFHLEtBQUssQ0FBQztvQkFDcEIsZUFBZSxHQUFHLEtBQUssQ0FBQztvQkFDdEIsT0FBTyxHQUFHLElBQUksS0FBSyxFQUFLLENBQUM7b0JBRS9CLFVBQVUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUMsR0FBRzt3QkFDekIsSUFBSSxDQUFDLFdBQVcsRUFBRTs0QkFDaEIsV0FBVyxHQUFHLElBQUksQ0FBQzt5QkFDcEI7d0JBQ0QsSUFBSSxHQUFHLEVBQUU7NEJBQ1AsTUFBTSxHQUFHLENBQUM7eUJBQ1g7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7b0JBRUgsVUFBVSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxJQUFJO3dCQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNyQixDQUFDLENBQUMsQ0FBQztvQkFFSCxVQUFVLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRTt3QkFDbkIsV0FBVyxHQUFHLElBQUksQ0FBQztvQkFDckIsQ0FBQyxDQUFDLENBQUM7Ozt5QkFFSSxDQUFDLGVBQWU7b0JBRVAsNkJBQU0sSUFBSSxPQUFPLENBQUksVUFBQyxPQUFPLElBQUssT0FBQSxVQUFVLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBeEIsQ0FBd0IsRUFBRSxDQUFDLENBQUMsRUFBN0MsQ0FBNkMsQ0FBQyxHQUFBOztvQkFBeEYsS0FBSyxHQUFHLFNBQWdGO3lCQUMxRixLQUFLLEVBQUwsd0JBQUs7aURBQ0QsS0FBSzt3QkFBWCxnQ0FBVzs7b0JBQVgsU0FBVyxDQUFDOzs7b0JBRWQsZUFBZSxHQUFHLFdBQVcsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQzs7Ozs7O0NBRXpEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVhZGFibGUgfSBmcm9tIFwic3RyZWFtXCI7XG5cbi8qKlxuICogQ29udmVydCBvYmplY3Qgc3RyZWFtIHBpcGVkIGluIGludG8gYW4gYXN5bmMgaXRlcmFibGUuIFRoaXNcbiAqIGRhcHRvciBzaG91bGQgYmUgZGVwcmVjYXRlZCB3aGVuIE5vZGUgc3RyZWFtIGl0ZXJhdG9yIGlzIHN0YWJsZS5cbiAqIENhdmVhdDogdGhpcyBhZGFwdG9yIHdvbid0IGhhdmUgYmFja3ByZXNzdXJlIHRvIGlud2FyZHMgc3RyZWFtXG4gKlxuICogUmVmZXJlbmNlOiBodHRwczovL25vZGVqcy5vcmcvZG9jcy9sYXRlc3QtdjExLngvYXBpL3N0cmVhbS5odG1sI3N0cmVhbV9yZWFkYWJsZV9zeW1ib2xfYXN5bmNpdGVyYXRvclxuICovXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiogcmVhZGFibGV0b0l0ZXJhYmxlPFQ+KHJlYWRTdHJlYW06IFJlYWRhYmxlKTogQXN5bmNJdGVyYWJsZTxUPiB7XG4gIGxldCBzdHJlYW1FbmRlZCA9IGZhbHNlO1xuICBsZXQgZ2VuZXJhdGlvbkVuZGVkID0gZmFsc2U7XG4gIGNvbnN0IHJlY29yZHMgPSBuZXcgQXJyYXk8VD4oKTtcblxuICByZWFkU3RyZWFtLm9uKFwiZXJyb3JcIiwgKGVycikgPT4ge1xuICAgIGlmICghc3RyZWFtRW5kZWQpIHtcbiAgICAgIHN0cmVhbUVuZGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfSk7XG5cbiAgcmVhZFN0cmVhbS5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcbiAgICByZWNvcmRzLnB1c2goZGF0YSk7XG4gIH0pO1xuXG4gIHJlYWRTdHJlYW0ub24oXCJlbmRcIiwgKCkgPT4ge1xuICAgIHN0cmVhbUVuZGVkID0gdHJ1ZTtcbiAgfSk7XG5cbiAgd2hpbGUgKCFnZW5lcmF0aW9uRW5kZWQpIHtcbiAgICAvLyBAdHMtaWdub3JlIFRTMjM0NTogQXJndW1lbnQgb2YgdHlwZSAnVCB8IHVuZGVmaW5lZCcgaXMgbm90IGFzc2lnbmFibGUgdG8gdHlwZSAnVCB8IFByb21pc2VMaWtlPFQ+Jy5cbiAgICBjb25zdCB2YWx1ZSA9IGF3YWl0IG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KCgpID0+IHJlc29sdmUocmVjb3Jkcy5zaGlmdCgpKSwgMCkpO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgeWllbGQgdmFsdWU7XG4gICAgfVxuICAgIGdlbmVyYXRpb25FbmRlZCA9IHN0cmVhbUVuZGVkICYmIHJlY29yZHMubGVuZ3RoID09PSAwO1xuICB9XG59XG4iXX0=