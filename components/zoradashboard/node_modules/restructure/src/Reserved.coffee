utils = require './utils'

class Reserved
  constructor: (@type, @count = 1) ->
  decode: (stream, parent) ->
    stream.pos += @size(null, parent)
    return undefined

  size: (data, parent) ->
    count = utils.resolveLength @count, null, parent
    @type.size() * count

  encode: (stream, val, parent) ->
    stream.fill 0, @size(val, parent)

module.exports = Reserved
