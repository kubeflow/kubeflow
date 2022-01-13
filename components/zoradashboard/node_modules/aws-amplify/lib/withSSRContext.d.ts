import { AmplifyClass } from '@aws-amplify/core';
declare type Context = {
    req?: any;
    modules?: any[];
};
export declare function withSSRContext(context?: Context): AmplifyClass;
export {};
