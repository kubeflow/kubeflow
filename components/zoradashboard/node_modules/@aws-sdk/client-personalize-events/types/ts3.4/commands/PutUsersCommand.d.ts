import { PersonalizeEventsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../PersonalizeEventsClient";
import { PutUsersRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type PutUsersCommandInput = PutUsersRequest;
export declare type PutUsersCommandOutput = __MetadataBearer;
/**
 * <p>Adds one or more users to a Users dataset. For more information see
 *       <a>importing-users</a>.</p>
 */
export declare class PutUsersCommand extends $Command<PutUsersCommandInput, PutUsersCommandOutput, PersonalizeEventsClientResolvedConfig> {
    readonly input: PutUsersCommandInput;
    constructor(input: PutUsersCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: PersonalizeEventsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<PutUsersCommandInput, PutUsersCommandOutput>;
    private serialize;
    private deserialize;
}
