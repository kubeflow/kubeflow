import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { CreateCollectionRequest, CreateCollectionResponse } from "../models/models_0";
import {
  deserializeAws_json1_1CreateCollectionCommand,
  serializeAws_json1_1CreateCollectionCommand,
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

export type CreateCollectionCommandInput = CreateCollectionRequest;
export type CreateCollectionCommandOutput = CreateCollectionResponse & __MetadataBearer;

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
export class CreateCollectionCommand extends $Command<
  CreateCollectionCommandInput,
  CreateCollectionCommandOutput,
  RekognitionClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CreateCollectionCommandInput) {
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
  ): Handler<CreateCollectionCommandInput, CreateCollectionCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "RekognitionClient";
    const commandName = "CreateCollectionCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: CreateCollectionRequest.filterSensitiveLog,
      outputFilterSensitiveLog: CreateCollectionResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: CreateCollectionCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1CreateCollectionCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<CreateCollectionCommandOutput> {
    return deserializeAws_json1_1CreateCollectionCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
