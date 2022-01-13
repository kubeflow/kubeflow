import { WorkerRefreshTokenMessage } from './worker.types';
/**
 * Sends the specified message to the web worker
 * @param message The message to send
 * @param to The worker to send the message to
 */
export declare const sendMessage: (message: WorkerRefreshTokenMessage, to: Worker) => Promise<unknown>;
