import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { DisableEnhancedMonitoringInput, EnhancedMonitoringOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DisableEnhancedMonitoringCommandInput = DisableEnhancedMonitoringInput;
export declare type DisableEnhancedMonitoringCommandOutput = EnhancedMonitoringOutput & __MetadataBearer;
/**
 * <p>Disables enhanced monitoring.</p>
 */
export declare class DisableEnhancedMonitoringCommand extends $Command<DisableEnhancedMonitoringCommandInput, DisableEnhancedMonitoringCommandOutput, KinesisClientResolvedConfig> {
    readonly input: DisableEnhancedMonitoringCommandInput;
    constructor(input: DisableEnhancedMonitoringCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KinesisClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DisableEnhancedMonitoringCommandInput, DisableEnhancedMonitoringCommandOutput>;
    private serialize;
    private deserialize;
}
