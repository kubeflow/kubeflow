{LazyArray, Pointer, uint8, uint16, DecodeStream, EncodeStream} = require '../'
should = require('chai').should()
concat = require 'concat-stream'

describe 'LazyArray', ->
  describe 'decode', ->
    it 'should decode items lazily', ->
      stream = new DecodeStream new Buffer [1, 2, 3, 4, 5]
      array = new LazyArray uint8, 4
      
      arr = array.decode(stream)
      arr.should.not.be.an.instanceof Array
      arr.should.have.length 4
      stream.pos.should.equal 4
      
      arr.get(0).should.equal 1
      arr.get(1).should.equal 2
      arr.get(2).should.equal 3
      arr.get(3).should.equal 4
      
      should.not.exist arr.get(-1)
      should.not.exist arr.get(5)
      
    it 'should be able to convert to an array', ->
      stream = new DecodeStream new Buffer [1, 2, 3, 4, 5]
      array = new LazyArray uint8, 4
      
      arr = array.decode(stream)
      arr.toArray().should.deep.equal [1, 2, 3, 4]
      
    it 'should have an inspect method', ->
      stream = new DecodeStream new Buffer [1, 2, 3, 4, 5]
      array = new LazyArray uint8, 4
      
      arr = array.decode(stream)
      arr.inspect().should.equal '[ 1, 2, 3, 4 ]'
      
    it 'should decode length as number before array', ->
      stream = new DecodeStream new Buffer [4, 1, 2, 3, 4, 5]
      array = new LazyArray uint8, uint8
      arr = array.decode(stream)
      
      arr.toArray().should.deep.equal [1, 2, 3, 4]
      
  describe 'size', ->
    it 'should work with LazyArrays', ->
      stream = new DecodeStream new Buffer [1, 2, 3, 4, 5]
      array = new LazyArray uint8, 4
      arr = array.decode(stream)
      
      array.size(arr).should.equal 4
      
  describe 'encode', ->
    it 'should work with LazyArrays', (done) ->
      stream = new DecodeStream new Buffer [1, 2, 3, 4, 5]
      array = new LazyArray uint8, 4
      arr = array.decode(stream)
      
      enc = new EncodeStream
      enc.pipe concat (buf) ->
        buf.should.deep.equal new Buffer [1, 2, 3, 4]
        done()
      
      array.encode(enc, arr)
      enc.end()
