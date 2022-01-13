import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { CreateStreamProcessorRequest, CreateStreamProcessorResponse } from "../models/models_0";
import {
  deserializeAws_json1_1CreateStreamProcessorCommand,
  serializeAws_json1_1CreateStreamProcessorCommand,
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

export type CreateStreamProcessorCommandInput = CreateStreamProcessorRequest;
export type CreateStreamProcessorCommandOutput = CreateStreamProcessorResponse & __MetadataBearer;

/**
 * <p>Creates an Amazon Rekognition stream processor that you can use to detect and recognize faces in a streaming video.</p>
 *         <p>Amazon Rekognition Video is a consumer of live video from Amazon Kinesis Video Streams. Amazon Rekognition Video sends analysis results to Amazon Kinesis Data Streams.</p>
 *         <p>You provide as input a Kinesis video stream (<code>Input</code>) and a Kinesis data stream (<code>Output</code>) stream. You also specify the
 *             face recognition criteria in <code>Settings</code>. For example, the collection containing faces that you want to recognize.
 *             Use <code>Name</code> to assign an identifier for the stream processor. You use <code>Name</code>
 *             to manage the stream processor. For example, you can start processing the source video by calling <a>StartStreamProcessor</a> with
 *             the <code>Name</code> field. </p>
 *         <p>After you have finished analyzing a streaming video, use <a>StopStreamProcessor</a> to
 *         stop processing. You can delete the stream processor by calling <a>DeleteStreamProcessor</a>.</p>
 */
export class CreateStreamProcessorCommand extends $Command<
  CreateStreamProcessorCommandInput,
  CreateStreamProcessorCommandOutput,
  RekognitionClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CreateStreamProcessorCommandInput) {
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
  ): Handler<CreateStreamProcessorCommandInput, CreateStreamProcessorCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "RekognitionClient";
    const commandName = "CreateStreamProcessorCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: CreateStreamProcessorRequest.filterSensitiveLog,
      outputFilterSensitiveLog: CreateStreamProcessorResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: CreateStreamProcessorCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1CreateStreamProcessorCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<CreateStreamProcessorCommandOutput> {
    return deserializeAws_json1_1CreateStreamProcessorCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
