/// <reference types="node" />
export declare class StreamDecoder {
    private readState;
    private readCompressFlag;
    private readPartialSize;
    private readSizeRemaining;
    private readMessageSize;
    private readPartialMessage;
    private readMessageRemaining;
    write(data: Buffer): Buffer[];
}
