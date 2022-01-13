export interface PromiseHandlers {
    resolve: Function;
    reject: Function;
}
export interface AnalyticsProvider {
    configure(config: object): object;
    record(params: object, handlers?: PromiseHandlers): Promise<boolean>;
    getCategory(): string;
    getProviderName(): string;
}
