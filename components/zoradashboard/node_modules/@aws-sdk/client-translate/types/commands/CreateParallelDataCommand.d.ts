import { ServiceInputTypes, ServiceOutputTypes, TranslateClientResolvedConfig } from "../TranslateClient";
import { CreateParallelDataRequest, CreateParallelDataResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type CreateParallelDataCommandInput = CreateParallelDataRequest;
export declare type CreateParallelDataCommandOutput = CreateParallelDataResponse & __MetadataBearer;
/**
 * <p>Creates a parallel data resource in Amazon Translate by importing an input file from
 *       Amazon S3. Parallel data files contain examples of source phrases and their translations from
 *       your translation memory. By adding parallel data, you can influence the style, tone, and word
 *       choice in your translation output.</p>
 */
export declare class CreateParallelDataCommand extends $Command<CreateParallelDataCommandInput, CreateParallelDataCommandOutput, TranslateClientResolvedConfig> {
    readonly input: CreateParallelDataCommandInput;
    constructor(input: CreateParallelDataCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: TranslateClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CreateParallelDataCommandInput, CreateParallelDataCommandOutput>;
    private serialize;
    private deserialize;
}
