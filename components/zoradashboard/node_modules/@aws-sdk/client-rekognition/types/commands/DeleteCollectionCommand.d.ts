import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { DeleteCollectionRequest, DeleteCollectionResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DeleteCollectionCommandInput = DeleteCollectionRequest;
export declare type DeleteCollectionCommandOutput = DeleteCollectionResponse & __MetadataBearer;
/**
 * <p>Deletes the specified collection. Note that this operation
 *       removes all faces in the collection. For an example, see <a>delete-collection-procedure</a>.</p>
 *
 *          <p>This operation requires permissions to perform the
 *         <code>rekognition:DeleteCollection</code> action.</p>
 */
export declare class DeleteCollectionCommand extends $Command<DeleteCollectionCommandInput, DeleteCollectionCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: DeleteCollectionCommandInput;
    constructor(input: DeleteCollectionCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteCollectionCommandInput, DeleteCollectionCommandOutput>;
    private serialize;
    private deserialize;
}
