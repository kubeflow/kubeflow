import style from './style';
import compose from './compose';
export var fontFamily = style({
  prop: 'fontFamily',
  themeKey: 'typography'
});
export var fontSize = style({
  prop: 'fontSize',
  themeKey: 'typography'
});
export var fontStyle = style({
  prop: 'fontStyle',
  themeKey: 'typography'
});
export var fontWeight = style({
  prop: 'fontWeight',
  themeKey: 'typography'
});
export var letterSpacing = style({
  prop: 'letterSpacing'
});
export var lineHeight = style({
  prop: 'lineHeight'
});
export var textAlign = style({
  prop: 'textAlign'
});
export var typographyVariant = style({
  prop: 'typography',
  cssProperty: false,
  themeKey: 'typography'
});
var typography = compose(typographyVariant, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign);
export default typography;