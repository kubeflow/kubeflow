/**
 * Cloud Storage for Firebase
 *
 * @packageDocumentation
 */
import { StorageService } from './public-types';
/**
 * Modify this `StorageService` instance to communicate with the Cloud Storage emulator.
 *
 * @param storage - The `StorageService` instance
 * @param host - The emulator host (ex: localhost)
 * @param port - The emulator port (ex: 5001)
 * @public
 */
export declare function useStorageEmulator(storage: StorageService, host: string, port: number): void;
export { StringFormat } from '../src/implementation/string';
export * from './api';
