import { PersonalizeEventsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../PersonalizeEventsClient";
import { PutEventsRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type PutEventsCommandInput = PutEventsRequest;
export declare type PutEventsCommandOutput = __MetadataBearer;
/**
 * <p>Records user interaction event data. For more information see <a>event-record-api</a>.</p>
 */
export declare class PutEventsCommand extends $Command<PutEventsCommandInput, PutEventsCommandOutput, PersonalizeEventsClientResolvedConfig> {
    readonly input: PutEventsCommandInput;
    constructor(input: PutEventsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: PersonalizeEventsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<PutEventsCommandInput, PutEventsCommandOutput>;
    private serialize;
    private deserialize;
}
