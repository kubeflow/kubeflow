import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { BatchDetectEntitiesRequest, BatchDetectEntitiesResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type BatchDetectEntitiesCommandInput = BatchDetectEntitiesRequest;
export declare type BatchDetectEntitiesCommandOutput = BatchDetectEntitiesResponse & __MetadataBearer;
/**
 * <p>Inspects the text of a batch of documents for named entities and returns information
 *       about them. For more information about named entities, see <a>how-entities</a>
 *          </p>
 */
export declare class BatchDetectEntitiesCommand extends $Command<BatchDetectEntitiesCommandInput, BatchDetectEntitiesCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: BatchDetectEntitiesCommandInput;
    constructor(input: BatchDetectEntitiesCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<BatchDetectEntitiesCommandInput, BatchDetectEntitiesCommandOutput>;
    private serialize;
    private deserialize;
}
