import Observable from 'zen-observable-ts';
import { ProvidertOptions } from './PubSub';
export interface PubSubProvider {
    configure(config: object): object;
    getCategory(): string;
    getProviderName(): string;
    publish(topics: string[] | string, msg: any, options?: ProvidertOptions): void;
    subscribe(topics: string[] | string, options?: ProvidertOptions): Observable<any>;
}
