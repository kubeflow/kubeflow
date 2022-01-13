import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["ns", "children"];
import { useTranslation } from './useTranslation';
export function Translation(props) {
  var ns = props.ns,
      children = props.children,
      options = _objectWithoutProperties(props, _excluded);

  var _useTranslation = useTranslation(ns, options),
      _useTranslation2 = _slicedToArray(_useTranslation, 3),
      t = _useTranslation2[0],
      i18n = _useTranslation2[1],
      ready = _useTranslation2[2];

  return children(t, {
    i18n: i18n,
    lng: i18n.language
  }, ready);
}