import * as React from 'react';
import { MobileWrapperProps } from './MobileWrapper';
import { DesktopWrapperProps } from './DesktopWrapper';
import { DateInputPropsLike, PrivateWrapperProps } from './WrapperProps';
export interface ResponsiveWrapperProps extends MobileWrapperProps, DesktopWrapperProps {
    /**
     * CSS media query when `Mobile` mode will be changed to `Desktop`.
     * @default '@media (pointer: fine)'
     * @example '@media (min-width: 720px)' or theme.breakpoints.up('sm')
     */
    desktopModeMediaQuery?: string;
}
interface InternalResponsiveWrapperProps extends ResponsiveWrapperProps, PrivateWrapperProps {
    DateInputProps: DateInputPropsLike & {
        ref?: React.Ref<HTMLDivElement>;
    };
    KeyboardDateInputComponent: React.JSXElementConstructor<DateInputPropsLike & {
        ref?: React.Ref<HTMLDivElement>;
    }>;
    PureDateInputComponent: React.JSXElementConstructor<DateInputPropsLike>;
}
export declare function ResponsiveTooltipWrapper(props: InternalResponsiveWrapperProps): JSX.Element;
export {};
