import { ServiceInputTypes, ServiceOutputTypes, TranslateClientResolvedConfig } from "../TranslateClient";
import { DescribeTextTranslationJobRequest, DescribeTextTranslationJobResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeTextTranslationJobCommandInput = DescribeTextTranslationJobRequest;
export declare type DescribeTextTranslationJobCommandOutput = DescribeTextTranslationJobResponse & __MetadataBearer;
/**
 * <p>Gets the properties associated with an asycnhronous batch translation job including name,
 *       ID, status, source and target languages, input/output S3 buckets, and so on.</p>
 */
export declare class DescribeTextTranslationJobCommand extends $Command<DescribeTextTranslationJobCommandInput, DescribeTextTranslationJobCommandOutput, TranslateClientResolvedConfig> {
    readonly input: DescribeTextTranslationJobCommandInput;
    constructor(input: DescribeTextTranslationJobCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: TranslateClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeTextTranslationJobCommandInput, DescribeTextTranslationJobCommandOutput>;
    private serialize;
    private deserialize;
}
