ArrayT = require './Array'
{Number:NumberT} = require './Number'
utils = require './utils'
{inspect} = require 'util'

class LazyArrayT extends ArrayT
  decode: (stream, parent) ->
    pos = stream.pos
    length = utils.resolveLength @length, stream, parent
    
    if @length instanceof NumberT
      parent =
        parent: parent
        _startOffset: pos
        _currentOffset: 0
        _length: length
    
    res = new LazyArray @type, length, stream, parent
    
    stream.pos += length * @type.size(null, parent)
    return res
    
  size: (val, ctx) ->
    if val instanceof LazyArray
      val = val.toArray()
      
    super val, ctx
    
  encode: (stream, val, ctx) ->
    if val instanceof LazyArray
      val = val.toArray()
      
    super stream, val, ctx

class LazyArray
  constructor: (@type, @length, @stream, @ctx) ->
    @base = @stream.pos
    @items = []
    
  get: (index) ->
    if index < 0 or index >= @length
      return undefined
    
    unless @items[index]?
      pos = @stream.pos
      @stream.pos = @base + @type.size(null, @ctx) * index
      @items[index] = @type.decode @stream, @ctx
      @stream.pos = pos
      
    return @items[index]
    
  toArray: ->
    @get(i) for i in [0...@length] by 1
    
  inspect: ->
    inspect @toArray()

module.exports = LazyArrayT
