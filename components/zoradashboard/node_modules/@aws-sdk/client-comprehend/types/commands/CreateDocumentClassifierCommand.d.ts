import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { CreateDocumentClassifierRequest, CreateDocumentClassifierResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type CreateDocumentClassifierCommandInput = CreateDocumentClassifierRequest;
export declare type CreateDocumentClassifierCommandOutput = CreateDocumentClassifierResponse & __MetadataBearer;
/**
 * <p>Creates a new document classifier that you can use to categorize documents. To create a
 *       classifier, you provide a set of training documents that labeled with the categories that you
 *       want to use. After the classifier is trained you can use it to categorize a set of labeled
 *       documents into the categories. For more information, see <a>how-document-classification</a>.</p>
 */
export declare class CreateDocumentClassifierCommand extends $Command<CreateDocumentClassifierCommandInput, CreateDocumentClassifierCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: CreateDocumentClassifierCommandInput;
    constructor(input: CreateDocumentClassifierCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CreateDocumentClassifierCommandInput, CreateDocumentClassifierCommandOutput>;
    private serialize;
    private deserialize;
}
