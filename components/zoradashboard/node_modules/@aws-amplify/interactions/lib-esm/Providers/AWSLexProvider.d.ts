import { AbstractInteractionsProvider } from './InteractionsProvider';
import { InteractionsOptions, InteractionsResponse, InteractionsMessage } from '../types';
export declare class AWSLexProvider extends AbstractInteractionsProvider {
    private lexRuntimeServiceClient;
    private _botsCompleteCallback;
    constructor(options?: InteractionsOptions);
    getProviderName(): string;
    reportBotStatus(data: any, botname: any): void;
    sendMessage(botname: string, message: string | InteractionsMessage): Promise<InteractionsResponse>;
    onComplete(botname: string, callback: any): void;
}
