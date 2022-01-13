{EncodeStream} = require '../'
should = require('chai').should()
concat = require 'concat-stream'

describe 'EncodeStream', ->
  it 'should write a buffer', (done) ->
    stream = new EncodeStream
    stream.pipe concat (buf) ->
      buf.should.deep.equal new Buffer [1,2,3]
      done()

    stream.writeBuffer new Buffer [1,2,3]
    stream.end()

  it 'should writeUInt16BE', (done) ->
    stream = new EncodeStream
    stream.pipe concat (buf) ->
      buf.should.deep.equal new Buffer [0xab, 0xcd]
      done()

    stream.writeUInt16BE(0xabcd)
    stream.end()

  it 'should writeUInt16LE', (done) ->
    stream = new EncodeStream
    stream.pipe concat (buf) ->
      buf.should.deep.equal new Buffer [0xab, 0xcd]
      done()

    stream.writeUInt16LE(0xcdab)
    stream.end()

  it 'should writeUInt24BE', (done) ->
    stream = new EncodeStream
    stream.pipe concat (buf) ->
      buf.should.deep.equal new Buffer [0xab, 0xcd, 0xef]
      done()

    stream.writeUInt24BE(0xabcdef)
    stream.end()

  it 'should writeUInt24LE', (done) ->
    stream = new EncodeStream
    stream.pipe concat (buf) ->
      buf.should.deep.equal new Buffer [0xef, 0xcd, 0xab]
      done()

    stream.writeUInt24LE(0xabcdef)
    stream.end()

  it 'should writeInt24BE', (done) ->
    stream = new EncodeStream
    stream.pipe concat (buf) ->
      buf.should.deep.equal new Buffer [0xff, 0xab, 0x24, 0xab, 0xcd, 0xef]
      done()

    stream.writeInt24BE(-21724)
    stream.writeInt24BE(0xabcdef)
    stream.end()

  it 'should writeInt24LE', (done) ->
    stream = new EncodeStream
    stream.pipe concat (buf) ->
      buf.should.deep.equal new Buffer [0x24, 0xab, 0xff, 0xef, 0xcd, 0xab]
      done()

    stream.writeInt24LE(-21724)
    stream.writeInt24LE(0xabcdef)
    stream.end()

  it 'should fill', (done) ->
    stream = new EncodeStream
    stream.pipe concat (buf) ->
      buf.should.deep.equal new Buffer [10, 10, 10, 10, 10]
      done()

    stream.fill(10, 5)
    stream.end()

  describe 'writeString', ->
    it 'should encode ascii by default', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer 'some text', 'ascii'
        done()

      stream.writeString('some text')
      stream.end()

    it 'should encode ascii', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer 'some text', 'ascii'
        done()

      stream.writeString('some text')
      stream.end()

    it 'should encode utf8', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer 'unicode! 👍', 'utf8'
        done()

      stream.writeString('unicode! 👍', 'utf8')
      stream.end()

    it 'should encode utf16le', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer 'unicode! 👍', 'utf16le'
        done()

      stream.writeString('unicode! 👍', 'utf16le')
      stream.end()

    it 'should encode ucs2', (done) ->
      stream = new EncodeStream
      stream.pipe concat (buf) ->
        buf.should.deep.equal new Buffer 'unicode! 👍', 'ucs2'
        done()

      stream.writeString('unicode! 👍', 'ucs2')
      stream.end()

    it 'should encode utf16be', (done) ->
      stream = new EncodeStream
      stream.pipe concat (out) ->
        buf = new Buffer 'unicode! 👍', 'utf16le'
        for i in [0...buf.length - 1] by 2
          byte = buf[i]
          buf[i] = buf[i + 1]
          buf[i + 1] = byte

        out.should.deep.equal buf
        done()

      stream.writeString('unicode! 👍', 'utf16be')
      stream.end()

    it 'should encode macroman', (done) ->
      stream = new EncodeStream
      stream.pipe concat (out) ->
        buf = new Buffer [0x8a, 0x63, 0x63, 0x65, 0x6e, 0x74, 0x65, 0x64, 0x20, 0x63, 0x68, 0x87, 0x72, 0x61, 0x63, 0x74, 0x65, 0x72, 0x73]
        out.should.deep.equal buf
        done()

      stream.writeString('äccented cháracters', 'mac')
      stream.end()
