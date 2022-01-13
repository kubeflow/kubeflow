import { testMethodProperty } from "./helpers.js";

export default {

    "SubscriptionObserver.prototype has a closed getter" (test, { Observable }) {

        let observer;
        new Observable(x => { observer = x }).subscribe({});

        testMethodProperty(test, Object.getPrototypeOf(observer), "closed", {
            get: true,
            configurable: true,
            writable: true,
            length: 1
        });
    },

    "Returns false when the subscription is active" (test, { Observable }) {
        new Observable(observer => {
            test._("Returns false when the subscription is active")
            .equals(observer.closed, false);
        }).subscribe({});
    },

    "Returns true when the subscription is closed" (test, { Observable }) {
        new Observable(observer => {
            observer.complete();
            test._("Returns true after complete is called")
            .equals(observer.closed, true);
        }).subscribe({});

        new Observable(observer => {
            observer.error(1);
            test._("Returns true after error is called")
            .equals(observer.closed, true);
        }).subscribe({ error() {} });

        let observer;

        new Observable(x => { observer = x }).subscribe({}).unsubscribe();
        test._("Returns true after unsubscribe is called")
        .equals(observer.closed, true);
    },

};
