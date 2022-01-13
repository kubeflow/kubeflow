import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { GetCelebrityInfoRequest, GetCelebrityInfoResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type GetCelebrityInfoCommandInput = GetCelebrityInfoRequest;
export declare type GetCelebrityInfoCommandOutput = GetCelebrityInfoResponse & __MetadataBearer;
/**
 * <p>Gets the name and additional information about a celebrity based on his or her
 *       Amazon Rekognition ID. The additional information is returned as an array of URLs. If there is no
 *       additional information about the celebrity, this list is empty.</p>
 *
 *          <p>For more information, see Recognizing Celebrities in an Image in
 *       the Amazon Rekognition Developer Guide.</p>
 *          <p>This operation requires permissions to perform the
 *         <code>rekognition:GetCelebrityInfo</code> action. </p>
 */
export declare class GetCelebrityInfoCommand extends $Command<GetCelebrityInfoCommandInput, GetCelebrityInfoCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: GetCelebrityInfoCommandInput;
    constructor(input: GetCelebrityInfoCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetCelebrityInfoCommandInput, GetCelebrityInfoCommandOutput>;
    private serialize;
    private deserialize;
}
