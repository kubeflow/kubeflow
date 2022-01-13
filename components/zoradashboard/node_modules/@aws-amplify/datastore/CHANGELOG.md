# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.3.0](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@3.2.2...@aws-amplify/datastore@3.3.0) (2021-07-28)


### Features

* **@aws-amplify/datastore:** support lambda authorizers ([52d43cc](https://github.com/aws-amplify/amplify-js/commit/52d43cc73b459148f1ae81ab81d3a5365a4457e3))





## [3.2.2](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@3.2.1...@aws-amplify/datastore@3.2.2) (2021-07-22)


### Bug Fixes

* **@aws-amplify/datastore:** remove null properties from connected model instances ([#8623](https://github.com/aws-amplify/amplify-js/issues/8623)) ([569214c](https://github.com/aws-amplify/amplify-js/commit/569214c762bb3aace1ff96fcbe468780dcaabe35))





## [3.2.1](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@3.2.0...@aws-amplify/datastore@3.2.1) (2021-07-16)

**Note:** Version bump only for package @aws-amplify/datastore





# [3.2.0](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@3.1.2...@aws-amplify/datastore@3.2.0) (2021-07-08)


### Features

* **@aws-amplify/datastore:** expose timestamp fields and prevent writing to read-only fields ([#8509](https://github.com/aws-amplify/amplify-js/issues/8509)) ([10857d5](https://github.com/aws-amplify/amplify-js/commit/10857d5bbd6f7cb59a58641e0e8a3cb5dc0080e9))





## [3.1.2](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@3.1.1...@aws-amplify/datastore@3.1.2) (2021-06-24)

**Note:** Version bump only for package @aws-amplify/datastore





## [3.1.1](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@3.1.0...@aws-amplify/datastore@3.1.1) (2021-06-18)

**Note:** Version bump only for package @aws-amplify/datastore





# [3.1.0](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@3.0.3...@aws-amplify/datastore@3.1.0) (2021-06-10)


### Features

* **@aws-amplify/datastore:** include custom pk in update/delete mutations ([#8296](https://github.com/aws-amplify/amplify-js/issues/8296)) ([4a8475b](https://github.com/aws-amplify/amplify-js/commit/4a8475b5ba4da312c946c66a4fb1b5591dfe9adf))





## [3.0.3](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@3.0.1...@aws-amplify/datastore@3.0.3) (2021-05-26)


### Bug Fixes

* **@aws-amplify/datastore:**  correct reachability unsubscribe behavior ([#8344](https://github.com/aws-amplify/amplify-js/issues/8344)) ([edf2b71](https://github.com/aws-amplify/amplify-js/commit/edf2b71a4ca3058883d27067fb6c87a9f3b339cb))
* **@aws-amplify/datastore:** coerce undefined field values to null ([#8301](https://github.com/aws-amplify/amplify-js/issues/8301)) ([396920b](https://github.com/aws-amplify/amplify-js/commit/396920bf53f139835473c0c08f4e5ab6f511867d))
* **@aws-amplify/datastore:** fix default error/conflict handler ([#8335](https://github.com/aws-amplify/amplify-js/issues/8335)) ([8d62d9d](https://github.com/aws-amplify/amplify-js/commit/8d62d9d9dd1d5934f40c0b800ab2440d805d4239))
* **@aws-amplify/datastore:** fixed return type for DS.delete() by ID ([#8311](https://github.com/aws-amplify/amplify-js/issues/8311)) ([e1624c1](https://github.com/aws-amplify/amplify-js/commit/e1624c17fae2edc6aa35904993171336fe9f597c))
* **@aws-amplify/datastore:** handle nullish values when using string predicate operators ([#8260](https://github.com/aws-amplify/amplify-js/issues/8260)) ([eb2942d](https://github.com/aws-amplify/amplify-js/commit/eb2942d436d48182f3e51cc163d2112b17656fa3))
* **@aws-amplify/datastore:** updates with composite keys ([#8253](https://github.com/aws-amplify/amplify-js/issues/8253)) ([3abfb8f](https://github.com/aws-amplify/amplify-js/commit/3abfb8fc68d916a5f22447652fe81bf81c6977dd))





## [3.0.1](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@3.0.0...@aws-amplify/datastore@3.0.1) (2021-05-14)

**Note:** Version bump only for package @aws-amplify/datastore





# [3.0.0](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.10.0...@aws-amplify/datastore@3.0.0) (2021-05-11)


* chore!: Upgrade to @react-native-async-storage/async-storage (#8250) ([1de4853](https://github.com/aws-amplify/amplify-js/commit/1de48531b68e3c53c3b7dbf4487da4578cb79888)), closes [#8250](https://github.com/aws-amplify/amplify-js/issues/8250)


### BREAKING CHANGES

* Upgrade from React Native AsyncStorage to @react-native-async-storage/async-storage

Co-authored-by: Ashish Nanda <ashish.nanda.5591@gmail.com>
Co-authored-by: Ivan Artemiev <29709626+iartemiev@users.noreply.github.com>





# [2.10.0](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.9.16...@aws-amplify/datastore@2.10.0) (2021-05-06)


### Bug Fixes

* **@aws-amplify/datastore:** correctly processing Delta Sync query response in RN ([#8196](https://github.com/aws-amplify/amplify-js/issues/8196)) ([9883974](https://github.com/aws-amplify/amplify-js/commit/98839741055ef9934565d49599e74c78e3812bba))
* **@aws-amplify/datastore:** fix hasOne delete ([#8191](https://github.com/aws-amplify/amplify-js/issues/8191)) ([d16a8fb](https://github.com/aws-amplify/amplify-js/commit/d16a8fbc5862281121812b1f8fc7af8bb001190d))
* **@aws-amplify/datastore:** log subscription error instead of throwing ([#8229](https://github.com/aws-amplify/amplify-js/issues/8229)) ([403de44](https://github.com/aws-amplify/amplify-js/commit/403de44496d17614a542fbcb98bab8b99898bab6))
* **@aws-amplify/datastore:** Update CCI config & logger warning format ([#8231](https://github.com/aws-amplify/amplify-js/issues/8231)) ([d3462aa](https://github.com/aws-amplify/amplify-js/commit/d3462aab1dd4916dd757bc1c80f9a944e0bb82dd))


### Features

* **@aws-amplify/datastore:** DataStore - Multi-Auth ([#8008](https://github.com/aws-amplify/amplify-js/issues/8008)) ([dedd564](https://github.com/aws-amplify/amplify-js/commit/dedd5641dfcfce209433088fe9570874cd810997))





## [2.9.16](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.9.15...@aws-amplify/datastore@2.9.16) (2021-04-15)


### Bug Fixes

* **@aws-amplify/datastore:** add additional type check to util.objectsEqual ([#8027](https://github.com/aws-amplify/amplify-js/issues/8027)) ([dee1971](https://github.com/aws-amplify/amplify-js/commit/dee1971285682170dc1828204273d34a69145aa3))
* **@aws-amplify/datastore:** consecutive saves ([#8000](https://github.com/aws-amplify/amplify-js/issues/8000)) ([7b478a5](https://github.com/aws-amplify/amplify-js/commit/7b478a58b73d8f321523d3a80a9b85e88afcc5d0))
* **@aws-amplify/datastore:** consecutive saves 2 ([#8038](https://github.com/aws-amplify/amplify-js/issues/8038)) ([a15b8f0](https://github.com/aws-amplify/amplify-js/commit/a15b8f044597da68442e4c51e67c35772aed1d7c))
* **@aws-amplify/datastore:** handle merging queued create with incoming update ([#8102](https://github.com/aws-amplify/amplify-js/issues/8102)) ([d84cf34](https://github.com/aws-amplify/amplify-js/commit/d84cf34d32e077554951e2fd7a383c6cfe3f536c))
* **@aws-amplify/datastore:** Retry mutation after GraphQL request timeout due to bad network condition. ([#6542](https://github.com/aws-amplify/amplify-js/issues/6542)) ([9fe6b7f](https://github.com/aws-amplify/amplify-js/commit/9fe6b7fa58aadb061a742b32c6a9cc1fd76dae6d))





## [2.9.15](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.9.14...@aws-amplify/datastore@2.9.15) (2021-03-25)


### Bug Fixes

* **@aws-amplify/datastore:** fix consecutive updates ([#7354](https://github.com/aws-amplify/amplify-js/issues/7354)) ([efd2e41](https://github.com/aws-amplify/amplify-js/commit/efd2e41d13fa6417ecddf153d7d0461060e45621))
* **@aws-amplify/datastore:** keep syncing when subs disabled ([#7987](https://github.com/aws-amplify/amplify-js/issues/7987)) ([0e8968f](https://github.com/aws-amplify/amplify-js/commit/0e8968f9125b1b5f76389abe3d77986c1f65e32f))
* **@aws-amplify/datastore:** update mutation input - use diff with DB instead of patches ([#7935](https://github.com/aws-amplify/amplify-js/issues/7935)) ([638c94d](https://github.com/aws-amplify/amplify-js/commit/638c94de30df179ef5f0d03ac8c97cecb683bb53))





## [2.9.14](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.9.13...@aws-amplify/datastore@2.9.14) (2021-03-18)

**Note:** Version bump only for package @aws-amplify/datastore





## [2.9.13](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.9.12...@aws-amplify/datastore@2.9.13) (2021-03-12)


### Bug Fixes

* **@aws-amplify/datastore:** handle sync query unauthorized ([#7926](https://github.com/aws-amplify/amplify-js/issues/7926)) ([4b37112](https://github.com/aws-amplify/amplify-js/commit/4b371125fa60362b2e4a648e0cb18b8f8a853956))





## [2.9.12](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.9.11...@aws-amplify/datastore@2.9.12) (2021-03-08)

**Note:** Version bump only for package @aws-amplify/datastore





## [2.9.11](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.9.10...@aws-amplify/datastore@2.9.11) (2021-03-03)


### Bug Fixes

* **@aws-amplify/datastore:** return partial data when available ([#7775](https://github.com/aws-amplify/amplify-js/issues/7775)) ([715aa7e](https://github.com/aws-amplify/amplify-js/commit/715aa7e1d8ea1797784d37ab706c12b133fca4f0))





## [2.9.10](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.9.9...@aws-amplify/datastore@2.9.10) (2021-02-25)


### Bug Fixes

* **@aws-amplify/datastore:** improve IDB query performance ([#7746](https://github.com/aws-amplify/amplify-js/issues/7746)) ([5b87ad4](https://github.com/aws-amplify/amplify-js/commit/5b87ad485be5521a3ca91aa7bb00bba178e6c8b9))





## [2.9.9](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.9.8...@aws-amplify/datastore@2.9.9) (2021-02-18)

**Note:** Version bump only for package @aws-amplify/datastore





## [2.9.8](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.9.7...@aws-amplify/datastore@2.9.8) (2021-02-15)

**Note:** Version bump only for package @aws-amplify/datastore





## [2.9.7](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.9.6...@aws-amplify/datastore@2.9.7) (2021-02-09)


### Bug Fixes

* **@aws-amplify/datastore:** align AWSTime validation with AppSync ([#7717](https://github.com/aws-amplify/amplify-js/issues/7717)) ([feae503](https://github.com/aws-amplify/amplify-js/commit/feae503ba2ad22738e4a16639441f4dec6077f7a))





## [2.9.6](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.9.5...@aws-amplify/datastore@2.9.6) (2021-02-03)

**Note:** Version bump only for package @aws-amplify/datastore





## [2.9.5](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.9.4...@aws-amplify/datastore@2.9.5) (2021-02-01)

**Note:** Version bump only for package @aws-amplify/datastore





## [2.9.4](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.9.3...@aws-amplify/datastore@2.9.4) (2021-01-29)


### Bug Fixes

* **@aws-amplify/datastore:** only include changed fields in update mutation input ([#7466](https://github.com/aws-amplify/amplify-js/issues/7466)) ([7b5b23f](https://github.com/aws-amplify/amplify-js/commit/7b5b23f9fa6f1c4934c631ab6bfc363b8d3eeac2))





## [2.9.3](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.9.2...@aws-amplify/datastore@2.9.3) (2021-01-07)

**Note:** Version bump only for package @aws-amplify/datastore





## [2.9.2](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.9.1...@aws-amplify/datastore@2.9.2) (2020-12-17)

**Note:** Version bump only for package @aws-amplify/datastore





## [2.9.1](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.9.0...@aws-amplify/datastore@2.9.1) (2020-12-10)


### Bug Fixes

* **@aws-amplify/datastore:** check auth config before getting token ([#7325](https://github.com/aws-amplify/amplify-js/issues/7325)) ([d9aa328](https://github.com/aws-amplify/amplify-js/commit/d9aa32837f15f408daba0a0104bb27042b9331da))
* **@aws-amplify/datastore:** Fix ctlSubsSubscription not getting unsubscribed when device goes offline ([#7250](https://github.com/aws-amplify/amplify-js/issues/7250)) ([4d0a2e3](https://github.com/aws-amplify/amplify-js/commit/4d0a2e34a21eb96b9085efcdd8f7846734bf33f7))
* **@aws-amplify/datastore:** fix custom ownerField selection set ([#7317](https://github.com/aws-amplify/amplify-js/issues/7317)) ([0b82781](https://github.com/aws-amplify/amplify-js/commit/0b82781e946e6bef15f7b162d0ea538fc8ac5100))
* **@aws-amplify/datastore:** remove netinfo from peer deps to prevent npm7 error ([#7349](https://github.com/aws-amplify/amplify-js/issues/7349)) ([88e2413](https://github.com/aws-amplify/amplify-js/commit/88e2413701cae673043c2fe42b490d279e7e51c9))





# [2.9.0](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.8.1...@aws-amplify/datastore@2.9.0) (2020-11-30)


### Bug Fixes

* **@aws-amplify/datastore:** handle groupClaim as plain string ([#7261](https://github.com/aws-amplify/amplify-js/issues/7261)) ([63e5baa](https://github.com/aws-amplify/amplify-js/commit/63e5baa4293bf6688962007137377d19c5ef8904))


### Features

* **@aws-amplify/datastore:** handle sessionId ([#7304](https://github.com/aws-amplify/amplify-js/issues/7304)) ([6e28eaf](https://github.com/aws-amplify/amplify-js/commit/6e28eaf37525ce231d7793bf82a960046fc7f8f4))





## [2.8.1](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.8.0...@aws-amplify/datastore@2.8.1) (2020-11-23)


### Bug Fixes

* **@aws-amplify/datastore:** use default auth for subscriptions ([#7172](https://github.com/aws-amplify/amplify-js/issues/7172)) ([7428c74](https://github.com/aws-amplify/amplify-js/commit/7428c74bb7402fe230def58e501d6e58ec351f3e))





# [2.8.0](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.7.3...@aws-amplify/datastore@2.8.0) (2020-11-20)


### Bug Fixes

* **@aws-amplify/datastore:** extend Lookup type to allow Predicates.ALL ([#7218](https://github.com/aws-amplify/amplify-js/issues/7218)) ([be1a746](https://github.com/aws-amplify/amplify-js/commit/be1a746fe7c0e8a41e4c773c03689a6d6d76b380))
* **@aws-amplify/datastore:** fix sel. sync delta ([#7200](https://github.com/aws-amplify/amplify-js/issues/7200)) ([dbd4629](https://github.com/aws-amplify/amplify-js/commit/dbd46299af9c558251b8c652c3e50208982655c8))
* **@aws-amplify/datastore:** fix validation for array with optional element ([#7216](https://github.com/aws-amplify/amplify-js/issues/7216)) ([31c7199](https://github.com/aws-amplify/amplify-js/commit/31c7199c1c0abe77f59ac24739667503f266b4d1))
* **@aws-amplify/datastore:** handle groupClaim as string ([#7208](https://github.com/aws-amplify/amplify-js/issues/7208)) ([17b62dd](https://github.com/aws-amplify/amplify-js/commit/17b62dd216f7fdf5b21ae9ba2a2c170fb86a4d73))


### Features

* **@aws-amplify/datastore:** add local validations for AppSync scalars ([#7212](https://github.com/aws-amplify/amplify-js/issues/7212)) ([f277a7e](https://github.com/aws-amplify/amplify-js/commit/f277a7e4bb9d4cf67e2b4353c09b1e3f92bcd5c2))
* **@aws-amplify/datastore:** add local validations for AppSync scalars (update) ([#7234](https://github.com/aws-amplify/amplify-js/issues/7234)) ([7477d27](https://github.com/aws-amplify/amplify-js/commit/7477d272587212c2a3cf0e86806f8ff4a03881e0))





## [2.7.3](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.7.2...@aws-amplify/datastore@2.7.3) (2020-11-13)


### Bug Fixes

* **@aws-amplify/datastore:** add implicit owner to selection set ([#7159](https://github.com/aws-amplify/amplify-js/issues/7159)) ([256ffa8](https://github.com/aws-amplify/amplify-js/commit/256ffa8b20d41a9e97a7dc2db38a3453d885c0cd))





## [2.7.2](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.7.1...@aws-amplify/datastore@2.7.2) (2020-11-03)


### Bug Fixes

* **@aws-amplify/datastore:** fix syncExpression types ([#7097](https://github.com/aws-amplify/amplify-js/issues/7097)) ([947197d](https://github.com/aws-amplify/amplify-js/commit/947197d39e4136af1d114ef716fe77725712f51f))





## [2.7.1](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.7.0...@aws-amplify/datastore@2.7.1) (2020-10-31)


### Bug Fixes

* **amazon-cognito-identity-js:** update random implementation ([#7090](https://github.com/aws-amplify/amplify-js/issues/7090)) ([7048453](https://github.com/aws-amplify/amplify-js/commit/70484532da8a9953384b00b223b2b3ba0c0e845e))





# [2.7.0](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.6.1...@aws-amplify/datastore@2.7.0) (2020-10-29)


### Bug Fixes

* **@aws-amplify/datastore:** fix OIDC group auth rules ([#7011](https://github.com/aws-amplify/amplify-js/issues/7011)) ([34de0f2](https://github.com/aws-amplify/amplify-js/commit/34de0f252ddea559a6bc959610522cc19fe340f6))
* **@aws-amplify/datastore:** initialize syncPredicates to empty WeakMap ([#7078](https://github.com/aws-amplify/amplify-js/issues/7078)) ([45d52da](https://github.com/aws-amplify/amplify-js/commit/45d52da6cec9b5e546c26e299d47e4d0b2879a7f))
* **@aws-amplify/datastore:** return empty WeakMap ([#7079](https://github.com/aws-amplify/amplify-js/issues/7079)) ([cf511b8](https://github.com/aws-amplify/amplify-js/commit/cf511b8d3deaa58edcce8d1ec015548a801c212b))
* **@aws-amplify/datastore:** validate model fields to allow undefined ([#7044](https://github.com/aws-amplify/amplify-js/issues/7044)) ([958f61e](https://github.com/aws-amplify/amplify-js/commit/958f61ef2918728cc46b9b210d60e868edd87f39))


### Features

* **@aws-amplify/datastore:** add Selective Sync ([#7001](https://github.com/aws-amplify/amplify-js/issues/7001)) ([8fa348b](https://github.com/aws-amplify/amplify-js/commit/8fa348b8ba708434992d97557b0fceebbf7abe9a))
* **@aws-amplify/datastore:** selective sync enhancements ([#7083](https://github.com/aws-amplify/amplify-js/issues/7083)) ([2a4d3fd](https://github.com/aws-amplify/amplify-js/commit/2a4d3fde1b23e5be84f66721d3ef5854663081d1))





## [2.6.1](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.6.0...@aws-amplify/datastore@2.6.1) (2020-10-15)


### Bug Fixes

* **@aws-amplify/datastore:** fix DS subscriptions involving read operation ([#6954](https://github.com/aws-amplify/amplify-js/issues/6954)) ([2f74c6b](https://github.com/aws-amplify/amplify-js/commit/2f74c6b74d38af570017139f2ba8269dc1009135))





# [2.6.0](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.5.2...@aws-amplify/datastore@2.6.0) (2020-10-01)


### Bug Fixes

* **@aws-amplify/datastore:** add token to currentAuthenticatedUser for OIDC  ([#6858](https://github.com/aws-amplify/amplify-js/issues/6858)) ([61f7478](https://github.com/aws-amplify/amplify-js/commit/61f7478609fce7dd2f25c562aeb887d3f3db4a67))
* **@aws-amplify/datastore:** check for token before getting payload ([#6893](https://github.com/aws-amplify/amplify-js/issues/6893)) ([880e1da](https://github.com/aws-amplify/amplify-js/commit/880e1da9d85b1caa3992bc7b4b6ace1a32eee525))
* **@aws-amplify/datastore:** correct validation for array values in models ([#6784](https://github.com/aws-amplify/amplify-js/issues/6784)) ([95f73e2](https://github.com/aws-amplify/amplify-js/commit/95f73e2d1b8eab2d9b8fc474ca2986f84d2a68e3))
* **@aws-amplify/datastore:** fix import isNullOrUndefined ([#6883](https://github.com/aws-amplify/amplify-js/issues/6883)) ([a55168b](https://github.com/aws-amplify/amplify-js/commit/a55168b0c6b794b337a5b2258fc22b5721a82e85))


### Features

* **@aws-amplify/datastore:** support indexeddb adapter on web worker ([#6874](https://github.com/aws-amplify/amplify-js/issues/6874)) ([e43e181](https://github.com/aws-amplify/amplify-js/commit/e43e18195ca201fa61bd0dfb1b18c06c3262f825))





## [2.5.2](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.5.1...@aws-amplify/datastore@2.5.2) (2020-09-25)


### Bug Fixes

* Add files with Amplify.register to sideEffects array ([#6867](https://github.com/aws-amplify/amplify-js/issues/6867)) ([58ddbf8](https://github.com/aws-amplify/amplify-js/commit/58ddbf8811e44695d97b6ab8be8f7cd2a2242921))
* **@aws-amplify/datastore:** use runExclusive when enqueuing ([#6828](https://github.com/aws-amplify/amplify-js/issues/6828)) ([26ce5df](https://github.com/aws-amplify/amplify-js/commit/26ce5dfb0270009fc10f003f5627046ddaf5ae4e))





## [2.5.1](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.5.0...@aws-amplify/datastore@2.5.1) (2020-09-16)

**Note:** Version bump only for package @aws-amplify/datastore





# [2.5.0](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.4.0...@aws-amplify/datastore@2.5.0) (2020-09-15)


### Bug Fixes

* **@aws-amplify/datastore:** Allow subscribing and querying with partial auth ([#6458](https://github.com/aws-amplify/amplify-js/issues/6458)) ([6abbf50](https://github.com/aws-amplify/amplify-js/commit/6abbf5053978420ef008fc45968a54d0762943de))


### Features

* **@aws-amplify/datastore:** add query sorting ([#6785](https://github.com/aws-amplify/amplify-js/issues/6785)) ([d9c2f5e](https://github.com/aws-amplify/amplify-js/commit/d9c2f5efbd5ad5dd97e441d7f453f8358f615199))





# [2.4.0](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.3.1...@aws-amplify/datastore@2.4.0) (2020-09-10)


### Features

* **@aws-amplify/datastore:** Add SSR support for DataStore ([#6726](https://github.com/aws-amplify/amplify-js/issues/6726)) ([e56aba6](https://github.com/aws-amplify/amplify-js/commit/e56aba642acc7eb3482f0e69454a530409d1b3ac))





## [2.3.1](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.3.0...@aws-amplify/datastore@2.3.1) (2020-09-03)

**Note:** Version bump only for package @aws-amplify/datastore





# [2.3.0](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.2.11...@aws-amplify/datastore@2.3.0) (2020-09-03)


### Bug Fixes

* **@aws-amplify/datastore:** DataStore regression with AsyncStorage ([#6712](https://github.com/aws-amplify/amplify-js/issues/6712)) ([7059556](https://github.com/aws-amplify/amplify-js/commit/7059556f693b4a52143ecaa9934a14f7195caee8))


### Features

* **SSR:** withSSRContext ([#6146](https://github.com/aws-amplify/amplify-js/issues/6146)) ([1cb1afd](https://github.com/aws-amplify/amplify-js/commit/1cb1afd1e56135908dceb2ef6403f0b3e78067fe))





## [2.2.11](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.2.10...@aws-amplify/datastore@2.2.11) (2020-09-01)

**Note:** Version bump only for package @aws-amplify/datastore





## [2.2.10](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.2.9...@aws-amplify/datastore@2.2.10) (2020-08-19)

**Note:** Version bump only for package @aws-amplify/datastore





## [2.2.9](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.2.8...@aws-amplify/datastore@2.2.9) (2020-08-06)

**Note:** Version bump only for package @aws-amplify/datastore





## [2.2.8](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.2.7...@aws-amplify/datastore@2.2.8) (2020-07-27)

**Note:** Version bump only for package @aws-amplify/datastore





## [2.2.7](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.2.6...@aws-amplify/datastore@2.2.7) (2020-07-22)


### Bug Fixes

* **@aws-amplify/datastore:** call disconnectionHandler on subscription error ([#6366](https://github.com/aws-amplify/amplify-js/issues/6366)) ([a7feace](https://github.com/aws-amplify/amplify-js/commit/a7feacea4ed506340d250249d0b15286fe3ef5fa))





## [2.2.6](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.2.5...@aws-amplify/datastore@2.2.6) (2020-07-09)

**Note:** Version bump only for package @aws-amplify/datastore





## [2.2.5](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.2.4...@aws-amplify/datastore@2.2.5) (2020-07-07)


### Bug Fixes

* **@aws-amplify/datastore:** give precedence to config.conflictHandler ([#6237](https://github.com/aws-amplify/amplify-js/issues/6237)) ([d616b76](https://github.com/aws-amplify/amplify-js/commit/d616b76aa054930bc816ad13be281bd9bd07f64c))





## [2.2.4](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.2.3...@aws-amplify/datastore@2.2.4) (2020-06-18)

**Note:** Version bump only for package @aws-amplify/datastore





## [2.2.3](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.2.2...@aws-amplify/datastore@2.2.3) (2020-06-09)


### Bug Fixes

* **@aws-amplify/datastore:** AsyncStorage - Save connections when doing batchSave ([#6027](https://github.com/aws-amplify/amplify-js/issues/6027)) ([d9a5b3e](https://github.com/aws-amplify/amplify-js/commit/d9a5b3ee2309f1703a349a8d39b2a65dcaac5f61))
* **@aws-amplify/datastore:** IndexedDB - Save connections when doing batchSave ([#6029](https://github.com/aws-amplify/amplify-js/issues/6029)) ([1a6e0ec](https://github.com/aws-amplify/amplify-js/commit/1a6e0ecff70556559d8fef6028ec4011775f5b95)), closes [#6027](https://github.com/aws-amplify/amplify-js/issues/6027)
* **@aws-amplify/datastore:** RN - fix queries don't do anything on the first load of the application ([#6010](https://github.com/aws-amplify/amplify-js/issues/6010)) ([b5347ab](https://github.com/aws-amplify/amplify-js/commit/b5347ab620763551060741a1b78e47c1abf7ee6a)), closes [#5991](https://github.com/aws-amplify/amplify-js/issues/5991)
* **@aws-amplify/datastore:** Save parent model with flattened ids for relations when batch saving results from GraphQL ([#6035](https://github.com/aws-amplify/amplify-js/issues/6035)) ([084b265](https://github.com/aws-amplify/amplify-js/commit/084b2653219d5b8cc0f952ebb74039b2a97e6261))





## [2.2.2](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.2.1...@aws-amplify/datastore@2.2.2) (2020-06-04)


### Bug Fixes

* **@aws-amplify/datastore:** Fix count when there is a mutation in the outbox ([#6001](https://github.com/aws-amplify/amplify-js/issues/6001)) ([d2fc76e](https://github.com/aws-amplify/amplify-js/commit/d2fc76e789ee1bcaf6c112e7b661089d746ac355))





## [2.2.1](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.2.0...@aws-amplify/datastore@2.2.1) (2020-06-03)


### Bug Fixes

* **@aws-amplify/datastore:** Fix performance undefined variable in RN ([#5984](https://github.com/aws-amplify/amplify-js/issues/5984)) ([da2726d](https://github.com/aws-amplify/amplify-js/commit/da2726d029c63d7472a32deffd1431322ec628ad))
* **@aws-amplify/datastore:** Fix potential NPE ([#5993](https://github.com/aws-amplify/amplify-js/issues/5993)) ([ccb6906](https://github.com/aws-amplify/amplify-js/commit/ccb69065a3d92ec4ec79184b0d55f069bb652980))





# [2.2.0](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.1.2...@aws-amplify/datastore@2.2.0) (2020-06-02)


### Bug Fixes

* **@aws-amplify/datastore:** Allow partial subscriptions. ([#5968](https://github.com/aws-amplify/amplify-js/issues/5968)) ([3331e9a](https://github.com/aws-amplify/amplify-js/commit/3331e9a713b38bb672aca5dc667ecef30b8820ce))


### Features

* **@aws-amplify/datastore:** Sync Status Notification. Performance Improvements. ([#5942](https://github.com/aws-amplify/amplify-js/issues/5942)) ([67fac50](https://github.com/aws-amplify/amplify-js/commit/67fac50cd734338ac76797d06111fc5ca911bd48))





## [2.1.2](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.1.1...@aws-amplify/datastore@2.1.2) (2020-05-26)

**Note:** Version bump only for package @aws-amplify/datastore





## [2.1.1](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.1.0...@aws-amplify/datastore@2.1.1) (2020-05-22)


### Bug Fixes

* **@aws-amplify/datastore:** Fix subscription creation with model subscription level is public ([#5390](https://github.com/aws-amplify/amplify-js/issues/5390)) ([fff7daa](https://github.com/aws-amplify/amplify-js/commit/fff7daa25cab50933a149e88a7b67a4d83be0089))





# [2.1.0](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.0.10...@aws-amplify/datastore@2.1.0) (2020-05-14)


### Bug Fixes

* require cycles in various packages ([#5372](https://github.com/aws-amplify/amplify-js/issues/5372)) ([b48c26d](https://github.com/aws-amplify/amplify-js/commit/b48c26d198cc25dd92f1515ddf2a97deec5c9783))


### Features

* **@aws-amplify/datastore:** enable keyName relations ([#5778](https://github.com/aws-amplify/amplify-js/issues/5778)) ([9019acf](https://github.com/aws-amplify/amplify-js/commit/9019acfd180d3e569e64c999fd216b16a9d6b799))





## [2.0.10](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.0.9...@aws-amplify/datastore@2.0.10) (2020-04-30)

**Note:** Version bump only for package @aws-amplify/datastore





## [2.0.9](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.0.8...@aws-amplify/datastore@2.0.9) (2020-04-24)


### Bug Fixes

* **@aws-amplify/datastore:** Improve query and observe typings ([#5468](https://github.com/aws-amplify/amplify-js/issues/5468)) ([84286be](https://github.com/aws-amplify/amplify-js/commit/84286be109d7f50eac83a9694e75b61500cc8a83))





## [2.0.8](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.0.7...@aws-amplify/datastore@2.0.8) (2020-04-14)

**Note:** Version bump only for package @aws-amplify/datastore





## [2.0.7](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.0.6...@aws-amplify/datastore@2.0.7) (2020-04-08)

**Note:** Version bump only for package @aws-amplify/datastore





## [2.0.6](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.0.5...@aws-amplify/datastore@2.0.6) (2020-04-07)

**Note:** Version bump only for package @aws-amplify/datastore





## [2.0.5](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.0.4...@aws-amplify/datastore@2.0.5) (2020-04-03)

**Note:** Version bump only for package @aws-amplify/datastore





## [2.0.4](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.0.3...@aws-amplify/datastore@2.0.4) (2020-04-02)

**Note:** Version bump only for package @aws-amplify/datastore





## [2.0.3](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.0.2...@aws-amplify/datastore@2.0.3) (2020-04-01)

**Note:** Version bump only for package @aws-amplify/datastore





## [2.0.2](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@2.0.1...@aws-amplify/datastore@2.0.2) (2020-04-01)

**Note:** Version bump only for package @aws-amplify/datastore





## [2.0.1](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@1.2.0...@aws-amplify/datastore@2.0.1) (2020-03-31)

**Note:** Version bump only for package @aws-amplify/datastore





# [1.2.0](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@1.1.0...@aws-amplify/datastore@1.2.0) (2020-03-30)

### Bug Fixes

- **@aws-amplify/datastore:** Make save return a single model instead of array ([#5199](https://github.com/aws-amplify/amplify-js/issues/5199)) ([1d0b8e1](https://github.com/aws-amplify/amplify-js/commit/1d0b8e13af483b7ab47d9b4bcd6aa00d8e67d9f1)), closes [#5099](https://github.com/aws-amplify/amplify-js/issues/5099)

### Features

- **@aws-amplify/datastore:** configurable sync pagination limit ([#5181](https://github.com/aws-amplify/amplify-js/issues/5181)) ([a4f518b](https://github.com/aws-amplify/amplify-js/commit/a4f518b42e192c894300225a4c5608d397eb6816))

# [1.1.0](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@1.0.8...@aws-amplify/datastore@1.1.0) (2020-03-25)

### Bug Fixes

- **@aws-amplify/datastore:** Fix query and delete types ([#5032](https://github.com/aws-amplify/amplify-js/issues/5032)) ([fdca554](https://github.com/aws-amplify/amplify-js/commit/fdca5541372662ffa1d932b665c481a78e4ccdc7)), closes [#4827](https://github.com/aws-amplify/amplify-js/issues/4827)
- **@aws-amplify/datastore:** Storage should be re-initialized after DataStore.clear() ([#5083](https://github.com/aws-amplify/amplify-js/issues/5083)) ([0ddb6af](https://github.com/aws-amplify/amplify-js/commit/0ddb6af3163fc624cc4f320ecf2b2463d7d6b102)), closes [#5076](https://github.com/aws-amplify/amplify-js/issues/5076)

### Features

- **@aws-amplify/datastore:** Support non-[@model](https://github.com/model) types in DataStore ([#5128](https://github.com/aws-amplify/amplify-js/issues/5128)) ([b884ea2](https://github.com/aws-amplify/amplify-js/commit/b884ea2ce730d8ce981a5921f74f8f37338f6f42))

## [1.0.8](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@1.0.7...@aws-amplify/datastore@1.0.8) (2020-02-28)

**Note:** Version bump only for package @aws-amplify/datastore

## [1.0.7](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@1.0.6...@aws-amplify/datastore@1.0.7) (2020-02-14)

**Note:** Version bump only for package @aws-amplify/datastore

## [1.0.6](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@1.0.4...@aws-amplify/datastore@1.0.6) (2020-02-07)

**Note:** Version bump only for package @aws-amplify/datastore

## [1.0.4](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@1.0.3...@aws-amplify/datastore@1.0.4) (2020-01-10)

### Bug Fixes

- [#4311](https://github.com/aws-amplify/amplify-js/issues/4311) Update main entry field to point to CJS builds instead of webpack bundles ([#4678](https://github.com/aws-amplify/amplify-js/issues/4678)) ([54fbdf4](https://github.com/aws-amplify/amplify-js/commit/54fbdf4b1393567735fb7b5f4144db273f1a5f6a))

## [1.0.3](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@1.0.2...@aws-amplify/datastore@1.0.3) (2019-12-18)

**Note:** Version bump only for package @aws-amplify/datastore

## [1.0.2](https://github.com/aws-amplify/amplify-js/compare/@aws-amplify/datastore@1.0.1...@aws-amplify/datastore@1.0.2) (2019-12-04)

### Bug Fixes

- **@aws-amplify/datastore:** Validate arrays of scalars in model constructor ([#4508](https://github.com/aws-amplify/amplify-js/issues/4508)) ([8d2ba6e](https://github.com/aws-amplify/amplify-js/commit/8d2ba6e85031a7880d2b573e1f68108d22a7de54))

## 1.0.1 (2019-12-03)

**Note:** Version bump only for package @aws-amplify/datastore
