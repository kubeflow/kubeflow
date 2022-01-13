import { ServiceInputTypes, ServiceOutputTypes, TranslateClientResolvedConfig } from "../TranslateClient";
import { ListParallelDataRequest, ListParallelDataResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListParallelDataCommandInput = ListParallelDataRequest;
export declare type ListParallelDataCommandOutput = ListParallelDataResponse & __MetadataBearer;
/**
 * <p>Provides a list of your parallel data resources in Amazon Translate.</p>
 */
export declare class ListParallelDataCommand extends $Command<ListParallelDataCommandInput, ListParallelDataCommandOutput, TranslateClientResolvedConfig> {
    readonly input: ListParallelDataCommandInput;
    constructor(input: ListParallelDataCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: TranslateClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListParallelDataCommandInput, ListParallelDataCommandOutput>;
    private serialize;
    private deserialize;
}
