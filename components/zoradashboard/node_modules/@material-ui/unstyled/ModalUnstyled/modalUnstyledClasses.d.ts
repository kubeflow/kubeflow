export interface ModalUnstyledClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if the `Modal` has exited. */
    hidden: string;
}
export declare type ModalUnstyledClassKey = keyof ModalUnstyledClasses;
export declare function getModalUtilityClass(slot: string): string;
declare const modalUnstyledClasses: ModalUnstyledClasses;
export default modalUnstyledClasses;
