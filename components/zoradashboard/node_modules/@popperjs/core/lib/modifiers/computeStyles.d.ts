import type { PositioningStrategy, Offsets, Modifier, Rect } from "../types";
import { BasePlacement } from "../enums";
export declare type RoundOffsets = (offsets: Partial<{
    x: number;
    y: number;
    centerOffset: number;
}>) => Offsets;
export declare type Options = {
    gpuAcceleration: boolean;
    adaptive: boolean;
    roundOffsets?: boolean | RoundOffsets;
};
export declare function mapToStyles({ popper, popperRect, placement, offsets, position, gpuAcceleration, adaptive, roundOffsets }: {
    popper: HTMLElement;
    popperRect: Rect;
    placement: BasePlacement;
    offsets: Partial<{
        x: number;
        y: number;
        centerOffset: number;
    }>;
    position: PositioningStrategy;
    gpuAcceleration: boolean;
    adaptive: boolean;
    roundOffsets: boolean | RoundOffsets;
}): {
    transform: string;
    top: string;
    right: string;
    bottom: string;
    left: string;
    position: PositioningStrategy;
};
export declare type ComputeStylesModifier = Modifier<"computeStyles", Options>;
declare const _default: ComputeStylesModifier;
export default _default;
