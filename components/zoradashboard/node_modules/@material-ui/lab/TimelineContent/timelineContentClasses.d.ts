export interface TimelineContentClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `position="right"`. */
    positionRight: string;
    /** Styles applied to the root element if `position="left"`. */
    positionLeft: string;
    /** Styles applied to the root element if `position="alternate"`. */
    positionAlternate: string;
}
export declare type TimelineContentClassKey = keyof TimelineContentClasses;
export declare function getTimelineContentUtilityClass(slot: string): string;
declare const timelineContentClasses: TimelineContentClasses;
export default timelineContentClasses;
