import { formatMuiErrorMessage as _formatMuiErrorMessage } from "@material-ui/utils";
import * as React from 'react';
import { MuiPickersAdapterContext } from '../../../LocalizationProvider'; // Required for babel https://github.com/vercel/next.js/issues/7882. Replace with `export type` in future

function useLocalizationContext() {
  const localization = React.useContext(MuiPickersAdapterContext);

  if (localization === null) {
    throw new Error(process.env.NODE_ENV !== "production" ? `Can not find utils in context. It looks like you forgot to wrap your component in LocalizationProvider, or pass dateAdapter prop directly.` : _formatMuiErrorMessage(13));
  }

  return localization;
}

export function useUtils() {
  return useLocalizationContext().utils;
}
export function useDefaultDates() {
  return useLocalizationContext().defaultDates;
}
export function useNow() {
  const utils = useUtils();
  const now = React.useRef(utils.date());
  return now.current;
}