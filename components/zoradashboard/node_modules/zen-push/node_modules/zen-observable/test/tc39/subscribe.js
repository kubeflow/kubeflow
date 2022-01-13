import { testMethodProperty } from "./helpers.js";

export default {

    "Observable.prototype has a subscribe property" (test, { Observable }) {

        testMethodProperty(test, Observable.prototype, "subscribe", {
            configurable: true,
            writable: true,
            length: 1,
        });
    },

    "Argument type" (test, { Observable }) {

        let x = new Observable(sink => null);

        test
        ._("Any value passed as observer will not cause subscribe to throw")
        .not().throws(_=> x.subscribe(null))
        .not().throws(_=> x.subscribe(undefined))
        .not().throws(_=> x.subscribe(1))
        .not().throws(_=> x.subscribe(true))
        .not().throws(_=> x.subscribe("string"))
        .not().throws(_=> x.subscribe({}))
        .not().throws(_=> x.subscribe(Object(1)))
        .not().throws(_=> x.subscribe(function() {}))
        ;
    },

    "Function arguments" (test, { Observable }) {

        let list = [], error = new Error();

        new Observable(s => {
            s.next(1);
            s.error(error);
        }).subscribe(
            x => list.push("next:" + x),
            e => list.push(e),
            x => list.push("complete:" + x)
        );

        new Observable(s => {
            s.complete();
        }).subscribe(
            x => list.push("next:" + x),
            e => list.push(e),
            x => list.push("complete")
        );

        test
        ._("First argument is next callback")
        .equals(list[0], "next:1")
        ._("Second argument is error callback")
        .equals(list[1], error)
        ._("Third argument is complete callback")
        .equals(list[2], "complete");

        list = [];

        test.
          _("Second and third arguments are optional")
          .not().throws(
            () => new Observable(
              s => {
                s.next(1);
                s.complete();
              }).subscribe(x => list.push("next:" + x)))
          .equals(list, ["next:1"]);
    },

    "Subscriber arguments" (test, { Observable }) {

        let observer = null;
        new Observable(x => { observer = x }).subscribe({});

        test._("Subscriber is called with an observer")
        .equals(typeof observer, "object")
        .equals(typeof observer.next, "function")
        .equals(typeof observer.error, "function")
        .equals(typeof observer.complete, "function")
        ;

        test._("Subscription observer's constructor property is Object")
        .equals(observer.constructor, Object);
    },

    "Subscriber return types" (test, { Observable }) {

        let type = "", sink = {};

        test
        ._("Undefined can be returned")
        .not().throws(_=> new Observable(sink => undefined).subscribe(sink))
        ._("Null can be returned")
        .not().throws(_=> new Observable(sink => null).subscribe(sink))
        ._("Functions can be returned")
        .not().throws(_=> new Observable(sink => function() {}).subscribe(sink))
        ._("Subscriptions can be returned")
        .not().throws(_=> new Observable(sink => ({ unsubscribe() {} }).subscribe(sink)))
        ._("Non callable, non-subscription objects cannot be returned")
        .throws(
            _ => {
                let error;
                new Observable(sink => ({})).subscribe({ error(e) { error = e; } });
                throw error;
            },
            TypeError)
        ._("Non-functions cannot be returned")
        .throws(
            _ => {
                let error;
                new Observable(sink => 0).subscribe({ error(e) { error = e; } });
                throw error;
            },
            TypeError)
        .throws(
            _ => {
                let error;
                new Observable(sink => false).subscribe({ error(e) { error = e; } });
                throw error;
            },
            TypeError);
    },

    "Returns a subscription object" (test, { Observable }) {

        let called = 0;
        let subscription = new Observable(observer => {
            return _=> called++;
        }).subscribe({});

        let proto = Object.getPrototypeOf(subscription);

        testMethodProperty(test, proto, "unsubscribe", {
            configurable: true,
            writable: true,
            length: 0,
        });

        testMethodProperty(test, proto, "closed", {
            get: true,
            configurable: true,
            writable: true,
            length: 0,
        });

        test
        ._("Subscribe returns an object")
        .equals(typeof subscription, "object")
        ._("Contructor property is Object")
        .equals(subscription.constructor, Object)
        ._("closed property returns false before unsubscription")
        .equals(subscription.closed, false)
        ._("Unsubscribe returns undefined")
        .equals(subscription.unsubscribe(), undefined)
        ._("Unsubscribe calls the cleanup function")
        .equals(called, 1)
        ._("closed property is true after calling unsubscribe")
        .equals(subscription.closed, true)
        ;
    },

    "Cleanup function" (test, { Observable }) {

        let called = 0,
            returned = 0;

        let subscription = new Observable(sink => {
            return _=> { called++ };
        }).subscribe({
            complete() { returned++ },
        });

        subscription.unsubscribe();

        test._("The cleanup function is called when unsubscribing")
        .equals(called, 1);

        subscription.unsubscribe();

        test._("The cleanup function is not called again when unsubscribe is called again")
        .equals(called, 1);

        called = 0;

        new Observable(sink => {
            sink.error(1);
            return _=> { called++ };
        }).subscribe({
            error() {},
        });

        test._("The cleanup function is called when an error is sent to the sink")
        .equals(called, 1);

        called = 0;

        new Observable(sink => {
            sink.complete(1);
            return _=> { called++ };
        }).subscribe({
            next() {},
        });

        test._("The cleanup function is called when a complete is sent to the sink")
        .equals(called, 1);

        let unsubscribeArgs = null;
        called = 0;

        subscription = new Observable(sink => {
            return {
                unsubscribe(...args) {
                    called = 1;
                    unsubscribeArgs = args;
                }
            };
        }).subscribe({
            next() {},
        });

        subscription.unsubscribe(1);
        test._("If a subscription is returned, then unsubscribe is called on cleanup")
        .equals(called, 1)
        ._("Arguments are not forwarded to the unsubscribe function")
        .equals(unsubscribeArgs, []);

    },

    "Exceptions thrown from the subscriber" (test, { Observable }) {

        let error = new Error(),
            observable = new Observable(_=> { throw error });

        test._("Subscribe does not throw if the observer does not handle errors")
        .not().throws(_=> observable.subscribe({}), error);

        let thrown = null;

        test._("Subscribe does not throw if the observer has an error method")
        .not().throws(_=> { observable.subscribe({ error(e) { thrown = e } }) });

        test._("Subscribe sends an error to the observer")
        .equals(thrown, error);
    },

    "Start method" (test, { Observable }) {

        let events = [];

        let observable = new Observable(observer => {
            events.push("subscriber");
            observer.complete();
        });

        let observer = {

            startCalls: 0,
            thisValue: null,
            subscription: null,

            start(subscription) {
                events.push("start");
                observer.startCalls++;
                observer.thisValue = this;
                observer.subscription = subscription;
            }
        }

        let subscription = observable.subscribe(observer);

        test._("If the observer has a start method, it is called")
        .equals(observer.startCalls, 1)
        ._("Start is called with the observer as the this value")
        .equals(observer.thisValue, observer)
        ._("Start is called with the subscription as the first argument")
        .equals(observer.subscription, subscription)
        ._("Start is called before the subscriber function is called")
        .equals(events, ["start", "subscriber"]);

        events = [];

        observer = {
            start(subscription) {
                events.push("start");
                subscription.unsubscribe();
            }
        };

        subscription = observable.subscribe(observer);

        test._("If unsubscribe is called from start, the subscriber is not called")
        .equals(events, ["start"]);
    },

};
