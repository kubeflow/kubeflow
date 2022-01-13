import { ServiceInputTypes, ServiceOutputTypes, TranslateClientResolvedConfig } from "../TranslateClient";
import { GetTerminologyRequest, GetTerminologyResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type GetTerminologyCommandInput = GetTerminologyRequest;
export declare type GetTerminologyCommandOutput = GetTerminologyResponse & __MetadataBearer;
/**
 * <p>Retrieves a custom terminology.</p>
 */
export declare class GetTerminologyCommand extends $Command<GetTerminologyCommandInput, GetTerminologyCommandOutput, TranslateClientResolvedConfig> {
    readonly input: GetTerminologyCommandInput;
    constructor(input: GetTerminologyCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: TranslateClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetTerminologyCommandInput, GetTerminologyCommandOutput>;
    private serialize;
    private deserialize;
}
