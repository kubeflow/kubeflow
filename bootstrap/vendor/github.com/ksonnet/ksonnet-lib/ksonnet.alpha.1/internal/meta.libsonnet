{
  MixinPartial1(fn, createMixin=null)::
    if createMixin != null
    then function(arg1) createMixin(fn(arg1))
    else fn,

  MixinPartial2(fn, createMixin=null)::
    if createMixin != null
    then function(arg1, arg2) createMixin(fn(arg1, arg2))
    else fn,
}