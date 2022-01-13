import * as React from 'react';
/**
 * @ignore - internal component.
 * @type {React.Context<{} | {expanded: boolean, disabled: boolean, disableGutters: boolean, toggle: () => void}>}
 */

const AccordionContext = /*#__PURE__*/React.createContext({});

if (process.env.NODE_ENV !== 'production') {
  AccordionContext.displayName = 'AccordionContext';
}

export default AccordionContext;