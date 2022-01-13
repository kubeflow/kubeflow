import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { DetectDominantLanguageRequest, DetectDominantLanguageResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DetectDominantLanguageCommandInput = DetectDominantLanguageRequest;
export declare type DetectDominantLanguageCommandOutput = DetectDominantLanguageResponse & __MetadataBearer;
/**
 * <p>Determines the dominant language of the input text. For a list of languages that Amazon
 *       Comprehend can detect, see <a href="https://docs.aws.amazon.com/comprehend/latest/dg/how-languages.html">Amazon Comprehend Supported Languages</a>. </p>
 */
export declare class DetectDominantLanguageCommand extends $Command<DetectDominantLanguageCommandInput, DetectDominantLanguageCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: DetectDominantLanguageCommandInput;
    constructor(input: DetectDominantLanguageCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DetectDominantLanguageCommandInput, DetectDominantLanguageCommandOutput>;
    private serialize;
    private deserialize;
}
