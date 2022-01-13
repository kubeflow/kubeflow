import { TestRunner } from "moon-unit";

import constructor from "./constructor.js";
import subscribe from "./subscribe.js";
import observable from "./symbol-observable.js";
import ofTests from "./of.js";
import fromTests from "./from.js";

import observerNext from "./observer-next.js";
import observerError from "./observer-error.js";
import observerComplete from "./observer-complete.js";
import observerClosed from "./observer-closed.js";


export function runTests(C) {

    return new TestRunner().inject({ Observable: C }).run({

        "Observable constructor": constructor,

        "Observable.prototype.subscribe": subscribe,
        "Observable.prototype[Symbol.observable]": observable,

        "Observable.of": ofTests,
        "Observable.from": fromTests,

        "SubscriptionObserver.prototype.next": observerNext,
        "SubscriptionObserver.prototype.error": observerError,
        "SubscriptionObserver.prototype.complete": observerComplete,
        "SubscriptionObserver.prototype.closed": observerClosed,

    });
}
