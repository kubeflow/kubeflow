class Optional
  constructor: (@type, @condition = true) ->

  decode: (stream, parent) ->
    condition = @condition
    if typeof condition is 'function'
      condition = condition.call(parent, parent)

    if condition
      return @type.decode(stream, parent)

  size: (val, parent) ->
    condition = @condition
    if typeof condition is 'function'
      condition = condition.call(parent, parent)

    if condition
      return @type.size(val, parent)
    else
      return 0

  encode: (stream, val, parent) ->
    condition = @condition
    if typeof condition is 'function'
      condition = condition.call(parent, parent)

    if condition
      @type.encode(stream, val, parent)

module.exports = Optional
