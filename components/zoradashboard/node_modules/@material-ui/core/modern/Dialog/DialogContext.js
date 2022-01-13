import { createContext } from 'react';
const DialogContext = /*#__PURE__*/createContext({});

if (process.env.NODE_ENV !== 'production') {
  DialogContext.displayName = 'DialogContext';
}

export default DialogContext;