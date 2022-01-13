import { PersonalizeEventsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../PersonalizeEventsClient";
import { PutItemsRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type PutItemsCommandInput = PutItemsRequest;
export declare type PutItemsCommandOutput = __MetadataBearer;
/**
 * <p>Adds one or more items to an Items dataset. For more information see
 *       <a>importing-items</a>.</p>
 */
export declare class PutItemsCommand extends $Command<PutItemsCommandInput, PutItemsCommandOutput, PersonalizeEventsClientResolvedConfig> {
    readonly input: PutItemsCommandInput;
    constructor(input: PutItemsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: PersonalizeEventsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<PutItemsCommandInput, PutItemsCommandOutput>;
    private serialize;
    private deserialize;
}
