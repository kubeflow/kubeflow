stream = require 'stream'
DecodeStream = require './DecodeStream'
try iconv = require 'iconv-lite'

class EncodeStream extends stream.Readable
  constructor: (bufferSize = 65536) ->
    super
    @buffer = new Buffer(bufferSize)
    @bufferOffset = 0
    @pos = 0

  for key of Buffer.prototype when key.slice(0, 5) is 'write'
    do (key) =>
      bytes = +DecodeStream.TYPES[key.replace(/write|[BL]E/g, '')]
      EncodeStream::[key] = (value) ->
        @ensure bytes
        @buffer[key](value, @bufferOffset)
        @bufferOffset += bytes
        @pos += bytes

  _read: ->
    # do nothing, required by node

  ensure: (bytes) ->
    if @bufferOffset + bytes > @buffer.length
      @flush()
      
  flush: ->
    if @bufferOffset > 0
      @push new Buffer @buffer.slice(0, @bufferOffset)
      @bufferOffset = 0

  writeBuffer: (buffer) ->
    @flush()
    @push buffer
    @pos += buffer.length

  writeString: (string, encoding = 'ascii') ->
    switch encoding
      when 'utf16le', 'ucs2', 'utf8', 'ascii'
        @writeBuffer new Buffer(string, encoding)

      when 'utf16be'
        buf = new Buffer(string, 'utf16le')

        # swap the bytes
        for i in [0...buf.length - 1] by 2
          byte = buf[i]
          buf[i] = buf[i + 1]
          buf[i + 1] = byte

        @writeBuffer buf

      else
        if iconv
          @writeBuffer iconv.encode(string, encoding)
        else
          throw new Error 'Install iconv-lite to enable additional string encodings.'

  writeUInt24BE: (val) ->
    @ensure 3
    @buffer[@bufferOffset++] = val >>> 16 & 0xff
    @buffer[@bufferOffset++] = val >>> 8  & 0xff
    @buffer[@bufferOffset++] = val & 0xff
    @pos += 3

  writeUInt24LE: (val) ->
    @ensure 3
    @buffer[@bufferOffset++] = val & 0xff
    @buffer[@bufferOffset++] = val >>> 8 & 0xff
    @buffer[@bufferOffset++] = val >>> 16 & 0xff
    @pos += 3

  writeInt24BE: (val) ->
    if val >= 0
      @writeUInt24BE val
    else
      @writeUInt24BE val + 0xffffff + 1

  writeInt24LE: (val) ->
    if val >= 0
      @writeUInt24LE val
    else
      @writeUInt24LE val + 0xffffff + 1

  fill: (val, length) ->
    if length < @buffer.length
      @ensure length
      @buffer.fill(val, @bufferOffset, @bufferOffset + length)
      @bufferOffset += length
      @pos += length
    else
      buf = new Buffer(length)
      buf.fill(val)
      @writeBuffer buf

  end: ->
    @flush()
    @push null

module.exports = EncodeStream
