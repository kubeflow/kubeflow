import { ClientRequest } from "http";
import { Socket } from "net";

export const setConnectionTimeout = (request: ClientRequest, reject: (err: Error) => void, timeoutInMs = 0) => {
  if (!timeoutInMs) {
    return;
  }

  request.on("socket", (socket: Socket) => {
    if (socket.connecting) {
      // Throw a connecting timeout error unless a connection is made within x time.
      const timeoutId = setTimeout(() => {
        // destroy the request.
        request.destroy();
        reject(
          Object.assign(new Error(`Socket timed out without establishing a connection within ${timeoutInMs} ms`), {
            name: "TimeoutError",
          })
        );
      }, timeoutInMs);

      // if the connection was established, cancel the timeout.
      socket.on("connect", () => {
        clearTimeout(timeoutId);
      });
    }
  });
};
