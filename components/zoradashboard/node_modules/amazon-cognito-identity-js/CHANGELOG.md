# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.0.6](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@5.0.5...amazon-cognito-identity-js@5.0.6) (2021-07-22)


### Bug Fixes

* **amazon-cognito-identity-is, @aws-amplify/auth:** upgrade crypto-js to 4.1.1 to fix bundle size issue ([#8626](https://github.com/aws-amplify/amplify-js/issues/8626)) ([b16f8e7](https://github.com/aws-amplify/amplify-js/commit/b16f8e7801790a59a8ad0c40b598f4962aada60e))
* **amazon-cognito-identity-js:** Adding Session param for DEVICE_SRP_AUTH and user agent fix ([#8591](https://github.com/aws-amplify/amplify-js/issues/8591)) ([190bd50](https://github.com/aws-amplify/amplify-js/commit/190bd501236a59b16318802b51a0494f7374d299))





## [5.0.5](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@5.0.4...amazon-cognito-identity-js@5.0.5) (2021-07-16)


### Bug Fixes

* **amazon-cognito-identity-js:** refresh cached user after deleting attributes ([#8578](https://github.com/aws-amplify/amplify-js/issues/8578)) ([bf78611](https://github.com/aws-amplify/amplify-js/commit/bf78611b8e4dbc4c8b774516c765cb6d1add8ea7))





## [5.0.4](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@5.0.3...amazon-cognito-identity-js@5.0.4) (2021-07-08)


### Bug Fixes

* **amazon-cognito-identity-js:** rewrite retry as promise based method ([#8524](https://github.com/aws-amplify/amplify-js/issues/8524)) ([a84978d](https://github.com/aws-amplify/amplify-js/commit/a84978d61960907957699882bc16724287dd522f))





## [5.0.3](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@5.0.2...amazon-cognito-identity-js@5.0.3) (2021-06-10)


### Bug Fixes

* remove RN-specific peerDeps to correctly hoist core in npm@7 ([#8368](https://github.com/aws-amplify/amplify-js/issues/8368)) ([9cc5218](https://github.com/aws-amplify/amplify-js/commit/9cc52186e687d6782b41581959380bd7f534e5d2))





## [5.0.2](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@5.0.1...amazon-cognito-identity-js@5.0.2) (2021-05-26)

**Note:** Version bump only for package amazon-cognito-identity-js





## [5.0.1](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@5.0.0...amazon-cognito-identity-js@5.0.1) (2021-05-14)

**Note:** Version bump only for package amazon-cognito-identity-js





# [5.0.0](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.6.1...amazon-cognito-identity-js@5.0.0) (2021-05-11)


* chore!: Upgrade to @react-native-async-storage/async-storage (#8250) ([1de4853](https://github.com/aws-amplify/amplify-js/commit/1de48531b68e3c53c3b7dbf4487da4578cb79888)), closes [#8250](https://github.com/aws-amplify/amplify-js/issues/8250)


### BREAKING CHANGES

* Upgrade from React Native AsyncStorage to @react-native-async-storage/async-storage

Co-authored-by: Ashish Nanda <ashish.nanda.5591@gmail.com>
Co-authored-by: Ivan Artemiev <29709626+iartemiev@users.noreply.github.com>





## [4.6.1](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.6.0...amazon-cognito-identity-js@4.6.1) (2021-05-06)


### Bug Fixes

* **amazon-cognito-identity-js:** resolve missing getRandomBase64 implementation in expo >= 41  ([#8162](https://github.com/aws-amplify/amplify-js/issues/8162)) ([2d4052d](https://github.com/aws-amplify/amplify-js/commit/2d4052da555709fe0f759fecb2df4b4b9604461c))





# [4.6.0](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.5.14...amazon-cognito-identity-js@4.6.0) (2021-03-18)


### Features

* Improve Next.js/CRA/Angular bundle sizes ([#7842](https://github.com/aws-amplify/amplify-js/issues/7842)) ([2e0dc61](https://github.com/aws-amplify/amplify-js/commit/2e0dc61fa9e4399351a59a7e8fe801027b6587d5))





## [4.5.14](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.5.13...amazon-cognito-identity-js@4.5.14) (2021-03-12)


### Bug Fixes

* **amazon-cognito-identity-js:** update podspec dep ([#7873](https://github.com/aws-amplify/amplify-js/issues/7873)) ([6c9c4ef](https://github.com/aws-amplify/amplify-js/commit/6c9c4efde6d4da48f5add075ef2f4c3d112c7dea))
* **amazon-cognito-identity-js:** update sendMFACode callback type ([#7801](https://github.com/aws-amplify/amplify-js/issues/7801)) ([5cce7e6](https://github.com/aws-amplify/amplify-js/commit/5cce7e66ddc5de1ffa190710a7d5847851ec83e5))





## [4.5.13](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.5.12...amazon-cognito-identity-js@4.5.13) (2021-03-08)


### Bug Fixes

* **amazon-cognito-identity-js:** set userDataKey with updated username ([#7903](https://github.com/aws-amplify/amplify-js/issues/7903)) ([8d30ce5](https://github.com/aws-amplify/amplify-js/commit/8d30ce5633fd19acadf621cedc338a4e7504481b))





## [4.5.12](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.5.11...amazon-cognito-identity-js@4.5.12) (2021-02-25)

**Note:** Version bump only for package amazon-cognito-identity-js





## [4.5.11](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.5.10...amazon-cognito-identity-js@4.5.11) (2021-02-18)


### Bug Fixes

* AuthenticationHelper - Handle negative BigIntegers ([#7618](https://github.com/aws-amplify/amplify-js/issues/7618)) ([104b278](https://github.com/aws-amplify/amplify-js/commit/104b2783cbf0f94b78f543c94956b98e3611aa4f))





## [4.5.10](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.5.9...amazon-cognito-identity-js@4.5.10) (2021-02-03)


### Bug Fixes

* **amazon-cognito-identity-js:** add default value for options ([#7664](https://github.com/aws-amplify/amplify-js/issues/7664)) ([4ecf425](https://github.com/aws-amplify/amplify-js/commit/4ecf4256e54db42e49c55db8ca14f7dd2b206af1))





## [4.5.9](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.5.8...amazon-cognito-identity-js@4.5.9) (2021-02-01)


### Bug Fixes

* **amazon-cognito-identity-js:** make options optional ([#7654](https://github.com/aws-amplify/amplify-js/issues/7654)) ([08277af](https://github.com/aws-amplify/amplify-js/commit/08277aff76688c091e05c593cb802f90a9c771a6))





## [4.5.8](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.5.7...amazon-cognito-identity-js@4.5.8) (2021-01-29)


### Bug Fixes

* **@aws-amplify/auth, amazon-cognito-identity-js:** Include clientMetadata for token refresh ([#7633](https://github.com/aws-amplify/amplify-js/issues/7633)) ([3a9efb0](https://github.com/aws-amplify/amplify-js/commit/3a9efb0b596cf2795d7e1424f011f8e59058ecfb))
* **amazon-cognito-identity-js:** add .web.js version for cryptoSecureRandomInt ([#7521](https://github.com/aws-amplify/amplify-js/issues/7521)) ([13b7ccd](https://github.com/aws-amplify/amplify-js/commit/13b7ccd49b3314580b597dc177f400c1b68e930f))





## [4.5.7](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.5.6...amazon-cognito-identity-js@4.5.7) (2021-01-07)

**Note:** Version bump only for package amazon-cognito-identity-js





## [4.5.6](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.5.5...amazon-cognito-identity-js@4.5.6) (2020-12-17)

**Note:** Version bump only for package amazon-cognito-identity-js





## [4.5.5](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.5.4...amazon-cognito-identity-js@4.5.5) (2020-11-20)

**Note:** Version bump only for package amazon-cognito-identity-js





## [4.5.4](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.5.3...amazon-cognito-identity-js@4.5.4) (2020-11-13)


### Bug Fixes

* **amazon-cognito-identity-js:** set crypto for Node ([#7136](https://github.com/aws-amplify/amplify-js/issues/7136)) ([5173a99](https://github.com/aws-amplify/amplify-js/commit/5173a9911096627ce1b45067808af249668b260b))





## [4.5.3](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.5.2...amazon-cognito-identity-js@4.5.3) (2020-11-03)

**Note:** Version bump only for package amazon-cognito-identity-js





## [4.5.2](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.5.1...amazon-cognito-identity-js@4.5.2) (2020-10-31)


### Bug Fixes

* **amazon-cognito-identity-js:** update random implementation ([#7090](https://github.com/aws-amplify/amplify-js/issues/7090)) ([7048453](https://github.com/aws-amplify/amplify-js/commit/70484532da8a9953384b00b223b2b3ba0c0e845e))





## [4.5.1](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.5.0...amazon-cognito-identity-js@4.5.1) (2020-10-29)

**Note:** Version bump only for package amazon-cognito-identity-js





# [4.5.0](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.4.0...amazon-cognito-identity-js@4.5.0) (2020-10-15)


### Features

* Patch JKBigInteger to use NSSecureCoding ([#6843](https://github.com/aws-amplify/amplify-js/issues/6843)) ([53be43d](https://github.com/aws-amplify/amplify-js/commit/53be43d7a0049e04a47e7fece5dcd726c7a414fe))





# [4.4.0](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.3.5...amazon-cognito-identity-js@4.4.0) (2020-09-03)


### Bug Fixes

* **amazon-cognito-identity-js:** add "none" to sameSite possible values ([#6682](https://github.com/aws-amplify/amplify-js/issues/6682)) ([cffb932](https://github.com/aws-amplify/amplify-js/commit/cffb932dfd2c7bb1ca246adc451cc7f6dea2a1f6))


### Features

* **SSR:** withSSRContext ([#6146](https://github.com/aws-amplify/amplify-js/issues/6146)) ([1cb1afd](https://github.com/aws-amplify/amplify-js/commit/1cb1afd1e56135908dceb2ef6403f0b3e78067fe))





## [4.3.5](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.3.4...amazon-cognito-identity-js@4.3.5) (2020-09-01)


### Bug Fixes

* **@aws-amplify/auth:** incorrect return type for Auth.resendSignUp ([#5112](https://github.com/aws-amplify/amplify-js/issues/5112)) ([9164b37](https://github.com/aws-amplify/amplify-js/commit/9164b37cb7669c9dd08927dde58dccbefad25194))
* **amazon-cognito-identity-js:** fix parameters in sendMFASelectionAnswer ([#6418](https://github.com/aws-amplify/amplify-js/issues/6418)) ([794c1da](https://github.com/aws-amplify/amplify-js/commit/794c1da170cd98d3def4651751b851f28810bb6e))





## [4.3.4](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.3.3...amazon-cognito-identity-js@4.3.4) (2020-08-19)

**Note:** Version bump only for package amazon-cognito-identity-js





## [4.3.3](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.3.2...amazon-cognito-identity-js@4.3.3) (2020-07-07)

**Note:** Version bump only for package amazon-cognito-identity-js





## [4.3.2](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.3.1...amazon-cognito-identity-js@4.3.2) (2020-06-18)


### Bug Fixes

* **amazon-cognito-identity-js:** allow storage to return missing items ([#5877](https://github.com/aws-amplify/amplify-js/issues/5877)) ([1fd8336](https://github.com/aws-amplify/amplify-js/commit/1fd83360138be0359505c25bce2890f959c1000e))





## [4.3.1](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.3.0...amazon-cognito-identity-js@4.3.1) (2020-06-03)

**Note:** Version bump only for package amazon-cognito-identity-js





# [4.3.0](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.2.4...amazon-cognito-identity-js@4.3.0) (2020-05-22)


### Features

* **amazon-cognito-identity-js:** Add support for fetch options ([#3017](https://github.com/aws-amplify/amplify-js/issues/3017)) ([45a649d](https://github.com/aws-amplify/amplify-js/commit/45a649d6e9b80eeef4cc7badcbb86ece10686996))





## [4.2.4](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.2.3...amazon-cognito-identity-js@4.2.4) (2020-05-14)


### Bug Fixes

* **amazon-cognito-identity-js:** Not refresh token immediately after sign in ([#5747](https://github.com/aws-amplify/amplify-js/issues/5747)) ([466a14d](https://github.com/aws-amplify/amplify-js/commit/466a14d958a07519d5a59cf330771f744c8db8f6)), closes [#5397](https://github.com/aws-amplify/amplify-js/issues/5397)





## [4.2.3](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.2.2...amazon-cognito-identity-js@4.2.3) (2020-04-30)


### Bug Fixes

* update declaration for CognitoUserPool.signup and add the clientMetadata parameter. ([#5005](https://github.com/aws-amplify/amplify-js/issues/5005)) ([35e9e0d](https://github.com/aws-amplify/amplify-js/commit/35e9e0d89b35a5738481b2e2a6b0d6d0d0bf54fb))
* **amazon-cognito-identity-js:** Added client metadata so signup ([#5542](https://github.com/aws-amplify/amplify-js/issues/5542)) ([7bfcb25](https://github.com/aws-amplify/amplify-js/commit/7bfcb2520e90ce3589e37a57315ab042fa847878)), closes [#5541](https://github.com/aws-amplify/amplify-js/issues/5541)





## [4.2.2](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.2.1...amazon-cognito-identity-js@4.2.2) (2020-04-24)


### Bug Fixes

* **auth:** refresh user after updating attributes ([bfc5f9f](https://github.com/aws-amplify/amplify-js/commit/bfc5f9fb312510d8f8202411e9e367b6eadab2d7))





## [4.2.1](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.2.0...amazon-cognito-identity-js@4.2.1) (2020-04-07)

**Note:** Version bump only for package amazon-cognito-identity-js





# [4.2.0](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@4.1.0...amazon-cognito-identity-js@4.2.0) (2020-04-02)


### Features

* **@aws-amplify/ui-components:** User agent tracking for UI component packages ([#4804](https://github.com/aws-amplify/amplify-js/issues/4804)) ([15a0a2f](https://github.com/aws-amplify/amplify-js/commit/15a0a2fadeb96543721a6733faeb509efc26e1e2))





# [4.1.0](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@3.2.7...amazon-cognito-identity-js@4.1.0) (2020-03-31)

### Bug Fixes

- **amazon-cognito-identity-js:** linting config ([#4097](https://github.com/aws-amplify/amplify-js/issues/4097)) ([7674f96](https://github.com/aws-amplify/amplify-js/commit/7674f96f8a99bcc7b73ee4eb1c2a84db7de28ae3))
- **amazon-cognito-identity-js:** linting config ([#4097](https://github.com/aws-amplify/amplify-js/issues/4097)) ([173baf5](https://github.com/aws-amplify/amplify-js/commit/173baf5bd14c0e52e61e35ea44b8d3dc4c703c4c))

### Features

- **@aws-amplify/core:** [Delivers [#168673137](https://github.com/aws-amplify/amplify-js/issues/168673137)] Migrate core category to aws sdk V3 ([#4077](https://github.com/aws-amplify/amplify-js/issues/4077)) ([beb73a4](https://github.com/aws-amplify/amplify-js/commit/beb73a4b1c051654750f5bdc3b20cde3a3aba37d))

### Reverts

- Revert "Publish" ([1319d31](https://github.com/aws-amplify/amplify-js/commit/1319d319b69717e76660fbfa6f1a845195c6d635))

## [3.2.7](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@3.2.6...amazon-cognito-identity-js@3.2.7) (2020-03-30)

**Note:** Version bump only for package amazon-cognito-identity-js

## [3.2.6](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@3.2.5...amazon-cognito-identity-js@3.2.6) (2020-03-25)

**Note:** Version bump only for package amazon-cognito-identity-js

## [3.2.5](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@3.2.4...amazon-cognito-identity-js@3.2.5) (2020-02-28)

**Note:** Version bump only for package amazon-cognito-identity-js

## [3.2.4](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@3.2.2...amazon-cognito-identity-js@3.2.4) (2020-02-07)

**Note:** Version bump only for package amazon-cognito-identity-js

## [3.2.2](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@3.2.1...amazon-cognito-identity-js@3.2.2) (2020-01-10)

### Bug Fixes

- **amazon-cognito-identity-js:** Local & CI tests ([#4616](https://github.com/aws-amplify/amplify-js/issues/4616)) ([bc8ae26](https://github.com/aws-amplify/amplify-js/commit/bc8ae262040d7961a28513a25013c2d306908874))

## [3.2.1](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@3.2.0...amazon-cognito-identity-js@3.2.1) (2019-12-18)

**Note:** Version bump only for package amazon-cognito-identity-js

# [3.2.0](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@3.1.3...amazon-cognito-identity-js@3.2.0) (2019-10-29)

### Features

- **@aws-amplify/auth:** clientMetadata ([#4149](https://github.com/aws-amplify/amplify-js/issues/4149)) ([ac34816](https://github.com/aws-amplify/amplify-js/commit/ac34816df326331cfe04474fdf35790c52f4a1d3))

## [3.1.3](https://github.com/aws-amplify/amplify-js/compare/amazon-cognito-identity-js@3.1.2...amazon-cognito-identity-js@3.1.3) (2019-10-23)

**Note:** Version bump only for package amazon-cognito-identity-js

## [3.1.2](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.1.0...amazon-cognito-identity-js@3.1.2) (2019-10-10)

**Note:** Version bump only for package amazon-cognito-identity-js

# [3.1.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.15...amazon-cognito-identity-js@3.1.0) (2019-10-10)

### Bug Fixes

- **amazon-cognito-identity-js:** linting config ([#4097](https://github.com/aws/aws-amplify/issues/4097)) ([82b1dd8](https://github.com/aws/aws-amplify/commit/82b1dd8acc9b1dc165707945d585ce282fce60ba))

### Features

- Added Prettier formatting ([4dfd9aa](https://github.com/aws/aws-amplify/commit/4dfd9aa9ab900307c9d17c68448a6ca4aa08fd5a))

## [3.0.15](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.14...amazon-cognito-identity-js@3.0.15) (2019-07-30)

**Note:** Version bump only for package amazon-cognito-identity-js

## [3.0.14](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.13...amazon-cognito-identity-js@3.0.14) (2019-07-18)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.13"></a>

## [3.0.13](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.13-unstable.0...amazon-cognito-identity-js@3.0.13) (2019-06-17)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.13-unstable.0"></a>

## [3.0.13-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.12...amazon-cognito-identity-js@3.0.13-unstable.0) (2019-05-28)

### Bug Fixes

- **@amazon-cognito-identity-js:** Adds sendMFASelectionAnswer to types ([6c32ef3](https://github.com/aws/aws-amplify/commit/6c32ef3))

<a name="3.0.12"></a>

## [3.0.12](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.12-unstable.3...amazon-cognito-identity-js@3.0.12) (2019-05-06)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.12-unstable.3"></a>

## [3.0.12-unstable.3](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.12-unstable.2...amazon-cognito-identity-js@3.0.12-unstable.3) (2019-04-26)

### Features

- **@aws-amplify/amazon-cognito-identity-js:** for signUp, returns CodeDeliveryDetails from response ([7728e11](https://github.com/aws/aws-amplify/commit/7728e11))

<a name="3.0.12-unstable.2"></a>

## [3.0.12-unstable.2](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.12-unstable.1...amazon-cognito-identity-js@3.0.12-unstable.2) (2019-04-16)

### Bug Fixes

- **@aws-amplify/auth:** throw error when passing empty object to storage or cookieStorage in configuration ([816a827](https://github.com/aws/aws-amplify/commit/816a827))

<a name="3.0.12-unstable.1"></a>

## [3.0.12-unstable.1](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.12-unstable.0...amazon-cognito-identity-js@3.0.12-unstable.1) (2019-04-12)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.12-unstable.0"></a>

## [3.0.12-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.11...amazon-cognito-identity-js@3.0.12-unstable.0) (2019-04-12)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.11"></a>

## [3.0.11](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.11-unstable.0...amazon-cognito-identity-js@3.0.11) (2019-04-09)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.11-unstable.0"></a>

## [3.0.11-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.10...amazon-cognito-identity-js@3.0.11-unstable.0) (2019-04-07)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.10"></a>

## [3.0.10](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.10-unstable.0...amazon-cognito-identity-js@3.0.10) (2019-03-28)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.10-unstable.0"></a>

## [3.0.10-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.9...amazon-cognito-identity-js@3.0.10-unstable.0) (2019-03-18)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.9"></a>

## [3.0.9](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.9-unstable.0...amazon-cognito-identity-js@3.0.9) (2019-03-06)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.9-unstable.0"></a>

## [3.0.9-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.8...amazon-cognito-identity-js@3.0.9-unstable.0) (2019-03-04)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.8"></a>

## [3.0.8](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.8-unstable.4...amazon-cognito-identity-js@3.0.8) (2019-03-04)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.8-unstable.4"></a>

## [3.0.8-unstable.4](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.8-unstable.3...amazon-cognito-identity-js@3.0.8-unstable.4) (2019-03-04)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.8-unstable.3"></a>

## [3.0.8-unstable.3](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.8-unstable.2...amazon-cognito-identity-js@3.0.8-unstable.3) (2019-03-01)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.8-unstable.2"></a>

## [3.0.8-unstable.2](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.8-unstable.1...amazon-cognito-identity-js@3.0.8-unstable.2) (2019-02-27)

### Bug Fixes

- **build:** Prevent tree-shaking of crypto-js/lib-typedarrays ([#2718](https://github.com/aws/aws-amplify/issues/2718)) ([3134a64](https://github.com/aws/aws-amplify/commit/3134a64)), closes [#1181](https://github.com/aws/aws-amplify/issues/1181)

<a name="3.0.8-unstable.1"></a>

## [3.0.8-unstable.1](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.8-unstable.0...amazon-cognito-identity-js@3.0.8-unstable.1) (2019-01-21)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.8-unstable.0"></a>

## [3.0.8-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.7...amazon-cognito-identity-js@3.0.8-unstable.0) (2019-01-18)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.7"></a>

## [3.0.7](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.6...amazon-cognito-identity-js@3.0.7) (2019-01-10)

### Bug Fixes

- **amazon-cognito-identity-js:** return error instead of undefined ([19c3c4e](https://github.com/aws/aws-amplify/commit/19c3c4e))
- **amazon-cognito-identity-js:** Update Android Gradle Config ([a08f100](https://github.com/aws/aws-amplify/commit/a08f100))

<a name="3.0.6"></a>

## [3.0.6](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.6-unstable.2...amazon-cognito-identity-js@3.0.6) (2018-12-13)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.6-unstable.2"></a>

## [3.0.6-unstable.2](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.6-unstable.1...amazon-cognito-identity-js@3.0.6-unstable.2) (2018-12-13)

### Features

- **@aws-amplify/auth:** add the option to pass validation data when signing in ([13093e9](https://github.com/aws/aws-amplify/commit/13093e9))

<a name="3.0.6-unstable.1"></a>

## [3.0.6-unstable.1](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.6-unstable.0...amazon-cognito-identity-js@3.0.6-unstable.1) (2018-12-13)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.6-unstable.0"></a>

## [3.0.6-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.5...amazon-cognito-identity-js@3.0.6-unstable.0) (2018-12-07)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.5"></a>

## [3.0.5](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.4...amazon-cognito-identity-js@3.0.5) (2018-12-07)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.5-unstable.0"></a>

## [3.0.5-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.4...amazon-cognito-identity-js@3.0.5-unstable.0) (2018-12-07)

### Features

- **amazon-cognito-identity-js:** cache the user data ([f4dd225](https://github.com/aws/aws-amplify/commit/f4dd225))

<a name="3.0.4"></a>

## [3.0.4](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.4-unstable.5...amazon-cognito-identity-js@3.0.4) (2018-12-03)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.4-unstable.5"></a>

## [3.0.4-unstable.5](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.4-unstable.4...amazon-cognito-identity-js@3.0.4-unstable.5) (2018-11-19)

### Bug Fixes

- **amazon-cognito-identity-js:** Added missing type declarations for setting MFA preferences and token payloads ([080630d](https://github.com/aws/aws-amplify/commit/080630d))

<a name="3.0.4-unstable.4"></a>

## [3.0.4-unstable.4](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.4-unstable.3...amazon-cognito-identity-js@3.0.4-unstable.4) (2018-11-19)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.4-unstable.3"></a>

## [3.0.4-unstable.3](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.4-unstable.2...amazon-cognito-identity-js@3.0.4-unstable.3) (2018-11-17)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.4-unstable.2"></a>

## [3.0.4-unstable.2](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.4-unstable.1...amazon-cognito-identity-js@3.0.4-unstable.2) (2018-11-16)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.4-unstable.1"></a>

## [3.0.4-unstable.1](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.4-unstable.0...amazon-cognito-identity-js@3.0.4-unstable.1) (2018-11-16)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.4-unstable.0"></a>

## [3.0.4-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.3...amazon-cognito-identity-js@3.0.4-unstable.0) (2018-11-13)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.3"></a>

## [3.0.3](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.3-unstable.0...amazon-cognito-identity-js@3.0.3) (2018-10-17)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.3-unstable.0"></a>

## [3.0.3-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.2-unstable.0...amazon-cognito-identity-js@3.0.3-unstable.0) (2018-10-05)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.2"></a>

## [3.0.2](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@3.0.2-unstable.0...amazon-cognito-identity-js@3.0.2) (2018-10-04)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.2-unstable.0"></a>

## [3.0.2-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.31-unstable.2...amazon-cognito-identity-js@3.0.2-unstable.0) (2018-10-03)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="3.0.1"></a>

## [3.0.1](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.31-unstable.2...amazon-cognito-identity-js@3.0.1) (2018-10-03)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.31-unstable.2"></a>

## [2.0.31-unstable.2](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.31-unstable.1...amazon-cognito-identity-js@2.0.31-unstable.2) (2018-09-27)

### Bug Fixes

- **amazon-cognito-identity-js:** replace crypto-browserify with crypto-js ([4d2409a](https://github.com/aws/aws-amplify/commit/4d2409a))

<a name="2.0.31-unstable.1"></a>

## [2.0.31-unstable.1](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.31-unstable.0...amazon-cognito-identity-js@2.0.31-unstable.1) (2018-09-27)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.31-unstable.0"></a>

## [2.0.31-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.30...amazon-cognito-identity-js@2.0.31-unstable.0) (2018-09-27)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.30"></a>

## [2.0.30](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.30-unstable.9...amazon-cognito-identity-js@2.0.30) (2018-09-27)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.30-unstable.9"></a>

## [2.0.30-unstable.9](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.30-unstable.8...amazon-cognito-identity-js@2.0.30-unstable.9) (2018-09-26)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.30-unstable.8"></a>

## [2.0.30-unstable.8](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.30-unstable.7...amazon-cognito-identity-js@2.0.30-unstable.8) (2018-09-26)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.30-unstable.7"></a>

## [2.0.30-unstable.7](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.30-unstable.6...amazon-cognito-identity-js@2.0.30-unstable.7) (2018-09-26)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.30-unstable.6"></a>

## [2.0.30-unstable.6](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.30-unstable.4...amazon-cognito-identity-js@2.0.30-unstable.6) (2018-09-26)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.30-unstable.5"></a>

## [2.0.30-unstable.5](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.30-unstable.4...amazon-cognito-identity-js@2.0.30-unstable.5) (2018-09-25)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.30-unstable.4"></a>

## [2.0.30-unstable.4](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.30-unstable.3...amazon-cognito-identity-js@2.0.30-unstable.4) (2018-09-25)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.30-unstable.3"></a>

## [2.0.30-unstable.3](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.30-unstable.2...amazon-cognito-identity-js@2.0.30-unstable.3) (2018-09-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.30-unstable.2"></a>

## [2.0.30-unstable.2](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.30-unstable.1...amazon-cognito-identity-js@2.0.30-unstable.2) (2018-09-22)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.30-unstable.1"></a>

## [2.0.30-unstable.1](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.30-unstable.0...amazon-cognito-identity-js@2.0.30-unstable.1) (2018-09-22)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.30-unstable.0"></a>

## [2.0.30-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.29...amazon-cognito-identity-js@2.0.30-unstable.0) (2018-09-22)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.29"></a>

## [2.0.29](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.29-unstable.0...amazon-cognito-identity-js@2.0.29) (2018-09-21)

### Bug Fixes

- **amazon-cognito-identity-js:** clean clockDrift item when signing out ([f07d800](https://github.com/aws/aws-amplify/commit/f07d800))

<a name="2.0.29-unstable.0"></a>

## [2.0.29-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.28-unstable.3...amazon-cognito-identity-js@2.0.29-unstable.0) (2018-09-21)

### Bug Fixes

- bumping version for deploying on unstable tag ([#1706](https://github.com/aws/aws-amplify/issues/1706)) ([b5d6468](https://github.com/aws/aws-amplify/commit/b5d6468))

<a name="2.0.28"></a>

## [2.0.28](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.27...amazon-cognito-identity-js@2.0.28) (2018-09-21)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.28-unstable.3"></a>

## [2.0.28-unstable.3](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.28-unstable.2...amazon-cognito-identity-js@2.0.28-unstable.3) (2018-09-20)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.28-unstable.2"></a>

## [2.0.28-unstable.2](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.28-unstable.1...amazon-cognito-identity-js@2.0.28-unstable.2) (2018-09-20)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.28-unstable.1"></a>

## [2.0.28-unstable.1](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.28-unstable.0...amazon-cognito-identity-js@2.0.28-unstable.1) (2018-09-17)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.28-unstable.0"></a>

## [2.0.28-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.27...amazon-cognito-identity-js@2.0.28-unstable.0) (2018-09-17)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.27"></a>

## [2.0.27](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.26...amazon-cognito-identity-js@2.0.27) (2018-09-17)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.26"></a>

## [2.0.26](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.25...amazon-cognito-identity-js@2.0.26) (2018-09-12)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.25"></a>

## [2.0.25](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.25-unstable.0...amazon-cognito-identity-js@2.0.25) (2018-09-09)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.25-unstable.0"></a>

## [2.0.25-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.24...amazon-cognito-identity-js@2.0.25-unstable.0) (2018-09-09)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.24"></a>

## [2.0.24](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.24-unstable.11...amazon-cognito-identity-js@2.0.24) (2018-09-09)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.24-unstable.11"></a>

## [2.0.24-unstable.11](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.24-unstable.10...amazon-cognito-identity-js@2.0.24-unstable.11) (2018-09-08)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.24-unstable.10"></a>

## [2.0.24-unstable.10](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.24-unstable.9...amazon-cognito-identity-js@2.0.24-unstable.10) (2018-09-07)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.24-unstable.9"></a>

## [2.0.24-unstable.9](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.24-unstable.8...amazon-cognito-identity-js@2.0.24-unstable.9) (2018-09-07)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.24-unstable.8"></a>

## [2.0.24-unstable.8](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.24-unstable.7...amazon-cognito-identity-js@2.0.24-unstable.8) (2018-09-07)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.24-unstable.7"></a>

## [2.0.24-unstable.7](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.24-unstable.6...amazon-cognito-identity-js@2.0.24-unstable.7) (2018-09-06)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.24-unstable.6"></a>

## [2.0.24-unstable.6](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.24-unstable.5...amazon-cognito-identity-js@2.0.24-unstable.6) (2018-09-06)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.24-unstable.5"></a>

## [2.0.24-unstable.5](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.24-unstable.4...amazon-cognito-identity-js@2.0.24-unstable.5) (2018-09-05)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.24-unstable.4"></a>

## [2.0.24-unstable.4](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.24-unstable.3...amazon-cognito-identity-js@2.0.24-unstable.4) (2018-09-05)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.24-unstable.3"></a>

## [2.0.24-unstable.3](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.23...amazon-cognito-identity-js@2.0.24-unstable.3) (2018-08-31)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.24-unstable.2"></a>

## [2.0.24-unstable.2](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.23...amazon-cognito-identity-js@2.0.24-unstable.2) (2018-08-30)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.24-unstable.1"></a>

## [2.0.24-unstable.1](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.23...amazon-cognito-identity-js@2.0.24-unstable.1) (2018-08-30)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.23"></a>

## [2.0.23](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.26...amazon-cognito-identity-js@2.0.23) (2018-08-28)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.26"></a>

## [2.0.22-unstable.26](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.25...amazon-cognito-identity-js@2.0.22-unstable.26) (2018-08-28)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.25"></a>

## [2.0.22-unstable.25](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.24...amazon-cognito-identity-js@2.0.22-unstable.25) (2018-08-27)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.24"></a>

## [2.0.22-unstable.24](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.23...amazon-cognito-identity-js@2.0.22-unstable.24) (2018-08-27)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.23"></a>

## [2.0.22-unstable.23](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.21...amazon-cognito-identity-js@2.0.22-unstable.23) (2018-08-27)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.22"></a>

## [2.0.22-unstable.22](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.21...amazon-cognito-identity-js@2.0.22-unstable.22) (2018-08-25)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.21"></a>

## [2.0.22-unstable.21](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.20...amazon-cognito-identity-js@2.0.22-unstable.21) (2018-08-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.20"></a>

## [2.0.22-unstable.20](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.19...amazon-cognito-identity-js@2.0.22-unstable.20) (2018-08-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.19"></a>

## [2.0.22-unstable.19](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.17...amazon-cognito-identity-js@2.0.22-unstable.19) (2018-08-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.18"></a>

## [2.0.22-unstable.18](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.17...amazon-cognito-identity-js@2.0.22-unstable.18) (2018-08-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.17"></a>

## [2.0.22-unstable.17](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.15...amazon-cognito-identity-js@2.0.22-unstable.17) (2018-08-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.16"></a>

## [2.0.22-unstable.16](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.15...amazon-cognito-identity-js@2.0.22-unstable.16) (2018-08-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.15"></a>

## [2.0.22-unstable.15](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.14...amazon-cognito-identity-js@2.0.22-unstable.15) (2018-08-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.14"></a>

## [2.0.22-unstable.14](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.13...amazon-cognito-identity-js@2.0.22-unstable.14) (2018-08-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.13"></a>

## [2.0.22-unstable.13](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.11...amazon-cognito-identity-js@2.0.22-unstable.13) (2018-08-23)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.12"></a>

## [2.0.22-unstable.12](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.11...amazon-cognito-identity-js@2.0.22-unstable.12) (2018-08-23)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.11"></a>

## [2.0.22-unstable.11](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.10...amazon-cognito-identity-js@2.0.22-unstable.11) (2018-08-23)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.10"></a>

## [2.0.22-unstable.10](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.9...amazon-cognito-identity-js@2.0.22-unstable.10) (2018-08-23)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.9"></a>

## [2.0.22-unstable.9](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.8...amazon-cognito-identity-js@2.0.22-unstable.9) (2018-08-23)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.8"></a>

## [2.0.22-unstable.8](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.7...amazon-cognito-identity-js@2.0.22-unstable.8) (2018-08-22)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.7"></a>

## [2.0.22-unstable.7](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.6...amazon-cognito-identity-js@2.0.22-unstable.7) (2018-08-22)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.6"></a>

## [2.0.22-unstable.6](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.5...amazon-cognito-identity-js@2.0.22-unstable.6) (2018-08-21)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.5"></a>

## [2.0.22-unstable.5](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.4...amazon-cognito-identity-js@2.0.22-unstable.5) (2018-08-21)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.4"></a>

## [2.0.22-unstable.4](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.3...amazon-cognito-identity-js@2.0.22-unstable.4) (2018-08-20)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.3"></a>

## [2.0.22-unstable.3](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.2...amazon-cognito-identity-js@2.0.22-unstable.3) (2018-08-19)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.2"></a>

## [2.0.22-unstable.2](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.1...amazon-cognito-identity-js@2.0.22-unstable.2) (2018-08-18)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.1"></a>

## [2.0.22-unstable.1](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.22-unstable.0...amazon-cognito-identity-js@2.0.22-unstable.1) (2018-08-16)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.22-unstable.0"></a>

## [2.0.22-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.21...amazon-cognito-identity-js@2.0.22-unstable.0) (2018-08-15)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.21"></a>

## [2.0.21](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.21-unstable.5...amazon-cognito-identity-js@2.0.21) (2018-08-14)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.21-unstable.5"></a>

## [2.0.21-unstable.5](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.21-unstable.4...amazon-cognito-identity-js@2.0.21-unstable.5) (2018-08-14)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.21-unstable.4"></a>

## [2.0.21-unstable.4](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.21-unstable.3...amazon-cognito-identity-js@2.0.21-unstable.4) (2018-08-13)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.21-unstable.3"></a>

## [2.0.21-unstable.3](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.21-unstable.2...amazon-cognito-identity-js@2.0.21-unstable.3) (2018-08-13)

### Bug Fixes

- **amazon-cognito-identity-js:** throw network error if in the offline ([d5808f1](https://github.com/aws/aws-amplify/commit/d5808f1))

<a name="2.0.21-unstable.2"></a>

## [2.0.21-unstable.2](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.21-unstable.1...amazon-cognito-identity-js@2.0.21-unstable.2) (2018-08-09)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.21-unstable.1"></a>

## [2.0.21-unstable.1](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.21-unstable.0...amazon-cognito-identity-js@2.0.21-unstable.1) (2018-08-07)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.21-unstable.0"></a>

## [2.0.21-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.20...amazon-cognito-identity-js@2.0.21-unstable.0) (2018-08-07)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.20"></a>

## [2.0.20](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.20-unstable.7...amazon-cognito-identity-js@2.0.20) (2018-08-06)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.20-unstable.7"></a>

## [2.0.20-unstable.7](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.20-unstable.6...amazon-cognito-identity-js@2.0.20-unstable.7) (2018-08-06)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.20-unstable.6"></a>

## [2.0.20-unstable.6](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.20-unstable.5...amazon-cognito-identity-js@2.0.20-unstable.6) (2018-08-06)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.20-unstable.5"></a>

## [2.0.20-unstable.5](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.20-unstable.3...amazon-cognito-identity-js@2.0.20-unstable.5) (2018-08-06)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.20-unstable.3"></a>

## [2.0.20-unstable.3](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.20-unstable.2...amazon-cognito-identity-js@2.0.20-unstable.3) (2018-07-31)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.20-unstable.2"></a>

## [2.0.20-unstable.2](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.20-unstable.1...amazon-cognito-identity-js@2.0.20-unstable.2) (2018-07-31)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.20-unstable.1"></a>

## [2.0.20-unstable.1](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.20-unstable.0...amazon-cognito-identity-js@2.0.20-unstable.1) (2018-07-30)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.20-unstable.0"></a>

## [2.0.20-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.19...amazon-cognito-identity-js@2.0.20-unstable.0) (2018-07-30)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.19"></a>

## [2.0.19](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.19-unstable.1...amazon-cognito-identity-js@2.0.19) (2018-07-28)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.19-unstable.1"></a>

## [2.0.19-unstable.1](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.18-unstable.0...amazon-cognito-identity-js@2.0.19-unstable.1) (2018-07-28)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.18-unstable.0"></a>

## [2.0.18-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.17-unstable.14...amazon-cognito-identity-js@2.0.18-unstable.0) (2018-07-27)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.17-unstable.15"></a>

## [2.0.17-unstable.15](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.17-unstable.14...amazon-cognito-identity-js@2.0.17-unstable.15) (2018-07-27)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.17-unstable.14"></a>

## [2.0.17-unstable.14](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.17-unstable.13...amazon-cognito-identity-js@2.0.17-unstable.14) (2018-07-27)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.17-unstable.13"></a>

## [2.0.17-unstable.13](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.17-unstable.12...amazon-cognito-identity-js@2.0.17-unstable.13) (2018-07-26)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.17-unstable.12"></a>

## [2.0.17-unstable.12](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.17-unstable.11...amazon-cognito-identity-js@2.0.17-unstable.12) (2018-07-26)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.17-unstable.11"></a>

## [2.0.17-unstable.11](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.17-unstable.10...amazon-cognito-identity-js@2.0.17-unstable.11) (2018-07-26)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.17-unstable.10"></a>

## [2.0.17-unstable.10](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.17-unstable.9...amazon-cognito-identity-js@2.0.17-unstable.10) (2018-07-26)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.17-unstable.9"></a>

## [2.0.17-unstable.9](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.17-unstable.8...amazon-cognito-identity-js@2.0.17-unstable.9) (2018-07-25)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.17-unstable.8"></a>

## [2.0.17-unstable.8](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.17-unstable.7...amazon-cognito-identity-js@2.0.17-unstable.8) (2018-07-25)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.17-unstable.7"></a>

## [2.0.17-unstable.7](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.17-unstable.6...amazon-cognito-identity-js@2.0.17-unstable.7) (2018-07-25)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.17-unstable.6"></a>

## [2.0.17-unstable.6](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.17-unstable.5...amazon-cognito-identity-js@2.0.17-unstable.6) (2018-07-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.17-unstable.5"></a>

## [2.0.17-unstable.5](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.17-unstable.4...amazon-cognito-identity-js@2.0.17-unstable.5) (2018-07-23)

### Bug Fixes

- **amazon-cognito-identity-js:** add mfa setting type and fix setUserMfaPreference method ([0f8f9aa](https://github.com/aws/aws-amplify/commit/0f8f9aa))

<a name="2.0.17-unstable.4"></a>

## [2.0.17-unstable.4](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.17-unstable.3...amazon-cognito-identity-js@2.0.17-unstable.4) (2018-07-23)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.17-unstable.3"></a>

## [2.0.17-unstable.3](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.17-unstable.2...amazon-cognito-identity-js@2.0.17-unstable.3) (2018-07-23)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.17-unstable.2"></a>

## [2.0.17-unstable.2](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.17-unstable.1...amazon-cognito-identity-js@2.0.17-unstable.2) (2018-07-20)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.17-unstable.1"></a>

## [2.0.17-unstable.1](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.17-unstable.0...amazon-cognito-identity-js@2.0.17-unstable.1) (2018-07-20)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.17-unstable.0"></a>

## [2.0.17-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.16...amazon-cognito-identity-js@2.0.17-unstable.0) (2018-07-20)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.16"></a>

## [2.0.16](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.16-unstable.1...amazon-cognito-identity-js@2.0.16) (2018-07-19)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.16-unstable.1"></a>

## [2.0.16-unstable.1](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.15...amazon-cognito-identity-js@2.0.16-unstable.1) (2018-07-19)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.16-unstable.0"></a>

## [2.0.16-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.15...amazon-cognito-identity-js@2.0.16-unstable.0) (2018-07-19)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.15"></a>

## [2.0.15](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.15-unstable.4...amazon-cognito-identity-js@2.0.15) (2018-07-18)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.15-unstable.4"></a>

## [2.0.15-unstable.4](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.15-unstable.3...amazon-cognito-identity-js@2.0.15-unstable.4) (2018-07-18)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.15-unstable.3"></a>

## [2.0.15-unstable.3](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.15-unstable.2...amazon-cognito-identity-js@2.0.15-unstable.3) (2018-07-18)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.15-unstable.2"></a>

## [2.0.15-unstable.2](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.15-unstable.1...amazon-cognito-identity-js@2.0.15-unstable.2) (2018-07-18)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.15-unstable.1"></a>

## [2.0.15-unstable.1](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.15...amazon-cognito-identity-js@2.0.15-unstable.1) (2018-07-18)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.15-unstable.0"></a>

## [2.0.15-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.15...amazon-cognito-identity-js@2.0.15-unstable.0) (2018-07-18)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.14-unstable.1"></a>

## [2.0.14-unstable.1](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.14-unstable.0...amazon-cognito-identity-js@2.0.14-unstable.1) (2018-07-03)

### Bug Fixes

- **amazon-cognito-identity-js:** attach raw message for unknown errors ([203d50b](https://github.com/aws/aws-amplify/commit/203d50b))
- **amazon-cognito-identity-js:** attach raw message for unknown errors ([69be072](https://github.com/aws/aws-amplify/commit/69be072))

<a name="2.0.14-unstable.0"></a>

## [2.0.14-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.13...amazon-cognito-identity-js@2.0.14-unstable.0) (2018-07-02)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.13"></a>

## [2.0.13](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.13-unstable.5...amazon-cognito-identity-js@2.0.13) (2018-06-29)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.13-unstable.5"></a>

## [2.0.13-unstable.5](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.13-unstable.4...amazon-cognito-identity-js@2.0.13-unstable.5) (2018-06-29)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.13-unstable.4"></a>

## [2.0.13-unstable.4](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.13-unstable.3...amazon-cognito-identity-js@2.0.13-unstable.4) (2018-06-29)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.13-unstable.3"></a>

## [2.0.13-unstable.3](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.13-unstable.2...amazon-cognito-identity-js@2.0.13-unstable.3) (2018-06-28)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.13-unstable.2"></a>

## [2.0.13-unstable.2](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.13-unstable.1...amazon-cognito-identity-js@2.0.13-unstable.2) (2018-06-27)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.13-unstable.1"></a>

## [2.0.13-unstable.1](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.13-unstable.0...amazon-cognito-identity-js@2.0.13-unstable.1) (2018-06-27)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.13-unstable.0"></a>

## [2.0.13-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.12-unstable.2...amazon-cognito-identity-js@2.0.13-unstable.0) (2018-06-27)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.12"></a>

## [2.0.12](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.12-unstable.2...amazon-cognito-identity-js@2.0.12) (2018-06-27)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.12-unstable.2"></a>

## [2.0.12-unstable.2](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.12-unstable.1...amazon-cognito-identity-js@2.0.12-unstable.2) (2018-06-26)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.12-unstable.1"></a>

## [2.0.12-unstable.1](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.12-unstable.0...amazon-cognito-identity-js@2.0.12-unstable.1) (2018-06-22)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.12-unstable.0"></a>

## [2.0.12-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.11...amazon-cognito-identity-js@2.0.12-unstable.0) (2018-06-22)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.11"></a>

## [2.0.11](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.10-unstable.3...amazon-cognito-identity-js@2.0.11) (2018-06-21)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.10"></a>

## [2.0.10](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.49...amazon-cognito-identity-js@2.0.10) (2018-06-20)

<a name="2.0.10-unstable.3"></a>

## [2.0.10-unstable.3](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.10-unstable.2...amazon-cognito-identity-js@2.0.10-unstable.3) (2018-06-21)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.10-unstable.2"></a>

## [2.0.10-unstable.2](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.10-unstable.1...amazon-cognito-identity-js@2.0.10-unstable.2) (2018-06-21)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.10-unstable.1"></a>

## [2.0.10-unstable.1](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.10-unstable.0...amazon-cognito-identity-js@2.0.10-unstable.1) (2018-06-20)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.10-unstable.0"></a>

## [2.0.10-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.49...amazon-cognito-identity-js@2.0.10-unstable.0) (2018-06-20)

### Bug Fixes

- **pushnotification:** revert change in pr 952 ([257fc40](https://github.com/aws/aws-amplify/commit/257fc40))

<a name="2.0.9"></a>

## [2.0.9](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.35...amazon-cognito-identity-js@2.0.9) (2018-06-04)

### Bug Fixes

- **pushnotification:** revert change in pr 952 ([257fc40](https://github.com/aws/aws-amplify/commit/257fc40))

<a name="2.0.8"></a>

## [2.0.8](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7...amazon-cognito-identity-js@2.0.8) (2018-06-02)

<a name="2.0.7-unstable.49"></a>

## [2.0.7-unstable.49](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.48...amazon-cognito-identity-js@2.0.7-unstable.49) (2018-06-19)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.48"></a>

## [2.0.7-unstable.48](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.47...amazon-cognito-identity-js@2.0.7-unstable.48) (2018-06-18)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.47"></a>

## [2.0.7-unstable.47](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.46...amazon-cognito-identity-js@2.0.7-unstable.47) (2018-06-18)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.46"></a>

## [2.0.7-unstable.46](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.45...amazon-cognito-identity-js@2.0.7-unstable.46) (2018-06-16)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.45"></a>

## [2.0.7-unstable.45](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.44...amazon-cognito-identity-js@2.0.7-unstable.45) (2018-06-13)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.44"></a>

## [2.0.7-unstable.44](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.43...amazon-cognito-identity-js@2.0.7-unstable.44) (2018-06-13)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.43"></a>

## [2.0.7-unstable.43](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.42...amazon-cognito-identity-js@2.0.7-unstable.43) (2018-06-12)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.42"></a>

## [2.0.7-unstable.42](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.41...amazon-cognito-identity-js@2.0.7-unstable.42) (2018-06-11)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.41"></a>

## [2.0.7-unstable.41](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.40...amazon-cognito-identity-js@2.0.7-unstable.41) (2018-06-08)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.40"></a>

## [2.0.7-unstable.40](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.39...amazon-cognito-identity-js@2.0.7-unstable.40) (2018-06-08)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.39"></a>

## [2.0.7-unstable.39](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.38...amazon-cognito-identity-js@2.0.7-unstable.39) (2018-06-07)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.38"></a>

## [2.0.7-unstable.38](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.37...amazon-cognito-identity-js@2.0.7-unstable.38) (2018-06-06)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.37"></a>

## [2.0.7-unstable.37](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.36...amazon-cognito-identity-js@2.0.7-unstable.37) (2018-06-05)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.36"></a>

## [2.0.7-unstable.36](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.35...amazon-cognito-identity-js@2.0.7-unstable.36) (2018-06-04)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.35"></a>

## [2.0.7-unstable.35](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.34...amazon-cognito-identity-js@2.0.7-unstable.35) (2018-06-04)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7"></a>

## [2.0.7](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.32...amazon-cognito-identity-js@2.0.7) (2018-06-01)

<a name="2.0.7-unstable.34"></a>

## [2.0.7-unstable.34](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.33...amazon-cognito-identity-js@2.0.7-unstable.34) (2018-06-04)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.33"></a>

## [2.0.7-unstable.33](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.32...amazon-cognito-identity-js@2.0.7-unstable.33) (2018-06-02)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.32"></a>

## [2.0.7-unstable.32](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.31...amazon-cognito-identity-js@2.0.7-unstable.32) (2018-06-01)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.31"></a>

## [2.0.7-unstable.31](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.30...amazon-cognito-identity-js@2.0.7-unstable.31) (2018-06-01)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.30"></a>

## [2.0.7-unstable.30](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.29...amazon-cognito-identity-js@2.0.7-unstable.30) (2018-06-01)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.29"></a>

## [2.0.7-unstable.29](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.28...amazon-cognito-identity-js@2.0.7-unstable.29) (2018-05-31)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.28"></a>

## [2.0.7-unstable.28](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.23...amazon-cognito-identity-js@2.0.7-unstable.28) (2018-05-31)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.23"></a>

## [2.0.7-unstable.23](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.22...amazon-cognito-identity-js@2.0.7-unstable.23) (2018-05-31)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.22"></a>

## [2.0.7-unstable.22](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.21...amazon-cognito-identity-js@2.0.7-unstable.22) (2018-05-31)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.21"></a>

## [2.0.7-unstable.21](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.20...amazon-cognito-identity-js@2.0.7-unstable.21) (2018-05-30)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.20"></a>

## [2.0.7-unstable.20](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.19...amazon-cognito-identity-js@2.0.7-unstable.20) (2018-05-29)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.19"></a>

## [2.0.7-unstable.19](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.18...amazon-cognito-identity-js@2.0.7-unstable.19) (2018-05-29)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.18"></a>

## [2.0.7-unstable.18](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.17...amazon-cognito-identity-js@2.0.7-unstable.18) (2018-05-29)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.17"></a>

## [2.0.7-unstable.17](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.16...amazon-cognito-identity-js@2.0.7-unstable.17) (2018-05-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.16"></a>

## [2.0.7-unstable.16](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.15...amazon-cognito-identity-js@2.0.7-unstable.16) (2018-05-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.15"></a>

## [2.0.7-unstable.15](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.14...amazon-cognito-identity-js@2.0.7-unstable.15) (2018-05-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.14"></a>

## [2.0.7-unstable.14](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.13...amazon-cognito-identity-js@2.0.7-unstable.14) (2018-05-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.13"></a>

## [2.0.7-unstable.13](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.12...amazon-cognito-identity-js@2.0.7-unstable.13) (2018-05-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.12"></a>

## [2.0.7-unstable.12](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.11...amazon-cognito-identity-js@2.0.7-unstable.12) (2018-05-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.11"></a>

## [2.0.7-unstable.11](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.10...amazon-cognito-identity-js@2.0.7-unstable.11) (2018-05-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.10"></a>

## [2.0.7-unstable.10](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.6...amazon-cognito-identity-js@2.0.7-unstable.10) (2018-05-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.9"></a>

## [2.0.7-unstable.9](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.8...amazon-cognito-identity-js@2.0.7-unstable.9) (2018-05-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.8"></a>

## [2.0.7-unstable.8](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.7...amazon-cognito-identity-js@2.0.7-unstable.8) (2018-05-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.7"></a>

## [2.0.7-unstable.7](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.6...amazon-cognito-identity-js@2.0.7-unstable.7) (2018-05-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.6"></a>

## [2.0.7-unstable.6](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.5...amazon-cognito-identity-js@2.0.7-unstable.6) (2018-05-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.5"></a>

## [2.0.7-unstable.5](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.4...amazon-cognito-identity-js@2.0.7-unstable.5) (2018-05-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.4"></a>

## [2.0.7-unstable.4](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.3...amazon-cognito-identity-js@2.0.7-unstable.4) (2018-05-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.3"></a>

## [2.0.7-unstable.3](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.2...amazon-cognito-identity-js@2.0.7-unstable.3) (2018-05-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.2"></a>

## [2.0.7-unstable.2](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.1...amazon-cognito-identity-js@2.0.7-unstable.2) (2018-05-24)

**Note:** Version bump only for package amazon-cognito-identity-js

<a name="2.0.7-unstable.1"></a>

## [2.0.7-unstable.1](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.7-unstable.0...amazon-cognito-identity-js@2.0.7-unstable.1) (2018-05-24)

**Note:** Version bump only for package amazon-cognito-identity-js
<a name="2.0.7-unstable.0"></a>

## [2.0.7-unstable.0](https://github.com/aws/aws-amplify/compare/amazon-cognito-identity-js@2.0.6...amazon-cognito-identity-js@2.0.7-unstable.0) (2018-05-23)

**Note:** Version bump only for package amazon-cognito-identity-js
