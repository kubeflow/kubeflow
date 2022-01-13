import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { ListDocumentClassificationJobsRequest, ListDocumentClassificationJobsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListDocumentClassificationJobsCommandInput = ListDocumentClassificationJobsRequest;
export declare type ListDocumentClassificationJobsCommandOutput = ListDocumentClassificationJobsResponse & __MetadataBearer;
/**
 * <p>Gets a list of the documentation classification jobs that you have submitted.</p>
 */
export declare class ListDocumentClassificationJobsCommand extends $Command<ListDocumentClassificationJobsCommandInput, ListDocumentClassificationJobsCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: ListDocumentClassificationJobsCommandInput;
    constructor(input: ListDocumentClassificationJobsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListDocumentClassificationJobsCommandInput, ListDocumentClassificationJobsCommandOutput>;
    private serialize;
    private deserialize;
}
