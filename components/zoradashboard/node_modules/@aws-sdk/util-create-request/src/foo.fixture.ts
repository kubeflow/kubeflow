import { constructStack } from "@aws-sdk/middleware-stack";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { Client, Command } from "@aws-sdk/smithy-client";
import { MetadataBearer, MiddlewareStack } from "@aws-sdk/types";

export interface OperationInput {
  String: string;
}

export type InputTypesUnion = OperationInput;

export interface OperationOutput extends MetadataBearer {
  Data: string;
  $metadata: {};
}

export type OutputTypesUnion = OperationOutput;

const output: OperationOutput = { Data: "data", $metadata: {} };

const input: OperationInput = { String: "input" };

export const fooClient: Client<any, InputTypesUnion, OutputTypesUnion, any> = {
  config: {},
  middlewareStack: constructStack<InputTypesUnion, OutputTypesUnion>(),
  send: (command: Command<InputTypesUnion, OutputTypesUnion, any, OperationInput, OperationOutput>) =>
    command.resolveMiddleware(fooClient.middlewareStack, fooClient.config, undefined)({ input }),
  destroy: () => {},
};

export const operationCommand: Command<InputTypesUnion, OutputTypesUnion, any, OperationInput, MetadataBearer> = {
  middlewareStack: constructStack<OperationInput, OutputTypesUnion>(),
  input: {} as any,
  // @ts-ignore
  resolveMiddleware: (stack: MiddlewareStack<InputTypesUnion, OutputTypesUnion>) => {
    const concatStack = stack.concat(operationCommand.middlewareStack);
    return concatStack.resolve(() => Promise.resolve({ output, response: {} }), {} as any);
  },
};

export const httpRequest = new HttpRequest({
  protocol: "https:",
  path: "/foo",
  hostname: "foo-service.us-east-1.amazonaws.com",
  headers: {},
  method: "GET",
  body: "",
});
