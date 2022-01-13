import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { BatchDetectSentimentRequest, BatchDetectSentimentResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type BatchDetectSentimentCommandInput = BatchDetectSentimentRequest;
export declare type BatchDetectSentimentCommandOutput = BatchDetectSentimentResponse & __MetadataBearer;
/**
 * <p>Inspects a batch of documents and returns an inference of the prevailing sentiment,
 *         <code>POSITIVE</code>, <code>NEUTRAL</code>, <code>MIXED</code>, or <code>NEGATIVE</code>,
 *       in each one.</p>
 */
export declare class BatchDetectSentimentCommand extends $Command<BatchDetectSentimentCommandInput, BatchDetectSentimentCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: BatchDetectSentimentCommandInput;
    constructor(input: BatchDetectSentimentCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<BatchDetectSentimentCommandInput, BatchDetectSentimentCommandOutput>;
    private serialize;
    private deserialize;
}
