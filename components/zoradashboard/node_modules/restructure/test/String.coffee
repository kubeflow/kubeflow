{String:StringT, uint8, DecodeStream, EncodeStream} = require '../'
should = require('chai').should()
concat = require 'concat-stream'

describe 'String', ->
  describe 'decode', ->
    it 'should decode fixed length', ->
      stream = new DecodeStream new Buffer 'testing'
      string = new StringT 7
      string.decode(stream).should.equal 'testing'

    it 'should decode length from parent key', ->
      stream = new DecodeStream new Buffer 'testing'
      string = new StringT 'len'
      string.decode(stream, len: 7).should.equal 'testing'

    it 'should decode length as number before string', ->
      stream = new DecodeStream new Buffer '\x07testing'
      string = new StringT uint8
      string.decode(stream).should.equal 'testing'

    it 'should decode utf8', ->
      stream = new DecodeStream new Buffer '🍻'
      string = new StringT 4, 'utf8'
      string.decode(stream).should.equal '🍻'

    it 'should decode encoding computed from function', ->
      stream = new DecodeStream new Buffer '🍻'
      string = new StringT 4, -> 'utf8'
      string.decode(stream).should.equal '🍻'

    it 'should decode null-terminated string and read past terminator', ->
      stream = new DecodeStream new Buffer '🍻\x00'
      string = new StringT null, 'utf8'
      string.decode(stream).should.equal '🍻'
      stream.pos.should.equal 5

    it 'should decode remainder of buffer when null-byte missing', ->
      stream = new DecodeStream new Buffer '🍻'
      string = new StringT null, 'utf8'
      string.decode(stream).should.equal '🍻'

  describe 'size', ->
    it 'should use string length', ->
      string = new StringT 7
      string.size('testing').should.equal 7

    it 'should use correct encoding', ->
      string = new StringT 10, 'utf8'
      string.size('🍻').should.equal 4

    it 'should use encoding from function', ->
      string = new StringT 10, -> 'utf8'
      string.size('🍻').should.equal 4

    it 'should add size of length field before string', ->
      string = new StringT uint8, 'utf8'
      string.size('🍻').should.equal 5

    it 'should work with utf16be encoding', ->
      string = new StringT 10, 'utf16be'
      string.size('🍻').should.equal 4

    it 'should take null-byte into account', ->
      string = new StringT null, 'utf8'
      string.size('🍻').should.equal 5
      
    it 'should use defined length if no value given', ->
      array = new StringT 10
      array.size().should.equal 10
      
  describe 'encode', ->
    it 'should encode using string length', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer 'testing'
        done()

      string = new StringT 7
      string.encode(stream, 'testing')
      stream.end()

    it 'should encode length as number before string', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer '\x07testing'
        done()

      string = new StringT uint8
      string.encode(stream, 'testing')
      stream.end()

    it 'should encode length as number before string utf8', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer '\x0ctesting 😜', 'utf8'
        done()

      string = new StringT uint8, 'utf8'
      string.encode(stream, 'testing 😜')
      stream.end()

    it 'should encode utf8', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer '🍻'
        done()

      string = new StringT 4, 'utf8'
      string.encode(stream, '🍻')
      stream.end()

    it 'should encode encoding computed from function', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer '🍻'
        done()

      string = new StringT 4, -> 'utf8'
      string.encode(stream, '🍻')
      stream.end()

    it 'should encode null-terminated string', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer '🍻\x00'
        done()

      string = new StringT null, 'utf8'
      string.encode(stream, '🍻')
      stream.end()
