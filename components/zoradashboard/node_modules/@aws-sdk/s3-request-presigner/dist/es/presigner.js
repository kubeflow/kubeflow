import { __assign, __awaiter, __generator, __rest } from "tslib";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { SHA256_HEADER, UNSIGNED_PAYLOAD } from "./constants";
var S3RequestPresigner = /** @class */ (function () {
    function S3RequestPresigner(options) {
        var resolvedOptions = __assign({ 
            // Allow `signingName` because we want to support usecase of supply client's resolved config
            // directly. Where service equals signingName.
            service: options.signingName || options.service || "s3", uriEscapePath: options.uriEscapePath || false }, options);
        this.signer = new SignatureV4(resolvedOptions);
    }
    S3RequestPresigner.prototype.presign = function (requestToSign, _a) {
        if (_a === void 0) { _a = {}; }
        var _b = _a.unsignableHeaders, unsignableHeaders = _b === void 0 ? new Set() : _b, _c = _a.unhoistableHeaders, unhoistableHeaders = _c === void 0 ? new Set() : _c, options = __rest(_a, ["unsignableHeaders", "unhoistableHeaders"]);
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_d) {
                unsignableHeaders.add("content-type");
                // S3 requires SSE headers to be signed in headers instead of query
                // See: https://github.com/aws/aws-sdk-js-v3/issues/1576
                Object.keys(requestToSign.headers)
                    .map(function (header) { return header.toLowerCase(); })
                    .filter(function (header) { return header.startsWith("x-amz-server-side-encryption"); })
                    .forEach(function (header) {
                    unhoistableHeaders.add(header);
                });
                requestToSign.headers[SHA256_HEADER] = UNSIGNED_PAYLOAD;
                if (!requestToSign.headers["host"]) {
                    requestToSign.headers.host = requestToSign.hostname;
                }
                return [2 /*return*/, this.signer.presign(requestToSign, __assign({ expiresIn: 900, unsignableHeaders: unsignableHeaders,
                        unhoistableHeaders: unhoistableHeaders }, options))];
            });
        });
    };
    return S3RequestPresigner;
}());
export { S3RequestPresigner };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2lnbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ByZXNpZ25lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBMEMsTUFBTSx1QkFBdUIsQ0FBQztBQUk1RixPQUFPLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBYzlEO0lBRUUsNEJBQVksT0FBa0M7UUFDNUMsSUFBTSxlQUFlO1lBQ25CLDRGQUE0RjtZQUM1Riw4Q0FBOEM7WUFDOUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxXQUFXLElBQUksT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQ3ZELGFBQWEsRUFBRSxPQUFPLENBQUMsYUFBYSxJQUFJLEtBQUssSUFDMUMsT0FBTyxDQUNYLENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFWSxvQ0FBTyxHQUFwQixVQUNFLGFBQTJCLEVBQzNCLEVBQThHO1FBQTlHLG1CQUFBLEVBQUEsT0FBOEc7UUFBNUcsSUFBQSx5QkFBNkIsRUFBN0IsaUJBQWlCLG1CQUFHLElBQUksR0FBRyxFQUFFLEtBQUEsRUFBRSwwQkFBOEIsRUFBOUIsa0JBQWtCLG1CQUFHLElBQUksR0FBRyxFQUFFLEtBQUEsRUFBSyxPQUFPLGNBQTNFLDJDQUE2RSxDQUFGOzs7Z0JBRTNFLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDdEMsbUVBQW1FO2dCQUNuRSx3REFBd0Q7Z0JBQ3hELE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztxQkFDL0IsR0FBRyxDQUFDLFVBQUMsTUFBTSxJQUFLLE9BQUEsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFwQixDQUFvQixDQUFDO3FCQUNyQyxNQUFNLENBQUMsVUFBQyxNQUFNLElBQUssT0FBQSxNQUFNLENBQUMsVUFBVSxDQUFDLDhCQUE4QixDQUFDLEVBQWpELENBQWlELENBQUM7cUJBQ3JFLE9BQU8sQ0FBQyxVQUFDLE1BQU07b0JBQ2Qsa0JBQWtCLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNqQyxDQUFDLENBQUMsQ0FBQztnQkFDTCxhQUFhLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLGdCQUFnQixDQUFDO2dCQUN4RCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDbEMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQztpQkFDckQ7Z0JBQ0Qsc0JBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxhQUN0QyxTQUFTLEVBQUUsR0FBRyxFQUNkLGlCQUFpQixtQkFBQTt3QkFDakIsa0JBQWtCLG9CQUFBLElBQ2YsT0FBTyxFQUNWLEVBQUM7OztLQUNKO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBckNELElBcUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2lnbmF0dXJlVjQsIFNpZ25hdHVyZVY0Q3J5cHRvSW5pdCwgU2lnbmF0dXJlVjRJbml0IH0gZnJvbSBcIkBhd3Mtc2RrL3NpZ25hdHVyZS12NFwiO1xuaW1wb3J0IHsgUmVxdWVzdFByZXNpZ25lciwgUmVxdWVzdFByZXNpZ25pbmdBcmd1bWVudHMgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcbmltcG9ydCB7IEh0dHBSZXF1ZXN0IGFzIElIdHRwUmVxdWVzdCB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5pbXBvcnQgeyBTSEEyNTZfSEVBREVSLCBVTlNJR05FRF9QQVlMT0FEIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbi8qKlxuICogUGFydGlhbEJ5PFQsIEs+IG1ha2VzIHByb3BlcnRpZXMgc3BlY2lmaWVkIGluIEsgb3B0aW9uYWwgaW4gaW50ZXJmYWNlIFRcbiAqIHNlZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDMxNTk4ODcvbWFrZS1hLXNpbmdsZS1wcm9wZXJ0eS1vcHRpb25hbC1pbi10eXBlc2NyaXB0XG4gKiAqL1xudHlwZSBPbWl0PFQsIEsgZXh0ZW5kcyBrZXlvZiBUPiA9IFBpY2s8VCwgRXhjbHVkZTxrZXlvZiBULCBLPj47XG50eXBlIFBhcnRpYWxCeTxULCBLIGV4dGVuZHMga2V5b2YgVD4gPSBPbWl0PFQsIEs+ICYgUGFydGlhbDxQaWNrPFQsIEs+PjtcblxuZXhwb3J0IHR5cGUgUzNSZXF1ZXN0UHJlc2lnbmVyT3B0aW9ucyA9IFBhcnRpYWxCeTxcbiAgU2lnbmF0dXJlVjRJbml0ICYgU2lnbmF0dXJlVjRDcnlwdG9Jbml0LFxuICBcInNlcnZpY2VcIiB8IFwidXJpRXNjYXBlUGF0aFwiXG4+ICYgeyBzaWduaW5nTmFtZT86IHN0cmluZyB9O1xuXG5leHBvcnQgY2xhc3MgUzNSZXF1ZXN0UHJlc2lnbmVyIGltcGxlbWVudHMgUmVxdWVzdFByZXNpZ25lciB7XG4gIHByaXZhdGUgcmVhZG9ubHkgc2lnbmVyOiBTaWduYXR1cmVWNDtcbiAgY29uc3RydWN0b3Iob3B0aW9uczogUzNSZXF1ZXN0UHJlc2lnbmVyT3B0aW9ucykge1xuICAgIGNvbnN0IHJlc29sdmVkT3B0aW9ucyA9IHtcbiAgICAgIC8vIEFsbG93IGBzaWduaW5nTmFtZWAgYmVjYXVzZSB3ZSB3YW50IHRvIHN1cHBvcnQgdXNlY2FzZSBvZiBzdXBwbHkgY2xpZW50J3MgcmVzb2x2ZWQgY29uZmlnXG4gICAgICAvLyBkaXJlY3RseS4gV2hlcmUgc2VydmljZSBlcXVhbHMgc2lnbmluZ05hbWUuXG4gICAgICBzZXJ2aWNlOiBvcHRpb25zLnNpZ25pbmdOYW1lIHx8IG9wdGlvbnMuc2VydmljZSB8fCBcInMzXCIsXG4gICAgICB1cmlFc2NhcGVQYXRoOiBvcHRpb25zLnVyaUVzY2FwZVBhdGggfHwgZmFsc2UsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH07XG4gICAgdGhpcy5zaWduZXIgPSBuZXcgU2lnbmF0dXJlVjQocmVzb2x2ZWRPcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwcmVzaWduKFxuICAgIHJlcXVlc3RUb1NpZ246IElIdHRwUmVxdWVzdCxcbiAgICB7IHVuc2lnbmFibGVIZWFkZXJzID0gbmV3IFNldCgpLCB1bmhvaXN0YWJsZUhlYWRlcnMgPSBuZXcgU2V0KCksIC4uLm9wdGlvbnMgfTogUmVxdWVzdFByZXNpZ25pbmdBcmd1bWVudHMgPSB7fVxuICApOiBQcm9taXNlPElIdHRwUmVxdWVzdD4ge1xuICAgIHVuc2lnbmFibGVIZWFkZXJzLmFkZChcImNvbnRlbnQtdHlwZVwiKTtcbiAgICAvLyBTMyByZXF1aXJlcyBTU0UgaGVhZGVycyB0byBiZSBzaWduZWQgaW4gaGVhZGVycyBpbnN0ZWFkIG9mIHF1ZXJ5XG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vYXdzL2F3cy1zZGstanMtdjMvaXNzdWVzLzE1NzZcbiAgICBPYmplY3Qua2V5cyhyZXF1ZXN0VG9TaWduLmhlYWRlcnMpXG4gICAgICAubWFwKChoZWFkZXIpID0+IGhlYWRlci50b0xvd2VyQ2FzZSgpKVxuICAgICAgLmZpbHRlcigoaGVhZGVyKSA9PiBoZWFkZXIuc3RhcnRzV2l0aChcIngtYW16LXNlcnZlci1zaWRlLWVuY3J5cHRpb25cIikpXG4gICAgICAuZm9yRWFjaCgoaGVhZGVyKSA9PiB7XG4gICAgICAgIHVuaG9pc3RhYmxlSGVhZGVycy5hZGQoaGVhZGVyKTtcbiAgICAgIH0pO1xuICAgIHJlcXVlc3RUb1NpZ24uaGVhZGVyc1tTSEEyNTZfSEVBREVSXSA9IFVOU0lHTkVEX1BBWUxPQUQ7XG4gICAgaWYgKCFyZXF1ZXN0VG9TaWduLmhlYWRlcnNbXCJob3N0XCJdKSB7XG4gICAgICByZXF1ZXN0VG9TaWduLmhlYWRlcnMuaG9zdCA9IHJlcXVlc3RUb1NpZ24uaG9zdG5hbWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnNpZ25lci5wcmVzaWduKHJlcXVlc3RUb1NpZ24sIHtcbiAgICAgIGV4cGlyZXNJbjogOTAwLFxuICAgICAgdW5zaWduYWJsZUhlYWRlcnMsXG4gICAgICB1bmhvaXN0YWJsZUhlYWRlcnMsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH0pO1xuICB9XG59XG4iXX0=