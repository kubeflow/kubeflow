import style from './style';
import compose from './compose';
export var color = style({
  prop: 'color',
  themeKey: 'palette'
});
export var bgcolor = style({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette'
});
export var backgroundColor = style({
  prop: 'backgroundColor',
  themeKey: 'palette'
});
var palette = compose(color, bgcolor, backgroundColor);
export default palette;