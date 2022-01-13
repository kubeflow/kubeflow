import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { DeleteEntityRecognizerRequest, DeleteEntityRecognizerResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DeleteEntityRecognizerCommandInput = DeleteEntityRecognizerRequest;
export declare type DeleteEntityRecognizerCommandOutput = DeleteEntityRecognizerResponse & __MetadataBearer;
/**
 * <p>Deletes an entity recognizer.</p>
 *          <p>Only those recognizers that are in terminated states (IN_ERROR, TRAINED) will be deleted.
 *       If an active inference job is using the model, a <code>ResourceInUseException</code> will be
 *       returned.</p>
 *          <p>This is an asynchronous action that puts the recognizer into a DELETING state, and it is
 *       then removed by a background job. Once removed, the recognizer disappears from your account
 *       and is no longer available for use. </p>
 */
export declare class DeleteEntityRecognizerCommand extends $Command<DeleteEntityRecognizerCommandInput, DeleteEntityRecognizerCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: DeleteEntityRecognizerCommandInput;
    constructor(input: DeleteEntityRecognizerCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteEntityRecognizerCommandInput, DeleteEntityRecognizerCommandOutput>;
    private serialize;
    private deserialize;
}
