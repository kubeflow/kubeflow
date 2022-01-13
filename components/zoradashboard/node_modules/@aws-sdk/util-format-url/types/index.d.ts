import { HttpRequest } from "@aws-sdk/types";
export declare function formatUrl(request: Omit<HttpRequest, "headers" | "method">): string;
