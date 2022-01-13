import { XRProvider, XROptions, SceneOptions } from './types';
export declare class XRClass {
    private _options;
    private _pluggables;
    private _defaultProvider;
    /**
     * Initialize XR with AWS configurations
     *
     * @param {XROptions} options - Configuration object for XR
     */
    constructor(options: XROptions);
    /**
     * Configure XR part with configurations
     *
     * @param {XROptions} config - Configuration for XR
     * @return {Object} - The current configuration
     */
    configure(options: XROptions): XROptions;
    /**
     * add plugin into XR category
     * @param {Object} pluggable - an instance of the plugin
     */
    addPluggable(pluggable: XRProvider): Promise<object>;
    loadScene(sceneName: string, domElementId: string, sceneOptions?: SceneOptions, provider?: string): Promise<any>;
    isSceneLoaded(sceneName: string, provider?: string): boolean;
    getSceneController(sceneName: string, provider?: string): any;
    isVRCapable(sceneName: string, provider?: string): boolean;
    isVRPresentationActive(sceneName: string, provider?: string): boolean;
    start(sceneName: string, provider?: string): void;
    enterVR(sceneName: string, provider?: string): void;
    exitVR(sceneName: string, provider?: string): void;
    isMuted(sceneName: string, provider?: string): boolean;
    setMuted(sceneName: string, muted: boolean, provider?: string): void;
    onSceneEvent(sceneName: string, eventName: string, eventHandler: Function, provider?: string): void;
    enableAudio(sceneName: string, provider?: string): void;
}
export declare const XR: XRClass;
