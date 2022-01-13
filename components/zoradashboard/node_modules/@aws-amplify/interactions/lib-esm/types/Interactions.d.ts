export interface InteractionsOptions {
    [key: string]: any;
}
export declare type InteractionsTextMessage = {
    content: string;
    options: {
        messageType: 'text';
    };
};
export declare type InteractionsVoiceMessage = {
    content: object;
    options: {
        messageType: 'voice';
    };
};
export declare type InteractionsMessage = InteractionsTextMessage | InteractionsVoiceMessage;
