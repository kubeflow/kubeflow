export interface SpeedDialClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the Fab component. */
    fab: string;
    /** Styles applied to the root element if direction="up" */
    directionUp: string;
    /** Styles applied to the root element if direction="down" */
    directionDown: string;
    /** Styles applied to the root element if direction="left" */
    directionLeft: string;
    /** Styles applied to the root element if direction="right" */
    directionRight: string;
    /** Styles applied to the actions (`children` wrapper) element. */
    actions: string;
    /** Styles applied to the actions (`children` wrapper) element if `open={false}`. */
    actionsClosed: string;
}
export declare type SpeedDialClassKey = keyof SpeedDialClasses;
export declare function getSpeedDialUtilityClass(slot: string): string;
declare const speedDialClasses: SpeedDialClasses;
export default speedDialClasses;
