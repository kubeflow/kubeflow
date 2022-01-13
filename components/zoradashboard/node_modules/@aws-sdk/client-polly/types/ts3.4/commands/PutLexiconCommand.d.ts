import { PollyClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../PollyClient";
import { PutLexiconInput, PutLexiconOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type PutLexiconCommandInput = PutLexiconInput;
export declare type PutLexiconCommandOutput = PutLexiconOutput & __MetadataBearer;
/**
 * <p>Stores a pronunciation lexicon in an AWS Region. If a lexicon with the same name
 *       already exists in the region, it is overwritten by the new lexicon. Lexicon operations have
 *       eventual consistency, therefore, it might take some time before the lexicon is available to
 *       the SynthesizeSpeech operation.</p>
 *          <p>For more information, see <a href="https://docs.aws.amazon.com/polly/latest/dg/managing-lexicons.html">Managing
 *         Lexicons</a>.</p>
 */
export declare class PutLexiconCommand extends $Command<PutLexiconCommandInput, PutLexiconCommandOutput, PollyClientResolvedConfig> {
    readonly input: PutLexiconCommandInput;
    constructor(input: PutLexiconCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: PollyClientResolvedConfig, options?: __HttpHandlerOptions): Handler<PutLexiconCommandInput, PutLexiconCommandOutput>;
    private serialize;
    private deserialize;
}
