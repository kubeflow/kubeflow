import { PubSub } from './PubSub';
export * from './Providers';
declare enum CONTROL_MSG {
    CONNECTION_CLOSED = "Connection closed",
    CONNECTION_FAILED = "Connection failed",
    REALTIME_SUBSCRIPTION_INIT_ERROR = "AppSync Realtime subscription init error",
    SUBSCRIPTION_ACK = "Subscription ack",
    TIMEOUT_DISCONNECT = "Timeout disconnect"
}
export { PubSub, CONTROL_MSG };
/**
 * @deprecated use named import
 */
export default PubSub;
