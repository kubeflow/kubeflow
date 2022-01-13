export interface TimelineConnectorClasses {
    /** Styles applied to the root element. */
    root: string;
}
export declare type TimelineConnectorClassKey = keyof TimelineConnectorClasses;
export declare function getTimelineConnectorUtilityClass(slot: string): string;
declare const timelineConnectorClasses: TimelineConnectorClasses;
export default timelineConnectorClasses;
