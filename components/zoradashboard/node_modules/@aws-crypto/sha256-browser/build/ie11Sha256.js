"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sha256 = void 0;
var isEmptyData_1 = require("./isEmptyData");
var constants_1 = require("./constants");
var util_utf8_browser_1 = require("@aws-sdk/util-utf8-browser");
var util_locate_window_1 = require("@aws-sdk/util-locate-window");
var Sha256 = /** @class */ (function () {
    function Sha256(secret) {
        if (secret) {
            this.operation = getKeyPromise(secret).then(function (keyData) {
                return util_locate_window_1.locateWindow().msCrypto.subtle.sign(constants_1.SHA_256_HMAC_ALGO, keyData);
            });
            this.operation.catch(function () { });
        }
        else {
            this.operation = Promise.resolve(util_locate_window_1.locateWindow().msCrypto.subtle.digest("SHA-256"));
        }
    }
    Sha256.prototype.update = function (toHash) {
        var _this = this;
        if (isEmptyData_1.isEmptyData(toHash)) {
            return;
        }
        this.operation = this.operation.then(function (operation) {
            operation.onerror = function () {
                _this.operation = Promise.reject(new Error("Error encountered updating hash"));
            };
            operation.process(toArrayBufferView(toHash));
            return operation;
        });
        this.operation.catch(function () { });
    };
    Sha256.prototype.digest = function () {
        return this.operation.then(function (operation) {
            return new Promise(function (resolve, reject) {
                operation.onerror = function () {
                    reject(new Error("Error encountered finalizing hash"));
                };
                operation.oncomplete = function () {
                    if (operation.result) {
                        resolve(new Uint8Array(operation.result));
                    }
                    reject(new Error("Error encountered finalizing hash"));
                };
                operation.finish();
            });
        });
    };
    return Sha256;
}());
exports.Sha256 = Sha256;
function getKeyPromise(secret) {
    return new Promise(function (resolve, reject) {
        var keyOperation = util_locate_window_1.locateWindow().msCrypto.subtle.importKey("raw", toArrayBufferView(secret), constants_1.SHA_256_HMAC_ALGO, false, ["sign"]);
        keyOperation.oncomplete = function () {
            if (keyOperation.result) {
                resolve(keyOperation.result);
            }
            reject(new Error("ImportKey completed without importing key."));
        };
        keyOperation.onerror = function () {
            reject(new Error("ImportKey failed to import key."));
        };
    });
}
function toArrayBufferView(data) {
    if (typeof data === "string") {
        return util_utf8_browser_1.fromUtf8(data);
    }
    if (ArrayBuffer.isView(data)) {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    }
    return new Uint8Array(data);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWUxMVNoYTI1Ni5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9pZTExU2hhMjU2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUE0QztBQUM1Qyx5Q0FBZ0Q7QUFFaEQsZ0VBQXNEO0FBRXRELGtFQUEyRDtBQUUzRDtJQUdFLGdCQUFZLE1BQW1CO1FBQzdCLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTztnQkFDakQsT0FBQyxpQ0FBWSxFQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQy9DLDZCQUFpQixFQUNqQixPQUFPLENBQ1I7WUFIRCxDQUdDLENBQ0YsQ0FBQztZQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGNBQU8sQ0FBQyxDQUFDLENBQUM7U0FDaEM7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FDN0IsaUNBQVksRUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUMvRCxDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRUQsdUJBQU0sR0FBTixVQUFPLE1BQWtCO1FBQXpCLGlCQWdCQztRQWZDLElBQUkseUJBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN2QixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQUEsU0FBUztZQUM1QyxTQUFTLENBQUMsT0FBTyxHQUFHO2dCQUNsQixLQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQzdCLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQzdDLENBQUM7WUFDSixDQUFDLENBQUM7WUFDRixTQUFTLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFFN0MsT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxjQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCx1QkFBTSxHQUFOO1FBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FDeEIsVUFBQSxTQUFTO1lBQ1AsT0FBQSxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO2dCQUMxQixTQUFTLENBQUMsT0FBTyxHQUFHO29CQUNsQixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxDQUFDO2dCQUN6RCxDQUFDLENBQUM7Z0JBQ0YsU0FBUyxDQUFDLFVBQVUsR0FBRztvQkFDckIsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFO3dCQUNwQixPQUFPLENBQUMsSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7cUJBQzNDO29CQUNELE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pELENBQUMsQ0FBQztnQkFFRixTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDckIsQ0FBQyxDQUFDO1FBWkYsQ0FZRSxDQUNMLENBQUM7SUFDSixDQUFDO0lBQ0gsYUFBQztBQUFELENBQUMsQUF2REQsSUF1REM7QUF2RFksd0JBQU07QUF5RG5CLFNBQVMsYUFBYSxDQUFDLE1BQWtCO0lBQ3ZDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtRQUNqQyxJQUFNLFlBQVksR0FBSSxpQ0FBWSxFQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQ3pFLEtBQUssRUFDTCxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsRUFDekIsNkJBQWlCLEVBQ2pCLEtBQUssRUFDTCxDQUFDLE1BQU0sQ0FBQyxDQUNULENBQUM7UUFFRixZQUFZLENBQUMsVUFBVSxHQUFHO1lBQ3hCLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTtnQkFDdkIsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM5QjtZQUVELE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsQ0FBQyxDQUFDO1FBQ0YsWUFBWSxDQUFDLE9BQU8sR0FBRztZQUNyQixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQUMsSUFBZ0I7SUFDekMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDNUIsT0FBTyw0QkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3ZCO0lBRUQsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzVCLE9BQU8sSUFBSSxVQUFVLENBQ25CLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLFVBQVUsRUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxpQkFBaUIsQ0FDL0MsQ0FBQztLQUNIO0lBRUQsT0FBTyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNFbXB0eURhdGEgfSBmcm9tIFwiLi9pc0VtcHR5RGF0YVwiO1xuaW1wb3J0IHsgU0hBXzI1Nl9ITUFDX0FMR08gfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IEhhc2gsIFNvdXJjZURhdGEgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcbmltcG9ydCB7IGZyb21VdGY4IH0gZnJvbSBcIkBhd3Mtc2RrL3V0aWwtdXRmOC1icm93c2VyXCI7XG5pbXBvcnQgeyBDcnlwdG9PcGVyYXRpb24sIEtleSwgTXNXaW5kb3cgfSBmcm9tIFwiQGF3cy1jcnlwdG8vaWUxMS1kZXRlY3Rpb25cIjtcbmltcG9ydCB7IGxvY2F0ZVdpbmRvdyB9IGZyb20gXCJAYXdzLXNkay91dGlsLWxvY2F0ZS13aW5kb3dcIjtcblxuZXhwb3J0IGNsYXNzIFNoYTI1NiBpbXBsZW1lbnRzIEhhc2gge1xuICBwcml2YXRlIG9wZXJhdGlvbjogUHJvbWlzZTxDcnlwdG9PcGVyYXRpb24+O1xuXG4gIGNvbnN0cnVjdG9yKHNlY3JldD86IFNvdXJjZURhdGEpIHtcbiAgICBpZiAoc2VjcmV0KSB7XG4gICAgICB0aGlzLm9wZXJhdGlvbiA9IGdldEtleVByb21pc2Uoc2VjcmV0KS50aGVuKGtleURhdGEgPT5cbiAgICAgICAgKGxvY2F0ZVdpbmRvdygpIGFzIE1zV2luZG93KS5tc0NyeXB0by5zdWJ0bGUuc2lnbihcbiAgICAgICAgICBTSEFfMjU2X0hNQUNfQUxHTyxcbiAgICAgICAgICBrZXlEYXRhXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICB0aGlzLm9wZXJhdGlvbi5jYXRjaCgoKSA9PiB7fSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3BlcmF0aW9uID0gUHJvbWlzZS5yZXNvbHZlKFxuICAgICAgICAobG9jYXRlV2luZG93KCkgYXMgTXNXaW5kb3cpLm1zQ3J5cHRvLnN1YnRsZS5kaWdlc3QoXCJTSEEtMjU2XCIpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZSh0b0hhc2g6IFNvdXJjZURhdGEpOiB2b2lkIHtcbiAgICBpZiAoaXNFbXB0eURhdGEodG9IYXNoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub3BlcmF0aW9uID0gdGhpcy5vcGVyYXRpb24udGhlbihvcGVyYXRpb24gPT4ge1xuICAgICAgb3BlcmF0aW9uLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMub3BlcmF0aW9uID0gUHJvbWlzZS5yZWplY3QoXG4gICAgICAgICAgbmV3IEVycm9yKFwiRXJyb3IgZW5jb3VudGVyZWQgdXBkYXRpbmcgaGFzaFwiKVxuICAgICAgICApO1xuICAgICAgfTtcbiAgICAgIG9wZXJhdGlvbi5wcm9jZXNzKHRvQXJyYXlCdWZmZXJWaWV3KHRvSGFzaCkpO1xuXG4gICAgICByZXR1cm4gb3BlcmF0aW9uO1xuICAgIH0pO1xuICAgIHRoaXMub3BlcmF0aW9uLmNhdGNoKCgpID0+IHt9KTtcbiAgfVxuXG4gIGRpZ2VzdCgpOiBQcm9taXNlPFVpbnQ4QXJyYXk+IHtcbiAgICByZXR1cm4gdGhpcy5vcGVyYXRpb24udGhlbjxVaW50OEFycmF5PihcbiAgICAgIG9wZXJhdGlvbiA9PlxuICAgICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgb3BlcmF0aW9uLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiRXJyb3IgZW5jb3VudGVyZWQgZmluYWxpemluZyBoYXNoXCIpKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIG9wZXJhdGlvbi5vbmNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKG9wZXJhdGlvbi5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgcmVzb2x2ZShuZXcgVWludDhBcnJheShvcGVyYXRpb24ucmVzdWx0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiRXJyb3IgZW5jb3VudGVyZWQgZmluYWxpemluZyBoYXNoXCIpKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgb3BlcmF0aW9uLmZpbmlzaCgpO1xuICAgICAgICB9KVxuICAgICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0S2V5UHJvbWlzZShzZWNyZXQ6IFNvdXJjZURhdGEpOiBQcm9taXNlPEtleT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGtleU9wZXJhdGlvbiA9IChsb2NhdGVXaW5kb3coKSBhcyBNc1dpbmRvdykubXNDcnlwdG8uc3VidGxlLmltcG9ydEtleShcbiAgICAgIFwicmF3XCIsXG4gICAgICB0b0FycmF5QnVmZmVyVmlldyhzZWNyZXQpLFxuICAgICAgU0hBXzI1Nl9ITUFDX0FMR08sXG4gICAgICBmYWxzZSxcbiAgICAgIFtcInNpZ25cIl1cbiAgICApO1xuXG4gICAga2V5T3BlcmF0aW9uLm9uY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICBpZiAoa2V5T3BlcmF0aW9uLnJlc3VsdCkge1xuICAgICAgICByZXNvbHZlKGtleU9wZXJhdGlvbi5yZXN1bHQpO1xuICAgICAgfVxuXG4gICAgICByZWplY3QobmV3IEVycm9yKFwiSW1wb3J0S2V5IGNvbXBsZXRlZCB3aXRob3V0IGltcG9ydGluZyBrZXkuXCIpKTtcbiAgICB9O1xuICAgIGtleU9wZXJhdGlvbi5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIkltcG9ydEtleSBmYWlsZWQgdG8gaW1wb3J0IGtleS5cIikpO1xuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB0b0FycmF5QnVmZmVyVmlldyhkYXRhOiBTb3VyY2VEYXRhKTogVWludDhBcnJheSB7XG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBmcm9tVXRmOChkYXRhKTtcbiAgfVxuXG4gIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcoZGF0YSkpIHtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoXG4gICAgICBkYXRhLmJ1ZmZlcixcbiAgICAgIGRhdGEuYnl0ZU9mZnNldCxcbiAgICAgIGRhdGEuYnl0ZUxlbmd0aCAvIFVpbnQ4QXJyYXkuQllURVNfUEVSX0VMRU1FTlRcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGRhdGEpO1xufVxuIl19