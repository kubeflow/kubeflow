try iconv = require 'iconv-lite'

class DecodeStream
  constructor: (@buffer) ->
    @pos = 0
    @length = @buffer.length

  @TYPES =
    UInt8: 1
    UInt16: 2
    UInt24: 3
    UInt32: 4
    Int8: 1
    Int16: 2
    Int24: 3
    Int32: 4
    Float: 4
    Double: 8

  for key of Buffer.prototype when key.slice(0, 4) is 'read'
    do (key) =>
      bytes = @TYPES[key.replace(/read|[BL]E/g, '')]
      this::[key] = ->
        ret = @buffer[key](@pos)
        @pos += bytes
        return ret

  readString: (length, encoding = 'ascii') ->
    switch encoding
      when 'utf16le', 'ucs2', 'utf8', 'ascii'
        return @buffer.toString(encoding, @pos, @pos += length)

      when 'utf16be'
        buf = new Buffer(@readBuffer(length))

        # swap the bytes
        for i in [0...buf.length - 1] by 2
          byte = buf[i]
          buf[i] = buf[i + 1]
          buf[i + 1] = byte

        return buf.toString('utf16le')

      else
        buf = @readBuffer length
        if iconv
          try
            return iconv.decode(buf, encoding)

        return buf

  readBuffer: (length) ->
    return @buffer.slice(@pos, @pos += length)

  readUInt24BE: ->
    return (@readUInt16BE() << 8) + @readUInt8()

  readUInt24LE: ->
    return @readUInt16LE() + (@readUInt8() << 16)

  readInt24BE: ->
    return (@readInt16BE() << 8) + @readUInt8()

  readInt24LE: ->
    return @readUInt16LE() + (@readInt8() << 16)

module.exports = DecodeStream
