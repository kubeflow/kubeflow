export interface TcpSubchannelAddress {
    port: number;
    host: string;
}
export interface IpcSubchannelAddress {
    path: string;
}
/**
 * This represents a single backend address to connect to. This interface is a
 * subset of net.SocketConnectOpts, i.e. the options described at
 * https://nodejs.org/api/net.html#net_socket_connect_options_connectlistener.
 * Those are in turn a subset of the options that can be passed to http2.connect.
 */
export declare type SubchannelAddress = TcpSubchannelAddress | IpcSubchannelAddress;
export declare function isTcpSubchannelAddress(address: SubchannelAddress): address is TcpSubchannelAddress;
export declare function subchannelAddressEqual(address1: SubchannelAddress, address2: SubchannelAddress): boolean;
export declare function subchannelAddressToString(address: SubchannelAddress): string;
