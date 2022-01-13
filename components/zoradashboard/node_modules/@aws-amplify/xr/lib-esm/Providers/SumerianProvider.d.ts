import { AbstractXRProvider } from './XRProvider';
import { ProviderOptions, SceneOptions } from '../types';
declare type SumerianSceneOptions = SceneOptions & {
    progressCallback: Function;
};
export declare class SumerianProvider extends AbstractXRProvider {
    constructor(options?: ProviderOptions);
    getProviderName(): string;
    private loadScript;
    loadScene(sceneName: string, domElementId: string, sceneOptions: SumerianSceneOptions): Promise<void>;
    isSceneLoaded(sceneName: string): any;
    private getScene;
    getSceneController(sceneName: string): any;
    isVRCapable(sceneName: string): boolean;
    isVRPresentationActive(sceneName: string): boolean;
    start(sceneName: string): void;
    enterVR(sceneName: string): void;
    exitVR(sceneName: string): void;
    isMuted(sceneName: string): boolean;
    setMuted(sceneName: string, muted: boolean): void;
    onSceneEvent(sceneName: string, eventName: string, eventHandler: Function): void;
    enableAudio(sceneName: string): void;
}
export {};
