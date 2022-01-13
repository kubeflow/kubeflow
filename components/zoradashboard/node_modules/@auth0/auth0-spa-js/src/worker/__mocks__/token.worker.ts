const { messageHandler } = jest.requireActual('../token.worker');

export default class {
  postMessage(data, ports) {
    messageHandler({
      data,
      ports
    });
  }
}
