import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { DescribeCollectionRequest, DescribeCollectionResponse } from "../models/models_0";
import {
  deserializeAws_json1_1DescribeCollectionCommand,
  serializeAws_json1_1DescribeCollectionCommand,
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

export type DescribeCollectionCommandInput = DescribeCollectionRequest;
export type DescribeCollectionCommandOutput = DescribeCollectionResponse & __MetadataBearer;

/**
 * <p>Describes the specified collection. You can use <code>DescribeCollection</code> to get
 *          information, such as the number of faces indexed into a collection and the version of the
 *          model used by the collection for face detection.</p>
 *
 *          <p>For more information, see Describing a Collection in the
 *      Amazon Rekognition Developer Guide.</p>
 */
export class DescribeCollectionCommand extends $Command<
  DescribeCollectionCommandInput,
  DescribeCollectionCommandOutput,
  RekognitionClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: DescribeCollectionCommandInput) {
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
  ): Handler<DescribeCollectionCommandInput, DescribeCollectionCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "RekognitionClient";
    const commandName = "DescribeCollectionCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: DescribeCollectionRequest.filterSensitiveLog,
      outputFilterSensitiveLog: DescribeCollectionResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: DescribeCollectionCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1DescribeCollectionCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<DescribeCollectionCommandOutput> {
    return deserializeAws_json1_1DescribeCollectionCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
