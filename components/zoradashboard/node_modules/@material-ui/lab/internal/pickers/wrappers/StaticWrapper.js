import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import { DIALOG_WIDTH } from '../constants/dimensions';
import { WrapperVariantContext, IsStaticVariantContext } from './WrapperVariantContext';
import { jsx as _jsx } from "react/jsx-runtime";
const StaticWrapperRoot = styled('div', {
  skipSx: true
})(({
  theme
}) => ({
  overflow: 'hidden',
  minWidth: DIALOG_WIDTH,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper
}));

function StaticWrapper(props) {
  const {
    displayStaticWrapperAs,
    children
  } = props;
  const isStatic = true;
  return /*#__PURE__*/_jsx(IsStaticVariantContext.Provider, {
    value: isStatic,
    children: /*#__PURE__*/_jsx(WrapperVariantContext.Provider, {
      value: displayStaticWrapperAs,
      children: /*#__PURE__*/_jsx(StaticWrapperRoot, {
        children: children
      })
    })
  });
}

export default StaticWrapper;