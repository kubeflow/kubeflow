class Enum
  constructor: (@type, @options = []) ->
  decode: (stream) ->
    index = @type.decode(stream)
    return @options[index] or index

  size: ->
    @type.size()

  encode: (stream, val) ->
    index = @options.indexOf val
    if index is -1
      throw new Error "Unknown option in enum: #{val}"

    @type.encode(stream, index)

module.exports = Enum
