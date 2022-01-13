import { testMethodProperty } from "./helpers.js";

// TODO: Verify that Observable.from subscriber returns a cleanup function

export default {

    "Observable has an of property" (test, { Observable }) {

        testMethodProperty(test, Observable, "of", {
            configurable: true,
            writable: true,
            length: 0,
        });
    },

    "Uses the this value if it's a function" (test, { Observable }) {

        let usesThis = false;

        Observable.of.call(function(_) { usesThis = true; });
        test._("Observable.of will use the 'this' value if it is callable")
        .equals(usesThis, true);
    },

    "Uses 'Observable' if the 'this' value is not a function" (test, { Observable }) {

        let result = Observable.of.call({}, 1, 2, 3, 4);

        test._("Observable.of will use 'Observable' if the this value is not callable")
        .assert(result instanceof Observable);
    },

    "Arguments are delivered to next" (test, { Observable }) {

        let values = [],
            turns = 0;

        Observable.of(1, 2, 3, 4).subscribe({

            next(v) {
                values.push(v);
            },

            complete() {
                test._("All items are delivered and complete is called")
                .equals(values, [1, 2, 3, 4]);
            },
        });
    },

};
