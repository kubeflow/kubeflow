import {
  Credentials,
  DateInput,
  EventSigner,
  EventSigningArguments,
  FormattedEvent,
  HashConstructor,
  HeaderBag,
  HttpRequest,
  Provider,
  RequestPresigner,
  RequestPresigningArguments,
  RequestSigner,
  RequestSigningArguments,
  SigningArguments,
  StringSigner,
} from "@aws-sdk/types";
import { toHex } from "@aws-sdk/util-hex-encoding";

import {
  ALGORITHM_IDENTIFIER,
  ALGORITHM_QUERY_PARAM,
  AMZ_DATE_HEADER,
  AMZ_DATE_QUERY_PARAM,
  AUTH_HEADER,
  CREDENTIAL_QUERY_PARAM,
  EVENT_ALGORITHM_IDENTIFIER,
  EXPIRES_QUERY_PARAM,
  MAX_PRESIGNED_TTL,
  SHA256_HEADER,
  SIGNATURE_QUERY_PARAM,
  SIGNED_HEADERS_QUERY_PARAM,
  TOKEN_HEADER,
  TOKEN_QUERY_PARAM,
} from "./constants";
import { createScope, getSigningKey } from "./credentialDerivation";
import { getCanonicalHeaders } from "./getCanonicalHeaders";
import { getCanonicalQuery } from "./getCanonicalQuery";
import { getPayloadHash } from "./getPayloadHash";
import { hasHeader } from "./hasHeader";
import { moveHeadersToQuery } from "./moveHeadersToQuery";
import { prepareRequest } from "./prepareRequest";
import { iso8601 } from "./utilDate";

export interface SignatureV4Init {
  /**
   * The service signing name.
   */
  service: string;

  /**
   * The region name or a function that returns a promise that will be
   * resolved with the region name.
   */
  region: string | Provider<string>;

  /**
   * The credentials with which the request should be signed or a function
   * that returns a promise that will be resolved with credentials.
   */
  credentials: Credentials | Provider<Credentials>;

  /**
   * A constructor function for a hash object that will calculate SHA-256 HMAC
   * checksums.
   */
  sha256?: HashConstructor;

  /**
   * Whether to uri-escape the request URI path as part of computing the
   * canonical request string. This is required for every AWS service, except
   * Amazon S3, as of late 2017.
   *
   * @default [true]
   */
  uriEscapePath?: boolean;

  /**
   * Whether to calculate a checksum of the request body and include it as
   * either a request header (when signing) or as a query string parameter
   * (when presigning). This is required for AWS Glacier and Amazon S3 and optional for
   * every other AWS service as of late 2017.
   *
   * @default [true]
   */
  applyChecksum?: boolean;
}

export interface SignatureV4CryptoInit {
  sha256: HashConstructor;
}

export class SignatureV4 implements RequestPresigner, RequestSigner, StringSigner, EventSigner {
  private readonly service: string;
  private readonly regionProvider: Provider<string>;
  private readonly credentialProvider: Provider<Credentials>;
  private readonly sha256: HashConstructor;
  private readonly uriEscapePath: boolean;
  private readonly applyChecksum: boolean;

  constructor({
    applyChecksum,
    credentials,
    region,
    service,
    sha256,
    uriEscapePath = true,
  }: SignatureV4Init & SignatureV4CryptoInit) {
    this.service = service;
    this.sha256 = sha256;
    this.uriEscapePath = uriEscapePath;
    // default to true if applyChecksum isn't set
    this.applyChecksum = typeof applyChecksum === "boolean" ? applyChecksum : true;
    this.regionProvider = normalizeRegionProvider(region);
    this.credentialProvider = normalizeCredentialsProvider(credentials);
  }

  public async presign(originalRequest: HttpRequest, options: RequestPresigningArguments = {}): Promise<HttpRequest> {
    const {
      signingDate = new Date(),
      expiresIn = 3600,
      unsignableHeaders,
      unhoistableHeaders,
      signableHeaders,
      signingRegion,
      signingService,
    } = options;
    const credentials = await this.credentialProvider();
    const region = signingRegion ?? (await this.regionProvider());

    const { longDate, shortDate } = formatDate(signingDate);
    if (expiresIn > MAX_PRESIGNED_TTL) {
      return Promise.reject(
        "Signature version 4 presigned URLs" + " must have an expiration date less than one week in" + " the future"
      );
    }

    const scope = createScope(shortDate, region, signingService ?? this.service);
    const request = moveHeadersToQuery(prepareRequest(originalRequest), { unhoistableHeaders });

    if (credentials.sessionToken) {
      request.query[TOKEN_QUERY_PARAM] = credentials.sessionToken;
    }
    request.query[ALGORITHM_QUERY_PARAM] = ALGORITHM_IDENTIFIER;
    request.query[CREDENTIAL_QUERY_PARAM] = `${credentials.accessKeyId}/${scope}`;
    request.query[AMZ_DATE_QUERY_PARAM] = longDate;
    request.query[EXPIRES_QUERY_PARAM] = expiresIn.toString(10);

    const canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
    request.query[SIGNED_HEADERS_QUERY_PARAM] = getCanonicalHeaderList(canonicalHeaders);

    request.query[SIGNATURE_QUERY_PARAM] = await this.getSignature(
      longDate,
      scope,
      this.getSigningKey(credentials, region, shortDate, signingService),
      this.createCanonicalRequest(request, canonicalHeaders, await getPayloadHash(originalRequest, this.sha256))
    );

    return request;
  }

  public async sign(stringToSign: string, options?: SigningArguments): Promise<string>;
  public async sign(event: FormattedEvent, options: EventSigningArguments): Promise<string>;
  public async sign(requestToSign: HttpRequest, options?: RequestSigningArguments): Promise<HttpRequest>;
  public async sign(toSign: any, options: any): Promise<any> {
    if (typeof toSign === "string") {
      return this.signString(toSign, options);
    } else if (toSign.headers && toSign.payload) {
      return this.signEvent(toSign, options);
    } else {
      return this.signRequest(toSign, options);
    }
  }

  private async signEvent(
    { headers, payload }: FormattedEvent,
    { signingDate = new Date(), priorSignature, signingRegion, signingService }: EventSigningArguments
  ): Promise<string> {
    const region = signingRegion ?? (await this.regionProvider());
    const { shortDate, longDate } = formatDate(signingDate);
    const scope = createScope(shortDate, region, signingService ?? this.service);
    const hashedPayload = await getPayloadHash({ headers: {}, body: payload } as any, this.sha256);
    const hash = new this.sha256();
    hash.update(headers);
    const hashedHeaders = toHex(await hash.digest());
    const stringToSign = [
      EVENT_ALGORITHM_IDENTIFIER,
      longDate,
      scope,
      priorSignature,
      hashedHeaders,
      hashedPayload,
    ].join("\n");
    return this.signString(stringToSign, { signingDate, signingRegion: region, signingService });
  }

  private async signString(
    stringToSign: string,
    { signingDate = new Date(), signingRegion, signingService }: SigningArguments = {}
  ): Promise<string> {
    const credentials = await this.credentialProvider();
    const region = signingRegion ?? (await this.regionProvider());
    const { shortDate } = formatDate(signingDate);

    const hash = new this.sha256(await this.getSigningKey(credentials, region, shortDate, signingService));
    hash.update(stringToSign);
    return toHex(await hash.digest());
  }

  private async signRequest(
    requestToSign: HttpRequest,
    {
      signingDate = new Date(),
      signableHeaders,
      unsignableHeaders,
      signingRegion,
      signingService,
    }: RequestSigningArguments = {}
  ): Promise<HttpRequest> {
    const credentials = await this.credentialProvider();
    const region = signingRegion ?? (await this.regionProvider());
    const request = prepareRequest(requestToSign);
    const { longDate, shortDate } = formatDate(signingDate);
    const scope = createScope(shortDate, region, signingService ?? this.service);

    request.headers[AMZ_DATE_HEADER] = longDate;
    if (credentials.sessionToken) {
      request.headers[TOKEN_HEADER] = credentials.sessionToken;
    }

    const payloadHash = await getPayloadHash(request, this.sha256);
    if (!hasHeader(SHA256_HEADER, request.headers) && this.applyChecksum) {
      request.headers[SHA256_HEADER] = payloadHash;
    }

    const canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
    const signature = await this.getSignature(
      longDate,
      scope,
      this.getSigningKey(credentials, region, shortDate, signingService),
      this.createCanonicalRequest(request, canonicalHeaders, payloadHash)
    );

    request.headers[AUTH_HEADER] =
      `${ALGORITHM_IDENTIFIER} ` +
      `Credential=${credentials.accessKeyId}/${scope}, ` +
      `SignedHeaders=${getCanonicalHeaderList(canonicalHeaders)}, ` +
      `Signature=${signature}`;

    return request;
  }

  private createCanonicalRequest(request: HttpRequest, canonicalHeaders: HeaderBag, payloadHash: string): string {
    const sortedHeaders = Object.keys(canonicalHeaders).sort();
    return `${request.method}
${this.getCanonicalPath(request)}
${getCanonicalQuery(request)}
${sortedHeaders.map((name) => `${name}:${canonicalHeaders[name]}`).join("\n")}

${sortedHeaders.join(";")}
${payloadHash}`;
  }

  private async createStringToSign(
    longDate: string,
    credentialScope: string,
    canonicalRequest: string
  ): Promise<string> {
    const hash = new this.sha256();
    hash.update(canonicalRequest);
    const hashedRequest = await hash.digest();

    return `${ALGORITHM_IDENTIFIER}
${longDate}
${credentialScope}
${toHex(hashedRequest)}`;
  }

  private getCanonicalPath({ path }: HttpRequest): string {
    if (this.uriEscapePath) {
      const doubleEncoded = encodeURIComponent(path.replace(/^\//, ""));
      return `/${doubleEncoded.replace(/%2F/g, "/")}`;
    }

    return path;
  }

  private async getSignature(
    longDate: string,
    credentialScope: string,
    keyPromise: Promise<Uint8Array>,
    canonicalRequest: string
  ): Promise<string> {
    const stringToSign = await this.createStringToSign(longDate, credentialScope, canonicalRequest);

    const hash = new this.sha256(await keyPromise);
    hash.update(stringToSign);
    return toHex(await hash.digest());
  }

  private getSigningKey(
    credentials: Credentials,
    region: string,
    shortDate: string,
    service?: string
  ): Promise<Uint8Array> {
    return getSigningKey(this.sha256, credentials, shortDate, region, service || this.service);
  }
}

const formatDate = (now: DateInput): { longDate: string; shortDate: string } => {
  const longDate = iso8601(now).replace(/[\-:]/g, "");
  return {
    longDate,
    shortDate: longDate.substr(0, 8),
  };
};

const getCanonicalHeaderList = (headers: object): string => Object.keys(headers).sort().join(";");

const normalizeRegionProvider = (region: string | Provider<string>): Provider<string> => {
  if (typeof region === "string") {
    const promisified = Promise.resolve(region);
    return () => promisified;
  } else {
    return region;
  }
};

const normalizeCredentialsProvider = (credentials: Credentials | Provider<Credentials>): Provider<Credentials> => {
  if (typeof credentials === "object") {
    const promisified = Promise.resolve(credentials);
    return () => promisified;
  } else {
    return credentials;
  }
};
