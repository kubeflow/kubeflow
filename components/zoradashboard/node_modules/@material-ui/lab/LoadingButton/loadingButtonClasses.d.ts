export interface LoadingButtonClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `loading={true}`. */
    loading: string;
    /** Styles applied to the loadingIndicator element. */
    loadingIndicator: string;
    /** Styles applied to the loadingIndicator element if `loadingPosition="center"`. */
    loadingIndicatorCenter: string;
    /** Styles applied to the loadingIndicator element if `loadingPosition="start"`. */
    loadingIndicatorStart: string;
    /** Styles applied to the loadingIndicator element if `loadingPosition="end"`. */
    loadingIndicatorEnd: string;
    /** Styles applied to the endIcon element if `loading={true}` and `loadingPosition="end"`. */
    endIconLoadingEnd: string;
    /** Styles applied to the startIcon element if `loading={true}` and `loadingPosition="start"`. */
    startIconLoadingStart: string;
}
export declare type LoadingButtonClassKey = keyof LoadingButtonClasses;
export declare function getLoadingButtonUtilityClass(slot: string): string;
declare const loadingButtonClasses: LoadingButtonClasses;
export default loadingButtonClasses;
