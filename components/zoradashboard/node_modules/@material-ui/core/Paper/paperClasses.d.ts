export interface PaperClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element unless `square={true}`. */
    rounded: string;
    /** Styles applied to the root element if `variant="outlined"`. */
    outlined: string;
    /** Styles applied to the root element if `variant="elevation"`. */
    elevation: string;
    elevation0: string;
    elevation1: string;
    elevation2: string;
    elevation3: string;
    elevation4: string;
    elevation5: string;
    elevation6: string;
    elevation7: string;
    elevation8: string;
    elevation9: string;
    elevation10: string;
    elevation11: string;
    elevation12: string;
    elevation13: string;
    elevation14: string;
    elevation15: string;
    elevation16: string;
    elevation17: string;
    elevation18: string;
    elevation19: string;
    elevation20: string;
    elevation21: string;
    elevation22: string;
    elevation23: string;
    elevation24: string;
}
export declare type PaperClassKey = keyof PaperClasses;
export declare function getPaperUtilityClass(slot: string): string;
declare const paperClasses: PaperClasses;
export default paperClasses;
