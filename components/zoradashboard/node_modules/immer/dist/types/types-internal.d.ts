import { SetState, ImmerScope, ProxyObjectState, ProxyArrayState, ES5ObjectState, ES5ArrayState, MapState, DRAFT_STATE } from "../internal";
export declare type Objectish = AnyObject | AnyArray | AnyMap | AnySet;
export declare type ObjectishNoSet = AnyObject | AnyArray | AnyMap;
export declare type AnyObject = {
    [key: string]: any;
};
export declare type AnyArray = Array<any>;
export declare type AnySet = Set<any>;
export declare type AnyMap = Map<any, any>;
export declare const ArchtypeObject = 0;
export declare const ArchtypeArray = 1;
export declare const ArchtypeMap = 2;
export declare const ArchtypeSet = 3;
export declare const ProxyTypeProxyObject = 0;
export declare const ProxyTypeProxyArray = 1;
export declare const ProxyTypeES5Object = 4;
export declare const ProxyTypeES5Array = 5;
export declare const ProxyTypeMap = 2;
export declare const ProxyTypeSet = 3;
export interface ImmerBaseState {
    parent_?: ImmerState;
    scope_: ImmerScope;
    modified_: boolean;
    finalized_: boolean;
    isManual_: boolean;
}
export declare type ImmerState = ProxyObjectState | ProxyArrayState | ES5ObjectState | ES5ArrayState | MapState | SetState;
export declare type Drafted<Base = any, T extends ImmerState = ImmerState> = {
    [DRAFT_STATE]: T;
} & Base;
//# sourceMappingURL=types-internal.d.ts.map