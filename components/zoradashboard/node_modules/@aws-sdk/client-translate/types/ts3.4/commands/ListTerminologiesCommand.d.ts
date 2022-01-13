import { ServiceInputTypes, ServiceOutputTypes, TranslateClientResolvedConfig } from "../TranslateClient";
import { ListTerminologiesRequest, ListTerminologiesResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListTerminologiesCommandInput = ListTerminologiesRequest;
export declare type ListTerminologiesCommandOutput = ListTerminologiesResponse & __MetadataBearer;
/**
 * <p>Provides a list of custom terminologies associated with your account.</p>
 */
export declare class ListTerminologiesCommand extends $Command<ListTerminologiesCommandInput, ListTerminologiesCommandOutput, TranslateClientResolvedConfig> {
    readonly input: ListTerminologiesCommandInput;
    constructor(input: ListTerminologiesCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: TranslateClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListTerminologiesCommandInput, ListTerminologiesCommandOutput>;
    private serialize;
    private deserialize;
}
