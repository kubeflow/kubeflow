import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { DescribeCollectionRequest, DescribeCollectionResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeCollectionCommandInput = DescribeCollectionRequest;
export declare type DescribeCollectionCommandOutput = DescribeCollectionResponse & __MetadataBearer;
/**
 * <p>Describes the specified collection. You can use <code>DescribeCollection</code> to get
 *          information, such as the number of faces indexed into a collection and the version of the
 *          model used by the collection for face detection.</p>
 *
 *          <p>For more information, see Describing a Collection in the
 *      Amazon Rekognition Developer Guide.</p>
 */
export declare class DescribeCollectionCommand extends $Command<DescribeCollectionCommandInput, DescribeCollectionCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: DescribeCollectionCommandInput;
    constructor(input: DescribeCollectionCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeCollectionCommandInput, DescribeCollectionCommandOutput>;
    private serialize;
    private deserialize;
}
