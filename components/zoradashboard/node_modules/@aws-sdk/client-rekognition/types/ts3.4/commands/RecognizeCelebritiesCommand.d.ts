import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { RecognizeCelebritiesRequest, RecognizeCelebritiesResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type RecognizeCelebritiesCommandInput = RecognizeCelebritiesRequest;
export declare type RecognizeCelebritiesCommandOutput = RecognizeCelebritiesResponse & __MetadataBearer;
/**
 * <p>Returns an array of celebrities recognized in the input image.  For more information, see Recognizing Celebrities
 *     in the Amazon Rekognition Developer Guide. </p>
 *          <p>
 *             <code>RecognizeCelebrities</code> returns the 64 largest faces in the image. It lists
 *       recognized celebrities in the <code>CelebrityFaces</code> array and unrecognized faces in the
 *         <code>UnrecognizedFaces</code> array. <code>RecognizeCelebrities</code> doesn't return
 *       celebrities whose faces aren't among the largest 64 faces in the image.</p>
 *
 *          <p>For each celebrity recognized, <code>RecognizeCelebrities</code> returns a
 *         <code>Celebrity</code> object. The <code>Celebrity</code> object contains the celebrity
 *       name, ID, URL links to additional information, match confidence, and a
 *         <code>ComparedFace</code> object that you can use to locate the celebrity's face on the
 *       image.</p>
 *          <p>Amazon Rekognition doesn't retain information about which images a celebrity has been recognized
 *       in. Your application must store this information and use the <code>Celebrity</code> ID
 *       property as a unique identifier for the celebrity. If you don't store the celebrity name or
 *       additional information URLs returned by <code>RecognizeCelebrities</code>, you will need the
 *       ID to identify the celebrity in a call to the <a>GetCelebrityInfo</a>
 *       operation.</p>
 *          <p>You pass the input image either as base64-encoded image bytes or as a reference to an
 *       image in an Amazon S3 bucket. If you use the
 *       AWS
 *       CLI to call Amazon Rekognition operations, passing image bytes is not
 *       supported. The image must be either a PNG or JPEG formatted file. </p>
 *
 *
 *
 *
 *          <p>For an example, see Recognizing Celebrities in an Image in the Amazon Rekognition Developer Guide.</p>
 *          <p>This operation requires permissions to perform the
 *         <code>rekognition:RecognizeCelebrities</code> operation.</p>
 */
export declare class RecognizeCelebritiesCommand extends $Command<RecognizeCelebritiesCommandInput, RecognizeCelebritiesCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: RecognizeCelebritiesCommandInput;
    constructor(input: RecognizeCelebritiesCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<RecognizeCelebritiesCommandInput, RecognizeCelebritiesCommandOutput>;
    private serialize;
    private deserialize;
}
