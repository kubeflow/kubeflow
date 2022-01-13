import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { DescribeStreamProcessorRequest, DescribeStreamProcessorResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeStreamProcessorCommandInput = DescribeStreamProcessorRequest;
export declare type DescribeStreamProcessorCommandOutput = DescribeStreamProcessorResponse & __MetadataBearer;
/**
 * <p>Provides information about a stream processor created by <a>CreateStreamProcessor</a>. You can get information about the input and output streams, the input parameters for the face recognition being performed,
 *             and the current status of the stream processor.</p>
 */
export declare class DescribeStreamProcessorCommand extends $Command<DescribeStreamProcessorCommandInput, DescribeStreamProcessorCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: DescribeStreamProcessorCommandInput;
    constructor(input: DescribeStreamProcessorCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeStreamProcessorCommandInput, DescribeStreamProcessorCommandOutput>;
    private serialize;
    private deserialize;
}
