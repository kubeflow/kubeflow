DecodeStream = require './DecodeStream'

class NumberT
  constructor: (@type, @endian = 'BE') ->
    @fn = @type
    unless @type[@type.length - 1] is '8'
      @fn += @endian

  size: ->
    DecodeStream.TYPES[@type]

  decode: (stream) ->
    return stream['read' + @fn]()

  encode: (stream, val) ->
    stream['write' + @fn](val)

exports.Number = NumberT
exports.uint8 = new NumberT('UInt8')
exports.uint16be = exports.uint16 = new NumberT('UInt16', 'BE')
exports.uint16le = new NumberT('UInt16', 'LE')
exports.uint24be = exports.uint24 = new NumberT('UInt24', 'BE')
exports.uint24le = new NumberT('UInt24', 'LE')
exports.uint32be = exports.uint32 = new NumberT('UInt32', 'BE')
exports.uint32le = new NumberT('UInt32', 'LE')
exports.int8 = new NumberT('Int8')
exports.int16be = exports.int16 = new NumberT('Int16', 'BE')
exports.int16le = new NumberT('Int16', 'LE')
exports.int24be = exports.int24 = new NumberT('Int24', 'BE')
exports.int24le = new NumberT('Int24', 'LE')
exports.int32be = exports.int32 = new NumberT('Int32', 'BE')
exports.int32le = new NumberT('Int32', 'LE')
exports.floatbe = exports.float = new NumberT('Float', 'BE')
exports.floatle = new NumberT('Float', 'LE')
exports.doublebe = exports.double = new NumberT('Double', 'BE')
exports.doublele = new NumberT('Double', 'LE')

class Fixed extends NumberT
  constructor: (size, endian, fracBits = size >> 1) ->
    super "Int#{size}", endian
    @_point = 1 << fracBits

  decode: (stream) ->
    return super(stream) / @_point

  encode: (stream, val) ->
    super stream, val * @_point | 0

exports.Fixed = Fixed
exports.fixed16be = exports.fixed16 = new Fixed(16, 'BE')
exports.fixed16le = new Fixed(16, 'LE')
exports.fixed32be = exports.fixed32 =new Fixed(32, 'BE')
exports.fixed32le = new Fixed(32, 'LE')
