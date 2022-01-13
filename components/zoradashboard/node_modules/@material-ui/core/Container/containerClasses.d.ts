export interface ContainerClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `disableGutters={true}`. */
    disableGutters: string;
    /** Styles applied to the root element if `fixed={true}`. */
    fixed: string;
    /** Styles applied to the root element if `maxWidth="xs"`. */
    maxWidthXs: string;
    /** Styles applied to the root element if `maxWidth="sm"`. */
    maxWidthSm: string;
    /** Styles applied to the root element if `maxWidth="md"`. */
    maxWidthMd: string;
    /** Styles applied to the root element if `maxWidth="lg"`. */
    maxWidthLg: string;
    /** Styles applied to the root element if `maxWidth="xl"`. */
    maxWidthXl: string;
}
export declare type ContainerClassKey = keyof ContainerClasses;
export declare function getContainerUtilityClass(slot: string): string;
declare const containerClasses: ContainerClasses;
export default containerClasses;
