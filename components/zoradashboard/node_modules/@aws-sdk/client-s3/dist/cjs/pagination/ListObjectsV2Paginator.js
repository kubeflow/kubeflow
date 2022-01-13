"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateListObjectsV2 = void 0;
const S3_1 = require("../S3");
const S3Client_1 = require("../S3Client");
const ListObjectsV2Command_1 = require("../commands/ListObjectsV2Command");
/**
 * @private
 */
const makePagedClientRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.send(new ListObjectsV2Command_1.ListObjectsV2Command(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.listObjectsV2(input, ...args);
};
async function* paginateListObjectsV2(config, input, ...additionalArguments) {
    // ToDo: replace with actual type instead of typeof input.ContinuationToken
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.ContinuationToken = token;
        input["MaxKeys"] = config.pageSize;
        if (config.client instanceof S3_1.S3) {
            page = await makePagedRequest(config.client, input, ...additionalArguments);
        }
        else if (config.client instanceof S3Client_1.S3Client) {
            page = await makePagedClientRequest(config.client, input, ...additionalArguments);
        }
        else {
            throw new Error("Invalid client, expected S3 | S3Client");
        }
        yield page;
        token = page.NextContinuationToken;
        hasNext = !!token;
    }
    // @ts-ignore
    return undefined;
}
exports.paginateListObjectsV2 = paginateListObjectsV2;
//# sourceMappingURL=ListObjectsV2Paginator.js.map