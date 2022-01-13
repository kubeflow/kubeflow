/// <reference types="node" />
import { S3Client, PutObjectRequest } from '@aws-sdk/client-s3';
import * as events from 'events';
export declare interface Part {
    bodyPart: any;
    partNumber: number;
    emitter: events.EventEmitter;
    etag?: string;
    _lastUploadedBytes: number;
}
export declare class AWSS3ProviderManagedUpload {
    protected minPartSize: number;
    private queueSize;
    private body;
    private params;
    private opts;
    private completedParts;
    private cancel;
    private bytesUploaded;
    private totalBytesToUpload;
    private emitter;
    constructor(params: PutObjectRequest, opts: any, emitter: events.EventEmitter);
    upload(): Promise<string | import("@aws-sdk/client-s3/types/").PutObjectCommandOutput>;
    private createParts;
    private createMultiPartUpload;
    /**
     * @private Not to be extended outside of tests
     * @VisibleFotTesting
     */
    protected uploadParts(uploadId: string, parts: Part[]): Promise<void>;
    private finishMultiPartUpload;
    private checkIfUploadCancelled;
    cancelUpload(): void;
    private cleanup;
    private removeEventListener;
    private setupEventListener;
    private progressChanged;
    private byteLength;
    private validateAndSanitizeBody;
    private isGenericObject;
    /**
     * @private
     * creates an S3 client with new V3 aws sdk
     */
    protected _createNewS3Client(config: any, emitter?: events.EventEmitter): Promise<S3Client>;
    /**
     * @private
     */
    _getCredentials(): any;
}
