import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { DeleteFacesRequest, DeleteFacesResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DeleteFacesCommandInput = DeleteFacesRequest;
export declare type DeleteFacesCommandOutput = DeleteFacesResponse & __MetadataBearer;
/**
 * <p>Deletes faces from a collection. You specify a collection ID and an array of face IDs
 *       to remove from the collection.</p>
 *          <p>This operation requires permissions to perform the <code>rekognition:DeleteFaces</code>
 *       action.</p>
 */
export declare class DeleteFacesCommand extends $Command<DeleteFacesCommandInput, DeleteFacesCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: DeleteFacesCommandInput;
    constructor(input: DeleteFacesCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteFacesCommandInput, DeleteFacesCommandOutput>;
    private serialize;
    private deserialize;
}
