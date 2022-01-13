export declare type SpacingOptions = number | Spacing | ((abs: number) => number | string) | ((abs: number | string) => number | string) | ReadonlyArray<string | number>;
export declare type SpacingArgument = number | string;
export interface Spacing {
    (): string;
    (value: number): string;
    (topBottom: SpacingArgument, rightLeft: SpacingArgument): string;
    (top: SpacingArgument, rightLeft: SpacingArgument, bottom: SpacingArgument): string;
    (top: SpacingArgument, right: SpacingArgument, bottom: SpacingArgument, left: SpacingArgument): string;
}
export default function createSpacing(spacingInput?: SpacingOptions): Spacing;
