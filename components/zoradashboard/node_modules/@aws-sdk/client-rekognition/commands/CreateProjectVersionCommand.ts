import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { CreateProjectVersionRequest, CreateProjectVersionResponse } from "../models/models_0";
import {
  deserializeAws_json1_1CreateProjectVersionCommand,
  serializeAws_json1_1CreateProjectVersionCommand,
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

export type CreateProjectVersionCommandInput = CreateProjectVersionRequest;
export type CreateProjectVersionCommandOutput = CreateProjectVersionResponse & __MetadataBearer;

/**
 * <p>Creates a new version of a model and begins training.
 *          Models are managed as part of an Amazon Rekognition Custom Labels project.  You can specify
 *          one training dataset and one testing dataset. The response from <code>CreateProjectVersion</code>
 *          is an Amazon Resource Name (ARN) for the version of the model. </p>
 *          <p>Training takes a while to complete. You can get the current status by calling
 *          <a>DescribeProjectVersions</a>.</p>
 *          <p>Once training has successfully completed, call <a>DescribeProjectVersions</a> to
 *          get the training results and evaluate the model.
 *       </p>
 *          <p>After evaluating the model, you start the model
 *        by calling <a>StartProjectVersion</a>.</p>
 *          <p>This operation requires permissions to perform the <code>rekognition:CreateProjectVersion</code> action.</p>
 */
export class CreateProjectVersionCommand extends $Command<
  CreateProjectVersionCommandInput,
  CreateProjectVersionCommandOutput,
  RekognitionClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CreateProjectVersionCommandInput) {
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
  ): Handler<CreateProjectVersionCommandInput, CreateProjectVersionCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "RekognitionClient";
    const commandName = "CreateProjectVersionCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: CreateProjectVersionRequest.filterSensitiveLog,
      outputFilterSensitiveLog: CreateProjectVersionResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: CreateProjectVersionCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1CreateProjectVersionCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<CreateProjectVersionCommandOutput> {
    return deserializeAws_json1_1CreateProjectVersionCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
