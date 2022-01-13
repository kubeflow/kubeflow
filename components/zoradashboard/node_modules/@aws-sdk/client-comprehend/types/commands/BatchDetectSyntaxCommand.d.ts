import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { BatchDetectSyntaxRequest, BatchDetectSyntaxResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type BatchDetectSyntaxCommandInput = BatchDetectSyntaxRequest;
export declare type BatchDetectSyntaxCommandOutput = BatchDetectSyntaxResponse & __MetadataBearer;
/**
 * <p>Inspects the text of a batch of documents for the syntax and part of speech of the words
 *       in the document and returns information about them. For more information, see <a>how-syntax</a>.</p>
 */
export declare class BatchDetectSyntaxCommand extends $Command<BatchDetectSyntaxCommandInput, BatchDetectSyntaxCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: BatchDetectSyntaxCommandInput;
    constructor(input: BatchDetectSyntaxCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<BatchDetectSyntaxCommandInput, BatchDetectSyntaxCommandOutput>;
    private serialize;
    private deserialize;
}
