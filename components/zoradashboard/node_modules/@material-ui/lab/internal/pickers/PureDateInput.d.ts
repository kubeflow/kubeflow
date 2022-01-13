import * as React from 'react';
import { TextFieldProps as MuiTextFieldPropsType } from '@material-ui/core/TextField';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { InputAdornmentProps } from '@material-ui/core/InputAdornment';
import { ParseableDate } from './constants/prop-types';
import { MuiPickersAdapter } from './hooks/useUtils';
export declare type MuiTextFieldProps = MuiTextFieldPropsType | Omit<MuiTextFieldPropsType, 'variant'>;
export interface DateInputProps<TInputValue = ParseableDate<unknown>, TDateValue = unknown> {
    /**
     * Regular expression to detect "accepted" symbols.
     * @default /\dap/gi
     */
    acceptRegex?: RegExp;
    /**
     * The components used for each slot.
     * Either a string to use a HTML element or a component.
     */
    components?: {
        OpenPickerIcon?: React.ElementType;
    };
    disabled?: boolean;
    /**
     * Disable mask on the keyboard, this should be used rarely. Consider passing proper mask for your format.
     * @default false
     */
    disableMaskedInput?: boolean;
    /**
     * Do not render open picker button (renders only text field with validation).
     * @default false
     */
    disableOpenPicker?: boolean;
    /**
     * Get aria-label text for control that opens picker dialog. Aria-label text must include selected date. @DateIOType
     * @default (value, utils) => `Choose date, selected date is ${utils.format(utils.date(value), 'fullDate')}`
     */
    getOpenDialogAriaText?: (value: ParseableDate<TDateValue>, utils: MuiPickersAdapter<TDateValue>) => string;
    ignoreInvalidInputs?: boolean;
    /**
     * Props to pass to keyboard input adornment.
     */
    InputAdornmentProps?: Partial<InputAdornmentProps>;
    inputFormat: string;
    InputProps?: MuiTextFieldProps['InputProps'];
    /**
     * Pass a ref to the `input` element.
     */
    inputRef?: React.Ref<HTMLInputElement>;
    label?: MuiTextFieldProps['label'];
    /**
     * Custom mask. Can be used to override generate from format. (e.g. `__/__/____ __:__` or `__/__/____ __:__ _M`).
     */
    mask?: string;
    onBlur?: () => void;
    onChange: (date: TDateValue, keyboardInputValue?: string) => void;
    open: boolean;
    openPicker: () => void;
    /**
     * Props to pass to keyboard adornment button.
     */
    OpenPickerButtonProps?: Partial<IconButtonProps>;
    rawValue: TInputValue;
    readOnly?: boolean;
    /**
     * The `renderInput` prop allows you to customize the rendered input.
     * The `props` argument of this render prop contains props of [TextField](https://material-ui.com/api/text-field/#textfield-api) that you need to forward.
     * Pay specific attention to the `ref` and `inputProps` keys.
     * @example ```jsx
     * renderInput={props => <TextField {...props} />}
     * ````
     */
    renderInput: (props: MuiTextFieldPropsType) => React.ReactElement;
    /**
     * Custom formatter to be passed into Rifm component.
     */
    rifmFormatter?: (str: string) => string;
    TextFieldProps?: Partial<MuiTextFieldProps>;
    validationError?: boolean;
}
export declare type ExportedDateInputProps<TInputValue, TDateValue> = Omit<DateInputProps<TInputValue, TDateValue>, 'inputFormat' | 'inputValue' | 'onBlur' | 'onChange' | 'open' | 'openPicker' | 'rawValue' | 'TextFieldProps' | 'validationError'>;
export declare const PureDateInput: React.ForwardRefExoticComponent<DateInputProps<unknown, unknown> & React.RefAttributes<HTMLDivElement>>;
