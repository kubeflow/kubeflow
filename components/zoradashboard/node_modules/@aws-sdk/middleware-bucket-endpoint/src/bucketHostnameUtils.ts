import { ARN } from "@aws-sdk/util-arn-parser";

const DOMAIN_PATTERN = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/;
const IP_ADDRESS_PATTERN = /(\d+\.){3}\d+/;
const DOTS_PATTERN = /\.\./;
export const DOT_PATTERN = /\./;
export const S3_HOSTNAME_PATTERN = /^(.+\.)?s3[.-]([a-z0-9-]+)\./;
const S3_US_EAST_1_ALTNAME_PATTERN = /^s3(-external-1)?\.amazonaws\.com$/;
const AWS_PARTITION_SUFFIX = "amazonaws.com";

export interface AccessPointArn extends ARN {
  accessPointName: string;
}

export interface BucketHostnameParams {
  isCustomEndpoint: boolean;
  baseHostname: string;
  bucketName: string;
  clientRegion: string;
  accelerateEndpoint?: boolean;
  dualstackEndpoint?: boolean;
  pathStyleEndpoint?: boolean;
  tlsCompatible?: boolean;
}

export interface ArnHostnameParams extends Omit<BucketHostnameParams, "bucketName"> {
  bucketName: ARN;
  clientSigningRegion?: string;
  clientPartition?: string;
  useArnRegion?: boolean;
}

export const isBucketNameOptions = (
  options: BucketHostnameParams | ArnHostnameParams
): options is BucketHostnameParams => typeof options.bucketName === "string";

/**
 * Get pseudo region from supplied region. For example, if supplied with `fips-us-west-2`, it returns `us-west-2`.
 * @internal
 */
export const getPseudoRegion = (region: string) => (isFipsRegion(region) ? region.replace(/fips-|-fips/, "") : region);

/**
 * Determines whether a given string is DNS compliant per the rules outlined by
 * S3. Length, capitaization, and leading dot restrictions are enforced by the
 * DOMAIN_PATTERN regular expression.
 * @internal
 *
 * @see https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html
 */
export const isDnsCompatibleBucketName = (bucketName: string): boolean =>
  DOMAIN_PATTERN.test(bucketName) && !IP_ADDRESS_PATTERN.test(bucketName) && !DOTS_PATTERN.test(bucketName);

const getRegionalSuffix = (hostname: string): [string, string] => {
  const parts = hostname.match(S3_HOSTNAME_PATTERN)!;
  return [parts[2], hostname.replace(new RegExp(`^${parts[0]}`), "")];
};

export const getSuffix = (hostname: string): [string, string] =>
  S3_US_EAST_1_ALTNAME_PATTERN.test(hostname) ? ["us-east-1", AWS_PARTITION_SUFFIX] : getRegionalSuffix(hostname);

/**
 * Infer region and hostname suffix from a complete hostname
 * @internal
 * @param hostname - Hostname
 * @returns [Region, Hostname suffix]
 */
export const getSuffixForArnEndpoint = (hostname: string): [string, string] =>
  S3_US_EAST_1_ALTNAME_PATTERN.test(hostname)
    ? [hostname.replace(`.${AWS_PARTITION_SUFFIX}`, ""), AWS_PARTITION_SUFFIX]
    : getRegionalSuffix(hostname);

export const validateArnEndpointOptions = (options: {
  accelerateEndpoint?: boolean;
  tlsCompatible?: boolean;
  pathStyleEndpoint?: boolean;
}) => {
  if (options.pathStyleEndpoint) {
    throw new Error("Path-style S3 endpoint is not supported when bucket is an ARN");
  }
  if (options.accelerateEndpoint) {
    throw new Error("Accelerate endpoint is not supported when bucket is an ARN");
  }
  if (!options.tlsCompatible) {
    throw new Error("HTTPS is required when bucket is an ARN");
  }
};

export const validateService = (service: string) => {
  if (service !== "s3" && service !== "s3-outposts") {
    throw new Error("Expect 's3' or 's3-outposts' in ARN service component");
  }
};

export const validateS3Service = (service: string) => {
  if (service !== "s3") {
    throw new Error("Expect 's3' in Accesspoint ARN service component");
  }
};

export const validateOutpostService = (service: string) => {
  if (service !== "s3-outposts") {
    throw new Error("Expect 's3-posts' in Outpost ARN service component");
  }
};

/**
 * Validate partition inferred from ARN is the same to `options.clientPartition`.
 * @internal
 */
export const validatePartition = (partition: string, options: { clientPartition: string }) => {
  if (partition !== options.clientPartition) {
    throw new Error(`Partition in ARN is incompatible, got "${partition}" but expected "${options.clientPartition}"`);
  }
};

/**
 * validate region value inferred from ARN. If `options.useArnRegion` is set, it validates the region is not a FIPS
 * region. If `options.useArnRegion` is unset, it validates the region is equal to `options.clientRegion` or
 * `options.clientSigningRegion`.
 * @internal
 */
export const validateRegion = (
  region: string,
  options: {
    useArnRegion?: boolean;
    clientRegion: string;
    clientSigningRegion: string;
  }
) => {
  if (region === "") {
    throw new Error("ARN region is empty");
  }
  if (
    !options.useArnRegion &&
    !isEqualRegions(region, options.clientRegion) &&
    !isEqualRegions(region, options.clientSigningRegion)
  ) {
    throw new Error(`Region in ARN is incompatible, got ${region} but expected ${options.clientRegion}`);
  }
  if (options.useArnRegion && isFipsRegion(region)) {
    throw new Error("Endpoint does not support FIPS region");
  }
};

const isFipsRegion = (region: string) => region.startsWith("fips-") || region.endsWith("-fips");

const isEqualRegions = (regionA: string, regionB: string) =>
  regionA === regionB || getPseudoRegion(regionA) === regionB || regionA === getPseudoRegion(regionB);

/**
 * Validate an account ID
 * @internal
 */
export const validateAccountId = (accountId: string) => {
  if (!/[0-9]{12}/.exec(accountId)) {
    throw new Error("Access point ARN accountID does not match regex '[0-9]{12}'");
  }
};

/**
 * Validate a host label according to https://tools.ietf.org/html/rfc3986#section-3.2.2
 * @internal
 */
export const validateDNSHostLabel = (label: string, options: { tlsCompatible?: boolean } = { tlsCompatible: true }) => {
  // reference: https://tools.ietf.org/html/rfc3986#section-3.2.2
  if (
    label.length >= 64 ||
    !/^[a-z0-9][a-z0-9.-]+[a-z0-9]$/.test(label) ||
    /(\d+\.){3}\d+/.test(label) ||
    /[.-]{2}/.test(label) ||
    (options?.tlsCompatible && DOT_PATTERN.test(label))
  ) {
    throw new Error(`Invalid DNS label ${label}`);
  }
};

/**
 * Validate and parse an Access Point ARN or Outposts ARN
 * @internal
 *
 * @param resource - The resource section of an ARN
 * @returns Access Point Name and optional Outpost ID.
 */
export const getArnResources = (
  resource: string
): {
  accesspointName: string;
  outpostId?: string;
} => {
  const delimiter = resource.includes(":") ? ":" : "/";
  const [resourceType, ...rest] = resource.split(delimiter);
  if (resourceType === "accesspoint") {
    // Parse accesspoint ARN
    if (rest.length !== 1 || rest[0] === "") {
      throw new Error(`Access Point ARN should have one resource accesspoint${delimiter}{accesspointname}`);
    }
    return { accesspointName: rest[0] };
  } else if (resourceType === "outpost") {
    // Parse outpost ARN
    if (!rest[0] || rest[1] !== "accesspoint" || !rest[2] || rest.length !== 3) {
      throw new Error(
        `Outpost ARN should have resource outpost${delimiter}{outpostId}${delimiter}accesspoint${delimiter}{accesspointName}`
      );
    }
    const [outpostId, _, accesspointName] = rest;
    return { outpostId, accesspointName };
  } else {
    throw new Error(`ARN resource should begin with 'accesspoint${delimiter}' or 'outpost${delimiter}'`);
  }
};

/**
 * Throw if dual stack configuration is set to true.
 * @internal
 */
export const validateNoDualstack = (dualstackEndpoint: boolean) => {
  if (dualstackEndpoint) throw new Error("Dualstack endpoint is not supported with Outpost");
};

/**
 * Validate region is not appended or prepended with a `fips-`
 * @internal
 */
export const validateNoFIPS = (region: string) => {
  if (isFipsRegion(region ?? "")) throw new Error(`FIPS region is not supported with Outpost, got ${region}`);
};
