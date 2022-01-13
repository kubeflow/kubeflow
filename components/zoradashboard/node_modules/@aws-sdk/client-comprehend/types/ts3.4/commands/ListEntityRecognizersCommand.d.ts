import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { ListEntityRecognizersRequest, ListEntityRecognizersResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListEntityRecognizersCommandInput = ListEntityRecognizersRequest;
export declare type ListEntityRecognizersCommandOutput = ListEntityRecognizersResponse & __MetadataBearer;
/**
 * <p>Gets a list of the properties of all entity recognizers that you created, including
 *       recognizers currently in training. Allows you to filter the list of recognizers based on
 *       criteria such as status and submission time. This call returns up to 500 entity recognizers in
 *       the list, with a default number of 100 recognizers in the list.</p>
 *          <p>The results of this list are not in any particular order. Please get the list and sort
 *       locally if needed.</p>
 */
export declare class ListEntityRecognizersCommand extends $Command<ListEntityRecognizersCommandInput, ListEntityRecognizersCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: ListEntityRecognizersCommandInput;
    constructor(input: ListEntityRecognizersCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListEntityRecognizersCommandInput, ListEntityRecognizersCommandOutput>;
    private serialize;
    private deserialize;
}
