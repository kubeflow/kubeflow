import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { DetectKeyPhrasesRequest, DetectKeyPhrasesResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DetectKeyPhrasesCommandInput = DetectKeyPhrasesRequest;
export declare type DetectKeyPhrasesCommandOutput = DetectKeyPhrasesResponse & __MetadataBearer;
/**
 * <p>Detects the key noun phrases found in the text. </p>
 */
export declare class DetectKeyPhrasesCommand extends $Command<DetectKeyPhrasesCommandInput, DetectKeyPhrasesCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: DetectKeyPhrasesCommandInput;
    constructor(input: DetectKeyPhrasesCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DetectKeyPhrasesCommandInput, DetectKeyPhrasesCommandOutput>;
    private serialize;
    private deserialize;
}
