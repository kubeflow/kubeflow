import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { BatchDetectDominantLanguageRequest, BatchDetectDominantLanguageResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type BatchDetectDominantLanguageCommandInput = BatchDetectDominantLanguageRequest;
export declare type BatchDetectDominantLanguageCommandOutput = BatchDetectDominantLanguageResponse & __MetadataBearer;
/**
 * <p>Determines the dominant language of the input text for a batch of documents. For a list
 *       of languages that Amazon Comprehend can detect, see <a href="https://docs.aws.amazon.com/comprehend/latest/dg/how-languages.html">Amazon Comprehend Supported Languages</a>.
 *     </p>
 */
export declare class BatchDetectDominantLanguageCommand extends $Command<BatchDetectDominantLanguageCommandInput, BatchDetectDominantLanguageCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: BatchDetectDominantLanguageCommandInput;
    constructor(input: BatchDetectDominantLanguageCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<BatchDetectDominantLanguageCommandInput, BatchDetectDominantLanguageCommandOutput>;
    private serialize;
    private deserialize;
}
