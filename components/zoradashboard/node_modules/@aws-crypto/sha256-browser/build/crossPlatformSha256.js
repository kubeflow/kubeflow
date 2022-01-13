"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sha256 = void 0;
var ie11Sha256_1 = require("./ie11Sha256");
var webCryptoSha256_1 = require("./webCryptoSha256");
var sha256_js_1 = require("@aws-crypto/sha256-js");
var supports_web_crypto_1 = require("@aws-crypto/supports-web-crypto");
var ie11_detection_1 = require("@aws-crypto/ie11-detection");
var util_locate_window_1 = require("@aws-sdk/util-locate-window");
var Sha256 = /** @class */ (function () {
    function Sha256(secret) {
        if (supports_web_crypto_1.supportsWebCrypto(util_locate_window_1.locateWindow())) {
            this.hash = new webCryptoSha256_1.Sha256(secret);
        }
        else if (ie11_detection_1.isMsWindow(util_locate_window_1.locateWindow())) {
            this.hash = new ie11Sha256_1.Sha256(secret);
        }
        else {
            this.hash = new sha256_js_1.Sha256(secret);
        }
    }
    Sha256.prototype.update = function (data, encoding) {
        this.hash.update(data, encoding);
    };
    Sha256.prototype.digest = function () {
        return this.hash.digest();
    };
    return Sha256;
}());
exports.Sha256 = Sha256;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Jvc3NQbGF0Zm9ybVNoYTI1Ni5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jcm9zc1BsYXRmb3JtU2hhMjU2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUFvRDtBQUNwRCxxREFBOEQ7QUFDOUQsbURBQTJEO0FBRTNELHVFQUFvRTtBQUNwRSw2REFBd0Q7QUFDeEQsa0VBQTJEO0FBRTNEO0lBR0UsZ0JBQVksTUFBbUI7UUFDN0IsSUFBSSx1Q0FBaUIsQ0FBQyxpQ0FBWSxFQUFFLENBQUMsRUFBRTtZQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksd0JBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN6QzthQUFNLElBQUksMkJBQVUsQ0FBQyxpQ0FBWSxFQUFFLENBQUMsRUFBRTtZQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksbUJBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwQzthQUFNO1lBQ0wsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGtCQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbEM7SUFDSCxDQUFDO0lBRUQsdUJBQU0sR0FBTixVQUFPLElBQWdCLEVBQUUsUUFBc0M7UUFDN0QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCx1QkFBTSxHQUFOO1FBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFDSCxhQUFDO0FBQUQsQ0FBQyxBQXBCRCxJQW9CQztBQXBCWSx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoYTI1NiBhcyBJZTExU2hhMjU2IH0gZnJvbSBcIi4vaWUxMVNoYTI1NlwiO1xuaW1wb3J0IHsgU2hhMjU2IGFzIFdlYkNyeXB0b1NoYTI1NiB9IGZyb20gXCIuL3dlYkNyeXB0b1NoYTI1NlwiO1xuaW1wb3J0IHsgU2hhMjU2IGFzIEpzU2hhMjU2IH0gZnJvbSBcIkBhd3MtY3J5cHRvL3NoYTI1Ni1qc1wiO1xuaW1wb3J0IHsgSGFzaCwgU291cmNlRGF0YSB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuaW1wb3J0IHsgc3VwcG9ydHNXZWJDcnlwdG8gfSBmcm9tIFwiQGF3cy1jcnlwdG8vc3VwcG9ydHMtd2ViLWNyeXB0b1wiO1xuaW1wb3J0IHsgaXNNc1dpbmRvdyB9IGZyb20gXCJAYXdzLWNyeXB0by9pZTExLWRldGVjdGlvblwiO1xuaW1wb3J0IHsgbG9jYXRlV2luZG93IH0gZnJvbSBcIkBhd3Mtc2RrL3V0aWwtbG9jYXRlLXdpbmRvd1wiO1xuXG5leHBvcnQgY2xhc3MgU2hhMjU2IGltcGxlbWVudHMgSGFzaCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgaGFzaDogSGFzaDtcblxuICBjb25zdHJ1Y3RvcihzZWNyZXQ/OiBTb3VyY2VEYXRhKSB7XG4gICAgaWYgKHN1cHBvcnRzV2ViQ3J5cHRvKGxvY2F0ZVdpbmRvdygpKSkge1xuICAgICAgdGhpcy5oYXNoID0gbmV3IFdlYkNyeXB0b1NoYTI1NihzZWNyZXQpO1xuICAgIH0gZWxzZSBpZiAoaXNNc1dpbmRvdyhsb2NhdGVXaW5kb3coKSkpIHtcbiAgICAgIHRoaXMuaGFzaCA9IG5ldyBJZTExU2hhMjU2KHNlY3JldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGFzaCA9IG5ldyBKc1NoYTI1NihzZWNyZXQpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZShkYXRhOiBTb3VyY2VEYXRhLCBlbmNvZGluZz86IFwidXRmOFwiIHwgXCJhc2NpaVwiIHwgXCJsYXRpbjFcIik6IHZvaWQge1xuICAgIHRoaXMuaGFzaC51cGRhdGUoZGF0YSwgZW5jb2RpbmcpO1xuICB9XG5cbiAgZGlnZXN0KCk6IFByb21pc2U8VWludDhBcnJheT4ge1xuICAgIHJldHVybiB0aGlzLmhhc2guZGlnZXN0KCk7XG4gIH1cbn1cbiJdfQ==