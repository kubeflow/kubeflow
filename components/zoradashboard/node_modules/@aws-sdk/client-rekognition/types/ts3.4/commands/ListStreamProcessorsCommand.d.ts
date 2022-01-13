import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { ListStreamProcessorsRequest, ListStreamProcessorsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListStreamProcessorsCommandInput = ListStreamProcessorsRequest;
export declare type ListStreamProcessorsCommandOutput = ListStreamProcessorsResponse & __MetadataBearer;
/**
 * <p>Gets a list of stream processors that you have created with <a>CreateStreamProcessor</a>. </p>
 */
export declare class ListStreamProcessorsCommand extends $Command<ListStreamProcessorsCommandInput, ListStreamProcessorsCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: ListStreamProcessorsCommandInput;
    constructor(input: ListStreamProcessorsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListStreamProcessorsCommandInput, ListStreamProcessorsCommandOutput>;
    private serialize;
    private deserialize;
}
