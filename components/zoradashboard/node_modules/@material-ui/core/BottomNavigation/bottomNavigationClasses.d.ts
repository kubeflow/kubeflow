export interface BottomNavigationClasses {
    /** Styles applied to the root element. */
    root: string;
}
export declare type BottomNavigationClassKey = keyof BottomNavigationClasses;
export declare function getBottomNavigationUtilityClass(slot: string): string;
declare const bottomNavigationClasses: BottomNavigationClasses;
export default bottomNavigationClasses;
