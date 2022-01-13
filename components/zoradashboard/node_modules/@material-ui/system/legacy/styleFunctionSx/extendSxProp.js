import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { propToStyleFunction } from '../getThemeValue';

var splitProps = function splitProps(props) {
  var result = {
    systemProps: {},
    otherProps: {}
  };
  Object.keys(props).forEach(function (prop) {
    if (propToStyleFunction[prop]) {
      result.systemProps[prop] = props[prop];
    } else {
      result.otherProps[prop] = props[prop];
    }
  });
  return result;
};

export default function extendSxProp(props) {
  var inSx = props.sx,
      other = _objectWithoutProperties(props, ["sx"]);

  var _splitProps = splitProps(other),
      systemProps = _splitProps.systemProps,
      otherProps = _splitProps.otherProps;

  return _extends({}, otherProps, {
    sx: _extends({}, systemProps, inSx)
  });
}