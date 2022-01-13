import { PollyClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../PollyClient";
import { SynthesizeSpeechInput, SynthesizeSpeechOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type SynthesizeSpeechCommandInput = SynthesizeSpeechInput;
export declare type SynthesizeSpeechCommandOutput = SynthesizeSpeechOutput & __MetadataBearer;
/**
 * <p>Synthesizes UTF-8 input, plain text or SSML, to a stream of bytes. SSML input must be
 *       valid, well-formed SSML. Some alphabets might not be available with all the voices (for
 *       example, Cyrillic might not be read at all by English voices) unless phoneme mapping is used.
 *       For more information, see <a href="https://docs.aws.amazon.com/polly/latest/dg/how-text-to-speech-works.html">How it
 *         Works</a>.</p>
 */
export declare class SynthesizeSpeechCommand extends $Command<SynthesizeSpeechCommandInput, SynthesizeSpeechCommandOutput, PollyClientResolvedConfig> {
    readonly input: SynthesizeSpeechCommandInput;
    constructor(input: SynthesizeSpeechCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: PollyClientResolvedConfig, options?: __HttpHandlerOptions): Handler<SynthesizeSpeechCommandInput, SynthesizeSpeechCommandOutput>;
    private serialize;
    private deserialize;
}
