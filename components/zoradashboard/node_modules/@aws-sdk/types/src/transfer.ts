export type RequestHandlerOutput<ResponseType> = { response: ResponseType };

export interface RequestHandler<RequestType, ResponseType, HandlerOptions = {}> {
  /**
   * metadata contains information of a handler. For example
   * 'h2' refers this handler is for handling HTTP/2 requests,
   * whereas 'h1' refers handling HTTP1 requests
   */
  metadata?: RequestHandlerMetadata;
  destroy?: () => void;
  handle: (request: RequestType, handlerOptions?: HandlerOptions) => Promise<RequestHandlerOutput<ResponseType>>;
}

export interface RequestHandlerMetadata {
  // This infers request handler's protocol
  // valid values are stated: https://www.iana.org/assignments/tls-extensiontype-values/tls-extensiontype-values.xhtml#alpn-protocol-ids
  handlerProtocol: string;
}
