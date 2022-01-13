/**
 * An interface that contains options used when initializing a Channel instance.
 */
export interface ChannelOptions {
    'grpc.ssl_target_name_override'?: string;
    'grpc.primary_user_agent'?: string;
    'grpc.secondary_user_agent'?: string;
    'grpc.default_authority'?: string;
    'grpc.keepalive_time_ms'?: number;
    'grpc.keepalive_timeout_ms'?: number;
    'grpc.keepalive_permit_without_calls'?: number;
    'grpc.service_config'?: string;
    'grpc.max_concurrent_streams'?: number;
    'grpc.initial_reconnect_backoff_ms'?: number;
    'grpc.max_reconnect_backoff_ms'?: number;
    'grpc.use_local_subchannel_pool'?: number;
    'grpc.max_send_message_length'?: number;
    'grpc.max_receive_message_length'?: number;
    'grpc.enable_http_proxy'?: number;
    'grpc.http_connect_target'?: string;
    'grpc.http_connect_creds'?: string;
    'grpc-node.max_session_memory'?: number;
    [key: string]: any;
}
/**
 * This is for checking provided options at runtime. This is an object for
 * easier membership checking.
 */
export declare const recognizedOptions: {
    'grpc.ssl_target_name_override': boolean;
    'grpc.primary_user_agent': boolean;
    'grpc.secondary_user_agent': boolean;
    'grpc.default_authority': boolean;
    'grpc.keepalive_time_ms': boolean;
    'grpc.keepalive_timeout_ms': boolean;
    'grpc.keepalive_permit_without_calls': boolean;
    'grpc.service_config': boolean;
    'grpc.max_concurrent_streams': boolean;
    'grpc.initial_reconnect_backoff_ms': boolean;
    'grpc.max_reconnect_backoff_ms': boolean;
    'grpc.use_local_subchannel_pool': boolean;
    'grpc.max_send_message_length': boolean;
    'grpc.max_receive_message_length': boolean;
    'grpc.enable_http_proxy': boolean;
    'grpc-node.max_session_memory': boolean;
};
export declare function channelOptionsEqual(options1: ChannelOptions, options2: ChannelOptions): boolean;
