import { Client, Command } from "@aws-sdk/smithy-client";
import { HttpRequest, MetadataBearer } from "@aws-sdk/types";
export declare function createRequest<InputTypesUnion extends object, InputType extends InputTypesUnion, OutputType extends MetadataBearer = MetadataBearer>(client: Client<any, InputTypesUnion, MetadataBearer, any>, command: Command<InputType, OutputType, any, InputTypesUnion, MetadataBearer>): Promise<HttpRequest>;
