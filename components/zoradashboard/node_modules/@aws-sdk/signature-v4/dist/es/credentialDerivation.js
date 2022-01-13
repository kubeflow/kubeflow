import { __awaiter, __generator, __values } from "tslib";
import { toHex } from "@aws-sdk/util-hex-encoding";
import { KEY_TYPE_IDENTIFIER, MAX_CACHE_SIZE } from "./constants";
var signingKeyCache = {};
var cacheQueue = [];
/**
 * Create a string describing the scope of credentials used to sign a request.
 *
 * @param shortDate The current calendar date in the form YYYYMMDD.
 * @param region    The AWS region in which the service resides.
 * @param service   The service to which the signed request is being sent.
 */
export function createScope(shortDate, region, service) {
    return shortDate + "/" + region + "/" + service + "/" + KEY_TYPE_IDENTIFIER;
}
/**
 * Derive a signing key from its composite parts
 *
 * @param sha256Constructor A constructor function that can instantiate SHA-256
 *                          hash objects.
 * @param credentials       The credentials with which the request will be
 *                          signed.
 * @param shortDate         The current calendar date in the form YYYYMMDD.
 * @param region            The AWS region in which the service resides.
 * @param service           The service to which the signed request is being
 *                          sent.
 */
export var getSigningKey = function (sha256Constructor, credentials, shortDate, region, service) { return __awaiter(void 0, void 0, void 0, function () {
    var credsHash, cacheKey, key, _a, _b, signable, e_1_1;
    var e_1, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, hmac(sha256Constructor, credentials.secretAccessKey, credentials.accessKeyId)];
            case 1:
                credsHash = _d.sent();
                cacheKey = shortDate + ":" + region + ":" + service + ":" + toHex(credsHash) + ":" + credentials.sessionToken;
                if (cacheKey in signingKeyCache) {
                    return [2 /*return*/, signingKeyCache[cacheKey]];
                }
                cacheQueue.push(cacheKey);
                while (cacheQueue.length > MAX_CACHE_SIZE) {
                    delete signingKeyCache[cacheQueue.shift()];
                }
                key = "AWS4" + credentials.secretAccessKey;
                _d.label = 2;
            case 2:
                _d.trys.push([2, 7, 8, 9]);
                _a = __values([shortDate, region, service, KEY_TYPE_IDENTIFIER]), _b = _a.next();
                _d.label = 3;
            case 3:
                if (!!_b.done) return [3 /*break*/, 6];
                signable = _b.value;
                return [4 /*yield*/, hmac(sha256Constructor, key, signable)];
            case 4:
                key = _d.sent();
                _d.label = 5;
            case 5:
                _b = _a.next();
                return [3 /*break*/, 3];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_1_1 = _d.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/, (signingKeyCache[cacheKey] = key)];
        }
    });
}); };
/**
 * @internal
 */
export function clearCredentialCache() {
    cacheQueue.length = 0;
    Object.keys(signingKeyCache).forEach(function (cacheKey) {
        delete signingKeyCache[cacheKey];
    });
}
function hmac(ctor, secret, data) {
    var hash = new ctor(secret);
    hash.update(data);
    return hash.digest();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlZGVudGlhbERlcml2YXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY3JlZGVudGlhbERlcml2YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUVuRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRWxFLElBQU0sZUFBZSxHQUFrQyxFQUFFLENBQUM7QUFDMUQsSUFBTSxVQUFVLEdBQWtCLEVBQUUsQ0FBQztBQUVyQzs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsV0FBVyxDQUFDLFNBQWlCLEVBQUUsTUFBYyxFQUFFLE9BQWU7SUFDNUUsT0FBVSxTQUFTLFNBQUksTUFBTSxTQUFJLE9BQU8sU0FBSSxtQkFBcUIsQ0FBQztBQUNwRSxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLENBQUMsSUFBTSxhQUFhLEdBQUcsVUFDM0IsaUJBQWtDLEVBQ2xDLFdBQXdCLEVBQ3hCLFNBQWlCLEVBQ2pCLE1BQWMsRUFDZCxPQUFlOzs7OztvQkFFRyxxQkFBTSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsV0FBVyxDQUFDLGVBQWUsRUFBRSxXQUFXLENBQUMsV0FBVyxDQUFDLEVBQUE7O2dCQUEvRixTQUFTLEdBQUcsU0FBbUY7Z0JBQy9GLFFBQVEsR0FBTSxTQUFTLFNBQUksTUFBTSxTQUFJLE9BQU8sU0FBSSxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQUksV0FBVyxDQUFDLFlBQWMsQ0FBQztnQkFDckcsSUFBSSxRQUFRLElBQUksZUFBZSxFQUFFO29CQUMvQixzQkFBTyxlQUFlLENBQUMsUUFBUSxDQUFDLEVBQUM7aUJBQ2xDO2dCQUVELFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sVUFBVSxDQUFDLE1BQU0sR0FBRyxjQUFjLEVBQUU7b0JBQ3pDLE9BQU8sZUFBZSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQVksQ0FBQyxDQUFDO2lCQUN0RDtnQkFFRyxHQUFHLEdBQWUsU0FBTyxXQUFXLENBQUMsZUFBaUIsQ0FBQzs7OztnQkFDcEMsS0FBQSxTQUFBLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQTs7OztnQkFBN0QsUUFBUTtnQkFDWCxxQkFBTSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFBOztnQkFBbEQsR0FBRyxHQUFHLFNBQTRDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBRXJELHNCQUFPLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQWlCLENBQUMsRUFBQzs7O0tBQ3hELENBQUM7QUFFRjs7R0FFRztBQUNILE1BQU0sVUFBVSxvQkFBb0I7SUFDbEMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRO1FBQzVDLE9BQU8sZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQVMsSUFBSSxDQUFDLElBQXFCLEVBQUUsTUFBa0IsRUFBRSxJQUFnQjtJQUN2RSxJQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3ZCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDcmVkZW50aWFscywgSGFzaENvbnN0cnVjdG9yLCBTb3VyY2VEYXRhIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5pbXBvcnQgeyB0b0hleCB9IGZyb20gXCJAYXdzLXNkay91dGlsLWhleC1lbmNvZGluZ1wiO1xuXG5pbXBvcnQgeyBLRVlfVFlQRV9JREVOVElGSUVSLCBNQVhfQ0FDSEVfU0laRSB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG5jb25zdCBzaWduaW5nS2V5Q2FjaGU6IHsgW2tleTogc3RyaW5nXTogVWludDhBcnJheSB9ID0ge307XG5jb25zdCBjYWNoZVF1ZXVlOiBBcnJheTxzdHJpbmc+ID0gW107XG5cbi8qKlxuICogQ3JlYXRlIGEgc3RyaW5nIGRlc2NyaWJpbmcgdGhlIHNjb3BlIG9mIGNyZWRlbnRpYWxzIHVzZWQgdG8gc2lnbiBhIHJlcXVlc3QuXG4gKlxuICogQHBhcmFtIHNob3J0RGF0ZSBUaGUgY3VycmVudCBjYWxlbmRhciBkYXRlIGluIHRoZSBmb3JtIFlZWVlNTURELlxuICogQHBhcmFtIHJlZ2lvbiAgICBUaGUgQVdTIHJlZ2lvbiBpbiB3aGljaCB0aGUgc2VydmljZSByZXNpZGVzLlxuICogQHBhcmFtIHNlcnZpY2UgICBUaGUgc2VydmljZSB0byB3aGljaCB0aGUgc2lnbmVkIHJlcXVlc3QgaXMgYmVpbmcgc2VudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNjb3BlKHNob3J0RGF0ZTogc3RyaW5nLCByZWdpb246IHN0cmluZywgc2VydmljZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke3Nob3J0RGF0ZX0vJHtyZWdpb259LyR7c2VydmljZX0vJHtLRVlfVFlQRV9JREVOVElGSUVSfWA7XG59XG5cbi8qKlxuICogRGVyaXZlIGEgc2lnbmluZyBrZXkgZnJvbSBpdHMgY29tcG9zaXRlIHBhcnRzXG4gKlxuICogQHBhcmFtIHNoYTI1NkNvbnN0cnVjdG9yIEEgY29uc3RydWN0b3IgZnVuY3Rpb24gdGhhdCBjYW4gaW5zdGFudGlhdGUgU0hBLTI1NlxuICogICAgICAgICAgICAgICAgICAgICAgICAgIGhhc2ggb2JqZWN0cy5cbiAqIEBwYXJhbSBjcmVkZW50aWFscyAgICAgICBUaGUgY3JlZGVudGlhbHMgd2l0aCB3aGljaCB0aGUgcmVxdWVzdCB3aWxsIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmVkLlxuICogQHBhcmFtIHNob3J0RGF0ZSAgICAgICAgIFRoZSBjdXJyZW50IGNhbGVuZGFyIGRhdGUgaW4gdGhlIGZvcm0gWVlZWU1NREQuXG4gKiBAcGFyYW0gcmVnaW9uICAgICAgICAgICAgVGhlIEFXUyByZWdpb24gaW4gd2hpY2ggdGhlIHNlcnZpY2UgcmVzaWRlcy5cbiAqIEBwYXJhbSBzZXJ2aWNlICAgICAgICAgICBUaGUgc2VydmljZSB0byB3aGljaCB0aGUgc2lnbmVkIHJlcXVlc3QgaXMgYmVpbmdcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBzZW50LlxuICovXG5leHBvcnQgY29uc3QgZ2V0U2lnbmluZ0tleSA9IGFzeW5jIChcbiAgc2hhMjU2Q29uc3RydWN0b3I6IEhhc2hDb25zdHJ1Y3RvcixcbiAgY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzLFxuICBzaG9ydERhdGU6IHN0cmluZyxcbiAgcmVnaW9uOiBzdHJpbmcsXG4gIHNlcnZpY2U6IHN0cmluZ1xuKTogUHJvbWlzZTxVaW50OEFycmF5PiA9PiB7XG4gIGNvbnN0IGNyZWRzSGFzaCA9IGF3YWl0IGhtYWMoc2hhMjU2Q29uc3RydWN0b3IsIGNyZWRlbnRpYWxzLnNlY3JldEFjY2Vzc0tleSwgY3JlZGVudGlhbHMuYWNjZXNzS2V5SWQpO1xuICBjb25zdCBjYWNoZUtleSA9IGAke3Nob3J0RGF0ZX06JHtyZWdpb259OiR7c2VydmljZX06JHt0b0hleChjcmVkc0hhc2gpfToke2NyZWRlbnRpYWxzLnNlc3Npb25Ub2tlbn1gO1xuICBpZiAoY2FjaGVLZXkgaW4gc2lnbmluZ0tleUNhY2hlKSB7XG4gICAgcmV0dXJuIHNpZ25pbmdLZXlDYWNoZVtjYWNoZUtleV07XG4gIH1cblxuICBjYWNoZVF1ZXVlLnB1c2goY2FjaGVLZXkpO1xuICB3aGlsZSAoY2FjaGVRdWV1ZS5sZW5ndGggPiBNQVhfQ0FDSEVfU0laRSkge1xuICAgIGRlbGV0ZSBzaWduaW5nS2V5Q2FjaGVbY2FjaGVRdWV1ZS5zaGlmdCgpIGFzIHN0cmluZ107XG4gIH1cblxuICBsZXQga2V5OiBTb3VyY2VEYXRhID0gYEFXUzQke2NyZWRlbnRpYWxzLnNlY3JldEFjY2Vzc0tleX1gO1xuICBmb3IgKGNvbnN0IHNpZ25hYmxlIG9mIFtzaG9ydERhdGUsIHJlZ2lvbiwgc2VydmljZSwgS0VZX1RZUEVfSURFTlRJRklFUl0pIHtcbiAgICBrZXkgPSBhd2FpdCBobWFjKHNoYTI1NkNvbnN0cnVjdG9yLCBrZXksIHNpZ25hYmxlKTtcbiAgfVxuICByZXR1cm4gKHNpZ25pbmdLZXlDYWNoZVtjYWNoZUtleV0gPSBrZXkgYXMgVWludDhBcnJheSk7XG59O1xuXG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDcmVkZW50aWFsQ2FjaGUoKTogdm9pZCB7XG4gIGNhY2hlUXVldWUubGVuZ3RoID0gMDtcbiAgT2JqZWN0LmtleXMoc2lnbmluZ0tleUNhY2hlKS5mb3JFYWNoKChjYWNoZUtleSkgPT4ge1xuICAgIGRlbGV0ZSBzaWduaW5nS2V5Q2FjaGVbY2FjaGVLZXldO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaG1hYyhjdG9yOiBIYXNoQ29uc3RydWN0b3IsIHNlY3JldDogU291cmNlRGF0YSwgZGF0YTogU291cmNlRGF0YSk6IFByb21pc2U8VWludDhBcnJheT4ge1xuICBjb25zdCBoYXNoID0gbmV3IGN0b3Ioc2VjcmV0KTtcbiAgaGFzaC51cGRhdGUoZGF0YSk7XG4gIHJldHVybiBoYXNoLmRpZ2VzdCgpO1xufVxuIl19