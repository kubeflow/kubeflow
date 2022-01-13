import { SceneOptions } from './XR';
export interface XRProvider {
    configure(config: object): object;
    getCategory(): string;
    getProviderName(): string;
    loadScene(sceneName: string, domElementId: string, sceneOptions: SceneOptions): any;
    isSceneLoaded(sceneName: any): boolean;
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
