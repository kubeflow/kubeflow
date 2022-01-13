import { FetchOptions } from '../global';
/**
 * @ts-ignore
 */
export declare type WorkerRefreshTokenMessage = {
    timeout: number;
    fetchUrl: string;
    fetchOptions: FetchOptions;
    auth?: {
        audience?: string;
        scope?: string;
    };
};
