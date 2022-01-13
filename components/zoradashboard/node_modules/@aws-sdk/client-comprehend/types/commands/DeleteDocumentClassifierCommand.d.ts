import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { DeleteDocumentClassifierRequest, DeleteDocumentClassifierResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DeleteDocumentClassifierCommandInput = DeleteDocumentClassifierRequest;
export declare type DeleteDocumentClassifierCommandOutput = DeleteDocumentClassifierResponse & __MetadataBearer;
/**
 * <p>Deletes a previously created document classifier</p>
 *          <p>Only those classifiers that are in terminated states (IN_ERROR, TRAINED) will be deleted.
 *       If an active inference job is using the model, a <code>ResourceInUseException</code> will be
 *       returned.</p>
 *          <p>This is an asynchronous action that puts the classifier into a DELETING state, and it is
 *       then removed by a background job. Once removed, the classifier disappears from your account
 *       and is no longer available for use. </p>
 */
export declare class DeleteDocumentClassifierCommand extends $Command<DeleteDocumentClassifierCommandInput, DeleteDocumentClassifierCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: DeleteDocumentClassifierCommandInput;
    constructor(input: DeleteDocumentClassifierCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteDocumentClassifierCommandInput, DeleteDocumentClassifierCommandOutput>;
    private serialize;
    private deserialize;
}
