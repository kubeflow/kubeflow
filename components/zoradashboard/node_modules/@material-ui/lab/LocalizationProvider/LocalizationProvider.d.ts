import * as React from 'react';
import { DateIOFormats, IUtils } from '@date-io/core/IUtils';
export declare type MuiPickersAdapter<TDate> = IUtils<TDate>;
export interface MuiPickersAdapterContextValue<TDate> {
    defaultDates: {
        minDate: TDate;
        maxDate: TDate;
    };
    utils: MuiPickersAdapter<TDate>;
}
export declare const MuiPickersAdapterContext: React.Context<MuiPickersAdapterContextValue<unknown> | null>;
export interface LocalizationProviderProps {
    children?: React.ReactNode;
    /** DateIO adapter class function */
    dateAdapter: new (...args: any) => MuiPickersAdapter<unknown>;
    /** Formats that are used for any child pickers */
    dateFormats?: Partial<DateIOFormats>;
    /**
     * Date library instance you are using, if it has some global overrides
     * ```jsx
     * dateLibInstance={momentTimeZone}
     * ```
     */
    dateLibInstance?: any;
    /** Locale for the date library you are using */
    locale?: string | object;
}
/**
 * @ignore - do not document.
 */
declare function LocalizationProvider(props: LocalizationProviderProps): JSX.Element;
declare namespace LocalizationProvider {
    var propTypes: any;
}
export default LocalizationProvider;
