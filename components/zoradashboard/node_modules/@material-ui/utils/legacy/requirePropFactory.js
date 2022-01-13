import _extends from "@babel/runtime/helpers/esm/extends";
export default function requirePropFactory(componentNameInError, Component) {
  if (process.env.NODE_ENV === 'production') {
    return function () {
      return null;
    };
  } // eslint-disable-next-line react/forbid-foreign-prop-types


  var prevPropTypes = Component ? _extends({}, Component.propTypes) : null;

  var requireProp = function requireProp(requiredProp) {
    return function (props, propName, componentName, location, propFullName) {
      var propFullNameSafe = propFullName || propName;
      var defaultTypeChecker = prevPropTypes == null ? void 0 : prevPropTypes[propFullNameSafe];

      if (defaultTypeChecker) {
        for (var _len = arguments.length, args = new Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
          args[_key - 5] = arguments[_key];
        }

        var typeCheckerResult = defaultTypeChecker.apply(void 0, [props, propName, componentName, location, propFullName].concat(args));

        if (typeCheckerResult) {
          return typeCheckerResult;
        }
      }

      if (typeof props[propName] !== 'undefined' && !props[requiredProp]) {
        return new Error("The prop `".concat(propFullNameSafe, "` of ") + "`".concat(componentNameInError, "` can only be used together with the `").concat(requiredProp, "` prop."));
      }

      return null;
    };
  };

  return requireProp;
}