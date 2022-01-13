import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { DescribeProjectVersionsRequest, DescribeProjectVersionsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeProjectVersionsCommandInput = DescribeProjectVersionsRequest;
export declare type DescribeProjectVersionsCommandOutput = DescribeProjectVersionsResponse & __MetadataBearer;
/**
 * <p>Lists and describes the models in an Amazon Rekognition Custom Labels project. You
 *          can specify up to 10 model versions in <code>ProjectVersionArns</code>. If
 *          you don't specify a value, descriptions for all models are returned.</p>
 *          <p>This operation requires permissions to perform the <code>rekognition:DescribeProjectVersions</code>
 *             action.</p>
 */
export declare class DescribeProjectVersionsCommand extends $Command<DescribeProjectVersionsCommandInput, DescribeProjectVersionsCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: DescribeProjectVersionsCommandInput;
    constructor(input: DescribeProjectVersionsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeProjectVersionsCommandInput, DescribeProjectVersionsCommandOutput>;
    private serialize;
    private deserialize;
}
