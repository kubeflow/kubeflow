export interface TouchRippleClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the internal `Ripple` components `ripple` class. */
    ripple: string;
    /** Styles applied to the internal `Ripple` components `rippleVisible` class. */
    rippleVisible: string;
    /** Styles applied to the internal `Ripple` components `ripplePulsate` class. */
    ripplePulsate: string;
    /** Styles applied to the internal `Ripple` components `child` class. */
    child: string;
    /** Styles applied to the internal `Ripple` components `childLeaving` class. */
    childLeaving: string;
    /** Styles applied to the internal `Ripple` components `childPulsate` class. */
    childPulsate: string;
}
export declare type TouchRippleClassKey = keyof TouchRippleClasses;
export declare function getTouchRippleUtilityClass(slot: string): string;
declare const touchRippleClasses: TouchRippleClasses;
export default touchRippleClasses;
