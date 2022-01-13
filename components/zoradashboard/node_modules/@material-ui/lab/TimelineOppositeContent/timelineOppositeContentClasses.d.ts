export interface TimelineOppositeContentClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `position="right"`. */
    positionRight: string;
    /** Styles applied to the root element if `position="left"`. */
    positionLeft: string;
    /** Styles applied to the root element if `position="alternate"`. */
    positionAlternate: string;
}
export declare type TimelineOppositeContentClassKey = keyof TimelineOppositeContentClasses;
export declare function getTimelineOppositeContentUtilityClass(slot: string): string;
declare const timelineOppositeContentClasses: TimelineOppositeContentClasses;
export default timelineOppositeContentClasses;
