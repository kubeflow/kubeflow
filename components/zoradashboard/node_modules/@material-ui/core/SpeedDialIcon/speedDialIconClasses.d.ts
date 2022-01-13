export interface SpeedDialIconClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the icon component. */
    icon: string;
    /** Styles applied to the icon component if `open={true}`. */
    iconOpen: string;
    /** Styles applied to the icon when an `openIcon` is provided and if `open={true}`. */
    iconWithOpenIconOpen: string;
    /** Styles applied to the `openIcon` if provided. */
    openIcon: string;
    /** Styles applied to the `openIcon` if provided and if `open={true}`. */
    openIconOpen: string;
}
export declare type SpeedDialIconClassKey = keyof SpeedDialIconClasses;
export declare function getSpeedDialIconUtilityClass(slot: string): string;
declare const speedDialIconClasses: SpeedDialIconClasses;
export default speedDialIconClasses;
