import { testMethodProperty } from "./helpers.js";

export default {

    "SubscriptionObserver.prototype has an error method" (test, { Observable }) {

        let observer;
        new Observable(x => { observer = x }).subscribe({});

        testMethodProperty(test, Object.getPrototypeOf(observer), "error", {
            configurable: true,
            writable: true,
            length: 1
        });
    },

    "Input value" (test, { Observable }) {

        let token = {};

        new Observable(observer => {

            observer.error(token, 1, 2);

        }).subscribe({

            error(value, ...args) {
                test._("Input value is forwarded to the observer")
                .equals(value, token)
                ._("Additional arguments are not forwarded")
                .equals(args.length, 0);
            }

        });
    },

    "Return value" (test, { Observable }) {

        let token = {};

        new Observable(observer => {

            test._("Suppresses the value returned from the observer")
            .equals(observer.error(), undefined);

            test._("Returns undefined when closed")
            .equals(observer.error(), undefined);

        }).subscribe({
            error() { return token }
        });
    },

    "Thrown error" (test, { Observable }) {

        let token = {};

        new Observable(observer => {

            test._("Catches errors thrown from the observer")
            .equals(observer.error(), undefined);

        }).subscribe({
            error() { throw new Error(); }
        });
    },

    "Method lookup" (test, { Observable }) {

        let observer,
            error = new Error(),
            observable = new Observable(x => { observer = x });

        observable.subscribe({});
        test._("If property does not exist, then error returns undefined")
        .equals(observer.error(error), undefined);

        observable.subscribe({ error: undefined });
        test._("If property is undefined, then error returns undefined")
        .equals(observer.error(error), undefined);

        observable.subscribe({ error: null });
        test._("If property is null, then error returns undefined")
        .equals(observer.error(error), undefined);

        observable.subscribe({ error: {} });
        test._("If property is not a function, then error returns undefined")
        .equals(observer.error(error), undefined);

        let actual = {};
        let calls = 0;
        observable.subscribe(actual);
        actual.error = (_=> calls++);
        test._("Method is not accessed until error is called")
        .equals(observer.error(error) || calls, 1);

        let called = 0;
        observable.subscribe({
            get error() {
                called++;
                return function() {};
            }
        });
        observer.complete();
        try { observer.error(error) }
        catch (x) {}
        test._("Method is not accessed when subscription is closed")
        .equals(called, 0);

        called = 0;
        observable.subscribe({
            get error() {
                called++;
                return function() {};
            }
        });
        observer.error();
        test._("Property is only accessed once during a lookup")
        .equals(called, 1);

        called = 0;
        observable.subscribe({
            next() { called++ },
            get error() {
                called++;
                observer.next();
                return function() {};
            }
        });
        observer.error();
        test._("When method lookup occurs, subscription is closed")
        .equals(called, 1);

    },

    "Cleanup functions" (test, { Observable }) {

        let called, observer;

        let observable = new Observable(x => {
            observer = x;
            return _=> { called++ };
        });

        called = 0;
        observable.subscribe({});
        try { observer.error() }
        catch (x) {}
        test._("Cleanup function is called when observer does not have an error method")
        .equals(called, 1);

        called = 0;
        observable.subscribe({ error() { return 1 } });
        observer.error();
        test._("Cleanup function is called when observer has an error method")
        .equals(called, 1);

        called = 0;
        observable.subscribe({ get error() { throw new Error() } });
        observer.error()
        test._("Cleanup function is called when method lookup throws")
        .equals(called, 1);

        called = 0;
        observable.subscribe({ error() { throw new Error() } });
        observer.error()
        test._("Cleanup function is called when method throws")
        .equals(called, 1);
    },

};
