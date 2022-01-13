{VersionedStruct, String:StringT, Pointer, uint8, DecodeStream, EncodeStream} = require '../'
should = require('chai').should()
concat = require 'concat-stream'

describe 'VersionedStruct', ->
  describe 'decode', ->
    it 'should get version from number type', ->
      struct = new VersionedStruct uint8,
        0:
          name: new StringT uint8, 'ascii'
          age: uint8
        1:
          name: new StringT uint8, 'utf8'
          age: uint8
          gender: uint8

      stream = new DecodeStream new Buffer '\x00\x05devon\x15'
      struct.decode(stream).should.deep.equal
        version: 0
        name: 'devon'
        age: 21

      stream = new DecodeStream new Buffer '\x01\x0adevon 👍\x15\x00', 'utf8'
      struct.decode(stream).should.deep.equal
        version: 1
        name: 'devon 👍'
        age: 21
        gender: 0

    it 'should throw for unknown version', ->
      struct = new VersionedStruct uint8,
        0:
          name: new StringT uint8, 'ascii'
          age: uint8
        1:
          name: new StringT uint8, 'utf8'
          age: uint8
          gender: uint8

      stream = new DecodeStream new Buffer '\x05\x05devon\x15'
      should.throw ->
        struct.decode(stream)

    it 'should support common header block', ->
      struct = new VersionedStruct uint8,
        header:
          age: uint8
          alive: uint8
        0:
          name: new StringT uint8, 'ascii'
        1:
          name: new StringT uint8, 'utf8'
          gender: uint8

      stream = new DecodeStream new Buffer '\x00\x15\x01\x05devon'
      struct.decode(stream).should.deep.equal
        version: 0
        age: 21
        alive: 1
        name: 'devon'

      stream = new DecodeStream new Buffer '\x01\x15\x01\x0adevon 👍\x00', 'utf8'
      struct.decode(stream).should.deep.equal
        version: 1
        age: 21
        alive: 1
        name: 'devon 👍'
        gender: 0

    it 'should support parent version key', ->
      struct = new VersionedStruct 'version',
        0:
          name: new StringT uint8, 'ascii'
          age: uint8
        1:
          name: new StringT uint8, 'utf8'
          age: uint8
          gender: uint8

      stream = new DecodeStream new Buffer '\x05devon\x15'
      struct.decode(stream, version: 0).should.deep.equal
        version: 0
        name: 'devon'
        age: 21

      stream = new DecodeStream new Buffer '\x0adevon 👍\x15\x00', 'utf8'
      struct.decode(stream, version: 1).should.deep.equal
        version: 1
        name: 'devon 👍'
        age: 21
        gender: 0

    it 'should support sub versioned structs', ->
      struct = new VersionedStruct uint8,
        0:
          name: new StringT uint8, 'ascii'
          age: uint8
        1: new VersionedStruct uint8,
          0:
            name: new StringT uint8
          1:
            name: new StringT uint8
            isDesert: uint8

      stream = new DecodeStream new Buffer '\x00\x05devon\x15'
      struct.decode(stream, version: 0).should.deep.equal
        version: 0
        name: 'devon'
        age: 21

      stream = new DecodeStream new Buffer '\x01\x00\x05pasta'
      struct.decode(stream, version: 0).should.deep.equal
        version: 0
        name: 'pasta'

      stream = new DecodeStream new Buffer '\x01\x01\x09ice cream\x01'
      struct.decode(stream, version: 0).should.deep.equal
        version: 1
        name: 'ice cream'
        isDesert: 1

    it 'should support process hook', ->
      struct = new VersionedStruct uint8,
        0:
          name: new StringT uint8, 'ascii'
          age: uint8
        1:
          name: new StringT uint8, 'utf8'
          age: uint8
          gender: uint8

      struct.process = ->
        @processed = true

      stream = new DecodeStream new Buffer '\x00\x05devon\x15'
      struct.decode(stream).should.deep.equal
        version: 0
        name: 'devon'
        age: 21
        processed: true

  describe 'size', ->
    it 'should compute the correct size', ->
      struct = new VersionedStruct uint8,
        0:
          name: new StringT uint8, 'ascii'
          age: uint8
        1:
          name: new StringT uint8, 'utf8'
          age: uint8
          gender: uint8

      size = struct.size
        version: 0
        name: 'devon'
        age: 21

      size.should.equal 8

      size = struct.size
        version: 1
        name: 'devon 👍'
        age: 21
        gender: 0

      size.should.equal 14

    it 'should throw for unknown version', ->
      struct = new VersionedStruct uint8,
        0:
          name: new StringT uint8, 'ascii'
          age: uint8
        1:
          name: new StringT uint8, 'utf8'
          age: uint8
          gender: uint8

      should.throw ->
        struct.size
          version: 5
          name: 'devon'
          age: 21

    it 'should support common header block', ->
      struct = new VersionedStruct uint8,
        header:
          age: uint8
          alive: uint8
        0:
          name: new StringT uint8, 'ascii'
        1:
          name: new StringT uint8, 'utf8'
          gender: uint8

      size = struct.size
        version: 0
        age: 21
        alive: 1
        name: 'devon'

      size.should.equal 9

      size = struct.size
        version: 1
        age: 21
        alive: 1
        name: 'devon 👍'
        gender: 0

      size.should.equal 15

    it 'should compute the correct size with pointers', ->
      struct = new VersionedStruct uint8,
        0:
          name: new StringT uint8, 'ascii'
          age: uint8
        1:
          name: new StringT uint8, 'utf8'
          age: uint8
          ptr: new Pointer uint8, new StringT uint8

      size = struct.size
        version: 1
        name: 'devon'
        age: 21
        ptr: 'hello'

      size.should.equal 15
    
    it 'should throw if no value is given', ->
      struct = new VersionedStruct uint8,
        0:
          name: new StringT 4, 'ascii'
          age: uint8
        1:
          name: new StringT 4, 'utf8'
          age: uint8
          gender: uint8

      should.throw ->
        struct.size()
      , /not a fixed size/i

  describe 'encode', ->
    it 'should encode objects to buffers', (done) ->
      struct = new VersionedStruct uint8,
        0:
          name: new StringT uint8, 'ascii'
          age: uint8
        1:
          name: new StringT uint8, 'utf8'
          age: uint8
          gender: uint8

      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer '\x00\x05devon\x15\x01\x0adevon 👍\x15\x00', 'utf8'
        done()

      struct.encode stream,
        version: 0
        name: 'devon'
        age: 21

      struct.encode stream,
        version: 1
        name: 'devon 👍'
        age: 21
        gender: 0

      stream.end()

    it 'should throw for unknown version', ->
      struct = new VersionedStruct uint8,
        0:
          name: new StringT uint8, 'ascii'
          age: uint8
        1:
          name: new StringT uint8, 'utf8'
          age: uint8
          gender: uint8

      stream = new EncodeStream
      should.throw ->
        struct.encode stream,
          version: 5
          name: 'devon'
          age: 21

    it 'should support common header block', (done) ->
      struct = new VersionedStruct uint8,
        header:
          age: uint8
          alive: uint8
        0:
          name: new StringT uint8, 'ascii'
        1:
          name: new StringT uint8, 'utf8'
          gender: uint8

      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer '\x00\x15\x01\x05devon\x01\x15\x01\x0adevon 👍\x00', 'utf8'
        done()

      struct.encode stream,
        version: 0
        age: 21
        alive: 1
        name: 'devon'

      struct.encode stream,
        version: 1
        age: 21
        alive: 1
        name: 'devon 👍'
        gender: 0

      stream.end()

    it 'should encode pointer data after structure', (done) ->
      struct = new VersionedStruct uint8,
        0:
          name: new StringT uint8, 'ascii'
          age: uint8
        1:
          name: new StringT uint8, 'utf8'
          age: uint8
          ptr: new Pointer uint8, new StringT uint8

      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer '\x01\x05devon\x15\x09\x05hello', 'utf8'
        done()

      struct.encode stream,
        version: 1
        name: 'devon'
        age: 21
        ptr: 'hello'

      stream.end()

    it 'should support preEncode hook', (done) ->
      struct = new VersionedStruct uint8,
        0:
          name: new StringT uint8, 'ascii'
          age: uint8
        1:
          name: new StringT uint8, 'utf8'
          age: uint8
          gender: uint8

      struct.preEncode = ->
        @version = if @gender? then 1 else 0

      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer '\x00\x05devon\x15\x01\x0adevon 👍\x15\x00', 'utf8'
        done()

      struct.encode stream,
        name: 'devon'
        age: 21

      struct.encode stream,
        name: 'devon 👍'
        age: 21
        gender: 0

      stream.end()
