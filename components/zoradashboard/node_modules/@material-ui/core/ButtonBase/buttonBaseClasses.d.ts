export interface ButtonBaseClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: string;
    /** Pseudo-class applied to the root element if keyboard focused. */
    focusVisible: string;
}
export declare type ButtonBaseClassKey = keyof ButtonBaseClasses;
export declare function getButtonBaseUtilityClass(slot: string): string;
declare const buttonBaseClasses: ButtonBaseClasses;
export default buttonBaseClasses;
