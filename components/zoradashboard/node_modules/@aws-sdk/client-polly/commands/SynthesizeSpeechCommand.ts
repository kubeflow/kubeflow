import { PollyClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../PollyClient";
import { SynthesizeSpeechInput, SynthesizeSpeechOutput } from "../models/models_0";
import {
  deserializeAws_restJson1SynthesizeSpeechCommand,
  serializeAws_restJson1SynthesizeSpeechCommand,
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

export type SynthesizeSpeechCommandInput = SynthesizeSpeechInput;
export type SynthesizeSpeechCommandOutput = SynthesizeSpeechOutput & __MetadataBearer;

/**
 * <p>Synthesizes UTF-8 input, plain text or SSML, to a stream of bytes. SSML input must be
 *       valid, well-formed SSML. Some alphabets might not be available with all the voices (for
 *       example, Cyrillic might not be read at all by English voices) unless phoneme mapping is used.
 *       For more information, see <a href="https://docs.aws.amazon.com/polly/latest/dg/how-text-to-speech-works.html">How it
 *         Works</a>.</p>
 */
export class SynthesizeSpeechCommand extends $Command<
  SynthesizeSpeechCommandInput,
  SynthesizeSpeechCommandOutput,
  PollyClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: SynthesizeSpeechCommandInput) {
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
  ): Handler<SynthesizeSpeechCommandInput, SynthesizeSpeechCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "PollyClient";
    const commandName = "SynthesizeSpeechCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: SynthesizeSpeechInput.filterSensitiveLog,
      outputFilterSensitiveLog: SynthesizeSpeechOutput.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: SynthesizeSpeechCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_restJson1SynthesizeSpeechCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<SynthesizeSpeechCommandOutput> {
    return deserializeAws_restJson1SynthesizeSpeechCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
