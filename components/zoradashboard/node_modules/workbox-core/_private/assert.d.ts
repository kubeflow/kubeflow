import { WorkboxErrorDetails } from '../_private/WorkboxError.js';
import '../_version.js';
declare const finalAssertExports: {
    hasMethod: (object: {
        [key: string]: any;
    }, expectedMethod: string, details: WorkboxErrorDetails) => void;
    isArray: (value: any[], details: WorkboxErrorDetails) => void;
    isInstance: (object: {}, expectedClass: Function, details: WorkboxErrorDetails) => void;
    isOneOf: (value: any, validValues: any[], details: WorkboxErrorDetails) => void;
    isType: (object: {}, expectedType: string, details: WorkboxErrorDetails) => void;
    isArrayOfClass: (value: any, expectedClass: Function, details: WorkboxErrorDetails) => void;
} | null;
export { finalAssertExports as assert };
