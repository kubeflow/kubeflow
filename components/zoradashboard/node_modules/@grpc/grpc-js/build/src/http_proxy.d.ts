/// <reference types="node" />
import { Socket } from 'net';
import * as tls from 'tls';
import { SubchannelAddress } from './subchannel';
import { ChannelOptions } from './channel-options';
import { GrpcUri } from './uri-parser';
export interface ProxyMapResult {
    target: GrpcUri;
    extraOptions: ChannelOptions;
}
export declare function mapProxyName(target: GrpcUri, options: ChannelOptions): ProxyMapResult;
export interface ProxyConnectionResult {
    socket?: Socket;
    realTarget?: GrpcUri;
}
export declare function getProxiedConnection(address: SubchannelAddress, channelOptions: ChannelOptions, connectionOptions: tls.ConnectionOptions): Promise<ProxyConnectionResult>;
