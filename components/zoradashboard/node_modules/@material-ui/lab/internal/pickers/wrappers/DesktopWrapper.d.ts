import * as React from 'react';
import { ExportedPickerPopperProps } from '../PickersPopper';
import { DateInputPropsLike, PrivateWrapperProps } from './WrapperProps';
export interface DesktopWrapperProps extends ExportedPickerPopperProps {
    children?: React.ReactNode;
}
export interface InternalDesktopWrapperProps extends DesktopWrapperProps, PrivateWrapperProps {
    DateInputProps: DateInputPropsLike & {
        ref?: React.Ref<HTMLDivElement>;
    };
    KeyboardDateInputComponent: React.JSXElementConstructor<DateInputPropsLike & {
        ref?: React.Ref<HTMLDivElement>;
    }>;
}
declare function DesktopWrapper(props: InternalDesktopWrapperProps): JSX.Element;
export default DesktopWrapper;
