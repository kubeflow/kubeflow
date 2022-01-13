import { isArrayBuffer } from "@aws-sdk/is-array-buffer";
import { HttpRequest } from "@aws-sdk/protocol-http";
import {
  BuildHandler,
  BuildHandlerArguments,
  BuildHandlerOptions,
  BuildHandlerOutput,
  BuildMiddleware,
  HeaderBag,
  MetadataBearer,
  Pluggable,
} from "@aws-sdk/types";

import { Md5BodyChecksumResolvedConfig } from "./md5Configuration";

export function applyMd5BodyChecksumMiddleware(options: Md5BodyChecksumResolvedConfig): BuildMiddleware<any, any> {
  return <Output extends MetadataBearer>(next: BuildHandler<any, Output>): BuildHandler<any, Output> => async (
    args: BuildHandlerArguments<any>
  ): Promise<BuildHandlerOutput<Output>> => {
    let { request } = args;
    if (HttpRequest.isInstance(request)) {
      const { body, headers } = request;
      if (!hasHeader("Content-MD5", headers)) {
        let digest: Promise<Uint8Array>;
        if (body === undefined || typeof body === "string" || ArrayBuffer.isView(body) || isArrayBuffer(body)) {
          const hash = new options.md5();
          hash.update(body || "");
          digest = hash.digest();
        } else {
          digest = options.streamHasher(options.md5, body);
        }

        request = {
          ...request,
          headers: {
            ...headers,
            "Content-MD5": options.base64Encoder(await digest),
          },
        };
      }
    }
    return next({
      ...args,
      request,
    });
  };
}

export const applyMd5BodyChecksumMiddlewareOptions: BuildHandlerOptions = {
  name: "applyMd5BodyChecksumMiddleware",
  step: "build",
  tags: ["SET_CONTENT_MD5", "BODY_CHECKSUM"],
  override: true,
};

export const getApplyMd5BodyChecksumPlugin = (config: Md5BodyChecksumResolvedConfig): Pluggable<any, any> => ({
  applyToStack: (clientStack) => {
    clientStack.add(applyMd5BodyChecksumMiddleware(config), applyMd5BodyChecksumMiddlewareOptions);
  },
});

function hasHeader(soughtHeader: string, headers: HeaderBag): boolean {
  soughtHeader = soughtHeader.toLowerCase();
  for (const headerName of Object.keys(headers)) {
    if (soughtHeader === headerName.toLowerCase()) {
      return true;
    }
  }

  return false;
}
