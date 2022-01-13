import { WorkerRefreshTokenMessage } from './worker.types';

/**
 * Sends the specified message to the web worker
 * @param message The message to send
 * @param to The worker to send the message to
 */
export const sendMessage = (message: WorkerRefreshTokenMessage, to: Worker) =>
  new Promise(function (resolve, reject) {
    const messageChannel = new MessageChannel();

    messageChannel.port1.onmessage = function (event) {
      // Only for fetch errors, as these get retried
      if (event.data.error) {
        reject(new Error(event.data.error));
      } else {
        resolve(event.data);
      }
    };

    to.postMessage(message, [messageChannel.port2]);
  });
