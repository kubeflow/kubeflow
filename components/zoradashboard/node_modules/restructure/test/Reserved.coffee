{Reserved, uint8, uint16, DecodeStream, EncodeStream} = require '../'
should = require('chai').should()
concat = require 'concat-stream'

describe 'Reserved', ->
  it 'should have a default count of 1', ->
    reserved = new Reserved uint8
    reserved.size().should.equal 1

  it 'should allow custom counts and types', ->
    reserved = new Reserved uint16, 10
    reserved.size().should.equal 20

  it 'should decode', ->
    stream = new DecodeStream new Buffer [0, 0]
    reserved = new Reserved uint16
    should.not.exist reserved.decode(stream)
    stream.pos.should.equal 2

  it 'should encode', (done) ->
    stream = new EncodeStream
    reserved = new Reserved uint16
    stream.pipe concat (buf) ->
      buf.should.deep.equal new Buffer [0, 0]
      done()

    reserved.encode stream
    stream.end()
