"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StorageErrorStrings;
(function (StorageErrorStrings) {
    StorageErrorStrings["NO_CREDENTIALS"] = "No credentials";
    StorageErrorStrings["NO_SRC_KEY"] = "source param should be an object with the property \"key\" with value of type string";
    StorageErrorStrings["NO_DEST_KEY"] = "destination param should be an object with the property \"key\" with value of type string";
})(StorageErrorStrings = exports.StorageErrorStrings || (exports.StorageErrorStrings = {}));
var AWSS3ProviderMultipartCopierErrors;
(function (AWSS3ProviderMultipartCopierErrors) {
    AWSS3ProviderMultipartCopierErrors["CLEANUP_FAILED"] = "Multipart copy clean up failed";
    AWSS3ProviderMultipartCopierErrors["NO_OBJECT_FOUND"] = "Object does not exist";
    AWSS3ProviderMultipartCopierErrors["INVALID_QUEUESIZE"] = "Queue size must be a positive number";
    AWSS3ProviderMultipartCopierErrors["NO_COPYSOURCE"] = "You must specify a copy source";
    AWSS3ProviderMultipartCopierErrors["MAX_NUM_PARTS_EXCEEDED"] = "Only a maximum of 10000 parts are allowed";
})(AWSS3ProviderMultipartCopierErrors = exports.AWSS3ProviderMultipartCopierErrors || (exports.AWSS3ProviderMultipartCopierErrors = {}));
//# sourceMappingURL=StorageErrorStrings.js.map