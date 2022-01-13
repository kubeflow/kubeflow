import style from './style';
import compose from './compose';
export var position = style({
  prop: 'position'
});
export var zIndex = style({
  prop: 'zIndex',
  themeKey: 'zIndex'
});
export var top = style({
  prop: 'top'
});
export var right = style({
  prop: 'right'
});
export var bottom = style({
  prop: 'bottom'
});
export var left = style({
  prop: 'left'
});
export default compose(position, zIndex, top, right, bottom, left);