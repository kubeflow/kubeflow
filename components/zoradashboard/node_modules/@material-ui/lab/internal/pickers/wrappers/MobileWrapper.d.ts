import * as React from 'react';
import { ExportedPickerModalProps } from '../PickersModalDialog';
import { PrivateWrapperProps, DateInputPropsLike } from './WrapperProps';
export interface MobileWrapperProps extends ExportedPickerModalProps {
    children?: React.ReactNode;
}
export interface InternalMobileWrapperProps extends MobileWrapperProps, PrivateWrapperProps {
    DateInputProps: DateInputPropsLike & {
        ref?: React.Ref<HTMLDivElement>;
    };
    PureDateInputComponent: React.JSXElementConstructor<DateInputPropsLike>;
}
declare function MobileWrapper(props: InternalMobileWrapperProps): JSX.Element;
export default MobileWrapper;
