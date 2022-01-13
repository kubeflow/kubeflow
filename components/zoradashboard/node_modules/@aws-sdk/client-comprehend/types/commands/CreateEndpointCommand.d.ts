import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { CreateEndpointRequest, CreateEndpointResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type CreateEndpointCommandInput = CreateEndpointRequest;
export declare type CreateEndpointCommandOutput = CreateEndpointResponse & __MetadataBearer;
/**
 * <p>Creates a model-specific endpoint for synchronous inference for a previously trained
 *       custom model
 *       </p>
 */
export declare class CreateEndpointCommand extends $Command<CreateEndpointCommandInput, CreateEndpointCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: CreateEndpointCommandInput;
    constructor(input: CreateEndpointCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CreateEndpointCommandInput, CreateEndpointCommandOutput>;
    private serialize;
    private deserialize;
}
