import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { DetectSyntaxRequest, DetectSyntaxResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DetectSyntaxCommandInput = DetectSyntaxRequest;
export declare type DetectSyntaxCommandOutput = DetectSyntaxResponse & __MetadataBearer;
/**
 * <p>Inspects text for syntax and the part of speech of words in the document. For more
 *       information, <a>how-syntax</a>.</p>
 */
export declare class DetectSyntaxCommand extends $Command<DetectSyntaxCommandInput, DetectSyntaxCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: DetectSyntaxCommandInput;
    constructor(input: DetectSyntaxCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DetectSyntaxCommandInput, DetectSyntaxCommandOutput>;
    private serialize;
    private deserialize;
}
