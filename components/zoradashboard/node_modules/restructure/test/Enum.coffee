{Enum, uint8, DecodeStream, EncodeStream} = require '../'
should = require('chai').should()
concat = require 'concat-stream'

describe 'Enum', ->
  e = new Enum uint8, ['foo', 'bar', 'baz']
  it 'should have the right size', ->
    e.size().should.equal 1

  it 'should decode', ->
    stream = new DecodeStream new Buffer [1, 2, 0]
    e.decode(stream).should.equal 'bar'
    e.decode(stream).should.equal 'baz'
    e.decode(stream).should.equal 'foo'

  it 'should encode', (done) ->
    stream = new EncodeStream
    stream.pipe concat (buf) ->
      buf.should.deep.equal new Buffer [1, 2, 0]
      done()

    e.encode stream, 'bar'
    e.encode stream, 'baz'
    e.encode stream, 'foo'
    stream.end()

  it 'should throw on unknown option', ->
    stream = new EncodeStream
    should.throw ->
      e.encode stream, 'unknown'
