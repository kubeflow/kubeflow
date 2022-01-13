import { HttpHandlerOptions, RequestHandler } from "@aws-sdk/types";

import { HttpRequest } from "./httpRequest";
import { HttpResponse } from "./httpResponse";

export type HttpHandler = RequestHandler<HttpRequest, HttpResponse, HttpHandlerOptions>;
