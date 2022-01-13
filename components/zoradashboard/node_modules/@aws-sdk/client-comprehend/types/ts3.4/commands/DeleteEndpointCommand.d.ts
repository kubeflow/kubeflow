import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { DeleteEndpointRequest, DeleteEndpointResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DeleteEndpointCommandInput = DeleteEndpointRequest;
export declare type DeleteEndpointCommandOutput = DeleteEndpointResponse & __MetadataBearer;
/**
 * <p>Deletes a model-specific endpoint for a previously-trained custom model. All endpoints
 *       must be deleted in order for the model to be deleted.</p>
 */
export declare class DeleteEndpointCommand extends $Command<DeleteEndpointCommandInput, DeleteEndpointCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: DeleteEndpointCommandInput;
    constructor(input: DeleteEndpointCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteEndpointCommandInput, DeleteEndpointCommandOutput>;
    private serialize;
    private deserialize;
}
