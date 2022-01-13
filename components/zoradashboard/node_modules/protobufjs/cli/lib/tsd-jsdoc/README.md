protobuf.js fork of tsd-jsdoc
=============================

This is a modified version of [tsd-jsdoc](https://github.com/englercj/tsd-jsdoc) v1.0.1 for use with protobuf.js, parked here so we can process issues and pull requests. The ultimate goal is to switch back to the a recent version of tsd-jsdoc once it meets our needs.

Options
-------

* **module: `string`**<br />
  Wraps everything in a module of the specified name.

* **private: `boolean`**<br />
  Includes private members when set to `true`.

* **comments: `boolean`**<br />
  Skips comments when explicitly set to `false`.

* **destination: `string|boolean`**<br />
  Saves to the specified destination file or to console when set to `false`.

Setting options on the command line
-----------------------------------
Providing `-q, --query <queryString>` on the command line will set respectively override existing options. Example: `-q module=protobufjs`
