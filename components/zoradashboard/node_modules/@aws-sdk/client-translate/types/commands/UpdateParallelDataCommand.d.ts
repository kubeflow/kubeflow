import { ServiceInputTypes, ServiceOutputTypes, TranslateClientResolvedConfig } from "../TranslateClient";
import { UpdateParallelDataRequest, UpdateParallelDataResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type UpdateParallelDataCommandInput = UpdateParallelDataRequest;
export declare type UpdateParallelDataCommandOutput = UpdateParallelDataResponse & __MetadataBearer;
/**
 * <p>Updates a previously created parallel data resource by importing a new input file from
 *       Amazon S3.</p>
 */
export declare class UpdateParallelDataCommand extends $Command<UpdateParallelDataCommandInput, UpdateParallelDataCommandOutput, TranslateClientResolvedConfig> {
    readonly input: UpdateParallelDataCommandInput;
    constructor(input: UpdateParallelDataCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: TranslateClientResolvedConfig, options?: __HttpHandlerOptions): Handler<UpdateParallelDataCommandInput, UpdateParallelDataCommandOutput>;
    private serialize;
    private deserialize;
}
