var anyGlobal = global;
anyGlobal.navigator = anyGlobal.navigator || {};
// @ts-ignore
anyGlobal.navigator.sendBeacon = anyGlobal.navigator.sendBeacon || jest.fn();
//# sourceMappingURL=setupTests.js.map