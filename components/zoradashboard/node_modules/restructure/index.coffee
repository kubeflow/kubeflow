exports.EncodeStream    = require './src/EncodeStream'
exports.DecodeStream    = require './src/DecodeStream'
exports.Array           = require './src/Array'
exports.LazyArray       = require './src/LazyArray'
exports.Bitfield        = require './src/Bitfield'
exports.Boolean         = require './src/Boolean'
exports.Buffer          = require './src/Buffer'
exports.Enum            = require './src/Enum'
exports.Optional        = require './src/Optional'
exports.Reserved        = require './src/Reserved'
exports.String          = require './src/String'
exports.Struct          = require './src/Struct'
exports.VersionedStruct = require './src/VersionedStruct'

for key, val of require './src/Number'
  exports[key] = val

for key, val of require './src/Pointer'
  exports[key] = val
