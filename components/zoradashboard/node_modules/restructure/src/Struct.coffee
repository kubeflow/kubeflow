utils = require './utils'

class Struct
  constructor: (@fields = {}) ->

  decode: (stream, parent, length = 0) ->
    res = @_setup stream, parent, length
    @_parseFields stream, res, @fields

    @process?.call(res, stream)
    return res

  _setup: (stream, parent, length) ->
    res = {}

    # define hidden properties
    Object.defineProperties res,
      parent:         { value: parent }
      _startOffset:   { value: stream.pos }
      _currentOffset: { value: 0, writable: true }
      _length:        { value: length }

    return res

  _parseFields: (stream, res, fields) ->
    for key, type of fields
      if typeof type is 'function'
        val = type.call(res, res)
      else
        val = type.decode(stream, res)
        
      unless val is undefined
        if val instanceof utils.PropertyDescriptor
          Object.defineProperty res, key, val
        else
          res[key] = val

      res._currentOffset = stream.pos - res._startOffset

    return

  size: (val = {}, parent, includePointers = true) ->
    ctx =
      parent: parent
      val: val
      pointerSize: 0

    size = 0
    for key, type of @fields when type.size?
      size += type.size(val[key], ctx)

    if includePointers
      size += ctx.pointerSize

    return size

  encode: (stream, val, parent) ->
    @preEncode?.call(val, stream)

    ctx =
      pointers: []
      startOffset: stream.pos
      parent: parent
      val: val
      pointerSize: 0

    ctx.pointerOffset = stream.pos + @size(val, ctx, false)

    for key, type of @fields when type.encode?
      type.encode(stream, val[key], ctx)

    i = 0
    while i < ctx.pointers.length
      ptr = ctx.pointers[i++]
      ptr.type.encode(stream, ptr.val, ptr.parent)

    return

module.exports = Struct
