const anyGlobal = global as any;

anyGlobal.navigator = anyGlobal.navigator || {};

// @ts-ignore
anyGlobal.navigator.sendBeacon = anyGlobal.navigator.sendBeacon || jest.fn();
