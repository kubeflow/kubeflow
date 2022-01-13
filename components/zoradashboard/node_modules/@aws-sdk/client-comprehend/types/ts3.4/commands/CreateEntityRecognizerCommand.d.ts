import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { CreateEntityRecognizerRequest, CreateEntityRecognizerResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type CreateEntityRecognizerCommandInput = CreateEntityRecognizerRequest;
export declare type CreateEntityRecognizerCommandOutput = CreateEntityRecognizerResponse & __MetadataBearer;
/**
 * <p>Creates an entity recognizer using submitted files. After your
 *         <code>CreateEntityRecognizer</code> request is submitted, you can check job status using the
 *          API. </p>
 */
export declare class CreateEntityRecognizerCommand extends $Command<CreateEntityRecognizerCommandInput, CreateEntityRecognizerCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: CreateEntityRecognizerCommandInput;
    constructor(input: CreateEntityRecognizerCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CreateEntityRecognizerCommandInput, CreateEntityRecognizerCommandOutput>;
    private serialize;
    private deserialize;
}
