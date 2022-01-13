import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { SearchFacesByImageRequest, SearchFacesByImageResponse } from "../models/models_0";
import {
  deserializeAws_json1_1SearchFacesByImageCommand,
  serializeAws_json1_1SearchFacesByImageCommand,
} from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@aws-sdk/protocol-http";
import { Command as $Command } from "@aws-sdk/smithy-client";
import {
  FinalizeHandlerArguments,
  Handler,
  HandlerExecutionContext,
  MiddlewareStack,
  HttpHandlerOptions as __HttpHandlerOptions,
  MetadataBearer as __MetadataBearer,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

export type SearchFacesByImageCommandInput = SearchFacesByImageRequest;
export type SearchFacesByImageCommandOutput = SearchFacesByImageResponse & __MetadataBearer;

/**
 * <p>For a given input image, first detects the largest face in the image, and then searches
 *       the specified collection for matching faces. The operation compares the features of the input
 *       face with faces in the specified collection. </p>
 *          <note>
 *             <p>To search for all faces in an input image, you might first call the <a>IndexFaces</a> operation, and then use the face IDs returned in subsequent
 *         calls to the <a>SearchFaces</a> operation. </p>
 *             <p> You can also call the <code>DetectFaces</code> operation and use the bounding boxes
 *         in the response to make face crops, which then you can pass in to the
 *           <code>SearchFacesByImage</code> operation. </p>
 *          </note>
 *
 *          <p>You pass the input image either as base64-encoded image bytes or as a reference to an
 *       image in an Amazon S3 bucket. If you use the
 *       AWS
 *       CLI to call Amazon Rekognition operations, passing image bytes is not
 *       supported. The image must be either a PNG or JPEG formatted file. </p>
 *          <p>
 *       The response returns an array of faces that match, ordered by similarity score with the
 *       highest similarity first. More specifically, it is an
 *       array of metadata for each face match found. Along with the metadata, the response also
 *       includes a <code>similarity</code> indicating how similar the face is
 *       to the input face.
 *
 *       In the response, the operation also returns the bounding
 *       box (and a confidence level that the bounding box contains a face) of the face that Amazon Rekognition
 *       used for the input image.
 *     </p>
 *
 *          <p>For an example, Searching for a Face Using an Image in the Amazon Rekognition Developer Guide.</p>
 *
 *          <p>The <code>QualityFilter</code> input parameter allows you to filter out detected faces
 *       that don’t meet a required quality bar. The quality bar is based on a
 *       variety of common use cases.
 *       Use <code>QualityFilter</code> to set the quality bar for
 *       filtering by specifying <code>LOW</code>, <code>MEDIUM</code>, or <code>HIGH</code>.
 *       If you do not want to filter detected faces, specify <code>NONE</code>. The default
 *       value is <code>NONE</code>.</p>
 *          <note>
 *             <p>To use quality filtering, you need a collection associated with version 3 of the
 *       face model or higher. To get the version of the face model associated with a collection, call
 *       <a>DescribeCollection</a>. </p>
 *          </note>
 *
 *          <p>This operation requires permissions to perform the <code>rekognition:SearchFacesByImage</code>
 *       action.</p>
 */
export class SearchFacesByImageCommand extends $Command<
  SearchFacesByImageCommandInput,
  SearchFacesByImageCommandOutput,
  RekognitionClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: SearchFacesByImageCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: RekognitionClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<SearchFacesByImageCommandInput, SearchFacesByImageCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "RekognitionClient";
    const commandName = "SearchFacesByImageCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: SearchFacesByImageRequest.filterSensitiveLog,
      outputFilterSensitiveLog: SearchFacesByImageResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: SearchFacesByImageCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1SearchFacesByImageCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<SearchFacesByImageCommandOutput> {
    return deserializeAws_json1_1SearchFacesByImageCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
