import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { DetectPiiEntitiesRequest, DetectPiiEntitiesResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DetectPiiEntitiesCommandInput = DetectPiiEntitiesRequest;
export declare type DetectPiiEntitiesCommandOutput = DetectPiiEntitiesResponse & __MetadataBearer;
/**
 * <p>Inspects the input text for entities that contain personally identifiable information
 *       (PII) and returns information about them.</p>
 */
export declare class DetectPiiEntitiesCommand extends $Command<DetectPiiEntitiesCommandInput, DetectPiiEntitiesCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: DetectPiiEntitiesCommandInput;
    constructor(input: DetectPiiEntitiesCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DetectPiiEntitiesCommandInput, DetectPiiEntitiesCommandOutput>;
    private serialize;
    private deserialize;
}
