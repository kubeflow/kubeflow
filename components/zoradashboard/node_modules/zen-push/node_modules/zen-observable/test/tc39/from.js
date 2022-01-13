import { testMethodProperty, hasSymbol, getSymbol } from "./helpers.js";

// TODO: Verify that Observable.from subscriber returns a cleanup function

export default {

    "Observable has a from property" (test, { Observable }) {

        testMethodProperty(test, Observable, "from", {
            configurable: true,
            writable: true,
            length: 1
        });
    },

    "Allowed argument types" (test, { Observable }) {

        test
        ._("Null is not allowed")
        .throws(_=> Observable.from(null), TypeError)
        ._("Undefined is not allowed")
        .throws(_=> Observable.from(undefined), TypeError)
        .throws(_=> Observable.from(), TypeError);
    },

    "Uses the this value if it's a function" (test, { Observable }) {

        let usesThis = false;

        Observable.from.call(function(_) { usesThis = true; }, []);
        test._("Observable.from will use the 'this' value if it is callable")
        .equals(usesThis, true);
    },

    "Uses 'Observable' if the 'this' value is not a function" (test, { Observable }) {

        let result = Observable.from.call({}, []);

        test._("Observable.from will use 'Observable' if the this value is not callable")
        .assert(result instanceof Observable);
    },

    "Symbol.observable method is accessed" (test, { Observable }) {

        let called = 0;

        Observable.from({
            get [getSymbol("observable")]() {
                called++;
                return _=> ({});
            }
        });

        test._("Symbol.observable property is accessed once")
        .equals(called, 1);

        test
        ._("Symbol.observable must be a function")
        .throws(_=> Observable.from({ [getSymbol("observable")]: {} }), TypeError)
        .throws(_=> Observable.from({ [getSymbol("observable")]: 0 }), TypeError)
        .throws(_=> Observable.from({ [getSymbol("observable")]: null }), TypeError)
        .throws(_=> Observable.from({ [getSymbol("observable")]: undefined }), TypeError)
        ;

        called = 0;
        Observable.from({
            [getSymbol("observable")]() {
                called++;
                return {};
            }
        });

        test._("Calls the Symbol.observable method")
        .equals(called, 1);
    },

    "Return value of Symbol.observable" (test, { Observable }) {

        test._("Throws if the return value of Symbol.observable is not an object")
        .throws(_=> Observable.from({ [getSymbol("observable")]() { return 0 } }), TypeError)
        .throws(_=> Observable.from({ [getSymbol("observable")]() { return null } }), TypeError)
        .throws(_=> Observable.from({ [getSymbol("observable")]() {} }), TypeError)
        .not().throws(_=> Observable.from({ [getSymbol("observable")]() { return {} } }))
        .not().throws(_=> Observable.from({ get [getSymbol("observable")]() { return _=> ({}) } }))
        ;

        let target = function() {},
            returnValue = { constructor: target };

        let result = Observable.from.call(target, {
            [getSymbol("observable")]() { return returnValue }
        });

        test._("Returns the result of Symbol.observable if the object's constructor property " +
            "is the target")
        .equals(result, returnValue);

        let input = null,
            token = {};

        target = function(fn) {
            this.fn = fn;
            this.token = token;
        };

        result = Observable.from.call(target, {
            [getSymbol("observable")]() {
                return {
                    subscribe(x) {
                        input = x;
                        return token;
                    },
                };
            }
        });

        test._("Calls the constructor if returned object does not have matching constructor " +
            "property")
        .equals(result.token, token)
        ._("Constructor is called with a function")
        .equals(typeof result.fn, "function")
        ._("Calling the function calls subscribe on the object and returns the result")
        .equals(result.fn && result.fn(123), token)
        ._("The subscriber argument is supplied to the subscribe method")
        .equals(input, 123)
        ;

    },

    "Iterables: values are delivered to next" (test, { Observable }) {

        let values = [],
            turns = 0,
            iterable = [1, 2, 3, 4];

        if (hasSymbol("iterator"))
            iterable = iterable[Symbol.iterator]();

        Observable.from(iterable).subscribe({

            next(v) {
                values.push(v);
            },

            complete() {
                test._("All items are delivered and complete is called")
                .equals(values, [1, 2, 3, 4]);
            },
        });
    },

    "Non-convertibles throw" (test, { Observable }) {

        test._("If argument is not observable or iterable, subscribe throws")
        .throws(_=> Observable.from({}).subscribe({}), TypeError);

    },

};
