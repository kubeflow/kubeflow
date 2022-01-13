import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { DescribeProjectsRequest, DescribeProjectsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeProjectsCommandInput = DescribeProjectsRequest;
export declare type DescribeProjectsCommandOutput = DescribeProjectsResponse & __MetadataBearer;
/**
 * <p>Lists and gets information about your Amazon Rekognition Custom Labels projects.</p>
 *          <p>This operation requires permissions to perform the <code>rekognition:DescribeProjects</code> action.</p>
 */
export declare class DescribeProjectsCommand extends $Command<DescribeProjectsCommandInput, DescribeProjectsCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: DescribeProjectsCommandInput;
    constructor(input: DescribeProjectsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeProjectsCommandInput, DescribeProjectsCommandOutput>;
    private serialize;
    private deserialize;
}
