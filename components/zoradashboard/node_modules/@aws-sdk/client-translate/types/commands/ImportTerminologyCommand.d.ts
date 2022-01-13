import { ServiceInputTypes, ServiceOutputTypes, TranslateClientResolvedConfig } from "../TranslateClient";
import { ImportTerminologyRequest, ImportTerminologyResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ImportTerminologyCommandInput = ImportTerminologyRequest;
export declare type ImportTerminologyCommandOutput = ImportTerminologyResponse & __MetadataBearer;
/**
 * <p>Creates or updates a custom terminology, depending on whether or not one already exists
 *       for the given terminology name. Importing a terminology with the same name as an existing one
 *       will merge the terminologies based on the chosen merge strategy. Currently, the only supported
 *       merge strategy is OVERWRITE, and so the imported terminology will overwrite an existing
 *       terminology of the same name.</p>
 *          <p>If you import a terminology that overwrites an existing one, the new terminology take up
 *       to 10 minutes to fully propagate and be available for use in a translation due to cache
 *       policies with the DataPlane service that performs the translations.</p>
 */
export declare class ImportTerminologyCommand extends $Command<ImportTerminologyCommandInput, ImportTerminologyCommandOutput, TranslateClientResolvedConfig> {
    readonly input: ImportTerminologyCommandInput;
    constructor(input: ImportTerminologyCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: TranslateClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ImportTerminologyCommandInput, ImportTerminologyCommandOutput>;
    private serialize;
    private deserialize;
}
