import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import { DIALOG_WIDTH } from '../constants/dimensions';
import { WrapperVariantContext, IsStaticVariantContext } from './WrapperVariantContext';
import { jsx as _jsx } from "react/jsx-runtime";
var StaticWrapperRoot = styled('div', {
  skipSx: true
})(function (_ref) {
  var theme = _ref.theme;
  return {
    overflow: 'hidden',
    minWidth: DIALOG_WIDTH,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper
  };
});

function StaticWrapper(props) {
  var displayStaticWrapperAs = props.displayStaticWrapperAs,
      children = props.children;
  var isStatic = true;
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