import * as React from 'react';
import { RangeInput, DateRange, CurrentlySelectingRangeEndProps } from './RangeTypes';
import { DateRangeValidationError } from '../internal/pickers/date-utils';
import { DateInputProps, ExportedDateInputProps, MuiTextFieldProps } from '../internal/pickers/PureDateInput';
export interface ExportedDateRangePickerInputProps extends Omit<ExportedDateInputProps<RangeInput<any>, DateRange<any>>, 'renderInput'> {
    /**
     * The `renderInput` prop allows you to customize the rendered input.
     * The `startProps` and `endProps` arguments of this render prop contains props of [TextField](https://material-ui.com/api/text-field/#textfield-api),
     * that you need to forward to the range start/end inputs respectively.
     * Pay specific attention to the `ref` and `inputProps` keys.
     * @example
     * ```jsx
     * <DateRangePicker
     *  renderInput={(startProps, endProps) => (
     *   <React.Fragment>
     *     <TextField {...startProps} />
     *     <Box sx={{ mx: 2 }}> to </Box>
     *     <TextField {...endProps} />
     *   </React.Fragment>;
     *  )}
     * />
     * ````
     */
    renderInput: (startProps: MuiTextFieldProps, endProps: MuiTextFieldProps) => React.ReactElement;
}
export interface DateRangeInputProps extends ExportedDateRangePickerInputProps, CurrentlySelectingRangeEndProps, Omit<DateInputProps<RangeInput<any>, DateRange<any>>, 'validationError' | 'renderInput'> {
    startText: React.ReactNode;
    endText: React.ReactNode;
    validationError: DateRangeValidationError;
}
/**
 * @ignore - internal component.
 */
declare const DateRangePickerInput: React.ForwardRefExoticComponent<DateRangeInputProps & React.RefAttributes<HTMLDivElement>>;
export default DateRangePickerInput;
