import { Hash, SourceData } from "@aws-sdk/types";
export declare class Md5 implements Hash {
    private state;
    private buffer;
    private bufferLength;
    private bytesHashed;
    private finished;
    update(sourceData: SourceData): void;
    digest(): Promise<Uint8Array>;
    private hashBuffer;
}
