"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNoFIPS = exports.validateNoDualstack = exports.validateDNSHostLabel = exports.validateRegion = exports.validateAccountId = exports.validatePartition = exports.validateOutpostService = exports.getSuffixForArnEndpoint = exports.getPseudoRegion = exports.getArnResources = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./bucketEndpointMiddleware"), exports);
tslib_1.__exportStar(require("./bucketHostname"), exports);
tslib_1.__exportStar(require("./configurations"), exports);
var bucketHostnameUtils_1 = require("./bucketHostnameUtils");
Object.defineProperty(exports, "getArnResources", { enumerable: true, get: function () { return bucketHostnameUtils_1.getArnResources; } });
Object.defineProperty(exports, "getPseudoRegion", { enumerable: true, get: function () { return bucketHostnameUtils_1.getPseudoRegion; } });
Object.defineProperty(exports, "getSuffixForArnEndpoint", { enumerable: true, get: function () { return bucketHostnameUtils_1.getSuffixForArnEndpoint; } });
Object.defineProperty(exports, "validateOutpostService", { enumerable: true, get: function () { return bucketHostnameUtils_1.validateOutpostService; } });
Object.defineProperty(exports, "validatePartition", { enumerable: true, get: function () { return bucketHostnameUtils_1.validatePartition; } });
Object.defineProperty(exports, "validateAccountId", { enumerable: true, get: function () { return bucketHostnameUtils_1.validateAccountId; } });
Object.defineProperty(exports, "validateRegion", { enumerable: true, get: function () { return bucketHostnameUtils_1.validateRegion; } });
Object.defineProperty(exports, "validateDNSHostLabel", { enumerable: true, get: function () { return bucketHostnameUtils_1.validateDNSHostLabel; } });
Object.defineProperty(exports, "validateNoDualstack", { enumerable: true, get: function () { return bucketHostnameUtils_1.validateNoDualstack; } });
Object.defineProperty(exports, "validateNoFIPS", { enumerable: true, get: function () { return bucketHostnameUtils_1.validateNoFIPS; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHFFQUEyQztBQUMzQywyREFBaUM7QUFDakMsMkRBQWlDO0FBQ2pDLDZEQVcrQjtBQVY3QixzSEFBQSxlQUFlLE9BQUE7QUFDZixzSEFBQSxlQUFlLE9BQUE7QUFDZiw4SEFBQSx1QkFBdUIsT0FBQTtBQUN2Qiw2SEFBQSxzQkFBc0IsT0FBQTtBQUN0Qix3SEFBQSxpQkFBaUIsT0FBQTtBQUNqQix3SEFBQSxpQkFBaUIsT0FBQTtBQUNqQixxSEFBQSxjQUFjLE9BQUE7QUFDZCwySEFBQSxvQkFBb0IsT0FBQTtBQUNwQiwwSEFBQSxtQkFBbUIsT0FBQTtBQUNuQixxSEFBQSxjQUFjLE9BQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgKiBmcm9tIFwiLi9idWNrZXRFbmRwb2ludE1pZGRsZXdhcmVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2J1Y2tldEhvc3RuYW1lXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9jb25maWd1cmF0aW9uc1wiO1xuZXhwb3J0IHtcbiAgZ2V0QXJuUmVzb3VyY2VzLFxuICBnZXRQc2V1ZG9SZWdpb24sXG4gIGdldFN1ZmZpeEZvckFybkVuZHBvaW50LFxuICB2YWxpZGF0ZU91dHBvc3RTZXJ2aWNlLFxuICB2YWxpZGF0ZVBhcnRpdGlvbixcbiAgdmFsaWRhdGVBY2NvdW50SWQsXG4gIHZhbGlkYXRlUmVnaW9uLFxuICB2YWxpZGF0ZUROU0hvc3RMYWJlbCxcbiAgdmFsaWRhdGVOb0R1YWxzdGFjayxcbiAgdmFsaWRhdGVOb0ZJUFMsXG59IGZyb20gXCIuL2J1Y2tldEhvc3RuYW1lVXRpbHNcIjtcbiJdfQ==