{Boolean, uint8, DecodeStream, EncodeStream} = require '../'
should = require('chai').should()
concat = require 'concat-stream'

describe 'Boolean', ->
  describe 'decode', ->
    it 'should decode 0 as false', ->
      stream = new DecodeStream new Buffer [0]
      boolean = new Boolean uint8
      boolean.decode(stream).should.equal false

    it 'should decode 1 as true', ->
      stream = new DecodeStream new Buffer [1]
      boolean = new Boolean uint8
      boolean.decode(stream).should.equal true

  describe 'size', ->
    it 'should return given type size', ->
      stream = new DecodeStream new Buffer [0]
      boolean = new Boolean uint8
      boolean.size().should.equal 1

  describe 'encode', ->
    it 'should encode false as 0', (done) ->
      stream = new EncodeStream
      boolean = new Boolean uint8
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer [0]
        done()

      boolean.encode stream, false
      stream.end()

    it 'should encode true as 1', (done) ->
      stream = new EncodeStream
      boolean = new Boolean uint8
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer [1]
        done()

      boolean.encode stream, true
      stream.end()
