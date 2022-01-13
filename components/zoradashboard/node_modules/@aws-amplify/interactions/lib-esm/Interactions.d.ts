import { InteractionsOptions, InteractionsProvider, InteractionsMessage, InteractionsResponse } from './types';
export declare class InteractionsClass {
    private _options;
    private _pluggables;
    /**
     * Initialize PubSub with AWS configurations
     *
     * @param {InteractionsOptions} options - Configuration object for Interactions
     */
    constructor(options: InteractionsOptions);
    getModuleName(): string;
    /**
     *
     * @param {InteractionsOptions} options - Configuration object for Interactions
     * @return {Object} - The current configuration
     */
    configure(options: InteractionsOptions): InteractionsOptions;
    addPluggable(pluggable: InteractionsProvider): void;
    send(botname: string, message: string): Promise<InteractionsResponse>;
    send(botname: string, message: InteractionsMessage): Promise<InteractionsResponse>;
    send(botname: string, message: object): Promise<InteractionsResponse>;
    onComplete(botname: string, callback: (err: any, confirmation: any) => void): void;
}
export declare const Interactions: InteractionsClass;
