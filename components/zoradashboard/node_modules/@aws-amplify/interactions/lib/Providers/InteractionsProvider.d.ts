import { InteractionsProvider, InteractionsOptions, InteractionsResponse } from '../types';
export declare abstract class AbstractInteractionsProvider implements InteractionsProvider {
    protected _config: InteractionsOptions;
    constructor(options?: InteractionsOptions);
    configure(config?: InteractionsOptions): InteractionsOptions;
    getCategory(): string;
    abstract getProviderName(): string;
    protected get options(): InteractionsOptions;
    abstract sendMessage(botname: string, message: string | Object): Promise<object>;
    abstract onComplete(botname: string, callback: (err: any, confirmation: InteractionsResponse) => void): any;
}
