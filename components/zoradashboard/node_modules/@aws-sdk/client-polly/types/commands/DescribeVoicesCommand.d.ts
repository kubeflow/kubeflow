import { PollyClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../PollyClient";
import { DescribeVoicesInput, DescribeVoicesOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeVoicesCommandInput = DescribeVoicesInput;
export declare type DescribeVoicesCommandOutput = DescribeVoicesOutput & __MetadataBearer;
/**
 * <p>Returns the list of voices that are available for use when requesting speech synthesis.
 *       Each voice speaks a specified language, is either male or female, and is identified by an ID,
 *       which is the ASCII version of the voice name. </p>
 *
 *          <p>When synthesizing speech ( <code>SynthesizeSpeech</code> ), you provide the voice ID
 *       for the voice you want from the list of voices returned by
 *       <code>DescribeVoices</code>.</p>
 *
 *          <p>For example, you want your news reader application to read news in a specific language,
 *       but giving a user the option to choose the voice. Using the <code>DescribeVoices</code>
 *       operation you can provide the user with a list of available voices to select from.</p>
 *
 *          <p> You can optionally specify a language code to filter the available voices. For
 *       example, if you specify <code>en-US</code>, the operation returns a list of all available US
 *       English voices. </p>
 *          <p>This operation requires permissions to perform the <code>polly:DescribeVoices</code>
 *       action.</p>
 */
export declare class DescribeVoicesCommand extends $Command<DescribeVoicesCommandInput, DescribeVoicesCommandOutput, PollyClientResolvedConfig> {
    readonly input: DescribeVoicesCommandInput;
    constructor(input: DescribeVoicesCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: PollyClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeVoicesCommandInput, DescribeVoicesCommandOutput>;
    private serialize;
    private deserialize;
}
