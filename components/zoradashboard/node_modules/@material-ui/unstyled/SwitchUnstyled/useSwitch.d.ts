import * as React from 'react';
export interface SwitchState {
    checked: Readonly<boolean>;
    disabled: Readonly<boolean>;
    readOnly: Readonly<boolean>;
    focusVisible: Readonly<boolean>;
}
export interface UseSwitchResult extends SwitchState {
    /**
     * Returns props for an HTML `input` element that is a part of a Switch.
     */
    getInputProps: (otherProps?: React.HTMLAttributes<HTMLInputElement>) => SwitchInputProps;
}
/**
 * Props used by an HTML `input` element that is a part of a Switch.
 */
export interface SwitchInputProps {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    onBlur: React.FocusEventHandler;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onFocus: React.FocusEventHandler;
    readOnly?: boolean;
    ref: React.Ref<any>;
    required?: boolean;
}
export interface UseSwitchProps {
    /**
     * If `true`, the component is checked.
     */
    checked?: boolean;
    /**
     * The default checked state. Use when the component is not controlled.
     */
    defaultChecked?: boolean;
    /**
     * If `true`, the component is disabled.
     */
    disabled?: boolean;
    onBlur?: React.FocusEventHandler;
    /**
     * Callback fired when the state is changed.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
     * You can pull out the new value by accessing `event.target.value` (string).
     * You can pull out the new checked state by accessing `event.target.checked` (boolean).
     */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler;
    onFocusVisible?: React.FocusEventHandler;
    /**
     * If `true`, the component is read only.
     */
    readOnly?: boolean;
    /**
     * If `true`, the `input` element is required.
     */
    required?: boolean;
}
/**
 * The basic building block for creating custom switches.
 *
 * Demos:
 *
 * - [Switches](https://material-ui.com/components/switches/)
 */
export default function useSwitch(props: UseSwitchProps): UseSwitchResult;
