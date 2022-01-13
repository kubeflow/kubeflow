import { S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../S3Client";
import { ListObjectVersionsOutput, ListObjectVersionsRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListObjectVersionsCommandInput = ListObjectVersionsRequest;
export declare type ListObjectVersionsCommandOutput = ListObjectVersionsOutput & __MetadataBearer;
/**
 * <p>Returns metadata about all versions of the objects in a bucket. You can also use request
 *          parameters as selection criteria to return metadata about a subset of all the object
 *          versions. </p>
 *          <note>
 *             <p> A 200 OK response can contain valid or invalid XML. Make sure to design your
 *             application to parse the contents of the response and handle it appropriately.</p>
 *          </note>
 *          <p>To use this operation, you must have READ access to the bucket.</p>
 *          <p>This action is not supported by Amazon S3 on Outposts.</p>
 *          <p>The following operations are related to
 *             <code>ListObjectVersions</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjectsV2.html">ListObjectsV2</a>
 *                </p>
 *             </li>
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
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObject.html">DeleteObject</a>
 *                </p>
 *             </li>
 *          </ul>
 */
export declare class ListObjectVersionsCommand extends $Command<ListObjectVersionsCommandInput, ListObjectVersionsCommandOutput, S3ClientResolvedConfig> {
    readonly input: ListObjectVersionsCommandInput;
    constructor(input: ListObjectVersionsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: S3ClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListObjectVersionsCommandInput, ListObjectVersionsCommandOutput>;
    private serialize;
    private deserialize;
}
