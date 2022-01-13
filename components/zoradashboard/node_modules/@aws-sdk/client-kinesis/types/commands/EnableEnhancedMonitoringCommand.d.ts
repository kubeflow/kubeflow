import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { EnableEnhancedMonitoringInput, EnhancedMonitoringOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type EnableEnhancedMonitoringCommandInput = EnableEnhancedMonitoringInput;
export declare type EnableEnhancedMonitoringCommandOutput = EnhancedMonitoringOutput & __MetadataBearer;
/**
 * <p>Enables enhanced Kinesis data stream monitoring for shard-level metrics.</p>
 */
export declare class EnableEnhancedMonitoringCommand extends $Command<EnableEnhancedMonitoringCommandInput, EnableEnhancedMonitoringCommandOutput, KinesisClientResolvedConfig> {
    readonly input: EnableEnhancedMonitoringCommandInput;
    constructor(input: EnableEnhancedMonitoringCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KinesisClientResolvedConfig, options?: __HttpHandlerOptions): Handler<EnableEnhancedMonitoringCommandInput, EnableEnhancedMonitoringCommandOutput>;
    private serialize;
    private deserialize;
}
