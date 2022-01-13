import {
  ArnHostnameParams,
  BucketHostnameParams,
  DOT_PATTERN,
  getArnResources,
  getSuffix,
  getSuffixForArnEndpoint,
  isBucketNameOptions,
  isDnsCompatibleBucketName,
  validateAccountId,
  validateArnEndpointOptions,
  validateDNSHostLabel,
  validateNoDualstack,
  validateNoFIPS,
  validateOutpostService,
  validatePartition,
  validateRegion,
  validateS3Service,
  validateService,
} from "./bucketHostnameUtils";

export interface BucketHostname {
  hostname: string;
  bucketEndpoint: boolean;
  signingRegion?: string;
  signingService?: string;
}

export const bucketHostname = (options: BucketHostnameParams | ArnHostnameParams): BucketHostname => {
  const { isCustomEndpoint, baseHostname, dualstackEndpoint, accelerateEndpoint } = options;

  if (isCustomEndpoint) {
    if (dualstackEndpoint) throw new Error("Dualstack endpoint is not supported with custom endpoint");
    if (accelerateEndpoint) throw new Error("Accelerate endpoint is not supported with custom endpoint");
  }

  return isBucketNameOptions(options)
    ? // Construct endpoint when bucketName is a string referring to a bucket name
      getEndpointFromBucketName({ ...options, isCustomEndpoint })
    : // Construct endpoint when bucketName is an ARN referring to an S3 resource like Access Point
      getEndpointFromArn({ ...options, isCustomEndpoint });
};

const getEndpointFromArn = (options: ArnHostnameParams & { isCustomEndpoint: boolean }): BucketHostname => {
  const { isCustomEndpoint, baseHostname } = options;
  const [clientRegion, hostnameSuffix] = isCustomEndpoint
    ? [options.clientRegion, baseHostname]
    : // Infer client region and hostname suffix from hostname from endpoints.json, like `s3.us-west-2.amazonaws.com`
      getSuffixForArnEndpoint(baseHostname);

  const {
    pathStyleEndpoint,
    dualstackEndpoint = false,
    accelerateEndpoint = false,
    tlsCompatible = true,
    useArnRegion,
    bucketName,
    clientPartition = "aws",
    clientSigningRegion = clientRegion,
  } = options;

  validateArnEndpointOptions({ pathStyleEndpoint, accelerateEndpoint, tlsCompatible });

  // Validate and parse the ARN supplied as a bucket name
  const { service, partition, accountId, region, resource } = bucketName;
  validateService(service);
  validatePartition(partition, { clientPartition });
  validateAccountId(accountId);
  validateRegion(region, { useArnRegion, clientRegion, clientSigningRegion });
  const { accesspointName, outpostId } = getArnResources(resource);
  validateDNSHostLabel(`${accesspointName}-${accountId}`, { tlsCompatible });

  const endpointRegion = useArnRegion ? region : clientRegion;
  const signingRegion = useArnRegion ? region : clientSigningRegion;
  if (outpostId) {
    // if this is an Outpost ARN
    validateOutpostService(service);
    validateDNSHostLabel(outpostId, { tlsCompatible });
    validateNoDualstack(dualstackEndpoint);
    validateNoFIPS(endpointRegion);
    const hostnamePrefix = `${accesspointName}-${accountId}.${outpostId}`;
    return {
      bucketEndpoint: true,
      hostname: `${hostnamePrefix}${isCustomEndpoint ? "" : `.s3-outposts.${endpointRegion}`}.${hostnameSuffix}`,
      signingRegion,
      signingService: "s3-outposts",
    };
  }
  // construct endpoint from Accesspoint ARN
  validateS3Service(service);
  const hostnamePrefix = `${accesspointName}-${accountId}`;
  return {
    bucketEndpoint: true,
    hostname: `${hostnamePrefix}${
      isCustomEndpoint ? "" : `.s3-accesspoint${dualstackEndpoint ? ".dualstack" : ""}.${endpointRegion}`
    }.${hostnameSuffix}`,
    signingRegion,
  };
};

const getEndpointFromBucketName = ({
  accelerateEndpoint = false,
  clientRegion: region,
  baseHostname,
  bucketName,
  dualstackEndpoint = false,
  pathStyleEndpoint = false,
  tlsCompatible = true,
  isCustomEndpoint = false,
}: BucketHostnameParams & { isCustomEndpoint: boolean }): BucketHostname => {
  const [clientRegion, hostnameSuffix] = isCustomEndpoint ? [region, baseHostname] : getSuffix(baseHostname);
  if (pathStyleEndpoint || !isDnsCompatibleBucketName(bucketName) || (tlsCompatible && DOT_PATTERN.test(bucketName))) {
    return {
      bucketEndpoint: false,
      hostname: dualstackEndpoint ? `s3.dualstack.${clientRegion}.${hostnameSuffix}` : baseHostname,
    };
  }

  if (accelerateEndpoint) {
    baseHostname = `s3-accelerate${dualstackEndpoint ? ".dualstack" : ""}.${hostnameSuffix}`;
  } else if (dualstackEndpoint) {
    baseHostname = `s3.dualstack.${clientRegion}.${hostnameSuffix}`;
  }

  return {
    bucketEndpoint: true,
    hostname: `${bucketName}.${baseHostname}`,
  };
};
