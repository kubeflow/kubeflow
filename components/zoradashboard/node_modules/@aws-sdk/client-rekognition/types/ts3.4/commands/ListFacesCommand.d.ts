import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { ListFacesRequest, ListFacesResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListFacesCommandInput = ListFacesRequest;
export declare type ListFacesCommandOutput = ListFacesResponse & __MetadataBearer;
/**
 * <p>Returns metadata for faces in the specified collection.
 *       This metadata includes information such as the bounding box coordinates, the confidence
 *       (that the bounding box contains a face), and face ID. For an example, see Listing Faces in a Collection
 *       in the Amazon Rekognition Developer Guide.</p>
 *
 *
 *          <p>This operation requires permissions to perform the
 *       <code>rekognition:ListFaces</code> action.</p>
 */
export declare class ListFacesCommand extends $Command<ListFacesCommandInput, ListFacesCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: ListFacesCommandInput;
    constructor(input: ListFacesCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListFacesCommandInput, ListFacesCommandOutput>;
    private serialize;
    private deserialize;
}
