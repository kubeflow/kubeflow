import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { CreateProjectRequest, CreateProjectResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type CreateProjectCommandInput = CreateProjectRequest;
export declare type CreateProjectCommandOutput = CreateProjectResponse & __MetadataBearer;
/**
 * <p>Creates a new Amazon Rekognition Custom Labels project. A project is a logical grouping of resources (images, Labels, models)
 *          and operations (training, evaluation and detection).  </p>
 *          <p>This operation requires permissions to perform the <code>rekognition:CreateProject</code> action.</p>
 */
export declare class CreateProjectCommand extends $Command<CreateProjectCommandInput, CreateProjectCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: CreateProjectCommandInput;
    constructor(input: CreateProjectCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CreateProjectCommandInput, CreateProjectCommandOutput>;
    private serialize;
    private deserialize;
}
