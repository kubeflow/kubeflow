class BooleanT
  constructor: (@type) ->

  decode: (stream, parent) ->
    !!@type.decode(stream, parent)

  size: (val, parent) ->
    @type.size(val, parent)

  encode: (stream, val, parent) ->
    @type.encode(stream, +val, parent)

module.exports = BooleanT
