import { PollyClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../PollyClient";
import { DescribeVoicesInput, DescribeVoicesOutput } from "../models/models_0";
import {
  deserializeAws_restJson1DescribeVoicesCommand,
  serializeAws_restJson1DescribeVoicesCommand,
} from "../protocols/Aws_restJson1";
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

export type DescribeVoicesCommandInput = DescribeVoicesInput;
export type DescribeVoicesCommandOutput = DescribeVoicesOutput & __MetadataBearer;

/**
 * <p>Returns the list of voices that are available for use when requesting speech synthesis.
 *       Each voice speaks a specified language, is either male or female, and is identified by an ID,
 *       which is the ASCII version of the voice name. </p>
 *
 *          <p>When synthesizing speech ( <code>SynthesizeSpeech</code> ), you provide the voice ID
 *       for the voice you want from the list of voices returned by
 *       <code>DescribeVoices</code>.</p>
 *
 *          <p>For example, you want your news reader application to read news in a specific language,
 *       but giving a user the option to choose the voice. Using the <code>DescribeVoices</code>
 *       operation you can provide the user with a list of available voices to select from.</p>
 *
 *          <p> You can optionally specify a language code to filter the available voices. For
 *       example, if you specify <code>en-US</code>, the operation returns a list of all available US
 *       English voices. </p>
 *          <p>This operation requires permissions to perform the <code>polly:DescribeVoices</code>
 *       action.</p>
 */
export class DescribeVoicesCommand extends $Command<
  DescribeVoicesCommandInput,
  DescribeVoicesCommandOutput,
  PollyClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: DescribeVoicesCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: PollyClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<DescribeVoicesCommandInput, DescribeVoicesCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "PollyClient";
    const commandName = "DescribeVoicesCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: DescribeVoicesInput.filterSensitiveLog,
      outputFilterSensitiveLog: DescribeVoicesOutput.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: DescribeVoicesCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_restJson1DescribeVoicesCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<DescribeVoicesCommandOutput> {
    return deserializeAws_restJson1DescribeVoicesCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
