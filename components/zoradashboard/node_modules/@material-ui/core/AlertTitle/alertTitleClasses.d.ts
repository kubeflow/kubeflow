export interface AlertTitleClasses {
    /** Styles applied to the root element. */
    root: string;
}
export declare type AlertTitleClassKey = keyof AlertTitleClasses;
export declare function getAlertTitleUtilityClass(slot: string): string;
declare const alertTitleClasses: AlertTitleClasses;
export default alertTitleClasses;
