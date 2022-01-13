import { TestRunner } from "moon-unit";

new TestRunner().run({
  "Symbol.observable is polyfilled" (test) {
    Symbol.observable = undefined;
    require("../zen-observable.js");
    test.equals(typeof Symbol.observable, "symbol");
  },
});
