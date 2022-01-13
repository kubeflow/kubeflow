import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { CreateCollectionRequest, CreateCollectionResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type CreateCollectionCommandInput = CreateCollectionRequest;
export declare type CreateCollectionCommandOutput = CreateCollectionResponse & __MetadataBearer;
/**
 * <p>Creates a collection in an AWS Region. You can add faces to the collection using the
 *         <a>IndexFaces</a> operation. </p>
 *          <p>For example, you might create collections, one for each of your application users. A
 *       user can then index faces using the <code>IndexFaces</code> operation and persist results in a
 *       specific collection. Then, a user can search the collection for faces in the user-specific
 *       container. </p>
 *          <p>When you create a collection, it is associated with the latest version of the face model version.</p>
 *          <note>
 *             <p>Collection names are case-sensitive.</p>
 *          </note>
 *
 *          <p>This operation requires permissions to perform the
 *         <code>rekognition:CreateCollection</code> action.</p>
 */
export declare class CreateCollectionCommand extends $Command<CreateCollectionCommandInput, CreateCollectionCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: CreateCollectionCommandInput;
    constructor(input: CreateCollectionCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CreateCollectionCommandInput, CreateCollectionCommandOutput>;
    private serialize;
    private deserialize;
}
