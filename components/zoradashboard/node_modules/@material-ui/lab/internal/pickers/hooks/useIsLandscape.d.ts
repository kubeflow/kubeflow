import { AllAvailableViews } from '../typings/Views';
declare type Orientation = 'portrait' | 'landscape';
export declare function useIsLandscape(views: readonly AllAvailableViews[], customOrientation: Orientation | undefined): boolean;
export default useIsLandscape;
