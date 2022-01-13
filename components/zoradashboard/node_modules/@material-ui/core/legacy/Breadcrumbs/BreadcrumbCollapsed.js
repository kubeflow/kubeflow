import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { emphasize } from '@material-ui/system';
import styled from '../styles/styled';
import MoreHorizIcon from '../internal/svg-icons/MoreHoriz';
import ButtonBase from '../ButtonBase';
import { jsx as _jsx } from "react/jsx-runtime";
var BreadcrumbCollapsedButton = styled(ButtonBase, {
  skipSx: true
})(function (_ref) {
  var theme = _ref.theme;
  return _extends({
    display: 'flex',
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5)
  }, theme.palette.mode === 'light' ? {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.grey[700]
  } : {
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.grey[100]
  }, {
    borderRadius: 2,
    '&:hover, &:focus': _extends({}, theme.palette.mode === 'light' ? {
      backgroundColor: theme.palette.grey[200]
    } : {
      backgroundColor: theme.palette.grey[600]
    }),
    '&:active': _extends({
      boxShadow: theme.shadows[0]
    }, theme.palette.mode === 'light' ? {
      backgroundColor: emphasize(theme.palette.grey[200], 0.12)
    } : {
      backgroundColor: emphasize(theme.palette.grey[600], 0.12)
    })
  });
});
var BreadcrumbCollapsedIcon = styled(MoreHorizIcon)({
  width: 24,
  height: 16
});
/**
 * @ignore - internal component.
 */

function BreadcrumbCollapsed(props) {
  var styleProps = props;
  return /*#__PURE__*/_jsx("li", {
    children: /*#__PURE__*/_jsx(BreadcrumbCollapsedButton, _extends({
      focusRipple: true
    }, props, {
      styleProps: styleProps,
      children: /*#__PURE__*/_jsx(BreadcrumbCollapsedIcon, {
        styleProps: styleProps
      })
    }))
  });
}

process.env.NODE_ENV !== "production" ? BreadcrumbCollapsed.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default BreadcrumbCollapsed;