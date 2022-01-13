export interface TextFieldClasses {
    /** Styles applied to the root element. */
    root: string;
}
export declare type TextFieldClassKey = keyof TextFieldClasses;
export declare function getTextFieldUtilityClass(slot: string): string;
declare const textFieldClasses: TextFieldClasses;
export default textFieldClasses;
