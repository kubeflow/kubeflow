utils = require './utils'
{Number:NumberT} = require './Number'

class BufferT
  constructor: (@length) ->
  decode: (stream, parent) ->
    length = utils.resolveLength @length, stream, parent
    return stream.readBuffer(length)

  size: (val, parent) ->
    unless val
      return utils.resolveLength @length, null, parent
      
    return val.length

  encode: (stream, buf, parent) ->
    if @length instanceof NumberT
      @length.encode(stream, buf.length)
    
    stream.writeBuffer(buf)

module.exports = BufferT
