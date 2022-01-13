import Observable, { ZenObservable } from 'zen-observable-ts';
import { ConsoleLogger as Logger } from '@aws-amplify/core';
import { ReachabilityMonitor } from './datastoreReachability';

const logger = new Logger('DataStore');

const RECONNECTING_IN = 5000; // 5s this may be configurable in the future

type ConnectionStatus = {
	// Might add other params in the future
	online: boolean;
};

export default class DataStoreConnectivity {
	private connectionStatus: ConnectionStatus;
	private observer: ZenObservable.SubscriptionObserver<ConnectionStatus>;
	private subscription: ZenObservable.Subscription;
	private timeout: ReturnType<typeof setTimeout>;
	constructor() {
		this.connectionStatus = {
			online: false,
		};
	}

	status(): Observable<ConnectionStatus> {
		if (this.observer) {
			throw new Error('Subscriber already exists');
		}
		return new Observable(observer => {
			this.observer = observer;
			// Will be used to forward socket connection changes, enhancing Reachability

			this.subscription = ReachabilityMonitor.subscribe(({ online }) => {
				this.connectionStatus.online = online;

				const observerResult = { ...this.connectionStatus }; // copyOf status

				observer.next(observerResult);
			});

			return () => {
				clearTimeout(this.timeout);
				this.unsubscribe();
			};
		});
	}

	unsubscribe() {
		if (this.subscription) {
			clearTimeout(this.timeout);
			this.subscription.unsubscribe();
		}
	}

	socketDisconnected() {
		if (this.observer && typeof this.observer.next === 'function') {
			this.observer.next({ online: false }); // Notify network issue from the socket

			this.timeout = setTimeout(() => {
				const observerResult = { ...this.connectionStatus }; // copyOf status
				this.observer.next(observerResult);
			}, RECONNECTING_IN); // giving time for socket cleanup and network status stabilization
		}
	}
}
