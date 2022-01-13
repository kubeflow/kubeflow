import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { DescribeEndpointRequest, DescribeEndpointResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeEndpointCommandInput = DescribeEndpointRequest;
export declare type DescribeEndpointCommandOutput = DescribeEndpointResponse & __MetadataBearer;
/**
 * <p>Gets the properties associated with a specific endpoint. Use this operation to get the
 *       status of an endpoint.</p>
 */
export declare class DescribeEndpointCommand extends $Command<DescribeEndpointCommandInput, DescribeEndpointCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: DescribeEndpointCommandInput;
    constructor(input: DescribeEndpointCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeEndpointCommandInput, DescribeEndpointCommandOutput>;
    private serialize;
    private deserialize;
}
