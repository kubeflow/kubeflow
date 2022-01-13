{Pointer, VoidPointer, uint8, DecodeStream, EncodeStream, Struct} = require '../'
should = require('chai').should()
concat = require 'concat-stream'

describe 'Pointer', ->
  describe 'decode', ->
    it 'should handle null pointers', ->
      stream = new DecodeStream new Buffer [0]
      pointer = new Pointer uint8, uint8
      should.not.exist pointer.decode(stream, _startOffset: 50)

    it 'should use local offsets from start of parent by default', ->
      stream = new DecodeStream new Buffer [1, 53]
      pointer = new Pointer uint8, uint8
      pointer.decode(stream, _startOffset: 0).should.equal 53

    it 'should support immediate offsets', ->
      stream = new DecodeStream new Buffer [1, 53]
      pointer = new Pointer uint8, uint8, type: 'immediate'
      pointer.decode(stream).should.equal 53

    it 'should support offsets relative to the parent', ->
      stream = new DecodeStream new Buffer [0, 0, 1, 53]
      stream.pos = 2
      pointer = new Pointer uint8, uint8, type: 'parent'
      pointer.decode(stream, parent: _startOffset: 2).should.equal 53

    it 'should support global offsets', ->
      stream = new DecodeStream new Buffer [1, 2, 4, 0, 0, 0, 53]
      pointer = new Pointer uint8, uint8, type: 'global'
      stream.pos = 2
      pointer.decode(stream, parent: parent: _startOffset: 2).should.equal 53

    it 'should support offsets relative to a property on the parent', ->
      stream = new DecodeStream new Buffer [1, 0, 0, 0, 0, 53]
      pointer = new Pointer uint8, uint8, relativeTo: 'parent.ptr'
      pointer.decode(stream, _startOffset: 0, parent: ptr: 4).should.equal 53

    it 'should support returning pointer if there is no decode type', ->
      stream = new DecodeStream new Buffer [4]
      pointer = new Pointer uint8, 'void'
      pointer.decode(stream, _startOffset: 0).should.equal 4
      
    it 'should support decoding pointers lazily', ->
      stream = new DecodeStream new Buffer [1, 53]
      struct = new Struct
        ptr: new Pointer uint8, uint8, lazy: yes
        
      res = struct.decode(stream)
      Object.getOwnPropertyDescriptor(res, 'ptr').get.should.be.a('function')
      Object.getOwnPropertyDescriptor(res, 'ptr').enumerable.should.equal(true)
      res.ptr.should.equal 53

  describe 'size', ->
    it 'should add to local pointerSize', ->
      pointer = new Pointer uint8, uint8
      ctx = pointerSize: 0
      pointer.size(10, ctx).should.equal 1
      ctx.pointerSize.should.equal 1

    it 'should add to immediate pointerSize', ->
      pointer = new Pointer uint8, uint8, type: 'immediate'
      ctx = pointerSize: 0
      pointer.size(10, ctx).should.equal 1
      ctx.pointerSize.should.equal 1

    it 'should add to parent pointerSize', ->
      pointer = new Pointer uint8, uint8, type: 'parent'
      ctx = parent: pointerSize: 0
      pointer.size(10, ctx).should.equal 1
      ctx.parent.pointerSize.should.equal 1

    it 'should add to global pointerSize', ->
      pointer = new Pointer uint8, uint8, type: 'global'
      ctx = parent: parent: parent: pointerSize: 0
      pointer.size(10, ctx).should.equal 1
      ctx.parent.parent.parent.pointerSize.should.equal 1

    it 'should handle void pointers', ->
      pointer = new Pointer uint8, 'void'
      ctx = pointerSize: 0
      pointer.size(new VoidPointer(uint8, 50), ctx).should.equal 1
      ctx.pointerSize.should.equal 1

    it 'should throw if no type and not a void pointer', ->
      pointer = new Pointer uint8, 'void'
      ctx = pointerSize: 0
      should.throw ->
        pointer.size(30, ctx).should.equal 1
        
    it 'should return a fixed size without a value', ->
      pointer = new Pointer uint8, uint8
      pointer.size().should.equal 1

  describe 'encode', ->
    it 'should handle null pointers', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer [0]
        done()

      ptr = new Pointer uint8, uint8
      ctx =
        pointerSize: 0,
        startOffset: 0,
        pointerOffset: 0,
        pointers: []

      ptr.encode(stream, null, ctx)
      ctx.pointerSize.should.equal 0

      stream.end()

    it 'should handle local offsets', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer [1]
        done()

      ptr = new Pointer uint8, uint8
      ctx =
        pointerSize: 0,
        startOffset: 0,
        pointerOffset: 1,
        pointers: []

      ptr.encode(stream, 10, ctx)
      ctx.pointerOffset.should.equal 2
      ctx.pointers.should.deep.equal [
        { type: uint8, val: 10, parent: ctx }
      ]

      stream.end()

    it 'should handle immediate offsets', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer [0]
        done()

      ptr = new Pointer uint8, uint8, type: 'immediate'
      ctx =
        pointerSize: 0,
        startOffset: 0,
        pointerOffset: 1,
        pointers: []

      ptr.encode(stream, 10, ctx)
      ctx.pointerOffset.should.equal 2
      ctx.pointers.should.deep.equal [
        { type: uint8, val: 10, parent: ctx }
      ]

      stream.end()

    it 'should handle immediate offsets', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer [0]
        done()

      ptr = new Pointer uint8, uint8, type: 'immediate'
      ctx =
        pointerSize: 0,
        startOffset: 0,
        pointerOffset: 1,
        pointers: []

      ptr.encode(stream, 10, ctx)
      ctx.pointerOffset.should.equal 2
      ctx.pointers.should.deep.equal [
        { type: uint8, val: 10, parent: ctx }
      ]

      stream.end()

    it 'should handle offsets relative to parent', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer [2]
        done()

      ptr = new Pointer uint8, uint8, type: 'parent'
      ctx =
        parent:
          pointerSize: 0,
          startOffset: 3,
          pointerOffset: 5,
          pointers: []

      ptr.encode(stream, 10, ctx)
      ctx.parent.pointerOffset.should.equal 6
      ctx.parent.pointers.should.deep.equal [
        { type: uint8, val: 10, parent: ctx }
      ]

      stream.end()

    it 'should handle global offsets', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer [5]
        done()

      ptr = new Pointer uint8, uint8, type: 'global'
      ctx =
        parent:
          parent:
            parent:
              pointerSize: 0,
              startOffset: 3,
              pointerOffset: 5,
              pointers: []

      ptr.encode(stream, 10, ctx)
      ctx.parent.parent.parent.pointerOffset.should.equal 6
      ctx.parent.parent.parent.pointers.should.deep.equal [
        { type: uint8, val: 10, parent: ctx }
      ]

      stream.end()

    it 'should support offsets relative to a property on the parent', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer [6]
        done()

      ptr = new Pointer uint8, uint8, relativeTo: 'ptr'
      ctx =
        pointerSize: 0,
        startOffset: 0,
        pointerOffset: 10,
        pointers: []
        val:
          ptr: 4

      ptr.encode(stream, 10, ctx)
      ctx.pointerOffset.should.equal 11
      ctx.pointers.should.deep.equal [
        { type: uint8, val: 10, parent: ctx }
      ]

      stream.end()

    it 'should support void pointers', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer [1]
        done()

      ptr = new Pointer uint8, 'void'
      ctx =
        pointerSize: 0,
        startOffset: 0,
        pointerOffset: 1,
        pointers: []

      ptr.encode(stream, new VoidPointer(uint8, 55), ctx)
      ctx.pointerOffset.should.equal 2
      ctx.pointers.should.deep.equal [
        { type: uint8, val: 55, parent: ctx }
      ]

      stream.end()

    it 'should throw if not a void pointer instance', ->
      stream = new EncodeStream
      ptr = new Pointer uint8, 'void'
      ctx =
        pointerSize: 0,
        startOffset: 0,
        pointerOffset: 1,
        pointers: []

      should.throw ->
        ptr.encode(stream, 44, ctx)
