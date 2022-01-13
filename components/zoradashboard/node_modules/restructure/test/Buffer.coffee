{Buffer:BufferT, DecodeStream, EncodeStream, uint8} = require '../'
should = require('chai').should()
concat = require 'concat-stream'

describe 'Buffer', ->
  describe 'decode', ->
    it 'should decode', ->
      stream = new DecodeStream new Buffer [0xab, 0xff, 0x1f, 0xb6]
      buf = new BufferT(2)
      buf.decode(stream).should.deep.equal new Buffer [0xab, 0xff]
      buf.decode(stream).should.deep.equal new Buffer [0x1f, 0xb6]

    it 'should decode with parent key length', ->
      stream = new DecodeStream new Buffer [0xab, 0xff, 0x1f, 0xb6]
      buf = new BufferT('len')
      buf.decode(stream, len: 3).should.deep.equal new Buffer [0xab, 0xff, 0x1f]
      buf.decode(stream, len: 1).should.deep.equal new Buffer [0xb6]
      
  describe 'size', ->
    it 'should return size', ->
      buf = new BufferT(2)
      buf.size(new Buffer [0xab, 0xff]).should.equal 2

    it 'should use defined length if no value given', ->
      array = new BufferT 10
      array.size().should.equal 10

  describe 'encode', ->
    it 'should encode', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer [0xab, 0xff, 0x1f, 0xb6]
        done()

      buf = new BufferT(2)
      buf.encode stream, new Buffer [0xab, 0xff]
      buf.encode stream, new Buffer [0x1f, 0xb6]
      stream.end()

    it 'should encode length before buffer', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer [2, 0xab, 0xff]
        done()

      buf = new BufferT(uint8)
      buf.encode stream, new Buffer [0xab, 0xff]
      stream.end()
