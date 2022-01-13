import { LoadBalancingConfig } from './load-balancer';
export interface MethodConfigName {
    service: string;
    method?: string;
}
export interface MethodConfig {
    name: MethodConfigName[];
    waitForReady?: boolean;
    timeout?: string;
    maxRequestBytes?: number;
    maxResponseBytes?: number;
}
export interface ServiceConfig {
    loadBalancingPolicy?: string;
    loadBalancingConfig: LoadBalancingConfig[];
    methodConfig: MethodConfig[];
}
export interface ServiceConfigCanaryConfig {
    clientLanguage?: string[];
    percentage?: number;
    clientHostname?: string[];
    serviceConfig: ServiceConfig;
}
export declare function validateServiceConfig(obj: any): ServiceConfig;
/**
 * Find the "grpc_config" record among the TXT records, parse its value as JSON, validate its contents,
 * and select a service config with selection fields that all match this client. Most of these steps
 * can fail with an error; the caller must handle any errors thrown this way.
 * @param txtRecord The TXT record array that is output from a successful call to dns.resolveTxt
 * @param percentage A number chosen from the range [0, 100) that is used to select which config to use
 * @return The service configuration to use, given the percentage value, or null if the service config
 *     data has a valid format but none of the options match the current client.
 */
export declare function extractAndSelectServiceConfig(txtRecord: string[][], percentage: number): ServiceConfig | null;
