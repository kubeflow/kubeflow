import {
  InitializeHandler,
  InitializeHandlerArguments,
  InitializeHandlerOptions,
  InitializeHandlerOutput,
  InitializeMiddleware,
  MetadataBearer,
  Pluggable,
  SourceData,
} from "@aws-sdk/types";

import { ResolvedSsecMiddlewareConfig } from "./configuration";

export function ssecMiddleware(options: ResolvedSsecMiddlewareConfig): InitializeMiddleware<any, any> {
  return <Output extends MetadataBearer>(
    next: InitializeHandler<any, Output>
  ): InitializeHandler<any, Output> => async (
    args: InitializeHandlerArguments<any>
  ): Promise<InitializeHandlerOutput<Output>> => {
    let input = { ...args.input };
    const properties = [
      {
        target: "SSECustomerKey",
        hash: "SSECustomerKeyMD5",
      },
      {
        target: "CopySourceSSECustomerKey",
        hash: "CopySourceSSECustomerKeyMD5",
      },
    ];

    for (const prop of properties) {
      const value: SourceData | undefined = (input as any)[prop.target];
      if (value) {
        const valueView = ArrayBuffer.isView(value)
          ? new Uint8Array(value.buffer, value.byteOffset, value.byteLength)
          : typeof value === "string"
          ? options.utf8Decoder(value)
          : new Uint8Array(value);
        const encoded = options.base64Encoder(valueView);
        const hash = new options.md5();
        hash.update(valueView);
        input = {
          ...(input as any),
          [prop.target]: encoded,
          [prop.hash]: options.base64Encoder(await hash.digest()),
        };
      }
    }

    return next({
      ...args,
      input,
    });
  };
}

export const ssecMiddlewareOptions: InitializeHandlerOptions = {
  name: "ssecMiddleware",
  step: "initialize",
  tags: ["SSE"],
  override: true,
};

export const getSsecPlugin = (config: ResolvedSsecMiddlewareConfig): Pluggable<any, any> => ({
  applyToStack: (clientStack) => {
    clientStack.add(ssecMiddleware(config), ssecMiddlewareOptions);
  },
});
