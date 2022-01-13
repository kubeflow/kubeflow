export interface SwitchBaseClasses {
    root: string;
    checked: string;
    disabled: string;
    input: string;
    edgeStart: string;
    edgeEnd: string;
}
export declare type SwitchBaseClassKey = keyof SwitchBaseClasses;
export declare function getSwitchBaseUtilityClass(slot: string): string;
declare const switchBaseClasses: SwitchBaseClasses;
export default switchBaseClasses;
