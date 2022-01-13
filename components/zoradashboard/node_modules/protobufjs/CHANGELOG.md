# Changelog

### [6.11.2](https://www.github.com/protobufjs/protobuf.js/compare/v6.11.1...v6.11.2) (2021-04-30)

* regenerated index.d.ts to fix the unintended breaking change in types.


### [6.11.1](https://www.github.com/protobufjs/protobuf.js/compare/v6.11.0...v6.11.1) (2021-04-29)


### Bug Fixes

* parse.js "parent.add(oneof)“ error (@leon776) ([#1602](https://github.com/protobufjs/protobuf.js/pull/1602))

## [6.11.0](https://www.github.com/protobufjs/protobuf.js/compare/v6.10.2...v6.11.0) (2021-04-28)


### Features

* support for proto3 `optional` fields (@alexander-fenster) ([#1584](https://github.com/protobufjs/protobuf.js/pull/1584))
* add `--no-service` option for `pbjs` (@mdouglass) ([#1577](https://github.com/protobufjs/protobuf.js/pull/1577))

### Bug Fixes

* do not assign `oneof` members to default values, use `null` instead (@alexander-fenster) ([#1597](https://github.com/protobufjs/protobuf.js/pull/1597))

### Dependencies

* set `@types/node` to `>= 13.7.0` in dependencies (@indutny) ([#1575](https://github.com/protobufjs/protobuf.js/pull/1575))

### [6.10.2](https://www.github.com/protobufjs/protobuf.js/compare/v6.10.1...v6.10.2) (2020-11-13)


### Bug Fixes

* es6 export enum ([#1446](https://www.github.com/protobufjs/protobuf.js/issues/1446)) ([9f33784](https://www.github.com/protobufjs/protobuf.js/commit/9f33784350b1efc2e774bbfc087cbd2c47828748))
* make parsedOptions appear in method JSON representation ([#1506](https://www.github.com/protobufjs/protobuf.js/issues/1506)) ([3d29969](https://www.github.com/protobufjs/protobuf.js/commit/3d29969865f2119550d9dc88391846469da9fa7f))
* utf8 -> utf16 decoding bug on surrogate pairs ([#1486](https://www.github.com/protobufjs/protobuf.js/issues/1486)) ([75172cd](https://www.github.com/protobufjs/protobuf.js/commit/75172cd11be137bbabd2fba7a02b15067695ebad))

### [6.10.1](https://www.github.com/protobufjs/protobuf.js/compare/v6.10.0...v6.10.1) (2020-07-16)


### Bug Fixes

* make node detection a bit more forgiving ([#1445](https://www.github.com/protobufjs/protobuf.js/issues/1445)) ([4e75f6d](https://www.github.com/protobufjs/protobuf.js/commit/4e75f6de4a2e49f28c24b59107f262d472b68977))

## [6.10.0](https://www.github.com/protobufjs/protobuf.js/compare/v6.9.0...v6.10.0) (2020-07-13)


### Features

* add configurable Root.prototype.fetch ([ad3cffd](https://www.github.com/protobufjs/protobuf.js/commit/ad3cffdc5a54a7c94830674270d3386e1a2b58fc))
* better comment parse ([#1419](https://www.github.com/protobufjs/protobuf.js/issues/1419)) ([7fd2e18](https://www.github.com/protobufjs/protobuf.js/commit/7fd2e182150c9b6be9ba21e6450b6e4668ad9f82))
* parsed options ([#1256](https://www.github.com/protobufjs/protobuf.js/issues/1256)) ([7a25398](https://www.github.com/protobufjs/protobuf.js/commit/7a2539843055b6daecb9f369c67a6cf588dbb54c))


### Bug Fixes

* allow Windows unc paths to be resolved and normalized ([#1351](https://www.github.com/protobufjs/protobuf.js/issues/1351)) ([cd4aeda](https://www.github.com/protobufjs/protobuf.js/commit/cd4aeda8036f80cfa3b9f1db4096d856b2fd05fb))
* do not fail if no process ([#1440](https://www.github.com/protobufjs/protobuf.js/issues/1440)) ([f2faa8c](https://www.github.com/protobufjs/protobuf.js/commit/f2faa8c32e918b3b843005f0419608b8e158998d))
* fix util.global ([#1441](https://www.github.com/protobufjs/protobuf.js/issues/1441)) ([742b8dc](https://www.github.com/protobufjs/protobuf.js/commit/742b8dcbc750f9c2659088cbd88ea61fd11b24a7))
* google.protobuf.Any type_url fixes ([#1068](https://www.github.com/protobufjs/protobuf.js/issues/1068)) ([192f5f1](https://www.github.com/protobufjs/protobuf.js/commit/192f5f12d071fa534ac625290d4666c839a46a9e))
* handling of map entries with omitted key or value ([#1348](https://www.github.com/protobufjs/protobuf.js/issues/1348)) ([b950877](https://www.github.com/protobufjs/protobuf.js/commit/b950877c86676399674821fca4cf444f046b5acb))
* properly parse empty messages in options ([#1429](https://www.github.com/protobufjs/protobuf.js/issues/1429)) ([7fbc79f](https://www.github.com/protobufjs/protobuf.js/commit/7fbc79f11d89b263dafc8f332ccba59a8d181fca))
* updated isNode check ([#1221](https://www.github.com/protobufjs/protobuf.js/issues/1221)) ([#1363](https://www.github.com/protobufjs/protobuf.js/issues/1363)) ([5564e7b](https://www.github.com/protobufjs/protobuf.js/commit/5564e7b5f07d3eab99762528e8ce88507af5a5a3))

## [6.9.0](https://www.github.com/protobufjs/protobuf.js/compare/6.8.8...v6.9.0) (2020-04-17)


### Features

* add support for buffer configuration ([#1372](https://www.github.com/protobufjs/protobuf.js/issues/1372)) ([101aa1a](https://www.github.com/protobufjs/protobuf.js/commit/101aa1a4f148516fdc83a74f54a229f06e24a5de))
* update dependencies / general cleanup ([#1356](https://www.github.com/protobufjs/protobuf.js/issues/1356)) ([42f49b4](https://www.github.com/protobufjs/protobuf.js/commit/42f49b43f692c24c2bc1ae081b4d1ad9fa173cd7))


### Bug Fixes

* allow file-level options everywhere in the file ([b70eebd](https://www.github.com/protobufjs/protobuf.js/commit/b70eebd86e113effaa7d13b24b19ee4a0cb9e1e5))
* Import Long types ([1d98cb8](https://www.github.com/protobufjs/protobuf.js/commit/1d98cb86fcbc69bd54fb3d3254b348da6ac0a96b))
* npm audit fixes ([ca52447](https://www.github.com/protobufjs/protobuf.js/commit/ca524478621bd2e08120eb444c7ad8089dba1929))
* properly iterate and return method descriptors ([d96bb7a](https://www.github.com/protobufjs/protobuf.js/commit/d96bb7ae991ca7d5ef8eea3bca75a2089c6f1212))
* run npm audit fix ([#1208](https://www.github.com/protobufjs/protobuf.js/issues/1208)) ([b5b6632](https://www.github.com/protobufjs/protobuf.js/commit/b5b66321762a24c5ac2753b68331cbe115969da7))
* **docs:** update CHANGELOG to match format of release-please ([#1376](https://www.github.com/protobufjs/protobuf.js/issues/1376)) ([15ed8a0](https://www.github.com/protobufjs/protobuf.js/commit/15ed8a0fbe72b2e408b87ba25028f877796cc191))

## [6.8.8](https://github.com/protobufjs/protobuf.js/releases/tag/6.8.8)

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3001425b0d896d14188307cd0cc84ce195ad9e04) Persist recent index.d.ts changes in JSDoc<br />

## [6.8.7](https://github.com/protobufjs/protobuf.js/releases/tag/6.8.7)

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/e8449c4bf1269a2cc423708db6f0b47a383d33f0) Fix package browser field descriptor ([#1046](https://github.com/protobufjs/protobuf.js/issues/1046))<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/996b3fa0c598ecc73302bfc39208c44830f07b1a) Fix static codegen issues with uglifyjs3<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/a06317139b92fdd8c6b3b188fb7b9704dc8ccbf1) Fix lint issues / pbts on windows<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/a927a6646e8fdddebcb3e13bc8b28b041b3ee40a) Fix empty 'bytes' field decoding, now using Buffer where applicable ([#1020](https://github.com/protobufjs/protobuf.js/issues/1020))<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/f13a81fb41fbef2ce9dcee13f23b7276c83fbcfd) Fix circular dependency of Namespace and Enum ([#994](https://github.com/protobufjs/protobuf.js/issues/994))<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c05c58fad61c16e5ce20ca19758e4782cdd5d2e3) Ignore optional commas in aggregate options ([#999](https://github.com/protobufjs/protobuf.js/issues/999))<br />

### New
[:hash:](https://github.com/protobufjs/protobuf.js/commit/36fc964b8db1e4372c76b1baf9f03857cd875b07) Make Message<T> have a default type param ([#1086](https://github.com/protobufjs/protobuf.js/issues/1086))<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/996b3fa0c598ecc73302bfc39208c44830f07b1a) Explicitly define service method names when generating static code, see [#857](https://github.com/protobufjs/protobuf.js/issues/857)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/07c5d59e1da8c5533a39007ba332928206281408) Also handle services in ext/descriptor ([#1001](https://github.com/protobufjs/protobuf.js/issues/1001))<br />

### CLI
[:hash:](https://github.com/protobufjs/protobuf.js/commit/2c5ef95818a310243f88ffba0331cd47ee603c0a) Extend list of ignored ESLint rules for pbjs, fixes [#1085](https://github.com/protobufjs/protobuf.js/issues/1085)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/8576b49ad3e55b8beae2a8f044c51040484eef12) Fix declared return type of pbjs/pbts callback ([#1025](https://github.com/protobufjs/protobuf.js/issues/1025))<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/9fceaa69667895e609a3ed78eb2efa7a0ecfb890) Added an option to pbts to allow custom imports ([#1038](https://github.com/protobufjs/protobuf.js/issues/1038))<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/65d113b0079fa2570837f3cf95268ce24714a248) Get node executable path from process.execPath ([#1018](https://github.com/protobufjs/protobuf.js/issues/1018))<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/b611875cfbc1f98d8973a2e86f1506de84f00049) Slim down CI testing and remove some not ultimately necesssary dependencies with audit issues<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/812b38ddabb35e154f9ff94f32ad8ce2a70310f1) Move global handling to util, see [#995](https://github.com/protobufjs/protobuf.js/issues/995)<br />

## [6.8.6](https://github.com/protobufjs/protobuf.js/releases/tag/6.8.6)

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/2ee1028d631a328e152d7e09f2a0e0c5c83dc2aa) Fix typeRefRe being vulnerable to ReDoS<br />

## [6.8.5](https://github.com/protobufjs/protobuf.js/releases/tag/6.8.6)

### New
[:hash:](https://github.com/protobufjs/protobuf.js/commit/462132f222d8febb8211d839635aad5b82dc6315) Preserve comments when serializing/deserializing with toJSON and fromJSON. ([#983](https://github.com/protobufjs/protobuf.js/issues/983))<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/d29c0caa715a14214fc755b3cf10ac119cdaf199) Add more details to some frequent error messages ([#962](https://github.com/protobufjs/protobuf.js/issues/962))<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/8400f87ad8ed2b47e659bc8bb6c3cf2467802425) Add IParseOptions#alternateCommentMode ([#968](https://github.com/protobufjs/protobuf.js/issues/968))<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/d6e3b9e218896ec1910e02448b5ee87e4d96ede6) Added field_mask to built-in common wrappers ([#982](https://github.com/protobufjs/protobuf.js/issues/982))<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/635fef013fbb3523536d92c690ffd7d84829db35) Remove code climate config in order to use 'in-app' config instead<br />

## [6.8.4](https://github.com/protobufjs/protobuf.js/releases/tag/6.8.4)

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/69440c023e6962c644715a0c95363ddf19db648f) Update jsdoc dependency (pinned vulnerable marked)<br />

## [6.8.3](https://github.com/protobufjs/protobuf.js/releases/tag/6.8.3)

### CLI
[:hash:](https://github.com/protobufjs/protobuf.js/commit/cc991a058b0636f3454166c76de7b664cf23a8f4) Use correct safeProp in json-module target, see [#956](https://github.com/protobufjs/protobuf.js/issues/956)<br />

## [6.8.2](https://github.com/protobufjs/protobuf.js/releases/tag/6.8.2)

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6fc6481d790648e9e2169a961ad31a732398c911) Include dist files in npm package, see [#955](https://github.com/protobufjs/protobuf.js/issues/955)<br />

## [6.8.1](https://github.com/protobufjs/protobuf.js/releases/tag/6.8.1)

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/db2dd49f6aab6ecd606eee334b95cc0969e483c2) Prevent invalid JSDoc names when generating service methods, see [#870](https://github.com/protobufjs/protobuf.js/issues/870)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/62297998d681357ada70fb370b99bac5573e5054) Prevent parse errors when generating service method names, see [#870](https://github.com/protobufjs/protobuf.js/issues/870)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/478f332e0fc1d0c318a70b1514b1d59c8c200c37) Support parsing nested option-values with or without ':' ([#951](https://github.com/protobufjs/protobuf.js/issues/951), fixes [#946](https://github.com/protobufjs/protobuf.js/issues/946))<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/83477ca8e0e1f814ac79a642ea656f047563613a) Add support for reserved keyword in enums ([#950](https://github.com/protobufjs/protobuf.js/issues/950), fixes [#949](https://github.com/protobufjs/protobuf.js/issues/949))<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c482a5b76fd57769eae4308793e3ff8725264664) Unified safe property escapes and added a test for [#834](https://github.com/protobufjs/protobuf.js/issues/834)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/1724581c36ecc4fc166ea14a9dd57af5e093a467) Fix codegen if type name starts with "Object"<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/adecd544c5fcbeba28d502645f895024e3552970) Fixed dependency for json-module to use "light".<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/2a8dd74fca70d4e6fb41328a7cee81d1d50ad7ad) Basic support for URL prefixes in google.protobuf.Any types.<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/be78a3d9bc8d9618950c77f9e261b422670042ce) fixed 'error is not defined linter warning when using static/static-module and es6<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c712447b309ae81134c7afd60f8dfa5ecd3be230) Fixed wrong type_url for any type (no leading '.' allowed).<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/145bda25ee1de2c0678ce7b8a093669ec2526b1d) Fixed fromObject() for google.protobuf.Any types.<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/7dec43d9d847481ad93fca498fd970b3a4a14b11) Handle case where 'extendee' is undefined in ext/descriptor<br />

### CLI
[:hash:](https://github.com/protobufjs/protobuf.js/commit/20a26271423319085d321878edc5166a5449e68a) Sanitize CR-only line endings (coming from jsdoc?)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/19d2af12b5db5a0f668f50b0cae3ee0f8a7affc2) Make sure enum typings become generated ([#884](https://github.com/protobufjs/protobuf.js/issues/884) didn't solve this)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/a2c72c08b0265b112d367fa3d33407ff0de955b9) Remove exclude and include patterns from jsdoc config<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/9afb8a2ff27c1e0a999d7331f3f65f568f5cced5) Skip defaults when generating proto3<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/952c7d1b478cc7c6de82475a17a1387992e8651f) Wait for both the 'end' and 'close' event to happen before finishing in pbts, see [#863](https://github.com/protobufjs/protobuf.js/issues/863)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ed7e2e71f5cde27c4128f4f2e3f4782cc51fbec7) Accept null for optional fields in generated static code<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/27cc66a539251216ef10aea04652d58113949df9) Annotate TS classes with @implements<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/05e7e0636727008c72549459b8594fa0442d346f) Annotate virtual oneofs as string literal unions<br />

### New
[:hash:](https://github.com/protobufjs/protobuf.js/commit/685adb0e7ef0f50e4b93a105013547884957cc98) Also check for reserved ids and names in enums<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/843d0d5b927968025ca11babff28495dd3bb2863) Also support 'reserved' in enum descriptors<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/a8376b57fb0a858adff9dc8a1d1b5372eff9d85c) Include just relevant files in npm package, fixes [#781](https://github.com/protobufjs/protobuf.js/issues/781)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/bda1bc6917c681516f6be8be8f0e84ba1262c4ce) Fix travis build<br />

## [6.8.0](https://github.com/protobufjs/protobuf.js/releases/tag/6.8.0)

### Breaking
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ff858003f525db542cbb270777b6fab3a230c9bb) Replaced Buffer and Long types with interfaces and removed stubs<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/22f907c49adbbdf09b72bde5299271dbe0ee9cbe) Removed Message#toObject in favor of having just the static version (unnecessary static code otherwise)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c97b61811248df002f1fb93557b982bc0aa27309) Everything uses interfaces now instead of typedefs (SomethingProperties is now ISomething)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/b9f179064f3ddf683f13e0d4e17840301be64010) ReflectionObject#toJSON properly omits explicit undefined values<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/7a6f98b5e74f9e9142f9be3ba0683caeaff916c4) Initial implementation of TypeScript decorators<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/7a6f98b5e74f9e9142f9be3ba0683caeaff916c4) Refactored protobuf.Class away<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/7a6f98b5e74f9e9142f9be3ba0683caeaff916c4) TypeScript definitions now have (a lot of) generics<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/7a6f98b5e74f9e9142f9be3ba0683caeaff916c4) Removed deprecated features<br />

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c306d19d806eb697913ffa2b8613f650127a4c50) Added 'undefined' besides 'null' as a valid value of an optional field, fixes [#826](https://github.com/protobufjs/protobuf.js/issues/826)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c5518c3bac0da9c2045e6f1baf0dee915afb4221) Fixed an issue with codegen typings, see [#819](https://github.com/protobufjs/protobuf.js/issues/819)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/66d149e92ff1baddfdfd4b6a88ca9bcea6fc6195) Ported utf8 chunking mechanism to base64 as well, fixes [#800](https://github.com/protobufjs/protobuf.js/issues/800)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/e1f9d9856c98a0f0eb1aa8bdf4ac0df467bee8b9) Also be more verbose when defining properties for ES6, fixes [#820](https://github.com/protobufjs/protobuf.js/issues/820)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/cf36097305ab02047be5014eabeccc3154e18bde) Generate more verbose JSDoc comments for ES6 support, fixes [#820](https://github.com/protobufjs/protobuf.js/issues/820)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/f2959795330966f13cb65bbb6034c88a01fc0bcc) Emit a maximum of one error var when generating verifiers, fixes [#786](https://github.com/protobufjs/protobuf.js/issues/786)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3b848a10b39c1897ca1ea3b5149ef72ae43fcd11) Fixed missing semicolon after 'extensions' and 'reserved' when generating proto files, fixes [#810](https://github.com/protobufjs/protobuf.js/issues/810)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/eb1b40497e14a09facbc370676f486bed1376f52) Call npm with '--no-bin-links' when installing CLI deps, fixes [#823](https://github.com/protobufjs/protobuf.js/issues/823)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/429de19d851477f1df2804d5bc0be30228cd0924) Fix Reader argument conversion in static module<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/03194c203d6ff61ae825e66f8a29ca204fa503b9) Use JSDoc, they said, it documents code, they said. Fixes [#770](https://github.com/protobufjs/protobuf.js/issues/770)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ec6a133ff541c638517e00f47b772990207c8640) parser should not confuse previous trailing line comments with comments for the next declaration, see [#762](https://github.com/protobufjs/protobuf.js/issues/762)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/0589ace4dc9e5c565ff996cf6e6bf94e63f43c4e) Types should not clear constructor with cache (fixes decorators)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/056ecc3834a3b323aaaa676957efcbe3f52365a0) Namespace#lookup should also check in nested namespaces (wtf)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ed34b093839652db2ff7b84db87857fc57d96038) Reader#bytes should also support plain arrays<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/514afcfa890aa598e93254576c4fd6062e0eff3b) Fix markdown for pipe in code in table<br />

### New
[:hash:](https://github.com/protobufjs/protobuf.js/commit/17c2797592bc4effd9aaae3ba9777c9550bb75ac) Upgrade to codegen 2<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/57d7d35ddbb9e3a28c396b4ef1ae3b150eeb8035) ext/descriptor enables interoperability between reflection and descriptor.proto (experimental), see [#757](https://github.com/protobufjs/protobuf.js/issues/757)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3939667ef1f37b025bd7f9476015890496d50e00) Added 'json' conversion option for proto3 JSON mapping compatibility of NaN and Infinity + additional documentation of util.toJSONOptions, see [#351](https://github.com/protobufjs/protobuf.js/issues/351)<br />

### CLI
[:hash:](https://github.com/protobufjs/protobuf.js/commit/4eac28c7d3acefb0af7b82c62cf8d19bf3e7d37b) Use protobuf/minimal when pbjs target is static-module<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3a959453fe63706c38ebbacda208e1f25f27dc99) Added closure wrapper<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/13bf9c2635e6a1a2711670fc8e28ae9d7b8d1c8f) Various improvements to statically generated JSDoc, also fixes [#772](https://github.com/protobufjs/protobuf.js/issues/772)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ffdc93c7cf7c8a716316b00864ea7c510e05b0c8) Check incompatible properties for namespaces only in tsd-jsdoc<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/fb3f9c70436d4f81bcd0bf62b71af4d253390e4f) Additional tsd-jsdoc handling of properties inside of namespaces and TS specific API exposure<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/2dcae25c99e2ed8afd01e27d21b106633b8c31b9) Several improvements to tsd-jsdoc emitted comments<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ff858003f525db542cbb270777b6fab3a230c9bb) Further TypeScript definition improvements<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/22f907c49adbbdf09b72bde5299271dbe0ee9cbe) Relieved tsd files from unnecessary comments<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/22f907c49adbbdf09b72bde5299271dbe0ee9cbe) Generate TS namespaces for vars and functions with properties<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/b355115e619c6595ac9d91897cfe628ef0e46054) Prefer @tstype over @type when generating typedefs (tsd-jsdoc)<br />

### Docs
[:hash:](https://github.com/protobufjs/protobuf.js/commit/23f4b990375efcac2c144592cf4ca558722dcf2d) Replaced nullable types with explicit type|null for better tooling compatibility, also fixes [#766](https://github.com/protobufjs/protobuf.js/issues/766) and fixes 767<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6493f52013c92a34b8305a25068ec7b8c4c29d54) Added more info to ext/descriptor README, see [#757](https://github.com/protobufjs/protobuf.js/issues/757)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ef92da3768d8746dbfe72e77232f78b879fc811d) Additional notes on ext/descriptor<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/b646cf7499791a41b75eef2de1a80fb558d4159e) Updated CHANGELOG so everyone knows what's going on (and soon, breaking)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/35a663757efe188bea552aef017837bc6c6a481a) Additional docs on TS/decorators usage<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/9726be0888a9461721447677e9dece16a682b9f6) Updated dist files<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/9726be0888a9461721447677e9dece16a682b9f6) Added package-lock.json<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/114f7ea9fa3813003afc3ebb453b2dd2262808e1) Minor formatting<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/8a6e464954b472fdbb4d46d9270fe3b4b3c7272d) Generate files<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/42f8a97630bcb30d197b0f1d6cbdd96879d27f96) Remove the no-constructor arg<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6446247cd7edbb77f03dc42c557f568811286a39) Remove the ctor option.<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/2059ee0f6f951575d5c5d2dc5eb06b6fa34e27aa) Add support to generate types for JSON object.<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/7445da0f8cb2e450eff17723f25f366daaf3bbbb) aspromise performance pass<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3f8b74ba6726567eaf68c4d447c120f75eac042f) codegen 2 performance pass, [#653](https://github.com/protobufjs/protobuf.js/issues/653) might benefit<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/d44a7eec2fd393e5cb24196fb5818c8c278a0f34) Fixed minimal library including reflection functionality<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/a18e6db9f02696c66032bce7ef4c0eb0568a8048) Minor compression ratio tuning<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/b49a4edd38395e209bedac2e0bfb7b9d5c4e980b) Fixed failing test case + coverage<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/8f7111cacd236501b7e26791b9747b1974a2d9eb) Improved fromObject wrapper for google.protobuf.Any.<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/0e471a2516bde3cd3c27b2691afa0dcfbb01f042) Fixed failing tokenize test case<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/5867f076d8510fa97e3bd6642bbe61960f7fd196) Removed debug build, made it an extension<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/22f907c49adbbdf09b72bde5299271dbe0ee9cbe) Regenerated dist files<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/5bc3541d2da19e2857dc884f743d37c27e8e21f2) Even more documentation and typings for ext/descriptor<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/773e6347b57e4a5236b1ef0bb8d361e4b233caf7) ext/descriptor docs<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/773e6347b57e4a5236b1ef0bb8d361e4b233caf7) Decorators coverage<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/9a23ded94729ceeea2f87cb7e8460eaaaf1c8269) ext/descriptor support for various standard options, see [#757](https://github.com/protobufjs/protobuf.js/issues/757)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/2d8ce6ec0abd261f9b261a44a0a258fdf57ecec3) ext/descriptor passes descriptor.proto test with no differences, see [#757](https://github.com/protobufjs/protobuf.js/issues/757)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3a20968c6d676312e4f2a510f7e079e0e0819daf) Properly remove unnecessary (packed) options from JSON descriptors<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/2a30df8bd5f20d91143a38c2232dafc3a6f3a7bd) Use typedefs in ext/descriptor (like everywhere else), see [#757](https://github.com/protobufjs/protobuf.js/issues/757)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/1fc911cef01e081c04fb82ead685f49dde1403bb) Fixed obvious issues with ext/descriptor, does not throw anymore when throwing descriptor.proto itself at it, see [#757](https://github.com/protobufjs/protobuf.js/issues/757)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6c37dbd14f39dad687f2f89f1558a875f7dcc882) Added still missing root traversal to ext/descriptor, see [#757](https://github.com/protobufjs/protobuf.js/issues/757)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/7ab136daa5eb2769b616b6b7522e45a4e33a59f6) Initial map fields support for ext/descriptor, see [#757](https://github.com/protobufjs/protobuf.js/issues/757)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/708552bb84508364b6e6fdf73906aa69e83854e1) Added infrastructure for TypeScript support of extensions<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/23f26defa793b371c16b5f920fbacb3fb66bdf22) TypeScript generics improvements<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/e49bef863c0fb10257ec1001a3c5561755f2ec6b) More ext/descriptor progress, see [#757](https://github.com/protobufjs/protobuf.js/issues/757)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6b94336c1e6eec0f2eb1bd5dca73a7a8e71a2153) Just export the relevant namespace in ext/descriptor<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/fbb99489ed0c095174feff8f53431d30fb6c34a0) Initial descriptor.proto extension for reflection interoperability, see [#757](https://github.com/protobufjs/protobuf.js/issues/757)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/48e66d975bf7b4e6bdbb68ec24386c98b16c54c5) Moved custom wrappers to its own module instead, also makes the API easier to use manually, see [#677](https://github.com/protobufjs/protobuf.js/issues/677)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/0c6e639d08fdf9be12677bf678563ea631bafb2c) Added infrastructure for custom wrapping/unwrapping of special types, see [#677](https://github.com/protobufjs/protobuf.js/issues/677)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/0425b584f49841d87a8249fef30c78cc31c1c742) More decorator progress (MapField.d, optional Type.d)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/7a6f98b5e74f9e9142f9be3ba0683caeaff916c4) tsd-jsdoc now has limited generics support<br />

## [6.7.3](https://github.com/protobufjs/protobuf.js/releases/tag/6.7.3)

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/57f1da64945f2dc5537c6eaa53e08e8fdd477b67) long, @types/long and @types/node are just dependencies, see [#753](https://github.com/protobufjs/protobuf.js/issues/753)<br />

## [6.7.2](https://github.com/protobufjs/protobuf.js/releases/tag/6.7.2)

### New
[:hash:](https://github.com/protobufjs/protobuf.js/commit/a7621be0a56585defc72d863f4e891e476905692) Split up NamespaceDescriptor to make nested plain namespaces a thing, see [#749](https://github.com/protobufjs/protobuf.js/issues/749)<br />

### Docs
[:hash:](https://github.com/protobufjs/protobuf.js/commit/e980e72ae3d4697ef0426c8a51608d31f516a2c4) More README<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/1f76749d0b9a780c7b6cb56be304f7327d74ebdb) Replaced 'runtime message' with 'message instance' for clarity<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/e6b6dedb550edbd0e54e212799e42aae2f1a87f1) Rephrased the Usage section around the concept of valid messages<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/0d8100ba87be768ebdec834ca2759693e0bf4325) Added toolset diagram to README<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3405ae8d1ea775c96c30d1ef5cde666c9c7341b3) Touched benchmark output metrics once more<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/e36b228f4bb8b1cd835bf31f8605b759a7f1f501) Fixed failing browser test<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/7b3bdb562ee7d30c1a557d7b7851d55de3091da4) Output more human friendly metrics from benchmark<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/59e447889057c4575f383630942fd308a35c12e6) Stripped down static bench code to what's necessary<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/f88dad098282ece65f5d6e224ca38305a8431829) Revamped benchmark, now also covers Google's JS implementation<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/45356be81ba7796faee0d4d8ad324abdd9f301fb) Updated dependencies and dist files<br />

## [6.7.1](https://github.com/protobufjs/protobuf.js/releases/tag/6.7.1)

### New
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3d23eed6f7c79007969672f06c1a9ccd691e2411) Made .verify behave more like .encode, see [#710](https://github.com/protobufjs/protobuf.js/issues/710)<br />

### CLI
[:hash:](https://github.com/protobufjs/protobuf.js/commit/bed514290c105c3b606f760f2abba80510721c77) With null/undefined eliminated by constructors and .create, document message fields as non-optional where applicable (ideally used with TS & strictNullChecks), see [#743](https://github.com/protobufjs/protobuf.js/issues/743)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/007b2329842679ddf994df7ec0f9c70e73ee3caf) Renamed --strict-long/message to --force-long/message with backward compatible aliases, see [#741](https://github.com/protobufjs/protobuf.js/issues/741)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6aae71f75e82ffd899869b0c952daf98991421b8) Keep $Properties with --strict-message but require actual instances within, see [#741](https://github.com/protobufjs/protobuf.js/issues/741)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c812cef0eff26998f14c9d58d4486464ad7b2bbc) Added --strict-message option to pbjs to strictly reference message instances instead of $Properties, see [#741](https://github.com/protobufjs/protobuf.js/issues/741)<br />

### Docs
[:hash:](https://github.com/protobufjs/protobuf.js/commit/412407de9afb7ec3a999c4c9a3a1f388f971fce7) Restructured README<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/1c4d9d7f024bfa096ddc24aabbdf39211ed8637a) Added more information on typings usage, see [#744](https://github.com/protobufjs/protobuf.js/issues/744)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/602065e16862751c515c2f3391ee8b880e8140b1) Clarified typescript example in README, see [#744](https://github.com/protobufjs/protobuf.js/issues/744)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/79d0ba2cc71a156910a9d937683af164df694f08) Clarified that the service API targets clients consuming a service, see [#742](https://github.com/protobufjs/protobuf.js/issues/742)<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/a66f76452ba050088efd1aaebf3c503a55e6287c) Omit copying of undefined or null in constructors and .create, see [#743](https://github.com/protobufjs/protobuf.js/issues/743)<br />

## [6.7.0](https://github.com/protobufjs/protobuf.js/releases/tag/6.7.0)

### Breaking
[:hash:](https://github.com/protobufjs/protobuf.js/commit/9c1bbf10e445c3495b23a354f9cbee951b4b20f0) Namespace#lookupEnum should actually look up the reflected enum and not just its values<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/44a8d3af5da578c2e6bbe0a1b948d469bbe27ca1) Decoder now throws if required fields are missing, see [#695](https://github.com/protobufjs/protobuf.js/issues/695) / [#696](https://github.com/protobufjs/protobuf.js/issues/696)<br />

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/d1e3122e326480fdd44e96afd76ee72e9744b246) Added functionality to filter for multiple types at once in lookup(), used by lookupTypeOrEnum(), fixes [#740](https://github.com/protobufjs/protobuf.js/issues/740)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/8aa21268aa5e0f568cb39e99a83b99ccb4084381) Ensure that fields have been resolved when looking up js types in static target, see [#731](https://github.com/protobufjs/protobuf.js/issues/731)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/f755d36829b9f1effd7960fab3a86a141aeb9fea) Properly copy fields array before sorting in toObject, fixes [#729](https://github.com/protobufjs/protobuf.js/issues/729)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/a06691f5b87f7e90fed0115b78ce6febc4479206) Actually emit TS compatible enums in static target if not aliases, see [#720](https://github.com/protobufjs/protobuf.js/issues/720)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/b01bb58dec92ebf6950846d9b8d8e3df5442b15d) Hardened tokenize/parse, esp. comment parsing, see [#713](https://github.com/protobufjs/protobuf.js/issues/713)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/bc76ad732fc0689cb0a2aeeb91b06ec5331d7972) Exclude any fields part of some oneof when populating defaults in toObject, see [#710](https://github.com/protobufjs/protobuf.js/issues/710)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/68cdb5f11fdbb950623be089f98e1356cb7b1ea3) Most of the parser is not case insensitive, see [#705](https://github.com/protobufjs/protobuf.js/issues/705)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3e930b907a834a7da759478b8d3f52fef1da22d8) Retain options argument in Root#load when used with promises, see [#684](https://github.com/protobufjs/protobuf.js/issues/684)<br />

### New
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3c14ef42b3c8f2fef2d96d65d6e288211f86c9ef) Created a micromodule from (currently still bundled) float support<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/7ecae9e9f2e1324ef72bf5073463e01deff50cd6) util.isset(obj, prop) can be used to test if a message property is considered to be set, see [#728](https://github.com/protobufjs/protobuf.js/issues/728)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c04d4a5ab8f91899bd3e1b17fe4407370ef8abb7) Implemented stubs for long.js / node buffers to be used where either one isn't wanted, see [#718](https://github.com/protobufjs/protobuf.js/issues/718)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/b9574ad02521a31ebd509cdaa269e7807da78d7c) Simplified reusing / replacing internal constructors<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/1f97b7af05b49ef69bd6e9d54906d1b7583f42c4) Constructors/.create always initialize proper mutable objects/arrays, see [#700](https://github.com/protobufjs/protobuf.js/issues/700)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/adb4bb001a894dd8d00bcfe03457497eb994f6ba) Verifiers return an error if multiple fields part of the same oneof are set, see [#710](https://github.com/protobufjs/protobuf.js/issues/710)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/fe93d436b430d01b563318bff591e0dd408c06a4) Added `oneofs: true` to ConversionOptions, see [#710](https://github.com/protobufjs/protobuf.js/issues/710)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/228c882410d47a26576f839b15f1601e8aa7914d) Optional fields handle null just like undefined regardless of type see [#709](https://github.com/protobufjs/protobuf.js/issues/709)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/da6af8138afa5343a47c12a8beedb99889c0dd51) Encoders no longer examine virtual oneof properties but encode whatever is present, see [#710](https://github.com/protobufjs/protobuf.js/issues/710)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ac26a7aa60359a37dbddaad139c0134b592b3325) pbjs now generates multiple exports when using ES6 syntax, see [#686](https://github.com/protobufjs/protobuf.js/issues/686)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c1ca65dc6987384af6f9fac2fbd7700fcf5765b2) Sequentially serialize fields ordered by id, as of the spec.<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/26d9fadb21a85ca0b5609156c26453ae875e4933) decode throws specific ProtocolError with a reference to the so far decoded message if required fields are missing + example<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/2b5577b238a452ae86aa395fb2ad3a3f45d755dc) Reader.create asserts that `buffer` is a valid buffer, see [#695](https://github.com/protobufjs/protobuf.js/issues/695)<br />

### CLI
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6f74d30f059e33a4678f28e7a50dc4878c54bed2) Exclude JSDoc on typedefs from generated d.ts files because typescript@next, see [#737](https://github.com/protobufjs/protobuf.js/issues/737)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/2ebb1b781812e77de914cd260e7ab69612ffd99e) Prepare static code with estraverse instead of regular expressions, see [#732](https://github.com/protobufjs/protobuf.js/issues/732)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/29ce6cae0cacc0f1d87ca47e64be6a81325aaa55) Moved tsd-jsdoc to future cli package, see [#716](https://github.com/protobufjs/protobuf.js/issues/716)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/8de21e1a947ddb50a167147dd63ad29d37b6a891) $Properties are just a type that's satisfied, not implemented, by classes, see [#723](https://github.com/protobufjs/protobuf.js/issues/723)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/4bfe0c239b9c337f8fa64ea64f6a71baf5639b84) More progress on decoupling the CLI<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/8a60174932d15198883ac3f07000ab4e7179a695) Fixed computed array indexes not being renamed in static code, see [#726](https://github.com/protobufjs/protobuf.js/issues/726)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/8d9981588d17709791846de63f1f3bfd09433b03) Check upfront if key-var is required in static decoders with maps, see [#726](https://github.com/protobufjs/protobuf.js/issues/726)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/16adff0c7b67c69a2133b6aac375365c5f2bdbf7) Fixed handling of stdout if callback is specified, see [#724](https://github.com/protobufjs/protobuf.js/issues/724)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6423a419fe45e648593833bf535ba1736b31ef63) Preparations for moving the CLI to its own package, see [#716](https://github.com/protobufjs/protobuf.js/issues/716)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/afefa3de09620f50346bdcfa04d52952824c3c8d) Properly implement $Properties interface in JSDoc, see [#723](https://github.com/protobufjs/protobuf.js/issues/723)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/a1f23e09fb5635275bb7646dfafc70caef74c6b8) Recursively use $Properties inside of $Properties in static code, see [#717](https://github.com/protobufjs/protobuf.js/issues/717)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c3f0a2124c661bb9ba35f92c21a98a4405d30b47) Added --strict-long option to pbjs to always emit 'Long' instead of 'number|Long' (only relevant with long.js), see [#718](https://github.com/protobufjs/protobuf.js/issues/718)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/0bc4a14501f84f93afd6ce2933ad00749c82f4df) Statically emitted long type is 'Long' now instead of '$protobuf.Long', see [#718](https://github.com/protobufjs/protobuf.js/issues/718)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/a75625d176b7478e0e506f05e2cee5e3d7a0d89a) Decoupled message properties as an interface in static code for TS intellisense support, see [#717](https://github.com/protobufjs/protobuf.js/issues/717)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/23f14a61e8c2f68b06d1bb4ed20b938764c78860) Static code statically resolves types[..], see [#715](https://github.com/protobufjs/protobuf.js/issues/715)<br />

### Docs
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ef71e77726b6bf5978b948d598c18bf8b237ade4) Added type definitions for all possible JSON descriptors<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/4bfe0c239b9c337f8fa64ea64f6a71baf5639b84) Explained the JSON structure in README and moved CLI specific information to the CLI package<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3ba3ad762f7486b4806ad1c45764e92a81ca24dd) Added information on how to use the stubs to README, see [#718](https://github.com/protobufjs/protobuf.js/issues/718)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/a5dbba41341bf44876cd4226f08044f88148f37d) Added 'What is a valid message' section to README<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6f8f2c1fdf92e6f81363d77bc059820b2376fe32) Added a hint on using .create to initial example<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3ad28ec920e0fe8d0223db28804a7b3f8a6880c2) Even more usage for README<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/5a1f861a0f6b582faae7a4cc5c6ca7e4418086da) Additional information on general usage (README)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/320dea5a1d1387c72759e10a17afd77dc48c3de0) Restructured README to Installation, Usage and Examples sections<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/1c9055dd69f7696d2582942b307a1ac8ac0f5533) Added a longish section on the correct use of the toolset to README<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/99667c8e1ff0fd3dac83ce8c0cff5d0b1e347310) Added a few additional notes on core methods to README, see [#710](https://github.com/protobufjs/protobuf.js/issues/710)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/2130bc97e44567e766ea8efacb365383c909dbd4) Extended traverse-types example, see [#693](https://github.com/protobufjs/protobuf.js/issues/693)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/13e4aa3ff274ab42f1302e16fd59d074c5587b5b) Better explain how .verify, .encode and .decode are connected<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/7502dd2dfdaea111e5c1a902c524ad0a51ff9bd4) Documented that Type#encode respectively Message.encode do not implicitly .verify, see [#696](https://github.com/protobufjs/protobuf.js/issues/696) [ci-skip]<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/e7e123aa0b6c05eb4156a761739e37c008a3cbc1) Documented throwing behavior of Reader.create and Message.decode<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/0fcde32306da77f02cb1ea81ed18a32cee01f17b) Added error handling notes to README, see [#696](https://github.com/protobufjs/protobuf.js/issues/696)<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/fef924e5f708f14dac5713aedc484535d36bfb47) Use @protobufjs/float<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/fef924e5f708f14dac5713aedc484535d36bfb47) Rebuilt dist files for 6.7.0<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ca0dce2d7f34cd45e4c1cc753a97c58e05b3b9d2) Updated deps, ts fixes and regenerated dist files<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/2c2d4002d6776f3edde608bd813c37d798d87e6b) Manually merged gentests improvements, fixes [#733](https://github.com/protobufjs/protobuf.js/issues/733)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/e4a6b6f81fa492a63b12f0da0c381612deff1973) Make sure that util.Long is overridden by AMD loaders only if present, see [#730](https://github.com/protobufjs/protobuf.js/issues/730)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/fff1eb297a728ed6d334c591e7d796636859aa9a) Coverage for util.isset and service as a namespace<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/8401a47d030214a54b5ee30426ebc7a9d9c3773d) Shortened !== undefined && !== null to equivalent != null in static code<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/e1dd1bc2667de73bb65d876162131be2a4d9fef4) With stubs in place, 'number|Long' return values can be just 'Long' instead, see [#718](https://github.com/protobufjs/protobuf.js/issues/718)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/404ba8e03a63f708a70a72f0208e0ca9826fe20b) Just alias as the actual ideal type when using stubs, see [#718](https://github.com/protobufjs/protobuf.js/issues/718)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/270cc94c7c4b8ad84d19498672bfc854b55130c9) General cleanup + regenerated dist/test files<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/017161ce97ceef3b2d0ce648651a4636f187d78b) Simplified camel case regex, see [#714](https://github.com/protobufjs/protobuf.js/issues/714)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/d410fd20f35d2a35eb314783b17b6570a40a99e8) Regenerated dist files and changelog for 6.7.0<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/88ca8f0d1eb334646ca2625c78e63fdd57221408) Retain alias order in static code for what it's worth, see [#712](https://github.com/protobufjs/protobuf.js/issues/712)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/2a74fbf551e934b3212273e6a28ad65ac4436faf) Everything can be block- or line-style when parsing, see [#713](https://github.com/protobufjs/protobuf.js/issues/713)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/47bb95a31784b935b9ced52aa773b9d66236105e) Determine necessary aliases depending on config, see [#712](https://github.com/protobufjs/protobuf.js/issues/712)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/588ffd9b129869de0abcef1d69bfa18f2f25d8e1) Use more precise types for message-like plain objects<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/37b39c8d1a5307eea09aa24d7fd9233a8df5b7b6) Regenerated dist files<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/9c94813f9a5f1eb114d7c6112f7e87cb116fe9da) Regenerated relevant files<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/d7493efe1a86a60f6cdcf7976523e69523d3f7a3) Moved field comparer to util<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/fe917652f88df17d4dbaae1cd74f470385342be2) Updated tests to use new simplified encoder logic<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/b69173b4e7b514c40bb4a85b54ca5465492a235b) Updated path to tsd-jsdoc template used by pbts, see [#707](https://github.com/protobufjs/protobuf.js/issues/707)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/5041fad9defdb0bc8131560e92f3b454d8e45273) Additional restructuring for moving configuration files out of the root folder<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c0b7c9fa6309d345c4ce8e06fd86f27528f4ea66) Added codegen support for constructor functions, see [#700](https://github.com/protobufjs/protobuf.js/issues/700)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/4573f9aabd7e8f883e530f4d0b055e5ec9b75219) Attempted to fix broken custom error test<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/4b49f500fce156b164c757d8f17be2338f767c82) Trying out a more aggressive aproach for custom error subclasses<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/95cd64ee514dc60d10daac5180726ff39594e8e8) Moved a few things out of the root folder<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/db1030ed257f9699a0bcf3bad0bbe8acccf5d766) Coverage for encoder compat. / protocolerror<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/948a4caf5092453fa091ac7a594ccd1cc5b503d2) Updated dist and generated test files<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3ead13e83ecdc8715fbab916f7ccaf3fbfdf59ed) Added tslint<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/364e7d457ed4c11328e609f600a57b7bc4888554) Exclude dist/ from codeclimate checks<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6e81fcb05f25386e3997399e6596e9d9414f0286) Also lint cli utilities<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/e7e123aa0b6c05eb4156a761739e37c008a3cbc1) Cache any regexp instance (perf)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/d89c45f8af0293fb34e6f12b37ceca49083e1faa) Use code climate badges<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/e70fbe3492c37f009dbaccf910c1e0f81e8f0f44) Updated travis to pipe to codeclimate, coverage<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/a7ab1036906bb7638193a9e991cb62c86108880a) More precise linter configuration<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/58688c178257051ceb2dfea8a63eb6be7dcf1cf1) Added codeclimate<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/4b21e00adc6fae42e6a88deaeb0b7c077c6ca50e) Moved cli deps placeholder creation to post install script<br />

## [6.6.5](https://github.com/protobufjs/protobuf.js/releases/tag/6.6.5)

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/478ee51194878f24be8607e42e5259952607bd44) sfixed64 is not zig-zag encoded, see [#692](https://github.com/protobufjs/protobuf.js/issues/692)<br />

### CLI
[:hash:](https://github.com/protobufjs/protobuf.js/commit/7a944538c89492abbed147915acea611f11c03a2) Added a placeholder to cli deps node_modules folder to make sure node can load from it<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/83142e420eb1167b2162063a092ae8d89c9dd4b2) Restructured a few failing tests<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/367d55523a3ae88f21d47aa96447ec3e943d4620) Traversal example + minimalistic documentation<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/8eeffcbcd027c929e2a76accad588c61dfa2e37c) Added a custom getters/setters example for gRPC<br />

## [6.6.4](https://github.com/protobufjs/protobuf.js/releases/tag/6.6.4)

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/88eb7a603a21643d5012a374c7d246f4c27620f3) Made sure that LongBits ctor is always called with unsigned 32 bits + static codegen compat., fixes [#690](https://github.com/protobufjs/protobuf.js/issues/690)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/50e82fa7759be035a67c7818a1e3ebe0d6f453b6) Properly handle multiple ../.. in path.normalize, see [#688](https://github.com/protobufjs/protobuf.js/issues/688)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/7c3506b3f0c5a08a887e97313828af0c21effc61) Post-merge, also tackles [#683](https://github.com/protobufjs/protobuf.js/issues/683) (packed option for repeated enum values)<br />

### New
[:hash:](https://github.com/protobufjs/protobuf.js/commit/7f3f4600bcae6f2e4dadd5cdb055886193a539b7) Verify accepts non-null objects only, see [#685](https://github.com/protobufjs/protobuf.js/issues/685)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/d65c22936183d04014d6a8eb880ae0ec33aeba6d) allow_alias enum option was not being honored. This case is now handled and a test case was added<br />

### CLI
[:hash:](https://github.com/protobufjs/protobuf.js/commit/2ddb76b6e93174787a68f68fb28d26b8ece7cc56) Added an experimental --sparse option to limit pbjs output to actually referenced types within main files<br />

### Docs
[:hash:](https://github.com/protobufjs/protobuf.js/commit/33d14c97600ed954193301aecbf8492076dd0179) Added explicit hint on Uint8Array to initial example, see [#670](https://github.com/protobufjs/protobuf.js/issues/670)<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/cbd4c622912688b47658fea00fd53603049b5104) Ranges and names support for reserved fields, see [#676](https://github.com/protobufjs/protobuf.js/issues/676)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/487f8922d879955ba22f89b036f897b9753b0355) Updated depdendencies / rebuilt dist files<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/37536e5fa7a15fbc851040e09beb465bc22d9cf3) Use ?: instead of |undefined in .d.ts files<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/f8b415a2fc2d1b1eff19333600a010bcaaebf890) Mark optional fields as possibly being undefined<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/2ddb76b6e93174787a68f68fb28d26b8ece7cc56) Added a few more common google types from google/api, see [#433](https://github.com/protobufjs/protobuf.js/issues/433)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/d246024f4c7d13ca970c91a757e2f47432a619df) Minor optimizations to dependencies, build process and tsd<br />

## [6.6.3](https://github.com/protobufjs/protobuf.js/releases/tag/6.6.3)

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/0be01a14915e3e510038808fedbc67192a182d9b) Support node 4.2.0 to 4.4.7 buffers + travis case, see [#665](https://github.com/protobufjs/protobuf.js/issues/665)<br />

### CLI
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6a0920b2c32e7963741693f5a773b89f4b262688) Added ES6 syntax flag to pbjs, see [#667](https://github.com/protobufjs/protobuf.js/issues/667)<br />

### Docs
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c365242bdc28a47f5c6ab91bae34c277d1044eb3) Reference Buffer for BufferReader/Writer, see [#668](https://github.com/protobufjs/protobuf.js/issues/668)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/43976072d13bb760a0689b54cc35bdea6817ca0d) Slightly shortened README<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/e64cf65b09047755899ec2330ca0fc2f4d7932c2) Additional notes on the distinction of different use cases / distributions, see [#666](https://github.com/protobufjs/protobuf.js/issues/666)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/83758c99275c2bbd30f63ea1661284578f5c9d91) Extended README with additional information on JSON format<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/fdc3102689e8a3e8345eee5ead07ba3c9c3fe80c) Added extended usage instructions for TypeScript and custom classes to README, see [#666](https://github.com/protobufjs/protobuf.js/issues/666)<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3701488cca6bc56ce6b7ad93c7b80e16de2571a7) Updated dist files<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/579068a45e285c7d2c69b359716dd6870352f46f) Updated test cases to use new buffer util<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/0be01a14915e3e510038808fedbc67192a182d9b) Added fetch test cases + some test cleanup<br />

## [6.6.2](https://github.com/protobufjs/protobuf.js/releases/tag/6.6.2)

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3aea1bf3d4920dc01603fda25b86e6436ae45ec2) Properly replace short vars when beautifying static code, see [#663](https://github.com/protobufjs/protobuf.js/issues/663)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/b6cf228a82152f72f21b1b307983126395313470) Use custom prelude in order to exclude any module loader code from source (for webpack), see [#658](https://github.com/protobufjs/protobuf.js/issues/658)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/2b12fb7db9d4eaa3b76b7198539946e97db684c4) Make sure to check optional inner messages for null when encoding, see [#658](https://github.com/protobufjs/protobuf.js/issues/658)<br />

### New
[:hash:](https://github.com/protobufjs/protobuf.js/commit/276a594771329da8334984771cb536de7322d5b4) Initial attempt on a backwards compatible fetch implementation with binary support, see [#661](https://github.com/protobufjs/protobuf.js/issues/661)<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/2d81864fa5c4dac75913456d582e0bea9cf0dd80) Root#resolvePath skips files when returning null, see [#368](https://github.com/protobufjs/protobuf.js/issues/368)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/aab3ec1a757aff0f11402c3fb943c003f092c1af) Changes callback on failed response decode in rpc service to pass actual error instead of 'error' string<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/9044178c052299670108f10621d6e9b3d56e8a40) Travis should exit with the respective error when running sauce tests<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/73721f12072d77263e72a3b27cd5cf9409db9f8b) Moved checks whether a test case is applicable to parent case<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3fcd88c3f9b1a084b06cab2d5881cb5bb895869d) Added eventemitter tests and updated micromodule dependencies (so far)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/2db4305ca67d003d57aa14eb23f25eb6c3672034) Added lib/path tests and updated a few dependencies<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/2b12fb7db9d4eaa3b76b7198539946e97db684c4) Moved micro modules to lib so they can have their own tests etc.<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/b6dfa9f0a4c899b5c217d60d1c2bb835e06b2122) Updated travis<br />

## [6.6.1](https://github.com/protobufjs/protobuf.js/releases/tag/6.6.1)

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/039ac77b062ee6ebf4ec84a5e6c6ece221e63401) Properly set up reflection when using light build<br />

## [6.6.0](https://github.com/protobufjs/protobuf.js/releases/tag/6.6.0) ([release](https://github.com/protobufjs/protobuf.js/releases/tag/6.6.0))

### Breaking
[:hash:](https://github.com/protobufjs/protobuf.js/commit/cdfe6bfba27fa1a1d0e61887597ad4bb16d7e5ed) Inlined / refactored away .testJSON, see [#653](https://github.com/protobufjs/protobuf.js/issues/653)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6a483a529ef9345ed217a23394a136db0d9f7771) Refactored util.extend away<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/27b16351f3286468e539c2ab382de4b52667cf5e) Reflected and statically generated services use common utility, now work exactly the same<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/dca26badfb843a597f81e98738e2fda3f66c7341) fromObject now throws for entirely bogus values (repeated, map and inner message fields), fixes [#601](https://github.com/protobufjs/protobuf.js/issues/601)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/4bff9c356ef5c10b4aa34d1921a3b513e03dbb3d) Cleaned up library distributions, now is full / light / minimal with proper browserify support for each<br />

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/301f7762ef724229cd1df51e496eed8cfd2f10eb) Do not randomly remove slashes from comments, fixes [#656](https://github.com/protobufjs/protobuf.js/issues/656)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ef7be352baaec26bdcdce01a71fbee47bbdeec15) Properly parse nested textformat options, also tackles [#655](https://github.com/protobufjs/protobuf.js/issues/655)<br />

### New
[:hash:](https://github.com/protobufjs/protobuf.js/commit/b4f4f48f1949876ae92808b0a5ca5f2b29cc011c) Relieved the requirement to call .resolveAll() on roots in order to populate static code-compatible properties, see [#653](https://github.com/protobufjs/protobuf.js/issues/653)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/56c8ec4196d461383c3e1f271da02553d877ae81) Added a (highly experimental) debug build as a starting point for [#653](https://github.com/protobufjs/protobuf.js/issues/653)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c5d291f9bab045385c5938ba0f6cdf50a315461f) Full build depends on light build depends on minimal build, shares all relevant code<br />

### CLI
[:hash:](https://github.com/protobufjs/protobuf.js/commit/735da4315a98a6960f3b5089115e308548b91c07) Also reuse specified root in pbjs for JSON modules, see [#653](https://github.com/protobufjs/protobuf.js/issues/653)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3a056244d3acf339722d56549469a8df018e682e) Reuse specified root name in pbjs to be able to split definitions over multiple files more easily, see [#653](https://github.com/protobufjs/protobuf.js/issues/653)<br />

### Docs
[:hash:](https://github.com/protobufjs/protobuf.js/commit/28ddf756ab83cc890761ef2bd84a0788d2ad040d) Improved pbjs/pbts examples, better covers reflection with definitions for static modules<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6f0b44aea6cf72d23042810f05a7cede85239eb3) Fixed centered formatting on npm<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/dd96dcdacb8eae94942f7016b8dc37a2569fe420) Various other minor improvements / assertions refactored away, see [#653](https://github.com/protobufjs/protobuf.js/issues/653)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3317a76fb56b9b31bb07ad672d6bdda94b79b6c3) Fixed some common reflection deopt sites, see [#653](https://github.com/protobufjs/protobuf.js/issues/653)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6a483a529ef9345ed217a23394a136db0d9f7771) Reflection performance pass, see [#653](https://github.com/protobufjs/protobuf.js/issues/653)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6a483a529ef9345ed217a23394a136db0d9f7771) Added TS definitions to alternative builds' index files<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6a483a529ef9345ed217a23394a136db0d9f7771) Removed unnecessary prototype aliases, improves gzip ratio<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/641625fd64aca55b1163845e6787b58054ac36ec) Unified behaviour of and docs on Class constructor / Class.create<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/7299929b37267af2100237d4f8b4ed8610b9f7e1) Statically generated services actually inherit from rpc.Service<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/f4cf75e4e4192910b52dd5864a32ee138bd4e508) Do not try to run sauce tests for PRs<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/33da148e2b750ce06591c1c66ce4c46ccecc3c8f) Added utility to enable/disable debugging extensions to experimental debug build<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/fdb1a729ae5f8ab762c51699bc4bb721102ef0c8) Fixed node 0.12 tests<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6bc5bb4a7649d6b91a5944a9ae20178d004c8856) Fixed coverage<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6f0b44aea6cf72d23042810f05a7cede85239eb3) Added a test case for [#652](https://github.com/protobufjs/protobuf.js/issues/652)<br />

## [6.5.3](https://github.com/protobufjs/protobuf.js/releases/tag/6.5.3)

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/799d0303bf289bb720f2b27af59e44c3197f3fb7) In fromObject, check if object is already a runtime message, see [#652](https://github.com/protobufjs/protobuf.js/issues/652)<br />

## [6.5.2](https://github.com/protobufjs/protobuf.js/releases/tag/6.5.2)

### Docs
[:hash:](https://github.com/protobufjs/protobuf.js/commit/8cff92fe3b7ddb1930371edb4937cd0db9216e52) Added coverage reporting<br />

### CLI
[:hash:](https://github.com/protobufjs/protobuf.js/commit/cbaaae99b4e39a859664df0e6d20f0491169f489) Added version scheme warning to everything CLI so that we don't need this overly explicit in README<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6877b3399f1a4c33568221bffb4e298b01b14439) Coverage progress, 100%<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/711a9eb55cb796ec1e51af7d56ef2ebbd5903063) Coverage progress<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/e7526283ee4dd82231235afefbfad6af54ba8970) Attempted to fix badges once and for all<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/5aa296c901c2b460ee3be4530ede394e2a45e0ea) Coverage progress<br />

## [6.5.1](https://github.com/protobufjs/protobuf.js/releases/tag/6.5.1)

### CLI
[:hash:](https://github.com/protobufjs/protobuf.js/commit/9719fd2fa8fd97899c54712a238091e8fd1c57b2) Reuse module paths when looking up cli dependencies, see [#648](https://github.com/protobufjs/protobuf.js/issues/648)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6302655d1304cf662f556be5d9fe7a016fcedc3c) Check actual module directories to determine if cli dependencies are present and bootstrap semver, see [#648](https://github.com/protobufjs/protobuf.js/issues/648)<br />

### Docs
[:hash:](https://github.com/protobufjs/protobuf.js/commit/dfc7c4323bf98fb26ddcfcfbb6896a6d6e8450a4) Added a note on semver-incompatibility, see [#649](https://github.com/protobufjs/protobuf.js/issues/649)<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/49053ffa0ea8a4ba5ae048706dba1ab6f3bc803b) Coverage progress<br />

## [6.5.0](https://github.com/protobufjs/protobuf.js/releases/tag/6.5.0) ([release](https://github.com/protobufjs/protobuf.js/releases/tag/6.5.0))

### Breaking
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3946e0fefea415f52a16ea7a74109ff40eee9643) Initial upgrade of converters to real generated functions, see [#620](https://github.com/protobufjs/protobuf.js/issues/620)<br />

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/08cda241a3e095f3123f8a991bfd80aa3eae9400) An enum's default value present as a string looks up using typeDefault, not defaultValue which is an array if repeated<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c7e14b1d684aaba2080195cc83900288c5019bbc) Use common utility for virtual oneof getters and setters in both reflection and static code, see [#644](https://github.com/protobufjs/protobuf.js/issues/644)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/508984b7ff9529906be282375d36fdbada66b8e6) Properly use Type.toObject/Message.toObject within converters, see [#641](https://github.com/protobufjs/protobuf.js/issues/641)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/5bca18f2d32e8687986e23edade7c2aeb6b6bac1) Generate null/undefined assertion in fromObject if actually NOT an enum, see [#620](https://github.com/protobufjs/protobuf.js/issues/620)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/508984b7ff9529906be282375d36fdbada66b8e6) Replace ALL occurencies of types[%d].values in static code, see [#641](https://github.com/protobufjs/protobuf.js/issues/641)<br />

### New
[:hash:](https://github.com/protobufjs/protobuf.js/commit/9b090bb1673aeb9b8f1d7162316fce4d7a3348f0) Switched to own property-aware encoders for compatibility, see [#639](https://github.com/protobufjs/protobuf.js/issues/639)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/340d6aa82ac17c4a761c681fa71d5a0955032c8b) Now also parses comments, sets them on reflected objects and re-uses them when generating static code, see [#640](https://github.com/protobufjs/protobuf.js/issues/640)<br />

### CLI
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3cb82628159db4d2aa721b63619b16aadc5f1981) Further improved generated static code style<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/cda5c5452fa0797f1e4c375471aef96f844711f1) Removed scoping iifes from generated static code<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/def7b45fb9b5e01028cfa3bf2ecd8272575feb4d) Removed even more clutter from generated static code<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/dbd19fd9d3a57d033aad1d7173f7f66db8f8db3e) Removed various clutter from generated static code<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/1cc8a2460c7e161c9bc58fa441ec88e752df409c) Made sure that static target's replacement regexes don't match fields<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/d4272dbf5d0b2577af8efb74a94d246e2e0d728e) Also accept (trailing) triple-slash comments for compatibility with protoc-gen-doc, see [#640](https://github.com/protobufjs/protobuf.js/issues/640)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/0a3862b75fa60ef732e0cd36d623f025acc2fb45) Use semver to validate that CLI dependencies actually satisfy the required version, see [#637](https://github.com/protobufjs/protobuf.js/issues/637)<br />

### Docs
[:hash:](https://github.com/protobufjs/protobuf.js/commit/9e360ea6a74d41307483e51f18769df7f5b047b9) Added a hint on documenting .proto files for static code<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/d2a97bb818474645cf7ce1832952b2c3c739b234) Documented internally used codegen partials for what it's worth<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/079388ca65dfd581d74188a6ae49cfa01b103809) Updated converter documentation<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/168e448dba723d98be05c55dd24769dfe3f43d35) Bundler provides useful stuff to uglify and a global var without extra bloat<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/32e0529387ef97182ad0b9ae135fd8b883ed66b4) Cleaned and categorized tests, coverage progress<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3325e86930a3cb70358c689cb3016c1be991628f) Properly removed builtins from bundle<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/2c94b641fc5700c8781ac0b9fe796debac8d6893) Call hasOwnProperty builtin as late as possible decreasing the probability of having to call it at all (perf)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/818bcacde267be70a75e689f480a3caad6f80cf7) Slightly hardened codegen sprintf<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/818bcacde267be70a75e689f480a3caad6f80cf7) Significantly improved uint32 write performance<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/b5daa272407cb31945fd38c34bbef7c9edd1db1c) Cleaned up test case data and removed unused files<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c280a4a18c6d81c3468177b2ea58ae3bc4f25e73) Removed now useless trailing comment checks, see [#640](https://github.com/protobufjs/protobuf.js/issues/640)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/44167db494c49d9e4b561a66ad9ce2d8ed865a21) Ensured that pbjs' beautify does not break regular expressions in generated verify functions<br />

## [6.4.6](https://github.com/protobufjs/protobuf.js/releases/tag/6.4.6)

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/e11012ce047e8b231ba7d8cc896b8e3a88bcb902) Case-sensitively test for legacy group definitions, fixes [#638](https://github.com/protobufjs/protobuf.js/issues/638)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/7e57f4cdd284f886b936511b213a6468e4ddcdce) Properly parse text format options + simple test case, fixes [#636](https://github.com/protobufjs/protobuf.js/issues/636)<br />

### Docs
[:hash:](https://github.com/protobufjs/protobuf.js/commit/fe4d97bbc4d33ce94352dde62ddcd44ead02d7ad) Added SVG logo, see [#629](https://github.com/protobufjs/protobuf.js/issues/629)<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/57990f7ed8ad5c512c28ad040908cee23bbf2aa8) Also refactored Service and Type to inherit from NamespaceBase, see [#635](https://github.com/protobufjs/protobuf.js/issues/635)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/fe4d97bbc4d33ce94352dde62ddcd44ead02d7ad) Moved TS-compatible Namespace features to a virtual NamespaceBase class, compiles with strictNullChecks by default now, see [#635](https://github.com/protobufjs/protobuf.js/issues/635)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/fe4d97bbc4d33ce94352dde62ddcd44ead02d7ad) Minor codegen enhancements<br />

## [6.4.5](https://github.com/protobufjs/protobuf.js/releases/tag/6.4.5)

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/1154ce0867306e810cf62a5b41bdb0b765aa8ff3) Properly handle empty/noop Writer#ldelim, fixes [#625](https://github.com/protobufjs/protobuf.js/issues/625)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/f303049f92c53970619375653be46fbb4e3b7d78) Properly annotate map fields in pbjs, fixes [#624](https://github.com/protobufjs/protobuf.js/issues/624)<br />

### New
[:hash:](https://github.com/protobufjs/protobuf.js/commit/4b786282a906387e071a5a28e4842a46df588c7d) Made sure that Writer#bytes is always able to handle plain arrays<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/1e6a8d10f291a16631376dd85d5dd385937e6a55) Slightly restructured utility to better support static code default values<br />

## [6.4.4](https://github.com/protobufjs/protobuf.js/releases/tag/6.4.4)

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/26d68e36e438b590589e5beaec418c63b8f939cf) Dynamically resolve jsdoc when running pbts, fixes [#622](https://github.com/protobufjs/protobuf.js/issues/622)<br />

### Docs
[:hash:](https://github.com/protobufjs/protobuf.js/commit/69c04d7d374e70337352cec9b445301cd7fe60d6) Explain 6.4.2 vs 6.4.3 in changelog<br />

## [6.4.3](https://github.com/protobufjs/protobuf.js/releases/tag/6.4.4)

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c2c39fc7cec5634ecd1fbaebbe199bf097269097) Fixed invalid definition of Field#packed property, also introduced decoder.compat mode (packed fields, on by default)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/11fb1a66ae31af675d0d9ce0240cd8e920ae75e7) Always decode packed/non-packed based on wire format only, see [#602](https://github.com/protobufjs/protobuf.js/issues/602)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c9a61e574f5a2b06f6b15b14c0c0ff56f8381d1f) Use full library for JSON modules and runtime dependency for static modules, fixes [#621](https://github.com/protobufjs/protobuf.js/issues/621)<br />

### CLI
[:hash:](https://github.com/protobufjs/protobuf.js/commit/e88d13ca7ee971451b57d056f747215f37dfd3d7) Additional workarounds for on demand CLI dependencies, see [#618](https://github.com/protobufjs/protobuf.js/issues/618)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/44f6357557ab3d881310024342bcc1e0d336a20c) Revised automatic setup of cli dependencies, see [#618](https://github.com/protobufjs/protobuf.js/issues/618)<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/e027a3c7855368837e477ce074ac65f191bf774a) Removed Android 4.0 test (no longer supported by sauce)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/8ba3c5efd182bc80fc36f9d5fe5e2b615b358236) Removed some unused utility, slightly more efficient codegen, additional comments<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/f22a34a071753bca416732ec4d01892263f543fb) Updated tests for new package.json layout<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/f22a34a071753bca416732ec4d01892263f543fb) Added break/continue label support to codegen<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/f2ffa0731aea7c431c59e452e0f74247d815a352) Updated dependencies, rebuilt dist files and changed logo to use an absolute url<br />

6.4.2 had been accidentally published as 6.4.3.

## [6.4.1](https://github.com/protobufjs/protobuf.js/releases/tag/6.4.1)

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/9035d4872e32d6402c8e4d8c915d4f24d5192ea9) Added more default value checks to converter, fixes [#616](https://github.com/protobufjs/protobuf.js/issues/616)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/62eef58aa3b002115ebded0fa58acc770cd4e4f4) Respect long defaults in converters<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/e3170a160079a3a7a99997a2661cdf654cb69e24) Convert inner messages and undefined/null values more thoroughly, fixes [#615](https://github.com/protobufjs/protobuf.js/issues/615)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/b52089efcb9827537012bebe83d1a15738e214f4) Always use first defined enum value as field default, fixes [#613](https://github.com/protobufjs/protobuf.js/issues/613)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/64f95f9fa1bbe42717d261aeec5c16d1a7aedcfb) Install correct 'tmp' dependency when running pbts without dev dependencies installed, fixes [#612](https://github.com/protobufjs/protobuf.js/issues/612)<br />

### New
[:hash:](https://github.com/protobufjs/protobuf.js/commit/cba46c389ed56737184e5bc2bcce07243d52e5ce) Generate named constructors for runtime messages, see [#588](https://github.com/protobufjs/protobuf.js/issues/588)<br />

### CLI
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ee20b81f9451c56dc106177bbf9758840b99d0f8) pbjs/pbts no longer generate any volatile headers, see [#614](https://github.com/protobufjs/protobuf.js/issues/614)<br />

### Docs
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ec9d517d0b87ebe489f02097c2fc8005fae38904) Attempted to make broken shields less annoying<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/5cd4c2f2a94bc3c0f2c580040bce28dd42eaccec) Updated README<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/0643f93f5c0d96ed0ece5b47f54993ac3a827f1b) Some cleanup and added a logo<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/169638382de9efe35a1079c5f2045c33b858059a) use $protobuf.Long<br />

## [6.4.0](https://github.com/protobufjs/protobuf.js/releases/tag/6.4.0) ([release](https://github.com/protobufjs/protobuf.js/releases/tag/6.4.0))

### Breaking
[:hash:](https://github.com/protobufjs/protobuf.js/commit/a017bf8a2dbdb7f9e7ce4c026bb6845174feb3b1) Dropped IE8 support<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/39bc1031bb502f8b677b3736dd283736ea4d92c1) Removed now unused util.longNeq which was used by early static code<br />

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/5915ff972482e7db2a73629244ab8a93685b2e55) Do not swallow errors in loadSync, also accept negative enum values in Enum#add, fixes [#609](https://github.com/protobufjs/protobuf.js/issues/609)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/fde56c0de69b480343931264a01a1ead1e3156ec) Improved bytes field support, also fixes [#606](https://github.com/protobufjs/protobuf.js/issues/606)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/0c03f327115d57c4cd5eea3a9a1fad672ed6bd44) Fall back to browser Reader when passing an Uint8Array under node, fixes [#605](https://github.com/protobufjs/protobuf.js/issues/605)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/7eb3d456370d7d66b0856e32b2d2602abf598516) Respect optional properties when writing interfaces in tsd-jsdoc, fixes [#598](https://github.com/protobufjs/protobuf.js/issues/598)<br />

### New
[:hash:](https://github.com/protobufjs/protobuf.js/commit/bcadffecb3a8b98fbbd34b45bae0e6af58f9c810) Instead of protobuf.parse.keepCase, fall back to protobuf.parse.defaults holding all possible defaults, see [#608](https://github.com/protobufjs/protobuf.js/issues/608)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/a4d6a2af0d57a2e0cccf31e3462c8b2465239f8b) Added global ParseOptions#keepCase fallback as protobuf.parse.keepCase, see [#608](https://github.com/protobufjs/protobuf.js/issues/608)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/a017bf8a2dbdb7f9e7ce4c026bb6845174feb3b1) Converters use code generation and support custom implementations<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/28ce07d9812f5e1743afef95a94532d2c9488a84) Be more verbose when throwing invalid wire type errors, see [#602](https://github.com/protobufjs/protobuf.js/issues/602)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/40074bb69c3ca4fcefe09d4cfe01f3a86844a7e8) Added an asJSON-option to always populate array fields, even if defaults=false, see [#597](https://github.com/protobufjs/protobuf.js/issues/597)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/a7d23240a278aac0bf01767b6096d692c09ae1ce) Attempt to improve TypeScript support by using explicit exports<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/cec253fb9a177ac810ec96f4f87186506091fa37) Copy-pasted typescript definitions to micro modules, see [#599](https://github.com/protobufjs/protobuf.js/issues/599)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/1f18453c7bfcce65c258fa98a3e3d4577d2e550f) Emit an error on resolveAll() if any extension fields cannot be resolved, see [#595](https://github.com/protobufjs/protobuf.js/issues/595) + test case<br />

### CLI
[:hash:](https://github.com/protobufjs/protobuf.js/commit/804739dbb75359b0034db0097fe82081e3870a53) Removed 'not recommend' label for --keep-case, see [#608](https://github.com/protobufjs/protobuf.js/issues/608)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/9681854526f1813a6ef08becf130ef2fbc28b638) Added customizable linter configuration to pbjs<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/9681854526f1813a6ef08becf130ef2fbc28b638) Added stdin support to pbjs and pbts<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/407223b5ceca3304bc65cb48888abfdc917d5800) Static code no longer uses IE8 support utility<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/a017bf8a2dbdb7f9e7ce4c026bb6845174feb3b1) Generated static code now supports asJSON/from<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3c775535517b8385a1d3c1bf056f3da3b4266f8c) Added support for TypeScript enums to pbts<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/0cda72a55a1f2567a5d981dc5d924e55b8070513) Added a few helpful comments to static code<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/24b293c297feff8bda5ee7a2f8f3f83d77c156d0) Slightly beautify statically generated code<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/65637ffce20099df97ffbcdce50faccc8e97c366) Do not wrap main definition as a module and export directly instead<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/65637ffce20099df97ffbcdce50faccc8e97c366) Generate prettier definitions with --no-comments<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/20d8a2dd93d3bbb6990594286f992e703fc4e334) Added variable arguments support to tsd-jsdoc<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/8493dbd9a923693e943f710918937d83ae3c4572) Reference dependency imports as a module to prevent name collisions, see [#596](https://github.com/protobufjs/protobuf.js/issues/596)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/39a2ea361c50d7f4aaa0408a0d55bb13823b906c) Removed now unnecessary comment lines in generated static code<br />

### Docs
[:hash:](https://github.com/protobufjs/protobuf.js/commit/a4e41b55471d83a8bf265c6641c3c6e0eee82e31) Added notes on CSP-restricted environments to README, see [#593](https://github.com/protobufjs/protobuf.js/issues/593)<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/1a3effdad171ded0608e8da021ba8f9dd017f2ff) Added test case for asJSON with arrays=true, see [#597](https://github.com/protobufjs/protobuf.js/issues/597)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/751a90f509b68a5f410d1f1844ccff2fc1fc056a) Added a tape adapter to assert message equality accross browsers<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/fde56c0de69b480343931264a01a1ead1e3156ec) Refactored some internal utility away<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/805291086f6212d1f108b3d8f36325cf1739c0bd) Reverted previous attempt on [#597](https://github.com/protobufjs/protobuf.js/issues/597)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c5160217ea95996375460c5403dfe37b913d392e) Minor tsd-jsdoc refactor<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/961dd03061fc2c43ab3bf22b3f9f5165504c1002) Removed unused sandbox files<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/f625eb8b0762f8f5d35bcd5fc445e52b92d8e77d) Updated package.json of micro modules to reference types, see [#599](https://github.com/protobufjs/protobuf.js/issues/599)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/46ec8209b21cf9ff09ae8674e2a5bbc49fd4991b) Reference dependencies as imports in generated typescript definitions, see [#596](https://github.com/protobufjs/protobuf.js/issues/596)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3bab132b871798c7c50c60a4c14c2effdffa372e) Allow null values on optional long fields, see [#590](https://github.com/protobufjs/protobuf.js/issues/590)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/31da56c177f1e11ffe0072ad5f58a55e3f8008fd) Various jsdoc improvements and a workaround for d.ts generation, see [#592](https://github.com/protobufjs/protobuf.js/issues/592)<br />

## [6.3.1](https://github.com/protobufjs/protobuf.js/releases/tag/6.3.1)

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/95ed6e9e8268711db24f44f0d7e58dd278ddac4c) Empty inner messages are always present on the wire + test case + removed now unused Writer#ldelim parameter, see [#585](https://github.com/protobufjs/protobuf.js/issues/585)<br />

### CLI
[:hash:](https://github.com/protobufjs/protobuf.js/commit/e8a4d5373b1a00cc6eafa5b201b91d0e250cc00b) Expose tsd-jsdoc's comments option to pbts as --no-comments, see [#587](https://github.com/protobufjs/protobuf.js/issues/587)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6fe099259b5985d873ba5bec88c049d7491a11cc) Increase child process max buffer when running jsdoc from pbts, see [#587](https://github.com/protobufjs/protobuf.js/issues/587)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3d84ecdb4788d71b5d3928e74db78e8e54695f0a) pbjs now generates more convenient dot-notation property accessors<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/1e0ebc064e4f2566cebf525d526d0b701447bd6a) And fixed IE8 again (should probably just drop IE8 for good)<br />

## [6.3.0](https://github.com/protobufjs/protobuf.js/releases/tag/6.3.0)

### Breaking
[:hash:](https://github.com/protobufjs/protobuf.js/commit/a97956b1322b6ee62d4fc9af885658cd5855e521) Moved camelCase/underScore away from util to where actually used<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c144e7386529b53235a4a5bdd8383bdb322f2825) Renamed asJSON option keys (enum to enums, long to longs) because enum is a reserved keyword<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/5b9ade428dca2df6a13277522f2916e22092a98b) Moved JSON/Message conversion to its own source file and added Message/Type.from + test case, see [#575](https://github.com/protobufjs/protobuf.js/issues/575)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/0b0de2458a1ade1ccd4ceb789697be13290f856b) Relicensed the library and its components to BSD-3-Clause to match the official implementation (again)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/22a64c641d4897965035cc80e92667bd243f182f) Dropped support for browser buffer entirely (is an Uint8Array anyway), ensures performance and makes things simpler<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/22a64c641d4897965035cc80e92667bd243f182f) Removed dead parts of the Reader API<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/964f65a9dd94ae0a18b8be3d9a9c1b0b1fdf6424) Refactored BufferReader/Writer to their own files and removed unnecessary operations (node always has FloatXXArray and browser buffer uses ieee anyway)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/bfac0ea9afa3dbaf5caf79ddf0600c3c7772a538) Stripped out fallback encoder/decoder/verifier completely (even IE8 supports codegen), significantly reduces bundle size, can use static codegen elsewhere<br />

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c3023a2f51fc74547f6c6e53cf75feed60f3a25c) Actually concatenate mixed custom options when parsing<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/0d66b839df0acec2aea0566d2c0bbcec46c3cd1d) Fixed a couple of issues with alternative browser builds<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/33706cdc201bc863774c4af6ac2c38ad96a276e6) Properly set long defaults on prototypes<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/0ea2740f0774b4c5c349b9c303f3fb2c2743c37b) Fixed reference error in minimal runtime, see [#580](https://github.com/protobufjs/protobuf.js/issues/580)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/741b6d8fde84d9574676a729a29a428d99f0a0a0) Non-repeated empty messages are always present on the wire, see [#581](https://github.com/protobufjs/protobuf.js/issues/581)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/7fac9d6a39bf42d316c1676082a2d0804bc55934) Properly check Buffer.prototype.set with node v4<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3ad8108eab57e2b061ee6f1fddf964abe3f4cbc7) Prevent NRE and properly annotate verify signature in tsd-jsdoc, fixed [#572](https://github.com/protobufjs/protobuf.js/issues/572)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6c2415d599847cbdadc17dee3cdf369fc9facade) Fix directly using Buffer instead of util.Buffer<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/19e906c2a15acc6178b3bba6b19c2f021e681176) Added filter type to Namespace#lookup, fixes [#569](https://github.com/protobufjs/protobuf.js/issues/569)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/9c9a66bf393d9d6927f35a9c18abf5d1c31db912) Fixed parsing enum inner options, see [#565](https://github.com/protobufjs/protobuf.js/issues/565)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ea7ba8b83890084d61012cb5386dc11dadfb3908) Fixed release links in README files<br />

### New
[:hash:](https://github.com/protobufjs/protobuf.js/commit/442471363f99e67fa97044f234a47b3c9b929dfa) Added a noparse build for completeness<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/bfee1cc3624d0fa21f9553c2f6ce2fcf7fcc09b7) Now compresses .gz files using zopfli to make them useful beyond being just a reference<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/aed134aa1cd7edd801de77c736cf5efe6fa61cb0) Updated non-bundled google types folder with missing descriptors and added wrappers to core<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/0b0de2458a1ade1ccd4ceb789697be13290f856b) Replaced the ieee754 implementation for old browsers with a faster, use-case specific one + simple test case<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/99ad9cc08721b834a197d4bbb67fa152d7ad79aa) Added .create to statically generated types and uppercase nested elements to reflection namespaces, see [#576](https://github.com/protobufjs/protobuf.js/issues/576)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/99ad9cc08721b834a197d4bbb67fa152d7ad79aa) Also added Namespace#getEnum for completeness, see [#576](https://github.com/protobufjs/protobuf.js/issues/576)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ef43acff547c0cd84cfb7a892fe94504a586e491) Added Namespace#getEnum and changed #lookupEnum to the same behavior, see [#576](https://github.com/protobufjs/protobuf.js/issues/576)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/1fcfdfe21c1b321d975a8a96d133a452c9a9c0d8) Added a heap of coverage comments for usually unused code paths to open things up<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c234de7f0573ee30ed1ecb15aa82b74c0f994876) Added codegen test to determine if any ancient browsers don't actually support it<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/fed2000e7e461efdb1c3a1a1aeefa8b255a7c20b) Added legacy groups support to pbjs, see [#568](https://github.com/protobufjs/protobuf.js/issues/568)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/974a1321da3614832aa0a5b2e7c923f66e4ba8ae) Initial support for legacy groups + test case, see [#568](https://github.com/protobufjs/protobuf.js/issues/568)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/9c9a66bf393d9d6927f35a9c18abf5d1c31db912) Added asJSON bytes as Buffer, see [#566](https://github.com/protobufjs/protobuf.js/issues/566)<br />

### CLI
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c60cd397e902ae6851c017f2c298520b8336cbee) Annotated callback types in pbjs-generated services, see [#582](https://github.com/protobufjs/protobuf.js/issues/582)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3e7e4fc59e6d2d6c862410b4b427fbedccdb237b) Removed type/ns alias comment in static target to not confuse jsdoc unnecessarily<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/99ad9cc08721b834a197d4bbb67fa152d7ad79aa) Made pbjs use loadSync for deterministic outputs, see [#573](https://github.com/protobufjs/protobuf.js/issues/573)<br />

### Docs
[:hash:](https://github.com/protobufjs/protobuf.js/commit/4d1f5facfcaaf5f2ab6a70b12443ff1b66e7b94e) Updated documentation on runtime and noparse builds<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c59647a7542cbc4292248787e5f32bb99a9b8d46) Fixed an issue with the changelog generator skipping some commits<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/24f2c03af9f13f5404259866fdc8fed33bfaae25) Added notes on how to use pbjs and pbts programmatically<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3544576116146b209246d71c7f7a9ed687950b26) Manually sorted old changelog entries<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/d5812571f335bae68f924aa1098519683a9f3e44) Initial changelog generator, see [#574](https://github.com/protobufjs/protobuf.js/issues/574)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ab3e236a967a032a98267a648f84d129fdb4d4a6) Added static/JSON module interchangeability to README<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/7939a4bd8baca5f7e07530fc93f27911a6d91c6f) Updated README and bundler according to dynamic require calls<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/93e04f1db4a9ef3accff8d071c75be3d74c0cd4a) Added basic services test case<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/b5a068f5b79b6f00c4b05d9ac458878650ffa09a) Just polyfill Buffer.from / .allocUnsafe for good<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/4375a485789e14f7bf24bece819001154a03dca2) Added a test case to find out if all the fallbacks are just for IE8<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/deb2e82ed7eda41d065a09d120e91c0f7ecf1e6a) Commented out float assertions in float test including explanation<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/d3ebd5745b024033fbc2410ecad4d4e02abd67db) Expose array implementation used with (older) browsers on util for tests<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/b1b6a813c93da4c7459755186aa02ef2f3765c94) Updated test cases<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/99dc5faa7b39fdad8ebc102de4463f8deb7f48ff) Added assumptions to float test case<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/948ca2e3c5c62fedcd918d75539c261abf1a7347) Updated travis config to use C++11<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c59647a7542cbc4292248787e5f32bb99a9b8d46) Updated / added additional LICENSE files where appropriate<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/333f0221814be976874862dc83d0b216e07d4012) Integrated changelog into build process, now also has 'npm run make' for everything, see [#574](https://github.com/protobufjs/protobuf.js/issues/574)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ab3e236a967a032a98267a648f84d129fdb4d4a6) Minor optimizations through providing type-hints<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ab3e236a967a032a98267a648f84d129fdb4d4a6) Reverted shortened switch statements in verifier<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ab3e236a967a032a98267a648f84d129fdb4d4a6) Enums can't be map key types<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/8ef6975b0bd372b79e9b638f43940424824e7176) Use custom require (now a micromodule) for all optional modules, see [#571](https://github.com/protobufjs/protobuf.js/issues/571)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/e226f001e4e4633d64c52be4abc1915d7b7bd515) Support usage when size = 0<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/19e906c2a15acc6178b3bba6b19c2f021e681176) Reverted aliases frequently used in codegen for better gzip ratio<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/47b51ec95a540681cbed0bac1b2f02fc4cf0b73d) Shrinked bundle size - a bit<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/f8451f0058fdf7a1fac15ffc529e4e899c6b343c) Can finally run with --trace-deopt again without crashes<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/9c9a66bf393d9d6927f35a9c18abf5d1c31db912) Other minor optimizations<br />

## [6.2.1](https://github.com/protobufjs/protobuf.js/releases/tag/6.2.1)

### New
[:hash:](https://github.com/protobufjs/protobuf.js/commit/1a6fdc9a11fb08506d09351f8e853384c2b8be25) Added ParseOptions to protobuf.parse and --keep-case for .proto sources to pbjs, see [#564](https://github.com/protobufjs/protobuf.js/issues/564)<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/fc383d0721d83f66b2d941f0d9361621839327e9) Better TypeScript definition support for @property-annotated objects<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/4531d75cddee9a99adcac814d52613116ba789f3) Can't just inline longNeq but can be simplified<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/8f25377cf99036794ba13b160a5060f312d1a7e7) Array abuse and varint optimization<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/90b201209a03e8022ada0ab9182f338fa0813651) Updated dependencies<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/f1110b0993ec86e0a4aee1735bd75b901952cb36) Other minor improvements to short ifs<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c079c900e2d61c63d5508eafacbd00163d377482) Reader/Writer example<br />

## [6.2.0](https://github.com/protobufjs/protobuf.js/releases/tag/6.2.0)

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/9b7b92a4c7f8caa460d687778dc0628a74cdde37) Fixed reserved names re, also ensure valid service method names, see [#559](https://github.com/protobufjs/protobuf.js/issues/559)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/a83425049c9a78c5607bc35e8089e08ce78a741e) Fix d.ts whitespace on empty lines, added tsd-jsdoc LICENSE<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/5f9bede280aa998afb7898e8d2718b4a229e8e6f) Fix asJSON defaults option, make it work for repeated fields.<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/b0aef62191b65cbb305ece84a6652d76f98da259) Inlined any Reader/Writer#tag calls, also fixes [#556](https://github.com/protobufjs/protobuf.js/issues/556)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/4d091d41caad9e63cd64003a08210b78878e01dd) Fix building default dist files with explicit runtime=false<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/096dfb686f88db38ed2d8111ed7aac36f8ba658a) Apply asJSON recursively<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/19c269f1dce1b35fa190f264896d0865a54a4fff) Ensure working reflection class names with minified builds<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/9c769504e0ffa6cbe0b6f8cdc14f1231bed7ee34) Lazily resolve (some) cyclic dependencies, see [#560](https://github.com/protobufjs/protobuf.js/issues/560)<br />

### New
[:hash:](https://github.com/protobufjs/protobuf.js/commit/da07d8bbbede4175cc45ca46d883210c1082e295) Added protobuf.roots to minimal runtime, see [#554](https://github.com/protobufjs/protobuf.js/issues/554)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/8f407a18607334185afcc85ee98dc1478322bd01) Repo now includes a restructured version of tsd-jsdoc with our changes incorporated for issues/prs, see [#550](https://github.com/protobufjs/protobuf.js/issues/550)<br />

### CLI
[:hash:](https://github.com/protobufjs/protobuf.js/commit/1b5e4250415c6169eadb405561242f847d75044b) Updated pbjs arguments<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/4750e3111b9fdb107d0fc811e99904fbcdbb6de1) Pipe tsd-jsdoc output (requires dcodeIO/tsd-jsdoc/master) and respect cwd, see [#550](https://github.com/protobufjs/protobuf.js/issues/550)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/75f4b6cb6325a3fc7cd8fed3de5dbe0b6b29c748) tsd-jsdoc progress<br />

### Docs
[:hash:](https://github.com/protobufjs/protobuf.js/commit/766171e4c8b6650ea9c6bc3e76c9c96973c2f546) README<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c33835cb1fe1872d823e94b0fff024dc624323e8) Added GH issue template<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6f9ffb6307476d48f45dc4f936744b82982d386b) Path micromodule, dependencies<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/0b9b1d8505743995c5328daab1f1e124debc63bd) Test case for [#556](https://github.com/protobufjs/protobuf.js/issues/556)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/74b2c5c5d33a46c3751ebeadc9d934d4ccb8286c) Raw alloc benchmark<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/fb74223b7273530d8baa53437ee96c65a387436d) Other minor optimizations<br />

## [6.1.1](https://github.com/protobufjs/protobuf.js/releases/tag/6.1.1)

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/baea920fa6bf5746e0a7888cdbb089cd5d94fc90) Properly encode/decode map kv pairs as repeated messages (codegen and fallback), see [#547](https://github.com/protobufjs/protobuf.js/issues/547)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/28a1d26f28daf855c949614ef485237c6bf316e5) Make genVerifyKey actually generate conditions for 32bit values and bool, fixes [#546](https://github.com/protobufjs/protobuf.js/issues/546)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3e9d8ea9a5cbb2e029b5c892714edd6926d2e5a7) Fix to generation of verify methods for bytes<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/e7893675ccdf18f0fdaea8f9a054a6b5402b060e) Take special care of oneofs when encoding (i.e. when explicitly set to defaults), see [#542](https://github.com/protobufjs/protobuf.js/issues/542)<br />

### New
[:hash:](https://github.com/protobufjs/protobuf.js/commit/52cd8b5a891ec8e11611127c8cfa6b3a91ff78e3) Added Message#asJSON option for bytes conversion<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/01365ba9116ca1649b682635bb29814657c4133c) Added Namespace#lookupType and Namespace#lookupService (throw instead of returning null), see [#544](https://github.com/protobufjs/protobuf.js/issues/544)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/a54fbc918ef6bd627113f05049ff704e07bf33b4) Provide prebuilt browser versions of the static runtime<br />

### CLI
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3783af7ca9187a1d9b1bb278ca69e0188c7e4c66) Initial pbts CLI for generating TypeScript definitions, see [#550](https://github.com/protobufjs/protobuf.js/issues/550)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/b8bce03405196b1779727f246229fd9217b4303d) Refactored json/static-module targets to use common wrappers<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/691231fbc453a243f48a97bfb86794ab5718ef49) Refactor cli to support multiple built-in wrappers, added named roots instead of always using global.root and added additionally necessary eslint comments, see [#540](https://github.com/protobufjs/protobuf.js/issues/540)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/e3e77d0c7dc973d3a5948a49d123bdaf8a048030) Annotate namespaces generated by static target, see [#550](https://github.com/protobufjs/protobuf.js/issues/550)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/aff21a71e6bd949647b1b7721ea4e1fe16bcd933) static target: Basic support for oneof fields, see [#542](https://github.com/protobufjs/protobuf.js/issues/542)<br />

### Docs
[:hash:](https://github.com/protobufjs/protobuf.js/commit/b6b00aa7b0cd35e0e8f3c16b322788e9942668d4) Fix to reflection documentation<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ed86f3acbeb6145be5f24dcd05efb287b539e61b) README on minimal runtime / available downloads<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/d31590b82d8bafe6657bf877d403f01a034ab4ba) Notes on descriptors vs static modules<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ce41d0ef21cee2d918bdc5c3b542d3b7638b6ead) A lot of minor optimizations to performance and gzip ratio<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ecbb4a52fbab445e63bf23b91539e853efaefa47) Minimized base64 tables<br />

## [6.1.0](https://github.com/protobufjs/protobuf.js/releases/tag/6.1.0)

### Breaking
[:hash:](https://github.com/protobufjs/protobuf.js/commit/a46cc4934b7e888ae80e06fd7fdf91e5bc7f54f5) Removed as-function overload for Reader/Writer, profiler stub, optimized version of Reader#int32<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/7983ee0ba15dc5c1daad82a067616865051848c9) Refactored Prototype and inherits away, is now Class and Message for more intuitive documentation and type refs<br />

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/c3c70fe3a47fd4f7c85dc80e1af7d9403fe349cd) Fixed failing test case on node < 6<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/66be5983321dd06460382d045eb87ed72a186776) Fixed serialization order of sfixed64, fixes [#536](https://github.com/protobufjs/protobuf.js/issues/536)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/7def340833f9f1cc41f4835bd0d62e203b54d9eb) Fixed serialization order of fixed64, fallback to parseInt with no long lib, see [#534](https://github.com/protobufjs/protobuf.js/issues/534)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/98a58d40ca7ee7afb1f76c5804e82619104644f6) Actually allow undefined as service method type, fixes [#528](https://github.com/protobufjs/protobuf.js/issues/528)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/38d867fc50a4d7eb1ca07525c9e4c71b8782443e) Do not skip optional delimiter after aggregate options, fixes [#520](https://github.com/protobufjs/protobuf.js/issues/520)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/67449db7c7416cbc59ad230c168cf6e6b6dba0c5) Verify empty base64 encoded strings for bytes fields, see [#535](https://github.com/protobufjs/protobuf.js/issues/535)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ef0fcb6d525c5aab13a39b4f393adf03f751c8c9) wrong spell role should be rule<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/55db92e21a26c04f524aeecb2316968c000e744d) decodeDelimited always forks if writer is specified, see [#531](https://github.com/protobufjs/protobuf.js/issues/531)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ebae1e18152617f11ac07827828f5740d4f2eb7e) Mimic spec-compliant behaviour in oneof getVirtual, see [#523](https://github.com/protobufjs/protobuf.js/issues/523)<br />

### New
[:hash:](https://github.com/protobufjs/protobuf.js/commit/a0398f5880c434ff88fd8d420ba07cc29c5d39d3) Initial base64 string support for bytes fields, see [#535](https://github.com/protobufjs/protobuf.js/issues/535)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6a6c00c3e1def5d35c7fcaa1bbb6ce4e0fe67544) Initial type-checking verifier, see [#526](https://github.com/protobufjs/protobuf.js/issues/526), added to bench out of competition<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3aa984e063cd73e4687102b4abd8adc16582dbc4) Initial loadSync (node only), see [#529](https://github.com/protobufjs/protobuf.js/issues/529)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/f1370ff5b0db2ebb73b975a3d7c7bd5b901cbfac) Initial RPC service implementaion, see [#529](https://github.com/protobufjs/protobuf.js/issues/529)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/090d8eaf10704a811a73e1becd52f2307cbcad48) added 'defaults' option to Prototype#asJSON, see [#521](https://github.com/protobufjs/protobuf.js/issues/521)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/7c28483d65cde148e61fe9993f1716960b39e049) Use Uint8Array pool in browsers, just like node does with buffers<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/4157a0ec2e54c4d19794cb16edddcd8d4fbd3e76) Also validate map fields, see [#526](https://github.com/protobufjs/protobuf.js/issues/526) (this really needs some tests)<br />

### CLI
[:hash:](https://github.com/protobufjs/protobuf.js/commit/0ce099bf4f4666fd00403a2839e6da628b8328a9) Added json-module target to pbjs, renamed static to static-module, see [#522](https://github.com/protobufjs/protobuf.js/issues/522)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/1d99442fe65fcaa2f9e33cc0186ef1336057e0cf) updated internals and static target to use immutable objects on prototypes<br />

### Docs
[:hash:](https://github.com/protobufjs/protobuf.js/commit/e6eaa91b9fe021b3356d4d7e42033a877bc45871) Added a couple of alternative signatures, protobuf.load returns promise or undefined, aliased Reader/Writer-as-function signature with Reader/Writer.create for typed dialects, see [#518](https://github.com/protobufjs/protobuf.js/issues/518)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/9df6a3d4a654c3e122f97d9a594574c7bbb412da) Added variations for Root#load, see [#527](https://github.com/protobufjs/protobuf.js/issues/527)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/193e65c006a8df8e9b72e0f23ace14a94952ee36) Added benchmark and profile related information to README<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/228a2027de35238feb867cb0485c78c755c4d17d) Added service example to README, see [#529](https://github.com/protobufjs/protobuf.js/issues/529)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/1a8c720714bf867f1f0195b4690faefa4f65e66a) README on tests<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/014fb668dcf853874c67e3e0aeb7b488a149d35c) Update README/dist to reflect recent changes<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/11d844c010c5a22eff9d5824714fb67feca77b26) Minimal documentation for micromodules<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/47608dd8595b0df2b30dd18fef4b8207f73ed56a) Document all the callbacks, see [#527](https://github.com/protobufjs/protobuf.js/issues/527)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3891ab07bbe20cf84701605aa62453a6dbdb6af2) Documented streaming-rpc example a bit<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/5606cb1bc41bc90cb069de676650729186b38640) Removed the need for triple-slash references in .d.ts by providing a minimal Long interface, see [#527](https://github.com/protobufjs/protobuf.js/issues/527), see [#530](https://github.com/protobufjs/protobuf.js/issues/530)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/adf3cc3d340f8b2a596c892c64457b15e42a771b) Transition to micromodules<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/f3a9589b74af6a1bf175f2b1994badf703d7abc4) Refactored argument order of utf8 for plausibility<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/14c207ed6e05a61e756fa4192efb2fa219734dd6) Restructured reusable micromodules<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/b510ba258986271f07007aebc5dcfea7cfd90cf4) Can't use Uint8Array#set on node < 6 buffers<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/78952a50ceee8e196b4f156eb01f7f693b5b8aac) Test case for [#531](https://github.com/protobufjs/protobuf.js/issues/531)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/954577c6b421f7d7f4905bcc32f57e4ebaf548da) Safer signaling for synchronous load, see [#529](https://github.com/protobufjs/protobuf.js/issues/529)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/9ea3766ff1b8fb7ccad028f44efe27d3b019eeb7) Proper end of stream signaling to rpcImpl, see [#529](https://github.com/protobufjs/protobuf.js/issues/529)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/e4faf7fac9b34d4776f3c15dfef8d2ae54104567) Moved event emitter to util, also accepts listener context, see [#529](https://github.com/protobufjs/protobuf.js/issues/529)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/9bdec62793ce77c954774cc19106bde4132f24fc) Probably the worst form of hiding require programmatically, see [#527](https://github.com/protobufjs/protobuf.js/issues/527)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/4462d8b05d3aba37c865cf53e09b3199cf051a92) Attempt to hide require('fs') from webpack, see [#527](https://github.com/protobufjs/protobuf.js/issues/527)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/7c3bf8d32cbf831b251730b3876c35c901926300) Trying out jsdoc variations, see [#527](https://github.com/protobufjs/protobuf.js/issues/527)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/bb4059467287fefda8f966de575fd0f8f9690bd3) by the way, why not include the json->proto functionality into "util"?<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/f1008e6ee53ee50358e19c10df8608e950be4be3) Update proto.js<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/fc9014822d9cdeae8c6e454ccb66ee28f579826c) Automatic profile generation and processing<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/2a2f6dcab5beaaa98e55a005b3d02643c45504d6) Generalized buffer pool and moved it to util<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/53a16bf3ada4a60cc09757712e0046f3f2d9d094) Make shields visible on npm, yey<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/9004b9d0c5135a7f6df208ea658258bf2f9e6fc9) More shields, I love shields, and maybe a workaround for travis timing out when sauce takes forever<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/060a7916a2715a9e4cd4d05d7c331bec33e60b7e) Trying SauceLabs with higher concurrency<br />

## [6.0.2](https://github.com/protobufjs/protobuf.js/releases/tag/6.0.2)

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/23d664384900eb65e44910def45f04be996fbba1) Fix packable float/double see [#513](https://github.com/protobufjs/protobuf.js/issues/513)<br />

### New
[:hash:](https://github.com/protobufjs/protobuf.js/commit/54283d39c4c955b6a84f7f53d4940eec39e4df5e) Handle oneofs in prototype ctor, add non-ES5 fallbacks, test case<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/0ae66752362899b8407918a759b09938e82436e1) Be nice to AMD, allow reconfiguration of Reader/Writer interface<br />

### CLI
[:hash:](https://github.com/protobufjs/protobuf.js/commit/00f3574ef4ee8b237600e41839bf0066719c4469) Initial static codegen target for reference<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/81e36a7c14d89b487dfe7cfb2f8380fcdf0df392) pbjs static target services support<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/4885b8239eb74c72e665787ea0ece3336e493d7f) pbjs static target progress, uses customizable wrapper template<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/ad5abe7bac7885ba4f68df7eeb800d2e3b81750b) Static pbjs target progress, now generates usable CommonJS code, see [#512](https://github.com/protobufjs/protobuf.js/issues/512)<br />

### Docs
[:hash:](https://github.com/protobufjs/protobuf.js/commit/d9634d218849fb49ff5dfb4597bbb2c2d43bbf08) TypeScript example<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/fce8276193a5a9fabad5e5fbeb2ccd4f0f3294a9) Adjectives, notes on browserify<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/23d664384900eb65e44910def45f04be996fbba1) Refactor runtime util into separate file, reader/writer uses runtime util<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/f91c432a498bebc0adecef1562061b392611f51a) Also optimize reader with what we have learned<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/d83f799519fe69808c88e83d9ad66c645d15e963) More (shameless) writer over-optimization<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/8a2dbc610a06fe3a1a2695a3ab032d073b77760d) Trading package size for float speed<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/95c5538cfaf1daf6b4990f6aa7599779aaacf99f) Skip defining getters and setters on IE8 entirely, automate defining fallbacks<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/09865d069303e795e475c82afe2b2267abaa59ea) Unified proto/reflection/classes/static encoding API to always return a writer<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/98d6ae186a48416e4ff3030987caed285f40a4f7) plain js utf8 is faster for short strings<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/79fbbf48b8e4dc9c41dcbdef2b73c5f2608b0318) improve TypeScript support. add simple test script.<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/96fa07adec8b0ae05e07c2c40383267f25f2fc92) Use long.js dependency in tests, reference types instead of paths in .d.ts see [#503](https://github.com/protobufjs/protobuf.js/issues/503)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/5785dee15d07fbcd14025a96686707173bd649a0) Restructured encoder / decoder to better support static code gen<br />

## [6.0.1](https://github.com/protobufjs/protobuf.js/releases/tag/6.0.1)

### Fixed
[:hash:](https://github.com/protobufjs/protobuf.js/commit/799c1c1a84b255d1831cc84c3d24e61b36fa2530) Add support for long strings, fixes [#509](https://github.com/protobufjs/protobuf.js/issues/509)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6e5fdb67cb34f90932e95a51370e1652acc55b4c) expose zero on LongBits, fixes [#508](https://github.com/protobufjs/protobuf.js/issues/508)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/aa922c07490f185c5f97cf28ebbd65200fc5e377) Fixed issues with Root.fromJSON/#addJSON, search global for Long<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/51fe45656b530efbba6dad92f92db2300aa18761) Properly exclude browserify's annoying _process, again, fixes [#502](https://github.com/protobufjs/protobuf.js/issues/502)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/3c16e462a28c36abbc8a176eab9ac2e10ba68597) Remember loaded files earlier to prevent race conditions, fixes [#501](https://github.com/protobufjs/protobuf.js/issues/501)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/4012a00a0578185d92fb6e7d3babd059fee6d6ab) Allow negative enum ids even if super inefficient (encodes as 10 bytes), fixes [#499](https://github.com/protobufjs/protobuf.js/issues/499), fixes [#500](https://github.com/protobufjs/protobuf.js/issues/500)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/96dd8f1729ad72e29dbe08dd01bc0ba08446dbe6) set resolvedResponseType on resolve(), fixes [#497](https://github.com/protobufjs/protobuf.js/issues/497)<br />

### New
[:hash:](https://github.com/protobufjs/protobuf.js/commit/d3ae961765e193ec11227d96d699463de346423f) Initial take on runtime services, see [#507](https://github.com/protobufjs/protobuf.js/issues/507)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/90cd46b3576ddb2d0a6fc6ae55da512db4be3acc) Include dist/ in npm package for frontend use<br />

### CLI
[:hash:](https://github.com/protobufjs/protobuf.js/commit/4affa1b7c0544229fb5f0d3948df6d832f6feadb) pbjs proto target field options, language-level compliance with jspb test.proto<br />

### Docs
[:hash:](https://github.com/protobufjs/protobuf.js/commit/6a06e95222d741c47a51bcec85cd20317de7c0b0) always use Uint8Array in docs for tsd, see [#503](https://github.com/protobufjs/protobuf.js/issues/503)<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/637698316e095fc35f62a304daaca22654974966) Notes on dist files<br />

### Other
[:hash:](https://github.com/protobufjs/protobuf.js/commit/29ff3f10e367d6a2ae15fb4254f4073541559c65) Update eslint env<br />
[:hash:](https://github.com/protobufjs/protobuf.js/commit/943be1749c7d37945c11d1ebffbed9112c528d9f) Browser field in package.json isn't required<br />
