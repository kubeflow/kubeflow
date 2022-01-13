import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { DescribeEntityRecognizerRequest, DescribeEntityRecognizerResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeEntityRecognizerCommandInput = DescribeEntityRecognizerRequest;
export declare type DescribeEntityRecognizerCommandOutput = DescribeEntityRecognizerResponse & __MetadataBearer;
/**
 * <p>Provides details about an entity recognizer including status, S3 buckets containing
 *       training data, recognizer metadata, metrics, and so on.</p>
 */
export declare class DescribeEntityRecognizerCommand extends $Command<DescribeEntityRecognizerCommandInput, DescribeEntityRecognizerCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: DescribeEntityRecognizerCommandInput;
    constructor(input: DescribeEntityRecognizerCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeEntityRecognizerCommandInput, DescribeEntityRecognizerCommandOutput>;
    private serialize;
    private deserialize;
}
