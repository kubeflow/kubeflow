import { HttpRequest } from "@aws-sdk/types";
import { ClientRequest } from "http";
import { ClientHttp2Stream } from "http2";
import { Readable } from "stream";

export function writeRequestBody(httpRequest: ClientRequest | ClientHttp2Stream, request: HttpRequest) {
  const expect = request.headers["Expect"] || request.headers["expect"];
  if (expect === "100-continue") {
    httpRequest.on("continue", () => {
      writeBody(httpRequest, request.body);
    });
  } else {
    writeBody(httpRequest, request.body);
  }
}

function writeBody(
  httpRequest: ClientRequest | ClientHttp2Stream,
  body?: string | ArrayBuffer | ArrayBufferView | Readable | Uint8Array
) {
  if (body instanceof Readable) {
    // pipe automatically handles end
    body.pipe(httpRequest);
  } else if (body) {
    httpRequest.end(Buffer.from(body));
  } else {
    httpRequest.end();
  }
}
