import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { SearchFacesRequest, SearchFacesResponse } from "../models/models_0";
import {
  deserializeAws_json1_1SearchFacesCommand,
  serializeAws_json1_1SearchFacesCommand,
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

export type SearchFacesCommandInput = SearchFacesRequest;
export type SearchFacesCommandOutput = SearchFacesResponse & __MetadataBearer;

/**
 * <p>For a given input face ID, searches for matching faces in the collection the face
 *       belongs to. You get a face ID when you add a face to the collection using the <a>IndexFaces</a> operation. The operation compares the features of the input face with
 *       faces in the specified collection. </p>
 *          <note>
 *             <p>You can also search faces without indexing faces by using the
 *           <code>SearchFacesByImage</code> operation.</p>
 *          </note>
 *
 *          <p>
 *      The operation response returns
 *       an array of faces that match, ordered by similarity score with the highest
 *       similarity first. More specifically, it is an
 *       array of metadata for each face match that is found. Along with the metadata, the response also
 *       includes a <code>confidence</code> value for each face match, indicating the confidence
 *       that the specific face matches the input face.
 *     </p>
 *
 *          <p>For an example, see Searching for a Face Using Its Face ID in the Amazon Rekognition Developer Guide.</p>
 *
 *          <p>This operation requires permissions to perform the <code>rekognition:SearchFaces</code>
 *       action.</p>
 */
export class SearchFacesCommand extends $Command<
  SearchFacesCommandInput,
  SearchFacesCommandOutput,
  RekognitionClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: SearchFacesCommandInput) {
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
  ): Handler<SearchFacesCommandInput, SearchFacesCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "RekognitionClient";
    const commandName = "SearchFacesCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: SearchFacesRequest.filterSensitiveLog,
      outputFilterSensitiveLog: SearchFacesResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: SearchFacesCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1SearchFacesCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<SearchFacesCommandOutput> {
    return deserializeAws_json1_1SearchFacesCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
