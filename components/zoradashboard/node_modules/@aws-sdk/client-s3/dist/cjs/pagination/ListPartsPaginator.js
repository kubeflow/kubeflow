"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateListParts = void 0;
const S3_1 = require("../S3");
const S3Client_1 = require("../S3Client");
const ListPartsCommand_1 = require("../commands/ListPartsCommand");
/**
 * @private
 */
const makePagedClientRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.send(new ListPartsCommand_1.ListPartsCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.listParts(input, ...args);
};
async function* paginateListParts(config, input, ...additionalArguments) {
    // ToDo: replace with actual type instead of typeof input.PartNumberMarker
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.PartNumberMarker = token;
        input["MaxParts"] = config.pageSize;
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
        token = page.NextPartNumberMarker;
        hasNext = !!token;
    }
    // @ts-ignore
    return undefined;
}
exports.paginateListParts = paginateListParts;
//# sourceMappingURL=ListPartsPaginator.js.map