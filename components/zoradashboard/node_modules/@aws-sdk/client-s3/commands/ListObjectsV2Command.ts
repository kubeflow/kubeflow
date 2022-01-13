import { S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../S3Client";
import { ListObjectsV2Output, ListObjectsV2Request } from "../models/models_0";
import {
  deserializeAws_restXmlListObjectsV2Command,
  serializeAws_restXmlListObjectsV2Command,
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

export type ListObjectsV2CommandInput = ListObjectsV2Request;
export type ListObjectsV2CommandOutput = ListObjectsV2Output & __MetadataBearer;

/**
 * <p>Returns some or all (up to 1,000) of the objects in a bucket. You can use the request
 *          parameters as selection criteria to return a subset of the objects in a bucket. A <code>200
 *             OK</code> response can contain valid or invalid XML. Make sure to design your
 *          application to parse the contents of the response and handle it appropriately.</p>
 *
 *          <p>To use this operation, you must have READ access to the bucket.</p>
 *
 *          <p>To use this operation in an AWS Identity and Access Management (IAM) policy, you must
 *          have permissions to perform the <code>s3:ListBucket</code> action. The bucket owner has
 *          this permission by default and can grant this permission to others. For more information
 *          about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
 *             Resources</a>.</p>
 *          <important>
 *             <p>This section describes the latest revision of the API. We recommend that you use this
 *             revised API for application development. For backward compatibility, Amazon S3 continues to
 *             support the prior version of this API, <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjects.html">ListObjects</a>.</p>
 *          </important>
 *
 *          <p>To get a list of your buckets, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBuckets.html">ListBuckets</a>.</p>
 *
 *          <p>The following operations are related to <code>ListObjectsV2</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html">GetObject</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html">PutObject</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>
 *                </p>
 *             </li>
 *          </ul>
 */
export class ListObjectsV2Command extends $Command<
  ListObjectsV2CommandInput,
  ListObjectsV2CommandOutput,
  S3ClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ListObjectsV2CommandInput) {
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
  ): Handler<ListObjectsV2CommandInput, ListObjectsV2CommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
    this.middlewareStack.use(getBucketEndpointPlugin(configuration));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "S3Client";
    const commandName = "ListObjectsV2Command";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: ListObjectsV2Request.filterSensitiveLog,
      outputFilterSensitiveLog: ListObjectsV2Output.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: ListObjectsV2CommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_restXmlListObjectsV2Command(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<ListObjectsV2CommandOutput> {
    return deserializeAws_restXmlListObjectsV2Command(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
