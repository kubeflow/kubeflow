{Number:NumberT} = require './Number'

exports.resolveLength = (length, stream, parent) ->
  if typeof length is 'number'
    res = length

  else if typeof length is 'function'
    res = length.call(parent, parent)      

  else if parent and typeof length is 'string'
    res = parent[length]

  else if stream and length instanceof NumberT
    res = length.decode(stream)

  if isNaN res
    throw new Error 'Not a fixed size'
    
  return res

class PropertyDescriptor
  constructor: (opts = {}) ->
    @enumerable = true
    @configurable = true
    
    for key, val of opts
      this[key] = val

exports.PropertyDescriptor = PropertyDescriptor
