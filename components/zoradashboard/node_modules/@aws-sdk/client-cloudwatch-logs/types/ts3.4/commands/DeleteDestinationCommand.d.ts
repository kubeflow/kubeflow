import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { DeleteDestinationRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DeleteDestinationCommandInput = DeleteDestinationRequest;
export declare type DeleteDestinationCommandOutput = __MetadataBearer;
/**
 * <p>Deletes the specified destination, and eventually disables all the
 *       subscription filters that publish to it. This operation does not delete the
 *       physical resource encapsulated by the destination.</p>
 */
export declare class DeleteDestinationCommand extends $Command<DeleteDestinationCommandInput, DeleteDestinationCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: DeleteDestinationCommandInput;
    constructor(input: DeleteDestinationCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteDestinationCommandInput, DeleteDestinationCommandOutput>;
    private serialize;
    private deserialize;
}
