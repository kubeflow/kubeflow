{Number:NumberT} = require './Number'
utils = require './utils'

class StringT
  constructor: (@length, @encoding = 'ascii') ->

  decode: (stream, parent) ->
    length = if @length?
      utils.resolveLength @length, stream, parent
    else
      {buffer, length, pos} = stream

      while pos < length and buffer[pos] isnt 0x00
        ++pos

      pos - stream.pos

    encoding = @encoding
    if typeof encoding is 'function'
      encoding = encoding.call(parent, parent) or 'ascii'

    string = stream.readString(length, encoding)

    if not @length? and stream.pos < stream.length
      stream.pos++

    return string
    
  size: (val, parent) ->
    # Use the defined value if no value was given
    unless val
      return utils.resolveLength @length, null, parent
    
    encoding = @encoding
    if typeof encoding is 'function'
      encoding = encoding.call(parent?.val, parent?.val) or 'ascii'

    if encoding is 'utf16be'
      encoding = 'utf16le'

    size = Buffer.byteLength(val, encoding)
    if @length instanceof NumberT
      size += @length.size()

    if not @length?
      size++

    return size

  encode: (stream, val, parent) ->
    encoding = @encoding
    if typeof encoding is 'function'
      encoding = encoding.call(parent?.val, parent?.val) or 'ascii'

    if @length instanceof NumberT
      @length.encode(stream, Buffer.byteLength(val, encoding))

    stream.writeString(val, encoding)

    if not @length?
      stream.writeUInt8(0x00)

module.exports = StringT
