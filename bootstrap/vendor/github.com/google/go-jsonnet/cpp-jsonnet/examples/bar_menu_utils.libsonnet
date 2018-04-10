// bar_menu_utils.libsonnet
{
  equal_parts(size, ingredients)::
    if std.length(ingredients) == 0 then
      error 'No ingredients specified.'
    else [
      { kind: i, qty: size / std.length(ingredients) }
      for i in ingredients
    ],
  id:: function(x) x,
}
