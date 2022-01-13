import { testMethodProperty } from "./helpers.js";

export default {

    "SubscriptionObserver.prototype has an next method" (test, { Observable }) {

        let observer;
        new Observable(x => { observer = x }).subscribe({});

        testMethodProperty(test, Object.getPrototypeOf(observer), "next", {
            configurable: true,
            writable: true,
            length: 1
        });
    },

    "Input value" (test, { Observable }) {

        let token = {};

        new Observable(observer => {

            observer.next(token, 1, 2);

        }).subscribe({

            next(value, ...args) {
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
          .equals(observer.next(), undefined);

            observer.complete();

            test._("Returns undefined when closed")
            .equals(observer.next(), undefined);

        }).subscribe({
            next() { return token }
        });
    },

    "Thrown error" (test, { Observable }) {

        let token = {};

        new Observable(observer => {

            test._("Catches errors thrown from the observer")
            .equals(observer.next(), undefined);

        }).subscribe({
            next() { throw new Error(); }
        });
    },

    "Method lookup" (test, { Observable }) {

        let observer,
            observable = new Observable(x => { observer = x });

        observable.subscribe({});
        test._("If property does not exist, then next returns undefined")
        .equals(observer.next(), undefined);

        observable.subscribe({ next: undefined });
        test._("If property is undefined, then next returns undefined")
        .equals(observer.next(), undefined);

        observable.subscribe({ next: null });
        test._("If property is null, then next returns undefined")
        .equals(observer.next(), undefined);

        observable.subscribe({ next: {} });
        test._("If property is not a function, then next returns undefined")
        .equals(observer.next(), undefined);

        let actual = {};
        let calls = 0;
        observable.subscribe(actual);
        actual.next = (_=> calls++);
        test._("Method is not accessed until complete is called")
        .equals(observer.next() || calls, 1);

        let called = 0;
        observable.subscribe({
            get next() {
                called++;
                return function() {};
            }
        });
        observer.complete();
        observer.next();
        test._("Method is not accessed when subscription is closed")
        .equals(called, 0);

        called = 0;
        observable.subscribe({
            get next() {
                called++;
                return function() {};
            }
        });
        observer.next();
        test._("Property is only accessed once during a lookup")
        .equals(called, 1);

    },

    "Cleanup functions" (test, { Observable }) {

        let observer;

        let observable = new Observable(x => {
            observer = x;
            return _=> { };
        });

        let subscription = observable.subscribe({ next() { throw new Error() } });
        observer.next()
        test._("Subscription is not closed when next throws an error")
        .equals(subscription.closed, false);
    },

};
