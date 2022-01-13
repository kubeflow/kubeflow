This folder contains prebuilt browser versions of the light library suitable for use with reflection, static code and JSON descriptors / modules. When sending pull requests, it is not required to update these.

Prebuilt files are in source control to enable pain-free frontend respectively CDN usage:

CDN usage
---------

Development:
```
<script src="//cdn.rawgit.com/dcodeIO/protobuf.js/6.X.X/dist/light/protobuf.js"></script>
```

Production:
```
<script src="//cdn.rawgit.com/dcodeIO/protobuf.js/6.X.X/dist/light/protobuf.min.js"></script>
```

**NOTE:** Remember to replace the version tag with the exact [release](https://github.com/dcodeIO/protobuf.js/tags) your project depends upon.

Frontend usage
--------------

Development:
```
<script src="node_modules/protobufjs/dist/light/protobuf.js"></script>
```

Production:
```
<script src="node_modules/protobufjs/dist/light/protobuf.min.js"></script>
```
