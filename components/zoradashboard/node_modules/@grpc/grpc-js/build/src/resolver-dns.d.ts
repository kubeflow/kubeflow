/**
 * Set up the DNS resolver class by registering it as the handler for the
 * "dns:" prefix and as the default resolver.
 */
export declare function setup(): void;
export interface DnsUrl {
    host: string;
    port?: string;
}
