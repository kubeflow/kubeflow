import { FetchOptions } from '../global';

/**
 * @ts-ignore
 */
export type WorkerRefreshTokenMessage = {
  timeout: number;
  fetchUrl: string;
  fetchOptions: FetchOptions;
  auth?: {
    audience?: string;
    scope?: string;
  };
};
