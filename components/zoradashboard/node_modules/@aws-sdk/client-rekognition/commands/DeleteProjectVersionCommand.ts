import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { DeleteProjectVersionRequest, DeleteProjectVersionResponse } from "../models/models_0";
import {
  deserializeAws_json1_1DeleteProjectVersionCommand,
  serializeAws_json1_1DeleteProjectVersionCommand,
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

export type DeleteProjectVersionCommandInput = DeleteProjectVersionRequest;
export type DeleteProjectVersionCommandOutput = DeleteProjectVersionResponse & __MetadataBearer;

/**
 * <p>Deletes an Amazon Rekognition Custom Labels model.  </p>
 *          <p>You can't delete a model if it is running or if it is training.
 *           To check the status of a model, use the <code>Status</code> field returned
 *          from <a>DescribeProjectVersions</a>.
 *          To stop a running model call <a>StopProjectVersion</a>. If the model
 *       is training, wait until it finishes.</p>
 *          <p>This operation requires permissions to perform the
 *          <code>rekognition:DeleteProjectVersion</code> action. </p>
 */
export class DeleteProjectVersionCommand extends $Command<
  DeleteProjectVersionCommandInput,
  DeleteProjectVersionCommandOutput,
  RekognitionClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: DeleteProjectVersionCommandInput) {
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
  ): Handler<DeleteProjectVersionCommandInput, DeleteProjectVersionCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "RekognitionClient";
    const commandName = "DeleteProjectVersionCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: DeleteProjectVersionRequest.filterSensitiveLog,
      outputFilterSensitiveLog: DeleteProjectVersionResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: DeleteProjectVersionCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1DeleteProjectVersionCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<DeleteProjectVersionCommandOutput> {
    return deserializeAws_json1_1DeleteProjectVersionCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
