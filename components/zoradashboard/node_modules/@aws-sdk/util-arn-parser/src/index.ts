export interface ARN {
  partition: string;
  service: string;
  region: string;
  accountId: string;
  resource: string;
}
/**
 * Validate whether a string is an ARN.
 */
export const validate = (str: any): boolean =>
  typeof str === "string" && str.indexOf("arn:") === 0 && str.split(":").length >= 6;

/**
 * Parse an ARN string into structure with partition, service, region, accountId and resource values
 */
export const parse = (arn: string): ARN => {
  const segments = arn.split(":");
  if (segments.length < 6 || segments[0] !== "arn") throw new Error("Malformed ARN");
  const [
    ,
    //Skip "arn" literal
    partition,
    service,
    region,
    accountId,
    ...resource
  ] = segments;

  return {
    partition,
    service,
    region,
    accountId,
    resource: resource.join(":"),
  };
};

type buildOptions = Omit<ARN, "partition"> & { partition?: string };

/**
 * Build an ARN with service, partition, region, accountId, and resources strings
 */
export const build = (arnObject: buildOptions): string => {
  const { partition = "aws", service, region, accountId, resource } = arnObject;
  if ([service, region, accountId, resource].some((segment) => typeof segment !== "string")) {
    throw new Error("Input ARN object is invalid");
  }
  return `arn:${partition}:${service}:${region}:${accountId}:${resource}`;
};
