export declare class MethodEmbed {
    context: any;
    methodName: any;
    private _originalMethod;
    private _bindedMethod;
    static add(context: any, methodName: any, methodOverride: any): void;
    static remove(context: any, methodName: any): void;
    constructor(context: any, methodName: any);
    set(methodOverride: any): void;
    remove(): void;
}
/**
 * @deprecated use named import
 */
export default MethodEmbed;
