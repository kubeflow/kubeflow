export interface TimelineItemClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `position="left"`. */
    positionLeft: string;
    /** Styles applied to the root element if `position="right"`. */
    positionRight: string;
    /** Styles applied to the root element if `position="alternate"`. */
    positionAlternate: string;
    /** Styles applied to the root element if TimelineOppositeContent isn't provided. */
    missingOppositeContent: string;
}
export declare type TimelineItemClassKey = keyof TimelineItemClasses;
export declare function getTimelineItemUtilityClass(slot: string): string;
declare const timelineItemClasses: TimelineItemClasses;
export default timelineItemClasses;
