import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { DetectEntitiesRequest, DetectEntitiesResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DetectEntitiesCommandInput = DetectEntitiesRequest;
export declare type DetectEntitiesCommandOutput = DetectEntitiesResponse & __MetadataBearer;
/**
 * <p>Inspects text for named entities, and returns information about them. For more
 *       information, about named entities, see <a>how-entities</a>. </p>
 */
export declare class DetectEntitiesCommand extends $Command<DetectEntitiesCommandInput, DetectEntitiesCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: DetectEntitiesCommandInput;
    constructor(input: DetectEntitiesCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DetectEntitiesCommandInput, DetectEntitiesCommandOutput>;
    private serialize;
    private deserialize;
}
