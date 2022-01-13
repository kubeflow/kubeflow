var blobStream = require('../');
var test = require('tape');

test('buffers', function(t) {
  var s = blobStream();
  
  s.on('finish', function() {
    t.equal(this.length, 6);
    
    var blob = this.toBlob();
    t.equal(blob.size, 6);
    t.equal(blob.type, 'application/octet-stream');
    
    blob = this.toBlob('text/plain');
    t.equal(blob.size, 6);
    t.equal(blob.type, 'text/plain');
    
    t.equal(typeof this.toBlobURL(), 'string');
    t.end();
  });
    
  s.write(new Buffer('abc'));
  s.end(new Buffer('def'));
});

test('arrays', function(t) {
  var s = blobStream();
  
  s.on('finish', function() {
    t.equal(this.length, 6);
    
    var blob = this.toBlob();
    t.equal(blob.size, 6);
    t.equal(blob.type, 'application/octet-stream');
    
    blob = this.toBlob('text/plain');
    t.equal(blob.size, 6);
    t.equal(blob.type, 'text/plain');
    
    t.equal(typeof this.toBlobURL(), 'string');
    t.end();
  });
      
  var uta = Buffer._useTypedArrays;
  Buffer._useTypedArrays = false;
  
  s.write(new Buffer('abc'));
  s.end(new Buffer('def'));
  
  Buffer._useTypedArrays = uta;
});

test('sliced buffers', function(t) {
  var s = blobStream();
  
  s.on('finish', function() {
    t.equal(this.length, 4);
    
    var blob = this.toBlob();
    t.equal(blob.size, 4);
    t.equal(blob.type, 'application/octet-stream');
    
    blob = this.toBlob('text/plain');
    t.equal(blob.size, 4);
    t.equal(blob.type, 'text/plain');
    
    t.equal(typeof this.toBlobURL(), 'string');
    t.end();
  });
    
  s.write(new Buffer('abc').slice(1));
  s.end(new Buffer('def').slice(0, -1));
});
