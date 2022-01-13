utils = require './utils'

class Pointer
  constructor: (@offsetType, @type, @options = {}) ->
    @type = null if @type is 'void'
    @options.type ?= 'local'
    @options.allowNull ?= true
    @options.nullValue ?= 0
    @options.lazy ?= false
    if @options.relativeTo
      @relativeToGetter = new Function('ctx', "return ctx.#{@options.relativeTo}")

  decode: (stream, ctx) ->
    offset = @offsetType.decode(stream, ctx)

    # handle NULL pointers
    if offset is @options.nullValue and @options.allowNull
      return null

    relative = switch @options.type
      when 'local'     then ctx._startOffset
      when 'immediate' then stream.pos - @offsetType.size()
      when 'parent'    then ctx.parent._startOffset
      else
        c = ctx
        while c.parent
          c = c.parent

        c._startOffset or 0

    if @options.relativeTo
      relative += @relativeToGetter ctx

    ptr = offset + relative

    if @type?
      val = null
      decodeValue = =>
        return val if val?
          
        pos = stream.pos
        stream.pos = ptr
        val = @type.decode(stream, ctx)
        stream.pos = pos
        return val
        
      # If this is a lazy pointer, define a getter to decode only when needed.
      # This obviously only works when the pointer is contained by a Struct.
      if @options.lazy
        return new utils.PropertyDescriptor
          get: decodeValue
        
      return decodeValue()
    else
      return ptr

  size: (val, ctx) ->
    parent = ctx
    switch @options.type
      when 'local', 'immediate'
        break
      when 'parent'
        ctx = ctx.parent
      else # global
        while ctx.parent
          ctx = ctx.parent

    type = @type
    unless type?
      unless val instanceof VoidPointer
        throw new Error "Must be a VoidPointer"

      type = val.type
      val = val.value

    if val and ctx
      ctx.pointerSize += type.size(val, parent)
      
    return @offsetType.size()

  encode: (stream, val, ctx) ->
    parent = ctx
    if not val?
      @offsetType.encode(stream, @options.nullValue)
      return

    switch @options.type
      when 'local'
        relative = ctx.startOffset
      when 'immediate'
        relative = stream.pos + @offsetType.size(val, parent)
      when 'parent'
        ctx = ctx.parent
        relative = ctx.startOffset
      else # global
        relative = 0
        while ctx.parent
          ctx = ctx.parent

    if @options.relativeTo
      relative += @relativeToGetter parent.val

    @offsetType.encode(stream, ctx.pointerOffset - relative)

    type = @type
    unless type?
      unless val instanceof VoidPointer
        throw new Error "Must be a VoidPointer"

      type = val.type
      val = val.value

    ctx.pointers.push
      type: type
      val: val
      parent: parent

    ctx.pointerOffset += type.size(val, parent)

# A pointer whose type is determined at decode time
class VoidPointer
  constructor: (@type, @value) ->

exports.Pointer = Pointer
exports.VoidPointer = VoidPointer
