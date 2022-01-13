var _a, _b, _c, _d, _e;
import { __awaiter, __generator } from "tslib";
/// <reference types="mocha" />
/**
 * This is the integration test that make sure the client can make request cross-platform-ly
 * in NodeJS, Chromium and Firefox. This test is written in mocha.
 */
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { S3 } from "../index";
import { createBuffer } from "./helpers";
chai.use(chaiAsPromised);
var expect = chai.expect;
// There will be default values of defaultRegion, credentials, and isBrowser variable in browser tests.
// Define the values for Node.js tests
var region = globalThis.defaultRegion || ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.AWS_SMOKE_TEST_REGION);
var credentials = globalThis.credentials || undefined;
var isBrowser = globalThis.isBrowser || false;
var Bucket = ((_d = (_c = (_b = globalThis) === null || _b === void 0 ? void 0 : _b.window) === null || _c === void 0 ? void 0 : _c.__env__) === null || _d === void 0 ? void 0 : _d.AWS_SMOKE_TEST_BUCKET) || ((_e = process === null || process === void 0 ? void 0 : process.env) === null || _e === void 0 ? void 0 : _e.AWS_SMOKE_TEST_BUCKET);
var Key = "" + Date.now();
describe("@aws-sdk/client-s3", function () {
    var client = new S3({
        region: region,
        credentials: credentials,
    });
    describe("PutObject", function () {
        before(function () {
            Key = "" + Date.now();
        });
        after(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.deleteObject({ Bucket: Bucket, Key: Key })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        if (isBrowser) {
            var buf_1 = createBuffer("1KB");
            it("should succeed with blob body", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, client.putObject({
                                Bucket: Bucket,
                                Key: Key,
                                Body: new Blob([buf_1]),
                            })];
                        case 1:
                            result = _a.sent();
                            expect(result.$metadata.httpStatusCode).to.equal(200);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should succeed with TypedArray body", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, client.putObject({
                                Bucket: Bucket,
                                Key: Key,
                                Body: buf_1,
                            })];
                        case 1:
                            result = _a.sent();
                            expect(result.$metadata.httpStatusCode).to.equal(200);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should succeed with ReadableStream body", function () { return __awaiter(void 0, void 0, void 0, function () {
                var length, chunkSize, readableStream, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            length = 10 * 1000;
                            chunkSize = 10;
                            readableStream = new ReadableStream({
                                start: function (controller) {
                                    var sizeLeft = length;
                                    while (sizeLeft > 0) {
                                        var chunk = "";
                                        for (var i = 0; i < Math.min(sizeLeft, chunkSize); i++) {
                                            chunk += "x";
                                        }
                                        controller.enqueue(chunk);
                                        sizeLeft -= chunk.length;
                                    }
                                },
                            });
                            return [4 /*yield*/, client.putObject({
                                    Bucket: Bucket,
                                    Key: Key,
                                    Body: readableStream,
                                })];
                        case 1:
                            result = _a.sent();
                            expect(result.$metadata.httpStatusCode).to.equal(200);
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        else {
            it("should succeed with Node.js readable stream body", function () { return __awaiter(void 0, void 0, void 0, function () {
                var length, chunkSize, Readable, sizeLeft, inputStream, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            length = 10 * 1000;
                            chunkSize = 10;
                            Readable = require("stream").Readable;
                            sizeLeft = length;
                            inputStream = new Readable({
                                read: function () {
                                    if (sizeLeft <= 0) {
                                        this.push(null); //end stream;
                                        return;
                                    }
                                    var chunk = "";
                                    for (var i = 0; i < Math.min(sizeLeft, chunkSize); i++) {
                                        chunk += "x";
                                    }
                                    this.push(chunk);
                                    sizeLeft -= chunk.length;
                                },
                            });
                            inputStream.size = length; // This is required
                            return [4 /*yield*/, client.putObject({
                                    Bucket: Bucket,
                                    Key: Key,
                                    Body: inputStream,
                                })];
                        case 1:
                            result = _a.sent();
                            expect(result.$metadata.httpStatusCode).to.equal(200);
                            return [2 /*return*/];
                    }
                });
            }); });
        }
    });
    describe("GetObject", function () {
        var _this = this;
        this.timeout(10 * 1000);
        before(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Key = "" + Date.now();
                return [2 /*return*/];
            });
        }); });
        after(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.deleteObject({ Bucket: Bucket, Key: Key })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should succeed with valid body payload", function () { return __awaiter(_this, void 0, void 0, function () {
            var body, result, Readable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = createBuffer("1MB");
                        return [4 /*yield*/, client.putObject({ Bucket: Bucket, Key: Key, Body: body })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, client.getObject({ Bucket: Bucket, Key: Key })];
                    case 2:
                        result = _a.sent();
                        expect(result.$metadata.httpStatusCode).to.equal(200);
                        if (isBrowser) {
                            expect(result.Body).to.be.instanceOf(ReadableStream);
                        }
                        else {
                            Readable = require("stream").Readable;
                            expect(result.Body).to.be.instanceOf(Readable);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("ListObjects", function () {
        before(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Key = "" + Date.now();
                        return [4 /*yield*/, client.putObject({ Bucket: Bucket, Key: Key, Body: "foo" })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        after(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.deleteObject({ Bucket: Bucket, Key: Key })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should succeed with valid bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.listObjects({
                            Bucket: Bucket,
                        })];
                    case 1:
                        result = _a.sent();
                        expect(result.$metadata.httpStatusCode).to.equal(200);
                        expect(result.Contents).to.be.instanceOf(Array);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should throw with invalid bucket", function () {
            return expect(client.listObjects({ Bucket: "invalid-bucket" })).to.eventually.be.rejected.and.be.an.instanceOf(Error);
        });
    });
    describe("MultipartUpload", function () {
        var UploadId;
        var Etag;
        var multipartObjectKey = Key + "-multipart";
        before(function () {
            Key = "" + Date.now();
        });
        afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!UploadId) return [3 /*break*/, 2];
                        return [4 /*yield*/, client.abortMultipartUpload({
                                Bucket: Bucket,
                                Key: multipartObjectKey,
                                UploadId: UploadId,
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, client.deleteObject({
                            Bucket: Bucket,
                            Key: multipartObjectKey,
                        })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should successfully create, upload list and complete", function () { return __awaiter(void 0, void 0, void 0, function () {
            var createResult, uploadResult, listPartsResult, completeResult, headResult;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, client.createMultipartUpload({
                            Bucket: Bucket,
                            Key: multipartObjectKey,
                        })];
                    case 1:
                        createResult = _c.sent();
                        expect(createResult.$metadata.httpStatusCode).to.equal(200);
                        expect(typeof createResult.UploadId).to.equal("string");
                        UploadId = createResult.UploadId;
                        return [4 /*yield*/, client.uploadPart({
                                Bucket: Bucket,
                                Key: multipartObjectKey,
                                UploadId: UploadId,
                                PartNumber: 1,
                                Body: createBuffer("1KB"),
                            })];
                    case 2:
                        uploadResult = _c.sent();
                        expect(uploadResult.$metadata.httpStatusCode).to.equal(200);
                        expect(typeof uploadResult.ETag).to.equal("string");
                        Etag = uploadResult.ETag;
                        return [4 /*yield*/, client.listParts({
                                Bucket: Bucket,
                                Key: multipartObjectKey,
                                UploadId: UploadId,
                            })];
                    case 3:
                        listPartsResult = _c.sent();
                        expect(listPartsResult.$metadata.httpStatusCode).to.equal(200);
                        expect((_a = listPartsResult.Parts) === null || _a === void 0 ? void 0 : _a.length).to.equal(1);
                        expect((_b = listPartsResult.Parts) === null || _b === void 0 ? void 0 : _b[0].ETag).to.equal(Etag);
                        return [4 /*yield*/, client.completeMultipartUpload({
                                Bucket: Bucket,
                                Key: multipartObjectKey,
                                UploadId: UploadId,
                                MultipartUpload: { Parts: [{ ETag: Etag, PartNumber: 1 }] },
                            })];
                    case 4:
                        completeResult = _c.sent();
                        expect(completeResult.$metadata.httpStatusCode).to.equal(200);
                        return [4 /*yield*/, client.headObject({
                                Bucket: Bucket,
                                Key: multipartObjectKey,
                            })];
                    case 5:
                        headResult = _c.sent();
                        expect(headResult.$metadata.httpStatusCode).to.equal(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should successfully create, abort, and list upload", function () { return __awaiter(void 0, void 0, void 0, function () {
            var createResult, toAbort, abortResult, listUploadsResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.createMultipartUpload({
                            Bucket: Bucket,
                            Key: multipartObjectKey,
                        })];
                    case 1:
                        createResult = _a.sent();
                        expect(createResult.$metadata.httpStatusCode).to.equal(200);
                        toAbort = createResult.UploadId;
                        expect(typeof toAbort).to.equal("string");
                        return [4 /*yield*/, client.abortMultipartUpload({
                                Bucket: Bucket,
                                Key: multipartObjectKey,
                                UploadId: toAbort,
                            })];
                    case 2:
                        abortResult = _a.sent();
                        expect(abortResult.$metadata.httpStatusCode).to.equal(204);
                        return [4 /*yield*/, client.listMultipartUploads({
                                Bucket: Bucket,
                            })];
                    case 3:
                        listUploadsResult = _a.sent();
                        expect(listUploadsResult.$metadata.httpStatusCode).to.equal(200);
                        expect((listUploadsResult.Uploads || []).map(function (upload) { return upload.UploadId; })).not.to.contain(toAbort);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=S3.ispec.js.map