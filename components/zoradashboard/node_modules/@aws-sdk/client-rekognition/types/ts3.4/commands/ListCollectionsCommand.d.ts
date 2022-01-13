import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { ListCollectionsRequest, ListCollectionsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListCollectionsCommandInput = ListCollectionsRequest;
export declare type ListCollectionsCommandOutput = ListCollectionsResponse & __MetadataBearer;
/**
 * <p>Returns list of collection IDs in your account.
 *     If the result is truncated, the response also provides a <code>NextToken</code>
 *     that you can use in the subsequent request to fetch the next set of collection IDs.</p>
 *
 *          <p>For an example, see Listing Collections in the Amazon Rekognition Developer Guide.</p>
 *          <p>This operation requires permissions to perform the <code>rekognition:ListCollections</code> action.</p>
 */
export declare class ListCollectionsCommand extends $Command<ListCollectionsCommandInput, ListCollectionsCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: ListCollectionsCommandInput;
    constructor(input: ListCollectionsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListCollectionsCommandInput, ListCollectionsCommandOutput>;
    private serialize;
    private deserialize;
}
