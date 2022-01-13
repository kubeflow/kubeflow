import { ServiceInputTypes, ServiceOutputTypes, TranslateClientResolvedConfig } from "../TranslateClient";
import { DeleteParallelDataRequest, DeleteParallelDataResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DeleteParallelDataCommandInput = DeleteParallelDataRequest;
export declare type DeleteParallelDataCommandOutput = DeleteParallelDataResponse & __MetadataBearer;
/**
 * <p>Deletes a parallel data resource in Amazon Translate.</p>
 */
export declare class DeleteParallelDataCommand extends $Command<DeleteParallelDataCommandInput, DeleteParallelDataCommandOutput, TranslateClientResolvedConfig> {
    readonly input: DeleteParallelDataCommandInput;
    constructor(input: DeleteParallelDataCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: TranslateClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteParallelDataCommandInput, DeleteParallelDataCommandOutput>;
    private serialize;
    private deserialize;
}
