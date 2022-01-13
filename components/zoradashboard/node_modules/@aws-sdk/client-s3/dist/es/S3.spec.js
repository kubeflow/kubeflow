import { __assign, __awaiter, __generator } from "tslib";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { PassThrough } from "stream";
import { S3 } from "./S3";
chai.use(chaiAsPromised);
var expect = chai.expect;
describe("endpoint", function () {
    it("users can override endpoint from client.", function () { return __awaiter(void 0, void 0, void 0, function () {
        var endpointValidator, client;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    endpointValidator = function (next) { return function (args) {
                        // middleware intercept the request and return it early
                        var request = args.request;
                        expect(request.protocol).to.equal("http:");
                        expect(request.hostname).to.equal("localhost");
                        expect(request.port).to.equal(8080);
                        //query and path should not be overwritten
                        expect(request.query).not.to.contain({ foo: "bar" });
                        expect(request.path).not.to.equal("/path");
                        return Promise.resolve({ output: {}, response: {} });
                    }; };
                    client = new S3({ endpoint: "http://localhost:8080/path?foo=bar" });
                    client.middlewareStack.add(endpointValidator, {
                        step: "serialize",
                        name: "endpointValidator",
                        priority: "low",
                    });
                    return [4 /*yield*/, client.putObject({
                            Bucket: "bucket",
                            Key: "key",
                            Body: "body",
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); });
});
describe("Accesspoint ARN", function () { return __awaiter(void 0, void 0, void 0, function () {
    var endpointValidator;
    return __generator(this, function (_a) {
        endpointValidator = function (next, context) { return function (args) {
            // middleware intercept the request and return it early
            var request = args.request;
            return Promise.resolve({
                output: {
                    $metadata: { attempts: 0, httpStatusCode: 200 },
                    request: request,
                    context: context,
                },
                response: {},
            });
        }; };
        it("should succeed with access point ARN", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = new S3({ region: "us-west-2" });
                        client.middlewareStack.add(endpointValidator, { step: "build", priority: "low" });
                        return [4 /*yield*/, client.putObject({
                                Bucket: "arn:aws:s3:us-west-2:123456789012:accesspoint:myendpoint",
                                Key: "key",
                                Body: "body",
                            })];
                    case 1:
                        result = _a.sent();
                        expect(result.request.hostname).to.eql("myendpoint-123456789012.s3-accesspoint.us-west-2.amazonaws.com");
                        return [2 /*return*/];
                }
            });
        }); });
        it("should sign request with region from ARN is useArnRegion is set", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = new S3({
                            region: "us-east-1",
                            useArnRegion: true,
                            credentials: { accessKeyId: "key", secretAccessKey: "secret" },
                        });
                        client.middlewareStack.add(endpointValidator, { step: "finalizeRequest", priority: "low" });
                        return [4 /*yield*/, client.putObject({
                                Bucket: "arn:aws:s3:us-west-2:123456789012:accesspoint:myendpoint",
                                Key: "key",
                                Body: "body",
                            })];
                    case 1:
                        result = _a.sent();
                        expect(result.request.hostname).to.eql("myendpoint-123456789012.s3-accesspoint.us-west-2.amazonaws.com");
                        // Sign request with us-west-2 region from bucket access point ARN
                        expect(result.request.headers.authorization).to.contain("/us-west-2/s3/aws4_request, SignedHeaders=");
                        return [2 /*return*/];
                }
            });
        }); });
        it("should succeed with outposts ARN", function () { return __awaiter(void 0, void 0, void 0, function () {
            var OutpostId, AccountId, region, credentials, client, result, date;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        OutpostId = "op-01234567890123456";
                        AccountId = "123456789012";
                        region = "us-west-2";
                        credentials = { accessKeyId: "key", secretAccessKey: "secret" };
                        client = new S3({ region: "us-east-1", credentials: credentials, useArnRegion: true });
                        client.middlewareStack.add(endpointValidator, { step: "finalizeRequest", priority: "low" });
                        return [4 /*yield*/, client.putObject({
                                Bucket: "arn:aws:s3-outposts:" + region + ":" + AccountId + ":outpost/" + OutpostId + "/accesspoint/abc-111",
                                Key: "key",
                                Body: "body",
                            })];
                    case 1:
                        result = _a.sent();
                        expect(result.request.hostname).to.eql("abc-111-" + AccountId + "." + OutpostId + ".s3-outposts.us-west-2.amazonaws.com");
                        date = new Date().toISOString().substr(0, 10).replace(/-/g, "");
                        expect(result.request.headers["authorization"]).contains("Credential=" + credentials.accessKeyId + "/" + date + "/" + region + "/s3-outposts/aws4_request");
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
describe("Throw 200 response", function () {
    var response = {
        statusCode: 200,
        headers: {},
        body: new PassThrough(),
    };
    var client = new S3({
        region: "us-west-2",
        requestHandler: {
            handle: function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, ({
                            response: response,
                        })];
                });
            }); },
        },
    });
    var errorBody = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n    <Error>\n      <Code>InternalError</Code>\n      <Message>We encountered an internal error. Please try again.</Message>\n      <RequestId>656c76696e6727732072657175657374</RequestId>\n      <HostId>Uuag1LuByRx9e6j5Onimru9pO4ZVKnJ2Qz7/C1NPcfTWAtRPfTaOFg==</HostId>\n    </Error>";
    var params = {
        Bucket: "bucket",
        Key: "key",
        CopySource: "source",
    };
    beforeEach(function () {
        response.body = new PassThrough();
    });
    it("should throw if CopyObject() return with 200 and empty payload", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            response.body.end("");
            return [2 /*return*/, expect(client.copyObject(params)).to.eventually.be.rejectedWith("S3 aborted request")];
        });
    }); });
    it("should throw if CopyObject() return with 200 and error preamble", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            response.body.end(errorBody);
            return [2 /*return*/, expect(client.copyObject(params)).to.eventually.be.rejectedWith("We encountered an internal error. Please try again.")];
        });
    }); });
    it("should throw if UploadPartCopy() return with 200 and empty payload", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            response.body.end("");
            return [2 /*return*/, expect(client.uploadPartCopy(__assign(__assign({}, params), { UploadId: "id", PartNumber: 1 }))).to.eventually.be.rejectedWith("S3 aborted request")];
        });
    }); });
    it("should throw if UploadPartCopy() return with 200 and error preamble", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            response.body.end(errorBody);
            return [2 /*return*/, expect(client.uploadPartCopy(__assign(__assign({}, params), { UploadId: "id", PartNumber: 1 }))).to.eventually.be.rejectedWith("We encountered an internal error. Please try again.")];
        });
    }); });
    it("should throw if CompleteMultipartUpload() return with 200 and empty payload", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            response.body.end("");
            return [2 /*return*/, expect(client.completeMultipartUpload(__assign(__assign({}, params), { UploadId: "id" }))).to.eventually.be.rejectedWith("S3 aborted request")];
        });
    }); });
    it("should throw if CompleteMultipartUpload() return with 200 and error preamble", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            response.body.end(errorBody);
            return [2 /*return*/, expect(client.completeMultipartUpload(__assign(__assign({}, params), { UploadId: "id" }))).to.eventually.be.rejectedWith("We encountered an internal error. Please try again.")];
        });
    }); });
});
//# sourceMappingURL=S3.spec.js.map