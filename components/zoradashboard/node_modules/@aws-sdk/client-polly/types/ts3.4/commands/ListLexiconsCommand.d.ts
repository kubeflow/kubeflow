import { PollyClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../PollyClient";
import { ListLexiconsInput, ListLexiconsOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListLexiconsCommandInput = ListLexiconsInput;
export declare type ListLexiconsCommandOutput = ListLexiconsOutput & __MetadataBearer;
/**
 * <p>Returns a list of pronunciation lexicons stored in an AWS Region. For more information,
 *       see <a href="https://docs.aws.amazon.com/polly/latest/dg/managing-lexicons.html">Managing
 *         Lexicons</a>.</p>
 */
export declare class ListLexiconsCommand extends $Command<ListLexiconsCommandInput, ListLexiconsCommandOutput, PollyClientResolvedConfig> {
    readonly input: ListLexiconsCommandInput;
    constructor(input: ListLexiconsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: PollyClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListLexiconsCommandInput, ListLexiconsCommandOutput>;
    private serialize;
    private deserialize;
}
