import { Credentials } from "@aws-sdk/types";

export interface ImdsCredentials {
  AccessKeyId: string;
  SecretAccessKey: string;
  Token: string;
  Expiration: string;
}

export const isImdsCredentials = (arg: any): arg is ImdsCredentials =>
  Boolean(arg) &&
  typeof arg === "object" &&
  typeof arg.AccessKeyId === "string" &&
  typeof arg.SecretAccessKey === "string" &&
  typeof arg.Token === "string" &&
  typeof arg.Expiration === "string";

export const fromImdsCredentials = (creds: ImdsCredentials): Credentials => ({
  accessKeyId: creds.AccessKeyId,
  secretAccessKey: creds.SecretAccessKey,
  sessionToken: creds.Token,
  expiration: new Date(creds.Expiration),
});
