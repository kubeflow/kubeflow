import { __awaiter, __generator } from "tslib";
import { toHex } from "@aws-sdk/util-hex-encoding";
import { ALGORITHM_IDENTIFIER, ALGORITHM_QUERY_PARAM, AMZ_DATE_HEADER, AMZ_DATE_QUERY_PARAM, AUTH_HEADER, CREDENTIAL_QUERY_PARAM, EVENT_ALGORITHM_IDENTIFIER, EXPIRES_QUERY_PARAM, MAX_PRESIGNED_TTL, SHA256_HEADER, SIGNATURE_QUERY_PARAM, SIGNED_HEADERS_QUERY_PARAM, TOKEN_HEADER, TOKEN_QUERY_PARAM, } from "./constants";
import { createScope, getSigningKey } from "./credentialDerivation";
import { getCanonicalHeaders } from "./getCanonicalHeaders";
import { getCanonicalQuery } from "./getCanonicalQuery";
import { getPayloadHash } from "./getPayloadHash";
import { hasHeader } from "./hasHeader";
import { moveHeadersToQuery } from "./moveHeadersToQuery";
import { prepareRequest } from "./prepareRequest";
import { iso8601 } from "./utilDate";
var SignatureV4 = /** @class */ (function () {
    function SignatureV4(_a) {
        var applyChecksum = _a.applyChecksum, credentials = _a.credentials, region = _a.region, service = _a.service, sha256 = _a.sha256, _b = _a.uriEscapePath, uriEscapePath = _b === void 0 ? true : _b;
        this.service = service;
        this.sha256 = sha256;
        this.uriEscapePath = uriEscapePath;
        // default to true if applyChecksum isn't set
        this.applyChecksum = typeof applyChecksum === "boolean" ? applyChecksum : true;
        this.regionProvider = normalizeRegionProvider(region);
        this.credentialProvider = normalizeCredentialsProvider(credentials);
    }
    SignatureV4.prototype.presign = function (originalRequest, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, signingDate, _b, expiresIn, unsignableHeaders, unhoistableHeaders, signableHeaders, signingRegion, signingService, credentials, region, _c, _d, longDate, shortDate, scope, request, canonicalHeaders, _e, _f, _g, _h, _j, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        _a = options.signingDate, signingDate = _a === void 0 ? new Date() : _a, _b = options.expiresIn, expiresIn = _b === void 0 ? 3600 : _b, unsignableHeaders = options.unsignableHeaders, unhoistableHeaders = options.unhoistableHeaders, signableHeaders = options.signableHeaders, signingRegion = options.signingRegion, signingService = options.signingService;
                        return [4 /*yield*/, this.credentialProvider()];
                    case 1:
                        credentials = _l.sent();
                        if (!(signingRegion !== null && signingRegion !== void 0)) return [3 /*break*/, 2];
                        _c = signingRegion;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.regionProvider()];
                    case 3:
                        _c = (_l.sent());
                        _l.label = 4;
                    case 4:
                        region = _c;
                        _d = formatDate(signingDate), longDate = _d.longDate, shortDate = _d.shortDate;
                        if (expiresIn > MAX_PRESIGNED_TTL) {
                            return [2 /*return*/, Promise.reject("Signature version 4 presigned URLs" + " must have an expiration date less than one week in" + " the future")];
                        }
                        scope = createScope(shortDate, region, signingService !== null && signingService !== void 0 ? signingService : this.service);
                        request = moveHeadersToQuery(prepareRequest(originalRequest), { unhoistableHeaders: unhoistableHeaders });
                        if (credentials.sessionToken) {
                            request.query[TOKEN_QUERY_PARAM] = credentials.sessionToken;
                        }
                        request.query[ALGORITHM_QUERY_PARAM] = ALGORITHM_IDENTIFIER;
                        request.query[CREDENTIAL_QUERY_PARAM] = credentials.accessKeyId + "/" + scope;
                        request.query[AMZ_DATE_QUERY_PARAM] = longDate;
                        request.query[EXPIRES_QUERY_PARAM] = expiresIn.toString(10);
                        canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
                        request.query[SIGNED_HEADERS_QUERY_PARAM] = getCanonicalHeaderList(canonicalHeaders);
                        _e = request.query;
                        _f = SIGNATURE_QUERY_PARAM;
                        _g = this.getSignature;
                        _h = [longDate,
                            scope,
                            this.getSigningKey(credentials, region, shortDate, signingService)];
                        _j = this.createCanonicalRequest;
                        _k = [request, canonicalHeaders];
                        return [4 /*yield*/, getPayloadHash(originalRequest, this.sha256)];
                    case 5: return [4 /*yield*/, _g.apply(this, _h.concat([_j.apply(this, _k.concat([_l.sent()]))]))];
                    case 6:
                        _e[_f] = _l.sent();
                        return [2 /*return*/, request];
                }
            });
        });
    };
    SignatureV4.prototype.sign = function (toSign, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (typeof toSign === "string") {
                    return [2 /*return*/, this.signString(toSign, options)];
                }
                else if (toSign.headers && toSign.payload) {
                    return [2 /*return*/, this.signEvent(toSign, options)];
                }
                else {
                    return [2 /*return*/, this.signRequest(toSign, options)];
                }
                return [2 /*return*/];
            });
        });
    };
    SignatureV4.prototype.signEvent = function (_a, _b) {
        var headers = _a.headers, payload = _a.payload;
        var _c = _b.signingDate, signingDate = _c === void 0 ? new Date() : _c, priorSignature = _b.priorSignature, signingRegion = _b.signingRegion, signingService = _b.signingService;
        return __awaiter(this, void 0, void 0, function () {
            var region, _d, _e, shortDate, longDate, scope, hashedPayload, hash, hashedHeaders, _f, stringToSign;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!(signingRegion !== null && signingRegion !== void 0)) return [3 /*break*/, 1];
                        _d = signingRegion;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.regionProvider()];
                    case 2:
                        _d = (_g.sent());
                        _g.label = 3;
                    case 3:
                        region = _d;
                        _e = formatDate(signingDate), shortDate = _e.shortDate, longDate = _e.longDate;
                        scope = createScope(shortDate, region, signingService !== null && signingService !== void 0 ? signingService : this.service);
                        return [4 /*yield*/, getPayloadHash({ headers: {}, body: payload }, this.sha256)];
                    case 4:
                        hashedPayload = _g.sent();
                        hash = new this.sha256();
                        hash.update(headers);
                        _f = toHex;
                        return [4 /*yield*/, hash.digest()];
                    case 5:
                        hashedHeaders = _f.apply(void 0, [_g.sent()]);
                        stringToSign = [
                            EVENT_ALGORITHM_IDENTIFIER,
                            longDate,
                            scope,
                            priorSignature,
                            hashedHeaders,
                            hashedPayload,
                        ].join("\n");
                        return [2 /*return*/, this.signString(stringToSign, { signingDate: signingDate, signingRegion: region, signingService: signingService })];
                }
            });
        });
    };
    SignatureV4.prototype.signString = function (stringToSign, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.signingDate, signingDate = _c === void 0 ? new Date() : _c, signingRegion = _b.signingRegion, signingService = _b.signingService;
        return __awaiter(this, void 0, void 0, function () {
            var credentials, region, _d, shortDate, hash, _e, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0: return [4 /*yield*/, this.credentialProvider()];
                    case 1:
                        credentials = _h.sent();
                        if (!(signingRegion !== null && signingRegion !== void 0)) return [3 /*break*/, 2];
                        _d = signingRegion;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.regionProvider()];
                    case 3:
                        _d = (_h.sent());
                        _h.label = 4;
                    case 4:
                        region = _d;
                        shortDate = formatDate(signingDate).shortDate;
                        _f = (_e = this.sha256).bind;
                        return [4 /*yield*/, this.getSigningKey(credentials, region, shortDate, signingService)];
                    case 5:
                        hash = new (_f.apply(_e, [void 0, _h.sent()]))();
                        hash.update(stringToSign);
                        _g = toHex;
                        return [4 /*yield*/, hash.digest()];
                    case 6: return [2 /*return*/, _g.apply(void 0, [_h.sent()])];
                }
            });
        });
    };
    SignatureV4.prototype.signRequest = function (requestToSign, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.signingDate, signingDate = _c === void 0 ? new Date() : _c, signableHeaders = _b.signableHeaders, unsignableHeaders = _b.unsignableHeaders, signingRegion = _b.signingRegion, signingService = _b.signingService;
        return __awaiter(this, void 0, void 0, function () {
            var credentials, region, _d, request, _e, longDate, shortDate, scope, payloadHash, canonicalHeaders, signature;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.credentialProvider()];
                    case 1:
                        credentials = _f.sent();
                        if (!(signingRegion !== null && signingRegion !== void 0)) return [3 /*break*/, 2];
                        _d = signingRegion;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.regionProvider()];
                    case 3:
                        _d = (_f.sent());
                        _f.label = 4;
                    case 4:
                        region = _d;
                        request = prepareRequest(requestToSign);
                        _e = formatDate(signingDate), longDate = _e.longDate, shortDate = _e.shortDate;
                        scope = createScope(shortDate, region, signingService !== null && signingService !== void 0 ? signingService : this.service);
                        request.headers[AMZ_DATE_HEADER] = longDate;
                        if (credentials.sessionToken) {
                            request.headers[TOKEN_HEADER] = credentials.sessionToken;
                        }
                        return [4 /*yield*/, getPayloadHash(request, this.sha256)];
                    case 5:
                        payloadHash = _f.sent();
                        if (!hasHeader(SHA256_HEADER, request.headers) && this.applyChecksum) {
                            request.headers[SHA256_HEADER] = payloadHash;
                        }
                        canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
                        return [4 /*yield*/, this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, payloadHash))];
                    case 6:
                        signature = _f.sent();
                        request.headers[AUTH_HEADER] =
                            ALGORITHM_IDENTIFIER + " " +
                                ("Credential=" + credentials.accessKeyId + "/" + scope + ", ") +
                                ("SignedHeaders=" + getCanonicalHeaderList(canonicalHeaders) + ", ") +
                                ("Signature=" + signature);
                        return [2 /*return*/, request];
                }
            });
        });
    };
    SignatureV4.prototype.createCanonicalRequest = function (request, canonicalHeaders, payloadHash) {
        var sortedHeaders = Object.keys(canonicalHeaders).sort();
        return request.method + "\n" + this.getCanonicalPath(request) + "\n" + getCanonicalQuery(request) + "\n" + sortedHeaders.map(function (name) { return name + ":" + canonicalHeaders[name]; }).join("\n") + "\n\n" + sortedHeaders.join(";") + "\n" + payloadHash;
    };
    SignatureV4.prototype.createStringToSign = function (longDate, credentialScope, canonicalRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, hashedRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hash = new this.sha256();
                        hash.update(canonicalRequest);
                        return [4 /*yield*/, hash.digest()];
                    case 1:
                        hashedRequest = _a.sent();
                        return [2 /*return*/, ALGORITHM_IDENTIFIER + "\n" + longDate + "\n" + credentialScope + "\n" + toHex(hashedRequest)];
                }
            });
        });
    };
    SignatureV4.prototype.getCanonicalPath = function (_a) {
        var path = _a.path;
        if (this.uriEscapePath) {
            var doubleEncoded = encodeURIComponent(path.replace(/^\//, ""));
            return "/" + doubleEncoded.replace(/%2F/g, "/");
        }
        return path;
    };
    SignatureV4.prototype.getSignature = function (longDate, credentialScope, keyPromise, canonicalRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var stringToSign, hash, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.createStringToSign(longDate, credentialScope, canonicalRequest)];
                    case 1:
                        stringToSign = _d.sent();
                        _b = (_a = this.sha256).bind;
                        return [4 /*yield*/, keyPromise];
                    case 2:
                        hash = new (_b.apply(_a, [void 0, _d.sent()]))();
                        hash.update(stringToSign);
                        _c = toHex;
                        return [4 /*yield*/, hash.digest()];
                    case 3: return [2 /*return*/, _c.apply(void 0, [_d.sent()])];
                }
            });
        });
    };
    SignatureV4.prototype.getSigningKey = function (credentials, region, shortDate, service) {
        return getSigningKey(this.sha256, credentials, shortDate, region, service || this.service);
    };
    return SignatureV4;
}());
export { SignatureV4 };
var formatDate = function (now) {
    var longDate = iso8601(now).replace(/[\-:]/g, "");
    return {
        longDate: longDate,
        shortDate: longDate.substr(0, 8),
    };
};
var getCanonicalHeaderList = function (headers) { return Object.keys(headers).sort().join(";"); };
var normalizeRegionProvider = function (region) {
    if (typeof region === "string") {
        var promisified_1 = Promise.resolve(region);
        return function () { return promisified_1; };
    }
    else {
        return region;
    }
};
var normalizeCredentialsProvider = function (credentials) {
    if (typeof credentials === "object") {
        var promisified_2 = Promise.resolve(credentials);
        return function () { return promisified_2; };
    }
    else {
        return credentials;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2lnbmF0dXJlVjQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvU2lnbmF0dXJlVjQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQWlCQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFbkQsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixxQkFBcUIsRUFDckIsZUFBZSxFQUNmLG9CQUFvQixFQUNwQixXQUFXLEVBQ1gsc0JBQXNCLEVBQ3RCLDBCQUEwQixFQUMxQixtQkFBbUIsRUFDbkIsaUJBQWlCLEVBQ2pCLGFBQWEsRUFDYixxQkFBcUIsRUFDckIsMEJBQTBCLEVBQzFCLFlBQVksRUFDWixpQkFBaUIsR0FDbEIsTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFlBQVksQ0FBQztBQWtEckM7SUFRRSxxQkFBWSxFQU84QjtZQU54QyxhQUFhLG1CQUFBLEVBQ2IsV0FBVyxpQkFBQSxFQUNYLE1BQU0sWUFBQSxFQUNOLE9BQU8sYUFBQSxFQUNQLE1BQU0sWUFBQSxFQUNOLHFCQUFvQixFQUFwQixhQUFhLG1CQUFHLElBQUksS0FBQTtRQUVwQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJ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YztJQUNoQyxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwRCxPQUFPO1FBQ0wsUUFBUSxVQUFBO1FBQ1IsU0FBUyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNqQyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsSUFBTSxzQkFBc0IsR0FBRyxVQUFDLE9BQWUsSUFBYSxPQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFyQyxDQUFxQyxDQUFDO0FBRWxHLElBQU0sdUJBQXVCLEdBQUcsVUFBQyxNQUFpQztJQUNoRSxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtRQUM5QixJQUFNLGFBQVcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLE9BQU8sY0FBTSxPQUFBLGFBQVcsRUFBWCxDQUFXLENBQUM7S0FDMUI7U0FBTTtRQUNMLE9BQU8sTUFBTSxDQUFDO0tBQ2Y7QUFDSCxDQUFDLENBQUM7QUFFRixJQUFNLDRCQUE0QixHQUFHLFVBQUMsV0FBZ0Q7SUFDcEYsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7UUFDbkMsSUFBTSxhQUFXLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqRCxPQUFPLGNBQU0sT0FBQSxhQUFXLEVBQVgsQ0FBVyxDQUFDO0tBQzFCO1NBQU07UUFDTCxPQUFPLFdBQVcsQ0FBQztLQUNwQjtBQUNILENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENyZWRlbnRpYWxzLFxuICBEYXRlSW5wdXQsXG4gIEV2ZW50U2lnbmVyLFxuICBFdmVudFNpZ25pbmdBcmd1bWVudHMsXG4gIEZvcm1hdHRlZEV2ZW50LFxuICBIYXNoQ29uc3RydWN0b3IsXG4gIEhlYWRlckJhZyxcbiAgSHR0cFJlcXVlc3QsXG4gIFByb3ZpZGVyLFxuICBSZXF1ZXN0UHJlc2lnbmVyLFxuICBSZXF1ZXN0UHJlc2lnbmluZ0FyZ3VtZW50cyxcbiAgUmVxdWVzdFNpZ25lcixcbiAgUmVxdWVzdFNpZ25pbmdBcmd1bWVudHMsXG4gIFNpZ25pbmdBcmd1bWVudHMsXG4gIFN0cmluZ1NpZ25lcixcbn0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5pbXBvcnQgeyB0b0hleCB9IGZyb20gXCJAYXdzLXNkay91dGlsLWhleC1lbmNvZGluZ1wiO1xuXG5pbXBvcnQge1xuICBBTEdPUklUSE1fSURFTlRJRklFUixcbiAgQUxHT1JJVEhNX1FVRVJZX1BBUkFNLFxuICBBTVpfREFURV9IRUFERVIsXG4gIEFNWl9EQVRFX1FVRVJZX1BBUkFNLFxuICBBVVRIX0hFQURFUixcbiAgQ1JFREVOVElBTF9RVUVSWV9QQVJBTSxcbiAgRVZFTlRfQUxHT1JJVEhNX0lERU5USUZJRVIsXG4gIEVYUElSRVNfUVVFUllfUEFSQU0sXG4gIE1BWF9QUkVTSUdORURfVFRMLFxuICBTSEEyNTZfSEVBREVSLFxuICBTSUdOQVRVUkVfUVVFUllfUEFSQU0sXG4gIFNJR05FRF9IRUFERVJTX1FVRVJZX1BBUkFNLFxuICBUT0tFTl9IRUFERVIsXG4gIFRPS0VOX1FVRVJZX1BBUkFNLFxufSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGNyZWF0ZVNjb3BlLCBnZXRTaWduaW5nS2V5IH0gZnJvbSBcIi4vY3JlZGVudGlhbERlcml2YXRpb25cIjtcbmltcG9ydCB7IGdldENhbm9uaWNhbEhlYWRlcnMgfSBmcm9tIFwiLi9nZXRDYW5vbmljYWxIZWFkZXJzXCI7XG5pbXBvcnQgeyBnZXRDYW5vbmljYWxRdWVyeSB9IGZyb20gXCIuL2dldENhbm9uaWNhbFF1ZXJ5XCI7XG5pbXBvcnQgeyBnZXRQYXlsb2FkSGFzaCB9IGZyb20gXCIuL2dldFBheWxvYWRIYXNoXCI7XG5pbXBvcnQgeyBoYXNIZWFkZXIgfSBmcm9tIFwiLi9oYXNIZWFkZXJcIjtcbmltcG9ydCB7IG1vdmVIZWFkZXJzVG9RdWVyeSB9IGZyb20gXCIuL21vdmVIZWFkZXJzVG9RdWVyeVwiO1xuaW1wb3J0IHsgcHJlcGFyZVJlcXVlc3QgfSBmcm9tIFwiLi9wcmVwYXJlUmVxdWVzdFwiO1xuaW1wb3J0IHsgaXNvODYwMSB9IGZyb20gXCIuL3V0aWxEYXRlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2lnbmF0dXJlVjRJbml0IHtcbiAgLyoqXG4gICAqIFRoZSBzZXJ2aWNlIHNpZ25pbmcgbmFtZS5cbiAgICovXG4gIHNlcnZpY2U6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHJlZ2lvbiBuYW1lIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHdpbGwgYmVcbiAgICogcmVzb2x2ZWQgd2l0aCB0aGUgcmVnaW9uIG5hbWUuXG4gICAqL1xuICByZWdpb246IHN0cmluZyB8IFByb3ZpZGVyPHN0cmluZz47XG5cbiAgLyoqXG4gICAqIFRoZSBjcmVkZW50aWFscyB3aXRoIHdoaWNoIHRoZSByZXF1ZXN0IHNob3VsZCBiZSBzaWduZWQgb3IgYSBmdW5jdGlvblxuICAgKiB0aGF0IHJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbCBiZSByZXNvbHZlZCB3aXRoIGNyZWRlbnRpYWxzLlxuICAgKi9cbiAgY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzIHwgUHJvdmlkZXI8Q3JlZGVudGlhbHM+O1xuXG4gIC8qKlxuICAgKiBBIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIGZvciBhIGhhc2ggb2JqZWN0IHRoYXQgd2lsbCBjYWxjdWxhdGUgU0hBLTI1NiBITUFDXG4gICAqIGNoZWNrc3Vtcy5cbiAgICovXG4gIHNoYTI1Nj86IEhhc2hDb25zdHJ1Y3RvcjtcblxuICAvKipcbiAgICogV2hldGhlciB0byB1cmktZXNjYXBlIHRoZSByZXF1ZXN0IFVSSSBwYXRoIGFzIHBhcnQgb2YgY29tcHV0aW5nIHRoZVxuICAgKiBjYW5vbmljYWwgcmVxdWVzdCBzdHJpbmcuIFRoaXMgaXMgcmVxdWlyZWQgZm9yIGV2ZXJ5IEFXUyBzZXJ2aWNlLCBleGNlcHRcbiAgICogQW1hem9uIFMzLCBhcyBvZiBsYXRlIDIwMTcuXG4gICAqXG4gICAqIEBkZWZhdWx0IFt0cnVlXVxuICAgKi9cbiAgdXJpRXNjYXBlUGF0aD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gY2FsY3VsYXRlIGEgY2hlY2tzdW0gb2YgdGhlIHJlcXVlc3QgYm9keSBhbmQgaW5jbHVkZSBpdCBhc1xuICAgKiBlaXRoZXIgYSByZXF1ZXN0IGhlYWRlciAod2hlbiBzaWduaW5nKSBvciBhcyBhIHF1ZXJ5IHN0cmluZyBwYXJhbWV0ZXJcbiAgICogKHdoZW4gcHJlc2lnbmluZykuIFRoaXMgaXMgcmVxdWlyZWQgZm9yIEFXUyBHbGFjaWVyIGFuZCBBbWF6b24gUzMgYW5kIG9wdGlvbmFsIGZvclxuICAgKiBldmVyeSBvdGhlciBBV1Mgc2VydmljZSBhcyBvZiBsYXRlIDIwMTcuXG4gICAqXG4gICAqIEBkZWZhdWx0IFt0cnVlXVxuICAgKi9cbiAgYXBwbHlDaGVja3N1bT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2lnbmF0dXJlVjRDcnlwdG9Jbml0IHtcbiAgc2hhMjU2OiBIYXNoQ29uc3RydWN0b3I7XG59XG5cbmV4cG9ydCBjbGFzcyBTaWduYXR1cmVWNCBpbXBsZW1lbnRzIFJlcXVlc3RQcmVzaWduZXIsIFJlcXVlc3RTaWduZXIsIFN0cmluZ1NpZ25lciwgRXZlbnRTaWduZXIge1xuICBwcml2YXRlIHJlYWRvbmx5IHNlcnZpY2U6IHN0cmluZztcbiAgcHJpdmF0ZSByZWFkb25seSByZWdpb25Qcm92aWRlcjogUHJvdmlkZXI8c3RyaW5nPjtcbiAgcHJpdmF0ZSByZWFkb25seSBjcmVkZW50aWFsUHJvdmlkZXI6IFByb3ZpZGVyPENyZWRlbnRpYWxzPjtcbiAgcHJpdmF0ZSByZWFkb25seSBzaGEyNTY6IEhhc2hDb25zdHJ1Y3RvcjtcbiAgcHJpdmF0ZSByZWFkb25seSB1cmlFc2NhcGVQYXRoOiBib29sZWFuO1xuICBwcml2YXRlIHJlYWRvbmx5IGFwcGx5Q2hlY2tzdW06IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3Ioe1xuICAgIGFwcGx5Q2hlY2tzdW0sXG4gICAgY3JlZGVudGlhbHMsXG4gICAgcmVnaW9uLFxuICAgIHNlcnZpY2UsXG4gICAgc2hhMjU2LFxuICAgIHVyaUVzY2FwZVBhdGggPSB0cnVlLFxuICB9OiBTaWduYXR1cmVWNEluaXQgJiBTaWduYXR1cmVWNENyeXB0b0luaXQpIHtcbiAgICB0aGlzLnNlcnZpY2UgPSBzZXJ2aWNlO1xuICAgIHRoaXMuc2hhMjU2ID0gc2hhMjU2O1xuICAgIHRoaXMudXJpRXNjYXBlUGF0aCA9IHVyaUVzY2FwZVBhdGg7XG4gICAgLy8gZGVmYXVsdCB0byB0cnVlIGlmIGFwcGx5Q2hlY2tzdW0gaXNuJ3Qgc2V0XG4gICAgdGhpcy5hcHBseUNoZWNrc3VtID0gdHlwZW9mIGFwcGx5Q2hlY2tzdW0gPT09IFwiYm9vbGVhblwiID8gYXBwbHlDaGVja3N1bSA6IHRydWU7XG4gICAgdGhpcy5yZWdpb25Qcm92aWRlciA9IG5vcm1hbGl6ZVJlZ2lvblByb3ZpZGVyKHJlZ2lvbik7XG4gICAgdGhpcy5jcmVkZW50aWFsUHJvdmlkZXIgPSBub3JtYWxpemVDcmVkZW50aWFsc1Byb3ZpZGVyKGNyZWRlbnRpYWxzKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwcmVzaWduKG9yaWdpbmFsUmVxdWVzdDogSHR0cFJlcXVlc3QsIG9wdGlvbnM6IFJlcXVlc3RQcmVzaWduaW5nQXJndW1lbnRzID0ge30pOiBQcm9taXNlPEh0dHBSZXF1ZXN0PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2lnbmluZ0RhdGUgPSBuZXcgRGF0ZSgpLFxuICAgICAgZXhwaXJlc0luID0gMzYwMCxcbiAgICAgIHVuc2lnbmFibGVIZWFkZXJzLFxuICAgICAgdW5ob2lzdGFibGVIZWFkZXJzLFxuICAgICAgc2lnbmFibGVIZWFkZXJzLFxuICAgICAgc2lnbmluZ1JlZ2lvbixcbiAgICAgIHNpZ25pbmdTZXJ2aWNlLFxuICAgIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5jcmVkZW50aWFsUHJvdmlkZXIoKTtcbiAgICBjb25zdCByZWdpb24gPSBzaWduaW5nUmVnaW9uID8/IChhd2FpdCB0aGlzLnJlZ2lvblByb3ZpZGVyKCkpO1xuXG4gICAgY29uc3QgeyBsb25nRGF0ZSwgc2hvcnREYXRlIH0gPSBmb3JtYXREYXRlKHNpZ25pbmdEYXRlKTtcbiAgICBpZiAoZXhwaXJlc0luID4gTUFYX1BSRVNJR05FRF9UVEwpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcbiAgICAgICAgXCJTaWduYXR1cmUgdmVyc2lvbiA0IHByZXNpZ25lZCBVUkxzXCIgKyBcIiBtdXN0IGhhdmUgYW4gZXhwaXJhdGlvbiBkYXRlIGxlc3MgdGhhbiBvbmUgd2VlayBpblwiICsgXCIgdGhlIGZ1dHVyZVwiXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHNjb3BlID0gY3JlYXRlU2NvcGUoc2hvcnREYXRlLCByZWdpb24sIHNpZ25pbmdTZXJ2aWNlID8/IHRoaXMuc2VydmljZSk7XG4gICAgY29uc3QgcmVxdWVzdCA9IG1vdmVIZWFkZXJzVG9RdWVyeShwcmVwYXJlUmVxdWVzdChvcmlnaW5hbFJlcXVlc3QpLCB7IHVuaG9pc3RhYmxlSGVhZGVycyB9KTtcblxuICAgIGlmIChjcmVkZW50aWFscy5zZXNzaW9uVG9rZW4pIHtcbiAgICAgIHJlcXVlc3QucXVlcnlbVE9LRU5fUVVFUllfUEFSQU1dID0gY3JlZGVudGlhbHMuc2Vzc2lvblRva2VuO1xuICAgIH1cbiAgICByZXF1ZXN0LnF1ZXJ5W0FMR09SSVRITV9RVUVSWV9QQVJBTV0gPSBBTEdPUklUSE1fSURFTlRJRklFUjtcbiAgICByZXF1ZXN0LnF1ZXJ5W0NSRURFTlRJQUxfUVVFUllfUEFSQU1dID0gYCR7Y3JlZGVudGlhbHMuYWNjZXNzS2V5SWR9LyR7c2NvcGV9YDtcbiAgICByZXF1ZXN0LnF1ZXJ5W0FNWl9EQVRFX1FVRVJZX1BBUkFNXSA9IGxvbmdEYXRlO1xuICAgIHJlcXVlc3QucXVlcnlbRVhQSVJFU19RVUVSWV9QQVJBTV0gPSBleHBpcmVzSW4udG9TdHJpbmcoMTApO1xuXG4gICAgY29uc3QgY2Fub25pY2FsSGVhZGVycyA9IGdldENhbm9uaWNhbEhlYWRlcnMocmVxdWVzdCwgdW5zaWduYWJsZUhlYWRlcnMsIHNpZ25hYmxlSGVhZGVycyk7XG4gICAgcmVxdWVzdC5xdWVyeVtTSUdORURfSEVBREVSU19RVUVSWV9QQVJBTV0gPSBnZXRDYW5vbmljYWxIZWFkZXJMaXN0KGNhbm9uaWNhbEhlYWRlcnMpO1xuXG4gICAgcmVxdWVzdC5xdWVyeVtTSUdOQVRVUkVfUVVFUllfUEFSQU1dID0gYXdhaXQgdGhpcy5nZXRTaWduYXR1cmUoXG4gICAgICBsb25nRGF0ZSxcbiAgICAgIHNjb3BlLFxuICAgICAgdGhpcy5nZXRTaWduaW5nS2V5KGNyZWRlbnRpYWxzLCByZWdpb24sIHNob3J0RGF0ZSwgc2lnbmluZ1NlcnZpY2UpLFxuICAgICAgdGhpcy5jcmVhdGVDYW5vbmljYWxSZXF1ZXN0KHJlcXVlc3QsIGNhbm9uaWNhbEhlYWRlcnMsIGF3YWl0IGdldFBheWxvYWRIYXNoKG9yaWdpbmFsUmVxdWVzdCwgdGhpcy5zaGEyNTYpKVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzaWduKHN0cmluZ1RvU2lnbjogc3RyaW5nLCBvcHRpb25zPzogU2lnbmluZ0FyZ3VtZW50cyk6IFByb21pc2U8c3RyaW5nPjtcbiAgcHVibGljIGFzeW5jIHNpZ24oZXZlbnQ6IEZvcm1hdHRlZEV2ZW50LCBvcHRpb25zOiBFdmVudFNpZ25pbmdBcmd1bWVudHMpOiBQcm9taXNlPHN0cmluZz47XG4gIHB1YmxpYyBhc3luYyBzaWduKHJlcXVlc3RUb1NpZ246IEh0dHBSZXF1ZXN0LCBvcHRpb25zPzogUmVxdWVzdFNpZ25pbmdBcmd1bWVudHMpOiBQcm9taXNlPEh0dHBSZXF1ZXN0PjtcbiAgcHVibGljIGFzeW5jIHNpZ24odG9TaWduOiBhbnksIG9wdGlvbnM6IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgaWYgKHR5cGVvZiB0b1NpZ24gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJldHVybiB0aGlzLnNpZ25TdHJpbmcodG9TaWduLCBvcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKHRvU2lnbi5oZWFkZXJzICYmIHRvU2lnbi5wYXlsb2FkKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaWduRXZlbnQodG9TaWduLCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc2lnblJlcXVlc3QodG9TaWduLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHNpZ25FdmVudChcbiAgICB7IGhlYWRlcnMsIHBheWxvYWQgfTogRm9ybWF0dGVkRXZlbnQsXG4gICAgeyBzaWduaW5nRGF0ZSA9IG5ldyBEYXRlKCksIHByaW9yU2lnbmF0dXJlLCBzaWduaW5nUmVnaW9uLCBzaWduaW5nU2VydmljZSB9OiBFdmVudFNpZ25pbmdBcmd1bWVudHNcbiAgKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCByZWdpb24gPSBzaWduaW5nUmVnaW9uID8/IChhd2FpdCB0aGlzLnJlZ2lvblByb3ZpZGVyKCkpO1xuICAgIGNvbnN0IHsgc2hvcnREYXRlLCBsb25nRGF0ZSB9ID0gZm9ybWF0RGF0ZShzaWduaW5nRGF0ZSk7XG4gICAgY29uc3Qgc2NvcGUgPSBjcmVhdGVTY29wZShzaG9ydERhdGUsIHJlZ2lvbiwgc2lnbmluZ1NlcnZpY2UgPz8gdGhpcy5zZXJ2aWNlKTtcbiAgICBjb25zdCBoYXNoZWRQYXlsb2FkID0gYXdhaXQgZ2V0UGF5bG9hZEhhc2goeyBoZWFkZXJzOiB7fSwgYm9keTogcGF5bG9hZCB9IGFzIGFueSwgdGhpcy5zaGEyNTYpO1xuICAgIGNvbnN0IGhhc2ggPSBuZXcgdGhpcy5zaGEyNTYoKTtcbiAgICBoYXNoLnVwZGF0ZShoZWFkZXJzKTtcbiAgICBjb25zdCBoYXNoZWRIZWFkZXJzID0gdG9IZXgoYXdhaXQgaGFzaC5kaWdlc3QoKSk7XG4gICAgY29uc3Qgc3RyaW5nVG9TaWduID0gW1xuICAgICAgRVZFTlRfQUxHT1JJVEhNX0lERU5USUZJRVIsXG4gICAgICBsb25nRGF0ZSxcbiAgICAgIHNjb3BlLFxuICAgICAgcHJpb3JTaWduYXR1cmUsXG4gICAgICBoYXNoZWRIZWFkZXJzLFxuICAgICAgaGFzaGVkUGF5bG9hZCxcbiAgICBdLmpvaW4oXCJcXG5cIik7XG4gICAgcmV0dXJuIHRoaXMuc2lnblN0cmluZyhzdHJpbmdUb1NpZ24sIHsgc2lnbmluZ0RhdGUsIHNpZ25pbmdSZWdpb246IHJlZ2lvbiwgc2lnbmluZ1NlcnZpY2UgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHNpZ25TdHJpbmcoXG4gICAgc3RyaW5nVG9TaWduOiBzdHJpbmcsXG4gICAgeyBzaWduaW5nRGF0ZSA9IG5ldyBEYXRlKCksIHNpZ25pbmdSZWdpb24sIHNpZ25pbmdTZXJ2aWNlIH06IFNpZ25pbmdBcmd1bWVudHMgPSB7fVxuICApOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5jcmVkZW50aWFsUHJvdmlkZXIoKTtcbiAgICBjb25zdCByZWdpb24gPSBzaWduaW5nUmVnaW9uID8/IChhd2FpdCB0aGlzLnJlZ2lvblByb3ZpZGVyKCkpO1xuICAgIGNvbnN0IHsgc2hvcnREYXRlIH0gPSBmb3JtYXREYXRlKHNpZ25pbmdEYXRlKTtcblxuICAgIGNvbnN0IGhhc2ggPSBuZXcgdGhpcy5zaGEyNTYoYXdhaXQgdGhpcy5nZXRTaWduaW5nS2V5KGNyZWRlbnRpYWxzLCByZWdpb24sIHNob3J0RGF0ZSwgc2lnbmluZ1NlcnZpY2UpKTtcbiAgICBoYXNoLnVwZGF0ZShzdHJpbmdUb1NpZ24pO1xuICAgIHJldHVybiB0b0hleChhd2FpdCBoYXNoLmRpZ2VzdCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgc2lnblJlcXVlc3QoXG4gICAgcmVxdWVzdFRvU2lnbjogSHR0cFJlcXVlc3QsXG4gICAge1xuICAgICAgc2lnbmluZ0RhdGUgPSBuZXcgRGF0ZSgpLFxuICAgICAgc2lnbmFibGVIZWFkZXJzLFxuICAgICAgdW5zaWduYWJsZUhlYWRlcnMsXG4gICAgICBzaWduaW5nUmVnaW9uLFxuICAgICAgc2lnbmluZ1NlcnZpY2UsXG4gICAgfTogUmVxdWVzdFNpZ25pbmdBcmd1bWVudHMgPSB7fVxuICApOiBQcm9taXNlPEh0dHBSZXF1ZXN0PiB7XG4gICAgY29uc3QgY3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLmNyZWRlbnRpYWxQcm92aWRlcigpO1xuICAgIGNvbnN0IHJlZ2lvbiA9IHNpZ25pbmdSZWdpb24gPz8gKGF3YWl0IHRoaXMucmVnaW9uUHJvdmlkZXIoKSk7XG4gICAgY29uc3QgcmVxdWVzdCA9IHByZXBhcmVSZXF1ZXN0KHJlcXVlc3RUb1NpZ24pO1xuICAgIGNvbnN0IHsgbG9uZ0RhdGUsIHNob3J0RGF0ZSB9ID0gZm9ybWF0RGF0ZShzaWduaW5nRGF0ZSk7XG4gICAgY29uc3Qgc2NvcGUgPSBjcmVhdGVTY29wZShzaG9ydERhdGUsIHJlZ2lvbiwgc2lnbmluZ1NlcnZpY2UgPz8gdGhpcy5zZXJ2aWNlKTtcblxuICAgIHJlcXVlc3QuaGVhZGVyc1tBTVpfREFURV9IRUFERVJdID0gbG9uZ0RhdGU7XG4gICAgaWYgKGNyZWRlbnRpYWxzLnNlc3Npb25Ub2tlbikge1xuICAgICAgcmVxdWVzdC5oZWFkZXJzW1RPS0VOX0hFQURFUl0gPSBjcmVkZW50aWFscy5zZXNzaW9uVG9rZW47XG4gICAgfVxuXG4gICAgY29uc3QgcGF5bG9hZEhhc2ggPSBhd2FpdCBnZXRQYXlsb2FkSGFzaChyZXF1ZXN0LCB0aGlzLnNoYTI1Nik7XG4gICAgaWYgKCFoYXNIZWFkZXIoU0hBMjU2X0hFQURFUiwgcmVxdWVzdC5oZWFkZXJzKSAmJiB0aGlzLmFwcGx5Q2hlY2tzdW0pIHtcbiAgICAgIHJlcXVlc3QuaGVhZGVyc1tTSEEyNTZfSEVBREVSXSA9IHBheWxvYWRIYXNoO1xuICAgIH1cblxuICAgIGNvbnN0IGNhbm9uaWNhbEhlYWRlcnMgPSBnZXRDYW5vbmljYWxIZWFkZXJzKHJlcXVlc3QsIHVuc2lnbmFibGVIZWFkZXJzLCBzaWduYWJsZUhlYWRlcnMpO1xuICAgIGNvbnN0IHNpZ25hdHVyZSA9IGF3YWl0IHRoaXMuZ2V0U2lnbmF0dXJlKFxuICAgICAgbG9uZ0RhdGUsXG4gICAgICBzY29wZSxcbiAgICAgIHRoaXMuZ2V0U2lnbmluZ0tleShjcmVkZW50aWFscywgcmVnaW9uLCBzaG9ydERhdGUsIHNpZ25pbmdTZXJ2aWNlKSxcbiAgICAgIHRoaXMuY3JlYXRlQ2Fub25pY2FsUmVxdWVzdChyZXF1ZXN0LCBjYW5vbmljYWxIZWFkZXJzLCBwYXlsb2FkSGFzaClcbiAgICApO1xuXG4gICAgcmVxdWVzdC5oZWFkZXJzW0FVVEhfSEVBREVSXSA9XG4gICAgICBgJHtBTEdPUklUSE1fSURFTlRJRklFUn0gYCArXG4gICAgICBgQ3JlZGVudGlhbD0ke2NyZWRlbnRpYWxzLmFjY2Vzc0tleUlkfS8ke3Njb3BlfSwgYCArXG4gICAgICBgU2lnbmVkSGVhZGVycz0ke2dldENhbm9uaWNhbEhlYWRlckxpc3QoY2Fub25pY2FsSGVhZGVycyl9LCBgICtcbiAgICAgIGBTaWduYXR1cmU9JHtzaWduYXR1cmV9YDtcblxuICAgIHJldHVybiByZXF1ZXN0O1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDYW5vbmljYWxSZXF1ZXN0KHJlcXVlc3Q6IEh0dHBSZXF1ZXN0LCBjYW5vbmljYWxIZWFkZXJzOiBIZWFkZXJCYWcsIHBheWxvYWRIYXNoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHNvcnRlZEhlYWRlcnMgPSBPYmplY3Qua2V5cyhjYW5vbmljYWxIZWFkZXJzKS5zb3J0KCk7XG4gICAgcmV0dXJuIGAke3JlcXVlc3QubWV0aG9kfVxuJHt0aGlzLmdldENhbm9uaWNhbFBhdGgocmVxdWVzdCl9XG4ke2dldENhbm9uaWNhbFF1ZXJ5KHJlcXVlc3QpfVxuJHtzb3J0ZWRIZWFkZXJzLm1hcCgobmFtZSkgPT4gYCR7bmFtZX06JHtjYW5vbmljYWxIZWFkZXJzW25hbWVdfWApLmpvaW4oXCJcXG5cIil9XG5cbiR7c29ydGVkSGVhZGVycy5qb2luKFwiO1wiKX1cbiR7cGF5bG9hZEhhc2h9YDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgY3JlYXRlU3RyaW5nVG9TaWduKFxuICAgIGxvbmdEYXRlOiBzdHJpbmcsXG4gICAgY3JlZGVudGlhbFNjb3BlOiBzdHJpbmcsXG4gICAgY2Fub25pY2FsUmVxdWVzdDogc3RyaW5nXG4gICk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgaGFzaCA9IG5ldyB0aGlzLnNoYTI1NigpO1xuICAgIGhhc2gudXBkYXRlKGNhbm9uaWNhbFJlcXVlc3QpO1xuICAgIGNvbnN0IGhhc2hlZFJlcXVlc3QgPSBhd2FpdCBoYXNoLmRpZ2VzdCgpO1xuXG4gICAgcmV0dXJuIGAke0FMR09SSVRITV9JREVOVElGSUVSfVxuJHtsb25nRGF0ZX1cbiR7Y3JlZGVudGlhbFNjb3BlfVxuJHt0b0hleChoYXNoZWRSZXF1ZXN0KX1gO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDYW5vbmljYWxQYXRoKHsgcGF0aCB9OiBIdHRwUmVxdWVzdCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMudXJpRXNjYXBlUGF0aCkge1xuICAgICAgY29uc3QgZG91YmxlRW5jb2RlZCA9IGVuY29kZVVSSUNvbXBvbmVudChwYXRoLnJlcGxhY2UoL15cXC8vLCBcIlwiKSk7XG4gICAgICByZXR1cm4gYC8ke2RvdWJsZUVuY29kZWQucmVwbGFjZSgvJTJGL2csIFwiL1wiKX1gO1xuICAgIH1cblxuICAgIHJldHVybiBwYXRoO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRTaWduYXR1cmUoXG4gICAgbG9uZ0RhdGU6IHN0cmluZyxcbiAgICBjcmVkZW50aWFsU2NvcGU6IHN0cmluZyxcbiAgICBrZXlQcm9taXNlOiBQcm9taXNlPFVpbnQ4QXJyYXk+LFxuICAgIGNhbm9uaWNhbFJlcXVlc3Q6IHN0cmluZ1xuICApOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHN0cmluZ1RvU2lnbiA9IGF3YWl0IHRoaXMuY3JlYXRlU3RyaW5nVG9TaWduKGxvbmdEYXRlLCBjcmVkZW50aWFsU2NvcGUsIGNhbm9uaWNhbFJlcXVlc3QpO1xuXG4gICAgY29uc3QgaGFzaCA9IG5ldyB0aGlzLnNoYTI1Nihhd2FpdCBrZXlQcm9taXNlKTtcbiAgICBoYXNoLnVwZGF0ZShzdHJpbmdUb1NpZ24pO1xuICAgIHJldHVybiB0b0hleChhd2FpdCBoYXNoLmRpZ2VzdCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U2lnbmluZ0tleShcbiAgICBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMsXG4gICAgcmVnaW9uOiBzdHJpbmcsXG4gICAgc2hvcnREYXRlOiBzdHJpbmcsXG4gICAgc2VydmljZT86IHN0cmluZ1xuICApOiBQcm9taXNlPFVpbnQ4QXJyYXk+IHtcbiAgICByZXR1cm4gZ2V0U2lnbmluZ0tleSh0aGlzLnNoYTI1NiwgY3JlZGVudGlhbHMsIHNob3J0RGF0ZSwgcmVnaW9uLCBzZXJ2aWNlIHx8IHRoaXMuc2VydmljZSk7XG4gIH1cbn1cblxuY29uc3QgZm9ybWF0RGF0ZSA9IChub3c6IERhdGVJbnB1dCk6IHsgbG9uZ0RhdGU6IHN0cmluZzsgc2hvcnREYXRlOiBzdHJpbmcgfSA9PiB7XG4gIGNvbnN0IGxvbmdEYXRlID0gaXNvODYwMShub3cpLnJlcGxhY2UoL1tcXC06XS9nLCBcIlwiKTtcbiAgcmV0dXJuIHtcbiAgICBsb25nRGF0ZSxcbiAgICBzaG9ydERhdGU6IGxvbmdEYXRlLnN1YnN0cigwLCA4KSxcbiAgfTtcbn07XG5cbmNvbnN0IGdldENhbm9uaWNhbEhlYWRlckxpc3QgPSAoaGVhZGVyczogb2JqZWN0KTogc3RyaW5nID0+IE9iamVjdC5rZXlzKGhlYWRlcnMpLnNvcnQoKS5qb2luKFwiO1wiKTtcblxuY29uc3Qgbm9ybWFsaXplUmVnaW9uUHJvdmlkZXIgPSAocmVnaW9uOiBzdHJpbmcgfCBQcm92aWRlcjxzdHJpbmc+KTogUHJvdmlkZXI8c3RyaW5nPiA9PiB7XG4gIGlmICh0eXBlb2YgcmVnaW9uID09PSBcInN0cmluZ1wiKSB7XG4gICAgY29uc3QgcHJvbWlzaWZpZWQgPSBQcm9taXNlLnJlc29sdmUocmVnaW9uKTtcbiAgICByZXR1cm4gKCkgPT4gcHJvbWlzaWZpZWQ7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlZ2lvbjtcbiAgfVxufTtcblxuY29uc3Qgbm9ybWFsaXplQ3JlZGVudGlhbHNQcm92aWRlciA9IChjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgfCBQcm92aWRlcjxDcmVkZW50aWFscz4pOiBQcm92aWRlcjxDcmVkZW50aWFscz4gPT4ge1xuICBpZiAodHlwZW9mIGNyZWRlbnRpYWxzID09PSBcIm9iamVjdFwiKSB7XG4gICAgY29uc3QgcHJvbWlzaWZpZWQgPSBQcm9taXNlLnJlc29sdmUoY3JlZGVudGlhbHMpO1xuICAgIHJldHVybiAoKSA9PiBwcm9taXNpZmllZDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY3JlZGVudGlhbHM7XG4gIH1cbn07XG4iXX0=