import { ServiceInputTypes, ServiceOutputTypes, TranslateClientResolvedConfig } from "../TranslateClient";
import { GetParallelDataRequest, GetParallelDataResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type GetParallelDataCommandInput = GetParallelDataRequest;
export declare type GetParallelDataCommandOutput = GetParallelDataResponse & __MetadataBearer;
/**
 * <p>Provides information about a parallel data resource.</p>
 */
export declare class GetParallelDataCommand extends $Command<GetParallelDataCommandInput, GetParallelDataCommandOutput, TranslateClientResolvedConfig> {
    readonly input: GetParallelDataCommandInput;
    constructor(input: GetParallelDataCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: TranslateClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetParallelDataCommandInput, GetParallelDataCommandOutput>;
    private serialize;
    private deserialize;
}
