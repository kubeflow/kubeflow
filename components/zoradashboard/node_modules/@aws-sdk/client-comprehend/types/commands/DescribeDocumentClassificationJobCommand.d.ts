import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { DescribeDocumentClassificationJobRequest, DescribeDocumentClassificationJobResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeDocumentClassificationJobCommandInput = DescribeDocumentClassificationJobRequest;
export declare type DescribeDocumentClassificationJobCommandOutput = DescribeDocumentClassificationJobResponse & __MetadataBearer;
/**
 * <p>Gets the properties associated with a document classification job. Use this operation to
 *       get the status of a classification job.</p>
 */
export declare class DescribeDocumentClassificationJobCommand extends $Command<DescribeDocumentClassificationJobCommandInput, DescribeDocumentClassificationJobCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: DescribeDocumentClassificationJobCommandInput;
    constructor(input: DescribeDocumentClassificationJobCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeDocumentClassificationJobCommandInput, DescribeDocumentClassificationJobCommandOutput>;
    private serialize;
    private deserialize;
}
