var WritableStream = require('stream').Writable;
var util = require('util');
var Blob = require('blob');
var URL = global.URL || global.webkitURL || global.mozURL;

function BlobStream() {
  if (!(this instanceof BlobStream))
    return new BlobStream;
    
  WritableStream.call(this);
  this._chunks = [];
  this._blob = null;
  this.length = 0;
}

util.inherits(BlobStream, WritableStream);

BlobStream.prototype._write = function(chunk, encoding, callback) {
  // convert chunks to Uint8Arrays (e.g. Buffer when array fallback is being used)
  if (!(chunk instanceof Uint8Array))
    chunk = new Uint8Array(chunk);
    
  this.length += chunk.length;
  this._chunks.push(chunk);
  callback();
};

BlobStream.prototype.toBlob = function(type) {
  type = type || 'application/octet-stream';
  
  // cache the blob if needed
  if (!this._blob) {
    this._blob = new Blob(this._chunks, {
      type: type
    });
    
    this._chunks = []; // free memory
  }
  
  // if the cached blob's type doesn't match the requested type, make a new blob
  if (this._blob.type !== type)
    this._blob = new Blob([this._blob], { type: type });
  
  return this._blob;
};

BlobStream.prototype.toBlobURL = function(type) {
  return URL.createObjectURL(this.toBlob(type));
};

module.exports = BlobStream;
