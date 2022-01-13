import { FirebaseStorageError } from './error';
/**
 * Function that is called once for each value in a stream of values.
 */
export declare type NextFn<T> = (value: T) => void;
/**
 * A function that is called with a `FirebaseStorageError`
 * if the event stream ends due to an error.
 */
export declare type ErrorFn = (error: FirebaseStorageError) => void;
/**
 * A function that is called if the event stream ends normally.
 */
export declare type CompleteFn = () => void;
/**
 * Unsubscribes from a stream.
 */
export declare type Unsubscribe = () => void;
/**
 * An observer identical to the `Observer` defined in packages/util except the
 * error passed into the ErrorFn is specifically a `FirebaseStorageError`.
 */
export interface StorageObserver<T> {
    /**
     * Function that is called once for each value in the event stream.
     */
    next?: NextFn<T>;
    /**
     * A function that is called with a `FirebaseStorageError`
     * if the event stream ends due to an error.
     */
    error?: ErrorFn;
    /**
     * A function that is called if the event stream ends normally.
     */
    complete?: CompleteFn;
}
/**
 * Subscribes to an event stream.
 */
export declare type Subscribe<T> = (next?: NextFn<T> | StorageObserver<T>, error?: ErrorFn, complete?: CompleteFn) => Unsubscribe;
export declare class Observer<T> implements StorageObserver<T> {
    next?: NextFn<T>;
    error?: ErrorFn;
    complete?: CompleteFn;
    constructor(nextOrObserver?: NextFn<T> | StorageObserver<T>, error?: ErrorFn, complete?: CompleteFn);
}
