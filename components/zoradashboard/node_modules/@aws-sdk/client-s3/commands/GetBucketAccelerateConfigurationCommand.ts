import { S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../S3Client";
import { GetBucketAccelerateConfigurationOutput, GetBucketAccelerateConfigurationRequest } from "../models/models_0";
import {
  deserializeAws_restXmlGetBucketAccelerateConfigurationCommand,
  serializeAws_restXmlGetBucketAccelerateConfigurationCommand,
} from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
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

export type GetBucketAccelerateConfigurationCommandInput = GetBucketAccelerateConfigurationRequest;
export type GetBucketAccelerateConfigurationCommandOutput = GetBucketAccelerateConfigurationOutput & __MetadataBearer;

/**
 * <p>This implementation of the GET operation uses the <code>accelerate</code> subresource to
 *          return the Transfer Acceleration state of a bucket, which is either <code>Enabled</code> or
 *             <code>Suspended</code>. Amazon S3 Transfer Acceleration is a bucket-level feature that
 *          enables you to perform faster data transfers to and from Amazon S3.</p>
 *          <p>To use this operation, you must have permission to perform the
 *             <code>s3:GetAccelerateConfiguration</code> action. The bucket owner has this permission
 *          by default. The bucket owner can grant this permission to others. For more information
 *          about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to your Amazon S3
 *             Resources</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
 *          <p>You set the Transfer Acceleration state of an existing bucket to <code>Enabled</code> or
 *             <code>Suspended</code> by using the <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketAccelerateConfiguration.html">PutBucketAccelerateConfiguration</a> operation. </p>
 *          <p>A GET <code>accelerate</code> request does not return a state value for a bucket that
 *          has no transfer acceleration state. A bucket has no Transfer Acceleration state if a state
 *          has never been set on the bucket. </p>
 *
 *          <p>For more information about transfer acceleration, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html">Transfer Acceleration</a> in the
 *          Amazon Simple Storage Service Developer Guide.</p>
 *          <p class="title">
 *             <b>Related Resources</b>
 *          </p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketAccelerateConfiguration.html">PutBucketAccelerateConfiguration</a>
 *                </p>
 *             </li>
 *          </ul>
 */
export class GetBucketAccelerateConfigurationCommand extends $Command<
  GetBucketAccelerateConfigurationCommandInput,
  GetBucketAccelerateConfigurationCommandOutput,
  S3ClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetBucketAccelerateConfigurationCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: S3ClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<GetBucketAccelerateConfigurationCommandInput, GetBucketAccelerateConfigurationCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
    this.middlewareStack.use(getBucketEndpointPlugin(configuration));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "S3Client";
    const commandName = "GetBucketAccelerateConfigurationCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: GetBucketAccelerateConfigurationRequest.filterSensitiveLog,
      outputFilterSensitiveLog: GetBucketAccelerateConfigurationOutput.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: GetBucketAccelerateConfigurationCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restXmlGetBucketAccelerateConfigurationCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GetBucketAccelerateConfigurationCommandOutput> {
    return deserializeAws_restXmlGetBucketAccelerateConfigurationCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
