import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { CreateProjectVersionRequest, CreateProjectVersionResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type CreateProjectVersionCommandInput = CreateProjectVersionRequest;
export declare type CreateProjectVersionCommandOutput = CreateProjectVersionResponse & __MetadataBearer;
/**
 * <p>Creates a new version of a model and begins training.
 *          Models are managed as part of an Amazon Rekognition Custom Labels project.  You can specify
 *          one training dataset and one testing dataset. The response from <code>CreateProjectVersion</code>
 *          is an Amazon Resource Name (ARN) for the version of the model. </p>
 *          <p>Training takes a while to complete. You can get the current status by calling
 *          <a>DescribeProjectVersions</a>.</p>
 *          <p>Once training has successfully completed, call <a>DescribeProjectVersions</a> to
 *          get the training results and evaluate the model.
 *       </p>
 *          <p>After evaluating the model, you start the model
 *        by calling <a>StartProjectVersion</a>.</p>
 *          <p>This operation requires permissions to perform the <code>rekognition:CreateProjectVersion</code> action.</p>
 */
export declare class CreateProjectVersionCommand extends $Command<CreateProjectVersionCommandInput, CreateProjectVersionCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: CreateProjectVersionCommandInput;
    constructor(input: CreateProjectVersionCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CreateProjectVersionCommandInput, CreateProjectVersionCommandOutput>;
    private serialize;
    private deserialize;
}
