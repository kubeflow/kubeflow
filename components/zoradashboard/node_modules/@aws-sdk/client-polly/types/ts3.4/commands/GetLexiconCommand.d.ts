import { PollyClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../PollyClient";
import { GetLexiconInput, GetLexiconOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type GetLexiconCommandInput = GetLexiconInput;
export declare type GetLexiconCommandOutput = GetLexiconOutput & __MetadataBearer;
/**
 * <p>Returns the content of the specified pronunciation lexicon stored in an AWS Region. For
 *       more information, see <a href="https://docs.aws.amazon.com/polly/latest/dg/managing-lexicons.html">Managing
 *         Lexicons</a>.</p>
 */
export declare class GetLexiconCommand extends $Command<GetLexiconCommandInput, GetLexiconCommandOutput, PollyClientResolvedConfig> {
    readonly input: GetLexiconCommandInput;
    constructor(input: GetLexiconCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: PollyClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetLexiconCommandInput, GetLexiconCommandOutput>;
    private serialize;
    private deserialize;
}
