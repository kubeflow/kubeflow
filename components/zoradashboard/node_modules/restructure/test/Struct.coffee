{Struct, String:StringT, Pointer, uint8, DecodeStream, EncodeStream} = require '../'
should = require('chai').should()
concat = require 'concat-stream'

describe 'Struct', ->
  describe 'decode', ->
    it 'should decode into an object', ->
      stream = new DecodeStream new Buffer '\x05devon\x15'
      struct = new Struct
        name: new StringT uint8
        age: uint8

      struct.decode(stream).should.deep.equal
        name: 'devon'
        age: 21

    it 'should support process hook', ->
      stream = new DecodeStream new Buffer '\x05devon\x20'
      struct = new Struct
        name: new StringT uint8
        age: uint8

      struct.process = ->
        @canDrink = @age >= 21

      struct.decode(stream).should.deep.equal
        name: 'devon'
        age: 32
        canDrink: true

    it 'should support function keys', ->
      stream = new DecodeStream new Buffer '\x05devon\x20'
      struct = new Struct
        name: new StringT uint8
        age: uint8
        canDrink: -> @age >= 21

      struct.decode(stream).should.deep.equal
        name: 'devon'
        age: 32
        canDrink: true

  describe 'size', ->
    it 'should compute the correct size', ->
      struct = new Struct
        name: new StringT uint8
        age: uint8

      struct.size(name: 'devon', age: 21).should.equal 7

    it 'should compute the correct size with pointers', ->
      struct = new Struct
        name: new StringT uint8
        age: uint8
        ptr: new Pointer uint8, new StringT uint8

      size = struct.size
        name: 'devon'
        age: 21
        ptr: 'hello'

      size.should.equal 14
      
    it 'should get the correct size when no value is given', ->
      struct = new Struct
        name: new StringT 4
        age: uint8

      struct.size().should.equal 5
      
    it 'should throw when getting non-fixed length size and no value is given', ->
      struct = new Struct
        name: new StringT uint8
        age: uint8

      should.throw ->
        struct.size()
      , /not a fixed size/i
      
  describe 'encode', ->
    it 'should encode objects to buffers', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer '\x05devon\x15'
        done()

      struct = new Struct
        name: new StringT uint8
        age: uint8

      struct.encode stream,
        name: 'devon'
        age: 21

      stream.end()

    it 'should support preEncode hook', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer '\x05devon\x15'
        done()

      struct = new Struct
        nameLength: uint8
        name: new StringT 'nameLength'
        age: uint8

      struct.preEncode = ->
        @nameLength = @name.length

      struct.encode stream,
        name: 'devon'
        age: 21

      stream.end()

    it 'should encode pointer data after structure', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer '\x05devon\x15\x08\x05hello'
        done()

      struct = new Struct
        name: new StringT uint8
        age: uint8
        ptr: new Pointer uint8, new StringT uint8

      struct.encode stream,
        name: 'devon'
        age: 21
        ptr: 'hello'

      stream.end()

