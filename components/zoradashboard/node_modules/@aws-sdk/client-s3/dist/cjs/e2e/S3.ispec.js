"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/// <reference types="mocha" />
/**
 * This is the integration test that make sure the client can make request cross-platform-ly
 * in NodeJS, Chromium and Firefox. This test is written in mocha.
 */
const chai_1 = tslib_1.__importDefault(require("chai"));
const chai_as_promised_1 = tslib_1.__importDefault(require("chai-as-promised"));
const index_1 = require("../index");
const helpers_1 = require("./helpers");
chai_1.default.use(chai_as_promised_1.default);
const { expect } = chai_1.default;
// There will be default values of defaultRegion, credentials, and isBrowser variable in browser tests.
// Define the values for Node.js tests
const region = globalThis.defaultRegion || ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.AWS_SMOKE_TEST_REGION);
const credentials = globalThis.credentials || undefined;
const isBrowser = globalThis.isBrowser || false;
const Bucket = ((_d = (_c = (_b = globalThis) === null || _b === void 0 ? void 0 : _b.window) === null || _c === void 0 ? void 0 : _c.__env__) === null || _d === void 0 ? void 0 : _d.AWS_SMOKE_TEST_BUCKET) || ((_e = process === null || process === void 0 ? void 0 : process.env) === null || _e === void 0 ? void 0 : _e.AWS_SMOKE_TEST_BUCKET);
let Key = `${Date.now()}`;
describe("@aws-sdk/client-s3", () => {
    const client = new index_1.S3({
        region: region,
        credentials,
    });
    describe("PutObject", () => {
        before(() => {
            Key = `${Date.now()}`;
        });
        after(async () => {
            await client.deleteObject({ Bucket, Key });
        });
        if (isBrowser) {
            const buf = helpers_1.createBuffer("1KB");
            it("should succeed with blob body", async () => {
                const result = await client.putObject({
                    Bucket,
                    Key,
                    Body: new Blob([buf]),
                });
                expect(result.$metadata.httpStatusCode).to.equal(200);
            });
            it("should succeed with TypedArray body", async () => {
                const result = await client.putObject({
                    Bucket,
                    Key,
                    Body: buf,
                });
                expect(result.$metadata.httpStatusCode).to.equal(200);
            });
            it("should succeed with ReadableStream body", async () => {
                const length = 10 * 1000; // 10KB
                const chunkSize = 10;
                const readableStream = new ReadableStream({
                    start(controller) {
                        let sizeLeft = length;
                        while (sizeLeft > 0) {
                            let chunk = "";
                            for (let i = 0; i < Math.min(sizeLeft, chunkSize); i++) {
                                chunk += "x";
                            }
                            controller.enqueue(chunk);
                            sizeLeft -= chunk.length;
                        }
                    },
                });
                const result = await client.putObject({
                    Bucket,
                    Key,
                    Body: readableStream,
                });
                expect(result.$metadata.httpStatusCode).to.equal(200);
            });
        }
        else {
            it("should succeed with Node.js readable stream body", async () => {
                const length = 10 * 1000; // 10KB
                const chunkSize = 10;
                const { Readable } = require("stream");
                let sizeLeft = length;
                const inputStream = new Readable({
                    read() {
                        if (sizeLeft <= 0) {
                            this.push(null); //end stream;
                            return;
                        }
                        let chunk = "";
                        for (let i = 0; i < Math.min(sizeLeft, chunkSize); i++) {
                            chunk += "x";
                        }
                        this.push(chunk);
                        sizeLeft -= chunk.length;
                    },
                });
                inputStream.size = length; // This is required
                const result = await client.putObject({
                    Bucket,
                    Key,
                    Body: inputStream,
                });
                expect(result.$metadata.httpStatusCode).to.equal(200);
            });
        }
    });
    describe("GetObject", function () {
        this.timeout(10 * 1000);
        before(async () => {
            Key = `${Date.now()}`;
        });
        after(async () => {
            await client.deleteObject({ Bucket, Key });
        });
        it("should succeed with valid body payload", async () => {
            // prepare the object.
            const body = helpers_1.createBuffer("1MB");
            await client.putObject({ Bucket, Key, Body: body });
            const result = await client.getObject({ Bucket, Key });
            expect(result.$metadata.httpStatusCode).to.equal(200);
            if (isBrowser) {
                expect(result.Body).to.be.instanceOf(ReadableStream);
            }
            else {
                const { Readable } = require("stream");
                expect(result.Body).to.be.instanceOf(Readable);
            }
        });
    });
    describe("ListObjects", () => {
        before(async () => {
            Key = `${Date.now()}`;
            await client.putObject({ Bucket, Key, Body: "foo" });
        });
        after(async () => {
            await client.deleteObject({ Bucket, Key });
        });
        it("should succeed with valid bucket", async () => {
            const result = await client.listObjects({
                Bucket,
            });
            expect(result.$metadata.httpStatusCode).to.equal(200);
            expect(result.Contents).to.be.instanceOf(Array);
        });
        it("should throw with invalid bucket", () => expect(client.listObjects({ Bucket: "invalid-bucket" })).to.eventually.be.rejected.and.be.an.instanceOf(Error));
    });
    describe("MultipartUpload", () => {
        let UploadId;
        let Etag;
        const multipartObjectKey = `${Key}-multipart`;
        before(() => {
            Key = `${Date.now()}`;
        });
        afterEach(async () => {
            if (UploadId) {
                await client.abortMultipartUpload({
                    Bucket,
                    Key: multipartObjectKey,
                    UploadId,
                });
            }
            await client.deleteObject({
                Bucket,
                Key: multipartObjectKey,
            });
        });
        it("should successfully create, upload list and complete", async () => {
            var _a, _b;
            //create multipart upload
            const createResult = await client.createMultipartUpload({
                Bucket,
                Key: multipartObjectKey,
            });
            expect(createResult.$metadata.httpStatusCode).to.equal(200);
            expect(typeof createResult.UploadId).to.equal("string");
            UploadId = createResult.UploadId;
            //upload part
            const uploadResult = await client.uploadPart({
                Bucket,
                Key: multipartObjectKey,
                UploadId,
                PartNumber: 1,
                Body: helpers_1.createBuffer("1KB"),
            });
            expect(uploadResult.$metadata.httpStatusCode).to.equal(200);
            expect(typeof uploadResult.ETag).to.equal("string");
            Etag = uploadResult.ETag;
            //list parts
            const listPartsResult = await client.listParts({
                Bucket,
                Key: multipartObjectKey,
                UploadId,
            });
            expect(listPartsResult.$metadata.httpStatusCode).to.equal(200);
            expect((_a = listPartsResult.Parts) === null || _a === void 0 ? void 0 : _a.length).to.equal(1);
            expect((_b = listPartsResult.Parts) === null || _b === void 0 ? void 0 : _b[0].ETag).to.equal(Etag);
            //complete multipart upload
            const completeResult = await client.completeMultipartUpload({
                Bucket,
                Key: multipartObjectKey,
                UploadId,
                MultipartUpload: { Parts: [{ ETag: Etag, PartNumber: 1 }] },
            });
            expect(completeResult.$metadata.httpStatusCode).to.equal(200);
            //validate the object is uploaded
            const headResult = await client.headObject({
                Bucket,
                Key: multipartObjectKey,
            });
            expect(headResult.$metadata.httpStatusCode).to.equal(200);
        });
        it("should successfully create, abort, and list upload", async () => {
            //create multipart upload
            const createResult = await client.createMultipartUpload({
                Bucket,
                Key: multipartObjectKey,
            });
            expect(createResult.$metadata.httpStatusCode).to.equal(200);
            const toAbort = createResult.UploadId;
            expect(typeof toAbort).to.equal("string");
            //abort multipart upload
            const abortResult = await client.abortMultipartUpload({
                Bucket,
                Key: multipartObjectKey,
                UploadId: toAbort,
            });
            expect(abortResult.$metadata.httpStatusCode).to.equal(204);
            //validate multipart upload is aborted
            const listUploadsResult = await client.listMultipartUploads({
                Bucket,
            });
            expect(listUploadsResult.$metadata.httpStatusCode).to.equal(200);
            expect((listUploadsResult.Uploads || []).map((upload) => upload.UploadId)).not.to.contain(toAbort);
        });
    });
});
//# sourceMappingURL=S3.ispec.js.map