{Bitfield, uint8, DecodeStream, EncodeStream} = require '../'
should = require('chai').should()
concat = require 'concat-stream'

describe 'Bitfield', ->
  bitfield = new Bitfield uint8, ['Jack', 'Kack', 'Lack', 'Mack', 'Nack', 'Oack', 'Pack', 'Quack']
  JACK  = 1 << 0
  KACK  = 1 << 1
  LACK  = 1 << 2
  MACK  = 1 << 3
  NACK  = 1 << 4
  OACK  = 1 << 5
  PACK  = 1 << 6
  QUACK = 1 << 7

  it 'should have the right size', ->
    bitfield.size().should.equal 1

  it 'should decode', ->
    stream = new DecodeStream new Buffer [JACK | MACK | PACK | NACK | QUACK]
    bitfield.decode(stream).should.deep.equal
      Jack: yes, Kack: no, Lack: no, Mack: yes, Nack: yes, Oack: no, Pack: yes, Quack: yes

  it 'should encode', (done) ->
    stream = new EncodeStream
    stream.pipe concat (buf) ->
      buf.should.deep.equal new Buffer [JACK | MACK | PACK | NACK | QUACK]
      done()

    bitfield.encode stream, Jack: yes, Kack: no, Lack: no, Mack: yes, Nack: yes, Oack: no, Pack: yes, Quack: yes
    stream.end()
