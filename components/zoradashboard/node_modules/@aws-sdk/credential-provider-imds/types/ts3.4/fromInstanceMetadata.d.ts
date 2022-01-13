import { CredentialProvider } from "@aws-sdk/types";
import { RemoteProviderInit } from "./remoteProvider/RemoteProviderInit";
/**
 * Creates a credential provider that will source credentials from the EC2
 * Instance Metadata Service
 */
export declare const fromInstanceMetadata: (init?: RemoteProviderInit) => CredentialProvider;
