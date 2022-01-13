class Bitfield
  constructor: (@type, @flags = []) ->
  decode: (stream) ->
    val = @type.decode(stream)

    res = {}
    for flag, i in @flags when flag?
      res[flag] = !!(val & (1 << i))

    return res

  size: ->
    @type.size()

  encode: (stream, keys) ->
    val = 0
    for flag, i in @flags when flag?
      val |= (1 << i) if keys[flag]

    @type.encode(stream, val)

module.exports = Bitfield
