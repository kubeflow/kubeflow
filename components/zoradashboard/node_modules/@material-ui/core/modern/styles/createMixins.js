import _extends from "@babel/runtime/helpers/esm/extends";
export default function createMixins(breakpoints, spacing, mixins) {
  return _extends({
    toolbar: {
      minHeight: 56,
      [`${breakpoints.up('xs')} and (orientation: landscape)`]: {
        minHeight: 48
      },
      [breakpoints.up('sm')]: {
        minHeight: 64
      }
    }
  }, mixins);
}