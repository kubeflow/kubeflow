import { XRProvider, ProviderOptions, SceneOptions } from '../types';
export declare abstract class AbstractXRProvider implements XRProvider {
    private _config;
    constructor(options?: ProviderOptions);
    configure(config?: ProviderOptions): ProviderOptions;
    getCategory(): string;
    abstract getProviderName(): string;
    protected get options(): ProviderOptions;
    abstract loadScene(sceneName: string, domElementId: string, sceneOptions: SceneOptions): void;
    abstract isSceneLoaded(sceneName: string): any;
    abstract getSceneController(sceneName: string): any;
    abstract isVRCapable(sceneName: string): boolean;
    abstract isVRPresentationActive(sceneName: string): boolean;
    abstract start(sceneName: string): void;
    abstract enterVR(sceneName: string): void;
    abstract exitVR(sceneName: string): void;
    abstract isMuted(sceneName: string): boolean;
    abstract setMuted(sceneName: string, muted: boolean): void;
    abstract onSceneEvent(sceneName: string, eventName: string, eventHandler: Function): void;
    abstract enableAudio(sceneName: string): void;
}
