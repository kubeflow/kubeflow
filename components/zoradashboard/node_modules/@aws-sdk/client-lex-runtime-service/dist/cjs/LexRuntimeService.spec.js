"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="mocha" />
const chai_1 = require("chai");
const LexRuntimeService_1 = require("./LexRuntimeService");
describe("@aws-sdk/client-lex-runtime-service", () => {
    describe("PostContent", () => {
        it("should contain correct x-amz-content-sha256 header", async () => {
            const validator = (next) => (args) => {
                // middleware intercept the request and return it early
                const request = args.request;
                chai_1.expect(request.headers).to.have.property("x-amz-content-sha256", "UNSIGNED-PAYLOAD");
                return Promise.resolve({ output: {}, response: {} });
            };
            const client = new LexRuntimeService_1.LexRuntimeService({
                region: "us-west-2",
            });
            client.middlewareStack.add(validator, {
                step: "serialize",
                name: "endpointValidator",
                priority: "low",
            });
            return await client.postContent({
                botAlias: "alias",
                botName: "bot",
                userId: "user",
                contentType: "text/plain; charset=utf-8",
                inputStream: "hello world!",
            });
        });
    });
});
//# sourceMappingURL=LexRuntimeService.spec.js.map