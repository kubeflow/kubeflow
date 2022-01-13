Struct = require './Struct'

class VersionedStruct extends Struct
  constructor: (@type, @versions = {}) ->
    if typeof @type is 'string'
      @versionGetter = new Function('parent', "return parent.#{@type}")
      @versionSetter = new Function('parent', 'version', "return parent.#{@type} = version")

  decode: (stream, parent, length = 0) ->
    res = @_setup stream, parent, length

    if typeof @type is 'string'
      res.version = @versionGetter parent
    else
      res.version = @type.decode(stream)

    if @versions.header
      @_parseFields stream, res, @versions.header

    fields = @versions[res.version]
    if not fields?
      throw new Error "Unknown version #{res.version}"

    if fields instanceof VersionedStruct
      return fields.decode(stream, parent)

    @_parseFields stream, res, fields

    @process?.call(res, stream)
    return res

  size: (val, parent, includePointers = true) ->
    unless val
      throw new Error 'Not a fixed size'
    
    ctx =
      parent: parent
      val: val
      pointerSize: 0

    size = 0
    if typeof @type isnt 'string'
      size += @type.size(val.version, ctx)

    if @versions.header
      for key, type of @versions.header when type.size?
        size += type.size(val[key], ctx)

    fields = @versions[val.version]
    if not fields?
      throw new Error "Unknown version #{val.version}"

    for key, type of fields when type.size?
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

    if typeof @type isnt 'string'
      @type.encode(stream, val.version)

    if @versions.header
      for key, type of @versions.header when type.encode?
        type.encode(stream, val[key], ctx)

    fields = @versions[val.version]
    for key, type of fields when type.encode?
      type.encode(stream, val[key], ctx)

    i = 0
    while i < ctx.pointers.length
      ptr = ctx.pointers[i++]
      ptr.type.encode(stream, ptr.val, ptr.parent)

    return

module.exports = VersionedStruct
