import { Endpoint, HeaderBag, HttpMessage, HttpRequest as IHttpRequest, QueryParameterBag } from "@aws-sdk/types";

type HttpRequestOptions = Partial<HttpMessage> & Partial<Endpoint> & { method?: string };

export interface HttpRequest extends IHttpRequest {}

export class HttpRequest implements HttpMessage, Endpoint {
  public method: string;
  public protocol: string;
  public hostname: string;
  public port?: number;
  public path: string;
  public query: QueryParameterBag;
  public headers: HeaderBag;
  public body?: any;

  constructor(options: HttpRequestOptions) {
    this.method = options.method || "GET";
    this.hostname = options.hostname || "localhost";
    this.port = options.port;
    this.query = options.query || {};
    this.headers = options.headers || {};
    this.body = options.body;
    this.protocol = options.protocol
      ? options.protocol.substr(-1) !== ":"
        ? `${options.protocol}:`
        : options.protocol
      : "https:";
    this.path = options.path ? (options.path.charAt(0) !== "/" ? `/${options.path}` : options.path) : "/";
  }

  static isInstance(request: unknown): request is HttpRequest {
    //determine if request is a valid httpRequest
    if (!request) return false;
    const req: any = request;
    return (
      "method" in req &&
      "protocol" in req &&
      "hostname" in req &&
      "path" in req &&
      typeof req["query"] === "object" &&
      typeof req["headers"] === "object"
    );
  }

  clone(): HttpRequest {
    const cloned = new HttpRequest({
      ...this,
      headers: { ...this.headers },
    });
    if (cloned.query) cloned.query = cloneQuery(cloned.query);
    return cloned;
  }
}

function cloneQuery(query: QueryParameterBag): QueryParameterBag {
  return Object.keys(query).reduce((carry: QueryParameterBag, paramName: string) => {
    const param = query[paramName];
    return {
      ...carry,
      [paramName]: Array.isArray(param) ? [...param] : param,
    };
  }, {});
}
