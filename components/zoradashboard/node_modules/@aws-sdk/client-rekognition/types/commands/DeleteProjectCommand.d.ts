import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { DeleteProjectRequest, DeleteProjectResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DeleteProjectCommandInput = DeleteProjectRequest;
export declare type DeleteProjectCommandOutput = DeleteProjectResponse & __MetadataBearer;
/**
 * <p>Deletes an Amazon Rekognition Custom Labels project.  To delete a project you must first delete all models associated
 *          with the project. To delete a model, see <a>DeleteProjectVersion</a>.</p>
 *          <p>This operation requires permissions to perform the
 *          <code>rekognition:DeleteProject</code> action. </p>
 */
export declare class DeleteProjectCommand extends $Command<DeleteProjectCommandInput, DeleteProjectCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: DeleteProjectCommandInput;
    constructor(input: DeleteProjectCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteProjectCommandInput, DeleteProjectCommandOutput>;
    private serialize;
    private deserialize;
}
