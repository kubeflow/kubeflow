export declare type HubCapsule = {
    channel: string;
    payload: HubPayload;
    source: string;
    patternInfo?: string[];
};
export declare type HubPayload = {
    event: string;
    data?: any;
    message?: string;
};
export declare type HubCallback = (capsule: HubCapsule) => void;
export declare type LegacyCallback = {
    onHubCapsule: HubCallback;
};
export declare class HubClass {
    name: string;
    private listeners;
    private patterns;
    protectedChannels: string[];
    constructor(name: string);
    remove(channel: string | RegExp, listener: HubCallback): void;
    dispatch(channel: string, payload: HubPayload, source?: string, ampSymbol?: Symbol): void;
    listen(channel: string | RegExp, callback?: HubCallback | LegacyCallback, listenerName?: string): () => void;
    private _toListeners;
}
export declare const Hub: HubClass;
/**
 * @deprecated use named import
 */
export default Hub;
