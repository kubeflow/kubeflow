import style from './style';
import compose from './compose';
export var displayPrint = style({
  prop: 'displayPrint',
  cssProperty: false,
  transform: function transform(value) {
    return {
      '@media print': {
        display: value
      }
    };
  }
});
export var displayRaw = style({
  prop: 'display'
});
export var overflow = style({
  prop: 'overflow'
});
export var textOverflow = style({
  prop: 'textOverflow'
});
export var visibility = style({
  prop: 'visibility'
});
export var whiteSpace = style({
  prop: 'whiteSpace'
});
export default compose(displayPrint, displayRaw, overflow, textOverflow, visibility, whiteSpace);