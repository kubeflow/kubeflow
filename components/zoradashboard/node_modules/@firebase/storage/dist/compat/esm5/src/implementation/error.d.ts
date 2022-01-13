import { FirebaseError } from '@firebase/util';
/**
 * An error returned by the Firebase Storage SDK.
 * @public
 */
export declare class FirebaseStorageError extends FirebaseError {
    private readonly _baseMessage;
    /**
     * Stores custom error data unque to FirebaseStorageError.
     */
    customData: {
        serverResponse: string | null;
    };
    /**
     * @param code - A StorageErrorCode string to be prefixed with 'storage/' and
     *  added to the end of the message.
     * @param message  - Error message.
     */
    constructor(code: StorageErrorCode, message: string);
    /**
     * Compares a StorageErrorCode against this error's code, filtering out the prefix.
     */
    _codeEquals(code: StorageErrorCode): boolean;
    /**
     * Optional response message that was added by the server.
     */
    get serverResponse(): null | string;
    set serverResponse(serverResponse: string | null);
}
export declare const errors: {};
/**
 * @public
 * Error codes that can be attached to `FirebaseStorageError`s.
 */
export declare const enum StorageErrorCode {
    UNKNOWN = "unknown",
    OBJECT_NOT_FOUND = "object-not-found",
    BUCKET_NOT_FOUND = "bucket-not-found",
    PROJECT_NOT_FOUND = "project-not-found",
    QUOTA_EXCEEDED = "quota-exceeded",
    UNAUTHENTICATED = "unauthenticated",
    UNAUTHORIZED = "unauthorized",
    UNAUTHORIZED_APP = "unauthorized-app",
    RETRY_LIMIT_EXCEEDED = "retry-limit-exceeded",
    INVALID_CHECKSUM = "invalid-checksum",
    CANCELED = "canceled",
    INVALID_EVENT_NAME = "invalid-event-name",
    INVALID_URL = "invalid-url",
    INVALID_DEFAULT_BUCKET = "invalid-default-bucket",
    NO_DEFAULT_BUCKET = "no-default-bucket",
    CANNOT_SLICE_BLOB = "cannot-slice-blob",
    SERVER_FILE_WRONG_SIZE = "server-file-wrong-size",
    NO_DOWNLOAD_URL = "no-download-url",
    INVALID_ARGUMENT = "invalid-argument",
    INVALID_ARGUMENT_COUNT = "invalid-argument-count",
    APP_DELETED = "app-deleted",
    INVALID_ROOT_OPERATION = "invalid-root-operation",
    INVALID_FORMAT = "invalid-format",
    INTERNAL_ERROR = "internal-error",
    UNSUPPORTED_ENVIRONMENT = "unsupported-environment"
}
export declare function prependCode(code: StorageErrorCode): string;
export declare function unknown(): FirebaseStorageError;
export declare function objectNotFound(path: string): FirebaseStorageError;
export declare function bucketNotFound(bucket: string): FirebaseStorageError;
export declare function projectNotFound(project: string): FirebaseStorageError;
export declare function quotaExceeded(bucket: string): FirebaseStorageError;
export declare function unauthenticated(): FirebaseStorageError;
export declare function unauthorizedApp(): FirebaseStorageError;
export declare function unauthorized(path: string): FirebaseStorageError;
export declare function retryLimitExceeded(): FirebaseStorageError;
export declare function invalidChecksum(path: string, checksum: string, calculated: string): FirebaseStorageError;
export declare function canceled(): FirebaseStorageError;
export declare function invalidEventName(name: string): FirebaseStorageError;
export declare function invalidUrl(url: string): FirebaseStorageError;
export declare function invalidDefaultBucket(bucket: string): FirebaseStorageError;
export declare function noDefaultBucket(): FirebaseStorageError;
export declare function cannotSliceBlob(): FirebaseStorageError;
export declare function serverFileWrongSize(): FirebaseStorageError;
export declare function noDownloadURL(): FirebaseStorageError;
export declare function invalidArgument(message: string): FirebaseStorageError;
export declare function invalidArgumentCount(argMin: number, argMax: number, fnName: string, real: number): FirebaseStorageError;
export declare function appDeleted(): FirebaseStorageError;
/**
 * @param name - The name of the operation that was invalid.
 */
export declare function invalidRootOperation(name: string): FirebaseStorageError;
/**
 * @param format - The format that was not valid.
 * @param message - A message describing the format violation.
 */
export declare function invalidFormat(format: string, message: string): FirebaseStorageError;
/**
 * @param message - A message describing the internal error.
 */
export declare function unsupportedEnvironment(message: string): FirebaseStorageError;
/**
 * @param message - A message describing the internal error.
 */
export declare function internalError(message: string): FirebaseStorageError;
