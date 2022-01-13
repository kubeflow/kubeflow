import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { BatchDetectKeyPhrasesRequest, BatchDetectKeyPhrasesResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type BatchDetectKeyPhrasesCommandInput = BatchDetectKeyPhrasesRequest;
export declare type BatchDetectKeyPhrasesCommandOutput = BatchDetectKeyPhrasesResponse & __MetadataBearer;
/**
 * <p>Detects the key noun phrases found in a batch of documents.</p>
 */
export declare class BatchDetectKeyPhrasesCommand extends $Command<BatchDetectKeyPhrasesCommandInput, BatchDetectKeyPhrasesCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: BatchDetectKeyPhrasesCommandInput;
    constructor(input: BatchDetectKeyPhrasesCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<BatchDetectKeyPhrasesCommandInput, BatchDetectKeyPhrasesCommandOutput>;
    private serialize;
    private deserialize;
}
