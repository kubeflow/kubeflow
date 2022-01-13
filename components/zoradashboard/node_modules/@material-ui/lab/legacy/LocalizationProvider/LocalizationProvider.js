import * as React from 'react';
import PropTypes from 'prop-types';
import { jsx as _jsx } from "react/jsx-runtime";
export var MuiPickersAdapterContext = /*#__PURE__*/React.createContext(null);

if (process.env.NODE_ENV !== 'production') {
  MuiPickersAdapterContext.displayName = 'MuiPickersAdapterContext';
}

/**
 * @ignore - do not document.
 */
function LocalizationProvider(props) {
  var children = props.children,
      Utils = props.dateAdapter,
      dateFormats = props.dateFormats,
      dateLibInstance = props.dateLibInstance,
      locale = props.locale;
  var utils = React.useMemo(function () {
    return new Utils({
      locale: locale,
      formats: dateFormats,
      instance: dateLibInstance
    });
  }, [Utils, locale, dateFormats, dateLibInstance]);
  var defaultDates = React.useMemo(function () {
    return {
      minDate: utils.date('1900-01-01T00:00:00.000'),
      maxDate: utils.date('2099-12-31T00:00:00.000')
    };
  }, [utils]);
  var contextValue = React.useMemo(function () {
    return {
      utils: utils,
      defaultDates: defaultDates
    };
  }, [defaultDates, utils]);
  return /*#__PURE__*/_jsx(MuiPickersAdapterContext.Provider, {
    value: contextValue,
    children: children
  });
}

process.env.NODE_ENV !== "production" ? LocalizationProvider.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * @ignore
   */
  children: PropTypes.node,

  /**
   * DateIO adapter class function
   */
  dateAdapter: PropTypes.func.isRequired,

  /**
   * Formats that are used for any child pickers
   */
  dateFormats: PropTypes.shape({
    dayOfMonth: PropTypes.string,
    fullDate: PropTypes.string,
    fullDateTime: PropTypes.string,
    fullDateTime12h: PropTypes.string,
    fullDateTime24h: PropTypes.string,
    fullDateWithWeekday: PropTypes.string,
    fullTime: PropTypes.string,
    fullTime12h: PropTypes.string,
    fullTime24h: PropTypes.string,
    hours12h: PropTypes.string,
    hours24h: PropTypes.string,
    keyboardDate: PropTypes.string,
    keyboardDateTime: PropTypes.string,
    keyboardDateTime12h: PropTypes.string,
    keyboardDateTime24h: PropTypes.string,
    minutes: PropTypes.string,
    month: PropTypes.string,
    monthAndDate: PropTypes.string,
    monthAndYear: PropTypes.string,
    monthShort: PropTypes.string,
    normalDate: PropTypes.string,
    normalDateWithWeekday: PropTypes.string,
    seconds: PropTypes.string,
    shortDate: PropTypes.string,
    weekday: PropTypes.string,
    weekdayShort: PropTypes.string,
    year: PropTypes.string
  }),

  /**
   * Date library instance you are using, if it has some global overrides
   * ```jsx
   * dateLibInstance={momentTimeZone}
   * ```
   */
  dateLibInstance: PropTypes.any,

  /**
   * Locale for the date library you are using
   */
  locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
} : void 0;
export default LocalizationProvider;