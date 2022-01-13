import * as React from 'react';
import { DialogProps as MuiDialogProps } from '@material-ui/core/Dialog';
export interface ExportedPickerModalProps {
    /**
     * Ok button text.
     * @default 'OK'
     */
    okText?: React.ReactNode;
    /**
     * Cancel text message.
     * @default 'Cancel'
     */
    cancelText?: React.ReactNode;
    /**
     * Clear text message.
     * @default 'Clear'
     */
    clearText?: React.ReactNode;
    /**
     * Today text message.
     * @default 'Today'
     */
    todayText?: React.ReactNode;
    /**
     * If `true`, it shows the clear action in the picker dialog.
     * @default false
     */
    clearable?: boolean;
    /**
     * If `true`, the today button is displayed. **Note** that `showClearButton` has a higher priority.
     * @default false
     */
    showTodayButton?: boolean;
    /**
     * Props applied to the [`Dialog`](/api/dialog/) element.
     */
    DialogProps?: Partial<MuiDialogProps>;
}
export interface PickersModalDialogProps extends ExportedPickerModalProps {
    onAccept: () => void;
    onClear: () => void;
    onDismiss: () => void;
    onSetToday: () => void;
    open: boolean;
}
declare const PickersModalDialog: (props: React.PropsWithChildren<PickersModalDialogProps>) => JSX.Element;
export default PickersModalDialog;
