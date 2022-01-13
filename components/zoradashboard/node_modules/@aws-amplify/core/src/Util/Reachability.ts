import { browserOrNode, isWebWorker } from '@aws-amplify/core';
import Observable, { ZenObservable } from 'zen-observable-ts';

type NetworkStatus = {
	online: boolean;
};

export default class ReachabilityNavigator implements Reachability {
	private static _observers: Array<
		ZenObservable.SubscriptionObserver<NetworkStatus>
	> = [];

	networkMonitor(netInfo?: any): Observable<NetworkStatus> {
		if (browserOrNode().isNode) {
			return Observable.from([{ online: true }]);
		}

		const globalObj = isWebWorker() ? self : window;

		return new Observable(observer => {
			observer.next({ online: globalObj.navigator.onLine });

			const notifyOnline = () => observer.next({ online: true });
			const notifyOffline = () => observer.next({ online: false });

			globalObj.addEventListener('online', notifyOnline);
			globalObj.addEventListener('offline', notifyOffline);

			ReachabilityNavigator._observers.push(observer);

			return () => {
				globalObj.removeEventListener('online', notifyOnline);
				globalObj.removeEventListener('offline', notifyOffline);

				ReachabilityNavigator._observers = ReachabilityNavigator._observers.filter(
					_observer => _observer !== observer
				);
			};
		});
	}

	// expose observers to simulate offline mode for integration testing
	private static _observerOverride(status: NetworkStatus): void {
		for (const observer of ReachabilityNavigator._observers) {
			if (observer.closed) {
				ReachabilityNavigator._observers = ReachabilityNavigator._observers.filter(
					_observer => _observer !== observer
				);
				continue;
			}
			observer.next(status);
		}
	}
}

interface Reachability {
	networkMonitor(netInfo?: any): Observable<NetworkStatus>;
}
