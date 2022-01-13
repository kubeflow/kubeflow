import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { ClassifyDocumentRequest, ClassifyDocumentResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ClassifyDocumentCommandInput = ClassifyDocumentRequest;
export declare type ClassifyDocumentCommandOutput = ClassifyDocumentResponse & __MetadataBearer;
/**
 * <p>Creates a new document classification request to analyze a single document in real-time,
 *       using a previously created and trained custom model and an endpoint.</p>
 */
export declare class ClassifyDocumentCommand extends $Command<ClassifyDocumentCommandInput, ClassifyDocumentCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: ClassifyDocumentCommandInput;
    constructor(input: ClassifyDocumentCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ClassifyDocumentCommandInput, ClassifyDocumentCommandOutput>;
    private serialize;
    private deserialize;
}
