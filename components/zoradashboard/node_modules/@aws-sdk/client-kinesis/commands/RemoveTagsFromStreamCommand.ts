import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { RemoveTagsFromStreamInput } from "../models/models_0";
import {
  deserializeAws_json1_1RemoveTagsFromStreamCommand,
  serializeAws_json1_1RemoveTagsFromStreamCommand,
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

export type RemoveTagsFromStreamCommandInput = RemoveTagsFromStreamInput;
export type RemoveTagsFromStreamCommandOutput = __MetadataBearer;

/**
 * <p>Removes tags from the specified Kinesis data stream. Removed tags are deleted and
 *             cannot be recovered after this operation successfully completes.</p>
 *         <p>If you specify a tag that does not exist, it is ignored.</p>
 *         <p>
 *             <a>RemoveTagsFromStream</a> has a limit of five transactions per second per
 *             account.</p>
 */
export class RemoveTagsFromStreamCommand extends $Command<
  RemoveTagsFromStreamCommandInput,
  RemoveTagsFromStreamCommandOutput,
  KinesisClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: RemoveTagsFromStreamCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: KinesisClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<RemoveTagsFromStreamCommandInput, RemoveTagsFromStreamCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "KinesisClient";
    const commandName = "RemoveTagsFromStreamCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: RemoveTagsFromStreamInput.filterSensitiveLog,
      outputFilterSensitiveLog: (output: any) => output,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: RemoveTagsFromStreamCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1RemoveTagsFromStreamCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<RemoveTagsFromStreamCommandOutput> {
    return deserializeAws_json1_1RemoveTagsFromStreamCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
