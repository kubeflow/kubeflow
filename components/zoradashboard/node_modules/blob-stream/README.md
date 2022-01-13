# blob-stream

A Node-style writable stream for [HTML5 Blobs](https://developer.mozilla.org/en-US/docs/Web/API/Blob), 
mostly useful in [Browserify](http://browserify.org/).  Allows you to take the output of any Node stream,
and turn it into a Blob or Blob URL for opening in the browser, uploading to a server, etc.

If you don't want to use Browserify, you can also 
[download a prebuilt version](https://github.com/devongovett/blob-stream/releases) of the library.

[![browser support](https://ci.testling.com/devongovett/blob-stream.png)
](https://ci.testling.com/devongovett/blob-stream)

## Example

```javascript
var blobStream = require('blob-stream');

someStream
  .pipe(blobStream())
  .on('finish', function() {
    // get a blob
    var blob = this.toBlob();
    
    // or get a blob URL
    var url = this.toBlobURL();
    window.open(url);
  });
```

## License

MIT
