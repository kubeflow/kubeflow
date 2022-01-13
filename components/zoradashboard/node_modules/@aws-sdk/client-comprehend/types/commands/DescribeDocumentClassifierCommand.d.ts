import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { DescribeDocumentClassifierRequest, DescribeDocumentClassifierResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeDocumentClassifierCommandInput = DescribeDocumentClassifierRequest;
export declare type DescribeDocumentClassifierCommandOutput = DescribeDocumentClassifierResponse & __MetadataBearer;
/**
 * <p>Gets the properties associated with a document classifier.</p>
 */
export declare class DescribeDocumentClassifierCommand extends $Command<DescribeDocumentClassifierCommandInput, DescribeDocumentClassifierCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: DescribeDocumentClassifierCommandInput;
    constructor(input: DescribeDocumentClassifierCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeDocumentClassifierCommandInput, DescribeDocumentClassifierCommandOutput>;
    private serialize;
    private deserialize;
}
