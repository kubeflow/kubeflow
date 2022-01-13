import '../../_version.js';
interface MessageParam {
    [key: string]: any;
}
interface MessageMap {
    [messageID: string]: (param: MessageParam) => string;
}
export declare const messages: MessageMap;
export {};
