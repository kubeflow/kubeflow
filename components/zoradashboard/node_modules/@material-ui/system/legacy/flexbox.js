import style from './style';
import compose from './compose';
export var flexBasis = style({
  prop: 'flexBasis'
});
export var flexDirection = style({
  prop: 'flexDirection'
});
export var flexWrap = style({
  prop: 'flexWrap'
});
export var justifyContent = style({
  prop: 'justifyContent'
});
export var alignItems = style({
  prop: 'alignItems'
});
export var alignContent = style({
  prop: 'alignContent'
});
export var order = style({
  prop: 'order'
});
export var flex = style({
  prop: 'flex'
});
export var flexGrow = style({
  prop: 'flexGrow'
});
export var flexShrink = style({
  prop: 'flexShrink'
});
export var alignSelf = style({
  prop: 'alignSelf'
});
export var justifyItems = style({
  prop: 'justifyItems'
});
export var justifySelf = style({
  prop: 'justifySelf'
});
var flexbox = compose(flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf);
export default flexbox;