import { testMethodProperty, getSymbol } from "./helpers.js";

export default {

    "Observable.prototype has a Symbol.observable method" (test, { Observable }) {

        testMethodProperty(test, Observable.prototype, getSymbol("observable"), {
            configurable: true,
            writable: true,
            length: 0
        });
    },

    "Return value" (test, { Observable }) {

        let desc = Object.getOwnPropertyDescriptor(Observable.prototype, getSymbol("observable")),
            thisVal = {};

        test._("Returns the 'this' value").equals(desc.value.call(thisVal), thisVal);
    }

};
