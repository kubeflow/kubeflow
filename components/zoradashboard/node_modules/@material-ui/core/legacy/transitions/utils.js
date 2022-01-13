import _typeof from "@babel/runtime/helpers/esm/typeof";
export var reflow = function reflow(node) {
  return node.scrollTop;
};
export function getTransitionProps(props, options) {
  var _style$transitionDura, _style$transitionTimi;

  var timeout = props.timeout,
      easing = props.easing,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style;
  return {
    duration: (_style$transitionDura = style.transitionDuration) != null ? _style$transitionDura : typeof timeout === 'number' ? timeout : timeout[options.mode] || 0,
    easing: (_style$transitionTimi = style.transitionTimingFunction) != null ? _style$transitionTimi : _typeof(easing) === 'object' ? easing[options.mode] : easing,
    delay: style.transitionDelay
  };
}