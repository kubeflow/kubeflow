import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { ListEndpointsRequest, ListEndpointsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListEndpointsCommandInput = ListEndpointsRequest;
export declare type ListEndpointsCommandOutput = ListEndpointsResponse & __MetadataBearer;
/**
 * <p>Gets a list of all existing endpoints that you've created.</p>
 */
export declare class ListEndpointsCommand extends $Command<ListEndpointsCommandInput, ListEndpointsCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: ListEndpointsCommandInput;
    constructor(input: ListEndpointsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListEndpointsCommandInput, ListEndpointsCommandOutput>;
    private serialize;
    private deserialize;
}
