import { ServiceInputTypes, ServiceOutputTypes, TranslateClientResolvedConfig } from "../TranslateClient";
import { TranslateTextRequest, TranslateTextResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type TranslateTextCommandInput = TranslateTextRequest;
export declare type TranslateTextCommandOutput = TranslateTextResponse & __MetadataBearer;
/**
 * <p>Translates input text from the source language to the target language. For a list of
 *       available languages and language codes, see <a>what-is-languages</a>.</p>
 */
export declare class TranslateTextCommand extends $Command<TranslateTextCommandInput, TranslateTextCommandOutput, TranslateClientResolvedConfig> {
    readonly input: TranslateTextCommandInput;
    constructor(input: TranslateTextCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: TranslateClientResolvedConfig, options?: __HttpHandlerOptions): Handler<TranslateTextCommandInput, TranslateTextCommandOutput>;
    private serialize;
    private deserialize;
}
