import { ServiceInputTypes, ServiceOutputTypes, TranslateClientResolvedConfig } from "../TranslateClient";
import { ListTextTranslationJobsRequest, ListTextTranslationJobsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListTextTranslationJobsCommandInput = ListTextTranslationJobsRequest;
export declare type ListTextTranslationJobsCommandOutput = ListTextTranslationJobsResponse & __MetadataBearer;
/**
 * <p>Gets a list of the batch translation jobs that you have submitted.</p>
 */
export declare class ListTextTranslationJobsCommand extends $Command<ListTextTranslationJobsCommandInput, ListTextTranslationJobsCommandOutput, TranslateClientResolvedConfig> {
    readonly input: ListTextTranslationJobsCommandInput;
    constructor(input: ListTextTranslationJobsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: TranslateClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListTextTranslationJobsCommandInput, ListTextTranslationJobsCommandOutput>;
    private serialize;
    private deserialize;
}
