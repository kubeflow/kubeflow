"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateGetLabelDetection = void 0;
const Rekognition_1 = require("../Rekognition");
const RekognitionClient_1 = require("../RekognitionClient");
const GetLabelDetectionCommand_1 = require("../commands/GetLabelDetectionCommand");
/**
 * @private
 */
const makePagedClientRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.send(new GetLabelDetectionCommand_1.GetLabelDetectionCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.getLabelDetection(input, ...args);
};
async function* paginateGetLabelDetection(config, input, ...additionalArguments) {
    // ToDo: replace with actual type instead of typeof input.NextToken
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.NextToken = token;
        input["MaxResults"] = config.pageSize;
        if (config.client instanceof Rekognition_1.Rekognition) {
            page = await makePagedRequest(config.client, input, ...additionalArguments);
        }
        else if (config.client instanceof RekognitionClient_1.RekognitionClient) {
            page = await makePagedClientRequest(config.client, input, ...additionalArguments);
        }
        else {
            throw new Error("Invalid client, expected Rekognition | RekognitionClient");
        }
        yield page;
        token = page.NextToken;
        hasNext = !!token;
    }
    // @ts-ignore
    return undefined;
}
exports.paginateGetLabelDetection = paginateGetLabelDetection;
//# sourceMappingURL=GetLabelDetectionPaginator.js.map