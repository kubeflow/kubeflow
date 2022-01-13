import { testMethodProperty } from "./helpers.js";

export default {

    "SubscriptionObserver.prototype has a complete method" (test, { Observable }) {

        let observer;
        new Observable(x => { observer = x }).subscribe({});

        testMethodProperty(test, Object.getPrototypeOf(observer), "complete", {
            configurable: true,
            writable: true,
            length: 0
        });
    },

    "Input value" (test, { Observable }) {

        let token = {};

        new Observable(observer => {

            observer.complete(token, 1, 2);

        }).subscribe({

            complete(...args) {
                test._("Arguments are not forwarded")
                .equals(args.length, 0);
            }

        });
    },

    "Return value" (test, { Observable }) {

        let token = {};

        new Observable(observer => {

            test._("Suppresses the value returned from the observer")
            .equals(observer.complete(), undefined);

            test._("Returns undefined when closed")
            .equals(observer.complete(), undefined);

        }).subscribe({
            complete() { return token }
        });
    },

    "Thrown error" (test, { Observable }) {

        let token = {};

        new Observable(observer => {

            test._("Catches errors thrown from the observer")
            .equals(observer.complete(), undefined);

        }).subscribe({
            complete() { throw new Error(); }
        });
    },

    "Method lookup" (test, { Observable }) {

        let observer,
            observable = new Observable(x => { observer = x });

        observable.subscribe({});
        test._("If property does not exist, then complete returns undefined")
        .equals(observer.complete(), undefined);

        observable.subscribe({ complete: undefined });
        test._("If property is undefined, then complete returns undefined")
        .equals(observer.complete(), undefined);

        observable.subscribe({ complete: null });
        test._("If property is null, then complete returns undefined")
        .equals(observer.complete(), undefined);

        observable.subscribe({ complete: {} });
        test._("If property is not a function, then complete returns undefined")
        .equals(observer.complete(), undefined);

        let actual = {};
        let calls = 0;
        observable.subscribe(actual);
        actual.complete = (_=> calls++);
        test._("Method is not accessed until complete is called")
        .equals(observer.complete() || calls, 1);

        let called = 0;
        observable.subscribe({
            get complete() {
                called++;
                return function() {};
            },
            error() {},
        });
        observer.error(new Error());
        observer.complete();
        test._("Method is not accessed when subscription is closed")
        .equals(called, 0);

        called = 0;
        observable.subscribe({
            get complete() {
                called++;
                return function() {};
            }
        });
        observer.complete();
        test._("Property is only accessed once during a lookup")
        .equals(called, 1);

        called = 0;
        observable.subscribe({
            next() { called++ },
            get complete() {
                called++;
                observer.next();
                return function() { return 1 };
            }
        });
        observer.complete();
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
        observer.complete();
        test._("Cleanup function is called when observer does not have a complete method")
        .equals(called, 1);

        called = 0;
        observable.subscribe({ complete() { return 1 } });
        observer.complete();
        test._("Cleanup function is called when observer has a complete method")
        .equals(called, 1);

        called = 0;
        observable.subscribe({ get complete() { throw new Error() } });
        observer.complete();
        test._("Cleanup function is called when method lookup throws")
        .equals(called, 1);

        called = 0;
        observable.subscribe({ complete() { throw new Error() } });
        observer.complete();
        test._("Cleanup function is called when method throws")
        .equals(called, 1);
    },

};
