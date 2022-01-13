### 20.3.5

- change init warning to only trigger if not using useSSR on react-i18next

### 20.3.4

- fix(types): only use readonly array of strings in API [1629](https://github.com/i18next/i18next/pull/1629)

### 20.3.3

- add transWrapTextNodes to types [1626](https://github.com/i18next/i18next/pull/1626)

### 20.3.2

- context can also be a number [1622](https://github.com/i18next/i18next/issues/1622)

### 20.3.1

- add 'ns' to the 'returnedObjectHandler' options [1619](https://github.com/i18next/i18next/pull/1619)
- disable warn 'accessing an object' when the 'returnedObjectHandler' is defined [1617](https://github.com/i18next/i18next/pull/1617)

### 20.3.0

- add simple toJSON function to fix uncontrolled serialization, fixes [1322](https://github.com/i18next/react-i18next/issues/1322)

### 20.2.4

- fix types for LanguageDetector detect function

### 20.2.3

- if detected lng is falsy, set it to empty array, to make sure at least the fallbackLng will be used

### 20.2.2

- fix plural equations for Kazakh [1608](https://github.com/i18next/i18next/pull/1608)

### 20.2.1

- fix lastIndex in regex when skipOnVariables is true

### 20.2.0

- add ignoreJSONStructure into the types
- stop recursive interpolation also for "{{variable}}" when skipOnVariables is true [1595](https://github.com/i18next/i18next/issues/1595)
- old browser fix for "includes" usage [1597](https://github.com/i18next/i18next/pull/1597)

### 20.1.0

- Add alwaysFormat into the types [1586](https://github.com/i18next/i18next/pull/1586)
- Add interpolation key name to format function [1571](https://github.com/i18next/i18next/pull/1571)

### 20.0.0

- add support to proper augment PluginOptions type [1583](https://github.com/i18next/i18next/pull/1583)
- introduce ignoreJSONStructure flag, to automatically lookup for a flat key if a nested key is not found an vice-versa [1584](https://github.com/i18next/i18next/pull/1584) (MAJOR: because of ignoreJSONStructure is true by default)

### 19.9.2

- try to fix another edge case issue [1570](https://github.com/i18next/i18next/issues/1570) introduces by fixing [1552](https://github.com/i18next/i18next/issues/1552)

### 19.9.1

- Fallback on singular defaultValue [1563](https://github.com/i18next/i18next/pull/1563)

### 19.9.0

- Improve updateMissing default plural behavior [1558](https://github.com/i18next/i18next/pull/1558)
- typescript: type definitions improvements for backend [1560](https://github.com/i18next/i18next/pull/1560)

### 19.8.10

- try to fix another edge case issue [1570](https://github.com/i18next/i18next/issues/1570) introduces by fixing [1552](https://github.com/i18next/i18next/issues/1552)

### 19.8.9

- warn if i18next gets initialized multiple times

### 19.8.8

- fix for cases when calling changeLanguage before finished to initialize [1552](https://github.com/i18next/i18next/issues/1552)

### 19.8.7

- use "Object.prototype.hasOwnProperty" instead of "object.hasOwnProperty", fixes [1542](https://github.com/i18next/i18next/issues/1542)

### 19.8.6

- regression fix because of last prototype pollution fix in v19.8.5

### 19.8.5

- fix potential prototype pollution when backend plugin resolves a malicious language value
- use fallbackLng as default lng

### 19.8.4

- update format function signature for TS [1520](https://github.com/i18next/i18next/pull/1480))

### 19.8.3

- fix prototype pollution with constructor

### 19.8.2

- allow nesting recursively with context (could theoretically generate infinite loop, prevented in [1480](https://github.com/i18next/i18next/pull/1480))

### 19.8.1

- fix "no languageDetector is used" log statement
- do not log "initialized" on cloned instances

### 19.8.0

- allow fallbackLng as function [1508](https://github.com/i18next/i18next/pull/1508)

### 19.7.0

- resource manipulation functions are now chainable

### 19.6.3

- plural rules for ht and iw

### 19.6.2

- fix interpolation with option skipOnVariables when there are multiple placeholders [1490](https://github.com/i18next/i18next/issues/1490)

### 19.6.1

- extend interpolation option skipOnVariables [1488](https://github.com/i18next/i18next/pull/1488)
- typescript: Change bindStore to bindI18nStore in ReactOptions type and update default values [1489](https://github.com/i18next/i18next/pull/1489)

### 19.6.0

- fix prototype pollution
- introduce new interpolation option skipOnVariables [1483](https://github.com/i18next/i18next/pull/1483)

### 19.5.6

- fix local usage of nsSeparator option

### 19.5.5

- fix: recursion when passing nesting to interpolated [1480](https://github.com/i18next/i18next/pull/1480)

### 19.5.4

- typescript fix: getDataByLanguage typings & test [1472](https://github.com/i18next/i18next/pull/1472)
- typescript fix: type declarion of exposed EventEmitter#off methods [1460](https://github.com/i18next/i18next/pull/1460)

### 19.5.3

- fix Macedonian plural formula [1476](https://github.com/i18next/i18next/pull/1476)

### 19.5.2

- fix nesting interpolation with prepended namespace, fixes #1474 [1475](https://github.com/i18next/i18next/pull/1475)

### 19.5.1

- getBestMatchFromCodes: use fallbackLng if nothing found, fixes #1470 [1471](https://github.com/i18next/i18next/pull/1471)

### 19.5.0

- language detectors can return an array of languages and let i18next figure out best match

- rename option whitelist to supportedLngs
- rename option nonExpicitWhitelist to nonExplicitSupportedLngs
- rename function languageUtils.isWhitelisted to languageUtils.isSupportedCode

This changes are made with temporal backwards compatiblity and will warn your for deprecated usage of old terms to give users and plugin providers some time to adapt their code base.

The temporal backwards compatiblity will be removed in a follow up major release.

Learn more about why this change was made [here](https://github.com/i18next/i18next/issues/1466).

### 19.4.5

- Add store events to typings [1451](https://github.com/i18next/i18next/pull/1451)

### 19.4.4

- typescript: Allow passing retry boolean to `ReadCallback` [1439](https://github.com/i18next/i18next/pull/1439)

### 19.4.3

- fix regression introduced in "support formatting in nesting" [1419](https://github.com/i18next/i18next/pull/1419)

### 19.4.2

- fix for deno [1428](https://github.com/i18next/i18next/pull/1428)

### 19.4.1

- add getLanguagePartFromCode as in language fallback resolution [1424](https://github.com/i18next/i18next/pull/1424)

### 19.4.0

- support formatting in nesting [1419](https://github.com/i18next/i18next/pull/1419)

### 19.3.4

- fix cloning of service.utils binding to clone [1415](https://github.com/i18next/i18next/pull/1415)

### 19.3.3

- backendConnector extend initial retry from 250 to 350

### 19.3.2

- fix the nested string options parsing introduced in v19.2.0 which broke having multiple options

### 19.3.1

- typescript: add `options.interpolation.nestingOptionsSeparator`

### 19.3.0

- Double fix for 1395 issue [1399](https://github.com/i18next/i18next/pull/1399)
- adds `options.interpolation.nestingOptionsSeparator: ','` to specify that separator

### 19.2.0

- Add ability to use commas in nested keys [1398](https://github.com/i18next/i18next/pull/1398)

### 19.1.0

- explict warning when no languageDetector is used and no lng is defined [1381](https://github.com/i18next/i18next/pull/1381)
- Add option to always format interpolated values [1385](https://github.com/i18next/i18next/pull/1385)
- pass all options to format function [992#issuecomment-577797162](https://github.com/i18next/i18next/issues/992#issuecomment-577797162)

### 19.0.3

- fixes retry interval in backend connector [1378](https://github.com/i18next/i18next/issues/1378)

### 19.0.2

- typescript: Type ResourceStore [1366](https://github.com/i18next/i18next/pull/1366)

### 19.0.1

- ignore non valid keys in saveMissing [1359](https://github.com/i18next/i18next/pull/1359)

### 19.0.0

- typescript: Typescript use `export default` for esm-first approach [1352](https://github.com/i18next/i18next/pull/1352)

### 18.0.1

- check loadedNamespace only once per lng-ns inside using `t` for better performance

### 18.0.0

- When calling `i18next.changeLanguage()` both `i18next.language` and `i18next.languages` will be set to the new language after calling `loadResources` -> means when accessing `t` function meanwhile you will get still the translations for the previous language instead of the fallback.

- **When is this breaking?** this does not break any current test - but if you depend on accessing i18next.language or i18next.dir during language change and expect the new language this will break your app.

- Reasoning: In react-i18next we get in a not ready state for loaded translations while we would prefer just waiting for the new language ready and trigger a rerender then - also a triggered rerender outside of the bound events would end in Suspense...

- How can I get the language i18next will be set to? `i18next.isLanguageChangingTo` is set to the language called

### 17.3.1

- typescript: Add missing `cleanCode` option to TypeScript def [1344](https://github.com/i18next/i18next/pull/1344)

### 17.3.0

- pass used language & namespace to postprocessor [1341](https://github.com/i18next/i18next/pull/1341)

### 17.2.0

- Support using ImmutableJS Records as the data model in interpolation [1339](https://github.com/i18next/i18next/pull/1339)

### 17.1.0

DX improvements:

- warning if accessing t before i18next was initialized or namespace loaded
- warning and cancelling save if saveMissing key before i18next was initialized or namespace loaded

Both are a clear sign you render your app / call t to early not waiting for the callbacks or Promise.resolve on i18next.init, i18next.loadNamespace or i18next.changeLanguage.

### 17.0.18

- Improve performance of EventEmitter.off [1333](https://github.com/i18next/i18next/pull/1333)

### 17.0.17

- fixes: missing nested key fails if no nested value found and defaultValue contains interpolation -> results in endless loop [1332](https://github.com/i18next/i18next/issues/1332)

### 17.0.16

- typescript: fix incorrect callback type for backend module read callback [1322](https://github.com/i18next/i18next/pull/1322)
- typescript: add getDataByLanguage into index.d.ts [1326](https://github.com/i18next/i18next/pull/1326)

### 17.0.15

- Fixed default value as string in IE [1325](https://github.com/i18next/i18next/pull/1325)

### 17.0.14

- typescript: Allow TFunction to receive 1-3 parameters [1317](https://github.com/i18next/i18next/pull/1317)

### 17.0.13

- fixes: Interpolation defaultVariables not recognized on t() [1314](https://github.com/i18next/i18next/issues/1314)

### 17.0.12

- remove unused Interpolator#init reset param (only used internally) [1313](https://github.com/i18next/i18next/pull/1313)
- Cope with null interpolation (unescaped case) [1310](https://github.com/i18next/i18next/pull/1310)

### 17.0.11

- fix issue with unset value in interpolation throwing exception
- typescript: Allow augmentation of TFunction to be able to add overloads [1308](https://github.com/i18next/i18next/pull/1308)

### 17.0.10

- Update Interpolator.js to use regexSafe for unescaped interpolation [1307](https://github.com/i18next/i18next/pull/1307)

### 17.0.9

- typescript: use() should accept a class or object [1301](https://github.com/i18next/i18next/pull/1301)

### 17.0.8

- typescript: Correct `use(module)` types [1296](https://github.com/i18next/i18next/pull/1296)

### 17.0.7

- typescript: Typescript imports [1291](https://github.com/i18next/i18next/pull/1291)
- Disabled default returnedObjectHandler [1288](https://github.com/i18next/i18next/pull/1288)

### 17.0.6

- support montenegrien "crn" plurals

### 17.0.4

- typescript: ResourceKey type should allow top level string value [1267](https://github.com/i18next/i18next/pull/1267)

### 17.0.3

- don't do named exports for umd

### 17.0.2

- typescript: Allow null as TResult [1263](https://github.com/i18next/i18next/pull/1263)
- bring back ./i18next.js and ./i18next.min.js -> used by wildcard unpkg users...<= bad idea doing so
- main export in package.json points to cjs dist

### 17.0.1

- adapt ./index.js to 17.0.0 export

### 17.0.0

- removes checking in build files (umd) into source code - for CDN usage use: [https://unpkg.com/i18next@16.0.0/dist/umd/i18next.js](https://unpkg.com/i18next@16.0.0/dist/umd/i18next.js)
- removes named exports in main file - avoids issues in mixed exports makes usage better in commonjs scenarios (node.js) - no strange `const i18next = require('i18next').default;`
- **impact** you can't no longer `import { changeLanguage } from 'i18next'; changeLanguage('de');` you will have to `import i18next from 'i18next'; i18next.changeLanguage('de');`
- **note** if can create a own file providing the named bound functions and use that instead, sample: [https://github.com/i18next/i18next/blob/v15.0.0/src/index.js#L5](https://github.com/i18next/i18next/blob/v15.0.0/src/index.js#L5)

### 16.0.0

- removes deprecated jsnext:main from package.json
- Bundle all entry points with rollup [1256](https://github.com/i18next/i18next/pull/1256)
- **note:** dist/es -> dist/esm, dist/commonjs -> dist/cjs (individual files -> one bundled file)

### 15.1.3

- typescript: Fix type error when init with locize plugin options [1248](https://github.com/i18next/i18next/pull/1248)

### 15.1.2

- typescript: types(ReactOptions): Add missing props to React Options interface [1247](https://github.com/i18next/i18next/pull/1247)

### 15.1.1

- typescript: Update BackendModule interface to allow null or undefined for the callback [1244](https://github.com/i18next/i18next/pull/1244)

### 15.1.0

- trigger a languageChanging event

### 15.0.9

- IE: <=IE10 fix (unable to call parent constructor) [1227](https://github.com/i18next/i18next/pull/1227)

### 15.0.8

- typescript: adding init function to 3rdParty module typings and enforcing type property [1223](https://github.com/i18next/i18next/pull/1223)

### 15.0.7

- typescript: Add useSuspense to ReactOptions, fix error throwing on test [1219](https://github.com/i18next/i18next/pull/1219)

### 15.0.6

- typescript: add Interpolator interface [1213](https://github.com/i18next/i18next/pull/1213)

### 15.0.5

- typescript: Add `hashTransKey` to `ReactOptions` [1208](https://github.com/i18next/i18next/pull/1208)
- Expose error on reloadResources [1212](https://github.com/i18next/i18next/pull/1212)

### 15.0.4

- add default export on node.js entry [1204](https://github.com/i18next/i18next/pull/1204)
- typescript: Add defaultValue tests and allow second arg string as defaultValue [1206](https://github.com/i18next/i18next/pull/1206)

### 15.0.3

- typescript: accept templatestringsarray as TKey [1199](https://github.com/i18next/i18next/pull/1199)
- allow arrays on addResources

### 15.0.2

- try fixing UMD build

### 15.0.1

- fix export name on global (typo)

### 15.0.0

- update build process (while all test passes feeling more save making this a major release)

### 14.1.1

- allow empty string for array join [1191](https://github.com/i18next/i18next/issues/1191)

### 14.1.0

- support plurals in returning objecttree array [1196](https://github.com/i18next/i18next/issues/1196)

### 14.0.1

- typescript: Parameterized use of TFunction fails while WithT use works [1188](https://github.com/i18next/i18next/pull/1188)

### 14.0.0

- typescript: BREAKING Refactor generics usage [1180](https://github.com/i18next/i18next/pull/1180)

### 13.1.5

- es modules: Fix bug when import by ES Module [1179](https://github.com/i18next/i18next/pull/1179)
- typescript: Add module property [1176](https://github.com/i18next/i18next/pull/1176)

### 13.1.4

- fixes plural rule for JSON compatibility v2 introduced in 11.3.3 https://github.com/i18next/i18next/commit/d4d329fd7042f932eedf8bba1d92234707efd04c#diff-e171f9b8b4e0f5df027bd8bd7b962f1bR1140 [1174](https://github.com/i18next/i18next/issues/1174)

### 13.1.3

- TypeScript: Pull up WithT interface allowing for overrides [1172](https://github.com/i18next/i18next/pull/1172)

### 13.1.2

- Add typescript testing [1165](https://github.com/i18next/i18next/pull/1165)
- Add `transEmptyNodeValue` to `ReactOptions` [1166](https://github.com/i18next/i18next/pull/1166)
- Run prettier on typescript files for easier diffing in PRs [1167](https://github.com/i18next/i18next/pull/1167)

### 13.1.1

- fix init() attributes typings [1158](https://github.com/i18next/i18next/pull/1158)

### 13.1.0

- Support interpolation for defaultValue as parameter [1151](https://github.com/i18next/i18next/pull/1151)

### 13.0.1

- update typedefinitions [1152](https://github.com/i18next/i18next/pull/1152)

### 13.0.0

- pass options to missingInterpolationHandler [1146](https://github.com/i18next/i18next/pull/1146)
- refactor non valid keys handling [1143](https://github.com/i18next/i18next/pull/1143)

BREAKING:

- adds typescript definitions directly into this repo - no longer need to grab them from definitlytyped [1142](https://github.com/i18next/i18next/pull/1142)
- promise API added for all functions providing a callback [1130](https://github.com/i18next/i18next/pull/1130) -> means those will now return a Promise and not this -> so you can't chain eg. i18next.init().on() anylonger as init returns a Promise

### 12.1.0

- adds partialBundledLanguages flag in init options [1136](https://github.com/i18next/i18next/pull/1136)

### 12.0.0

- add hebrew update [1121](https://github.com/i18next/i18next/pull/1121)

### 11.10.2

- revert hebrew

### 11.10.1

- Adds Hebrew plural support [1121](https://github.com/i18next/i18next/pull/1121)

### 11.10.0

- Allow missingInterpolationHandler to be provided as t() option [1118](https://github.com/i18next/i18next/pull/1118)

### 11.9.1

- fixes allow overriding of fallbackLng when in options passed to t functions call

### 11.9.0

- merge load and reloadResources functionality to allow an optional callback in reloadResources

### 11.8.0

- deeper support for i18nFormats - add getResource function from format

### 11.7.0

- allows defining defaultValues for plurals -> same logic as using pluralsuffixes in translation files [details](https://www.i18next.com/translation-function/plurals#how-to-find-the-correct-plural-suffix) using eg. defaultValue_plural / defaultValue_2 based on request [1096](https://github.com/i18next/i18next/issues/1096)

### 11.6.0

- expose new store function getDataByLanguage [1087](https://github.com/i18next/i18next/pull/1087)

### 11.5.0

- EventEmitter.prototype.on returns this for chaining calls [1079](https://github.com/i18next/i18next/pull/1079)

### 11.4.0

- Allow to pass raw value to the custom interpolation escape function [1076](https://github.com/i18next/i18next/pull/1076)

### 11.3.6

- fix support zero for saveMissing plurals [1072](https://github.com/i18next/i18next/pull/1072)

### 11.3.5

- trigger loaded event only once per loaded namespace - consolidate all the loaded and done queued load calls [react-i18next 456 ](https://github.com/i18next/react-i18next/issues/456)

### 11.3.4

- fixes simplifyPluralSuffix: false cases for languages having only singular, plural [1069](https://github.com/i18next/i18next/issues/1069)

### 11.3.3

- pass down resolved to i18nFormat.parse as last argument

### 11.3.2

- Properly handle arguments containing arrays while listening to a wildcard event [1052](https://github.com/i18next/i18next/pull/1052)

### 11.3.1

- Fixes allowing setting keySeparator to false in calling t function [1051](https://github.com/i18next/i18next/pull/1051)

### 11.3.0

- Option to skip interpolation when calling t. [1050](https://github.com/i18next/i18next/pull/1050)

### 11.2.3

- Remove unnecessary warning when value is empty string [1046](https://github.com/i18next/i18next/pull/1046)

### 11.2.2

- adds used key to call parse of i18nFormat

### 11.2.1

- fixes for i18nFormat plugin

### 11.2.0

- allows new plugin of type 'i18nFormat' to override i18next format with eg. ICU format

### 11.0.0 - 11.1.1 (fixing version mismatch cdn.js - npm)

- **[BREAKING]** removes plugin of type cache. Can be replace by [i18next-chained-backend](https://github.com/i18next/i18next-chained-backend) example cache for localStorage [i18next-localstorage-backend](https://github.com/i18next/i18next-localstorage-backend#getting-started)
- **[BREAKING]** removes the support for multiload (multiRead) in backends - will just use read per language-namespace. You can enable multiRead support in backends again by using [i18next-multiload-backend-adapter](https://github.com/i18next/i18next-multiload-backend-adapter)

### 10.6.0

- adds missingInterpolationHandler [1039](https://github.com/i18next/i18next/pull/1039)

### 10.5.1

- fixes call to getPluralFormsOfKey if called with unsupported language [1032](https://github.com/i18next/i18next/issues/1032)
- Avoid mutating whitelist array. [1037](https://github.com/i18next/i18next/pull/1037)

### 10.5.0

- Adds options.silent to addResources and addResourceBundle [1024](https://github.com/i18next/i18next/pull/1024)

### 10.4.1

- forward options in backend.create saveMissing

### 10.4.0

- fixes combination of returnObject and context by returning original value for deep translation when lookup for inner returns a key (failed to translate proper) [1014](https://github.com/i18next/i18next/issues/1014)
- _[EXPERIMENTAL]_ additional you can pass `tDescription` to the `t` options or as a third param to calling `t` -> `t(key, defaultValue, tDescription);`. Those will get forwarded to the backend and can be submitted on saveMissing to provide contextual information for translators.

### 10.3.0

- new option saveMissingPlurals (default true) will enable submitting plural forms on saveMissing if t call is for plural (count passed in options).

### 10.2.2

- fixes Context and nested lost initial options [1009](https://github.com/i18next/i18next/issues/1009)

### 10.2.1

- optimize update output in log

### 10.2.0

- _[EXPERIMENTAL]_ init option updateMissing: enable to update default values if different from translated value (only useful on initial development or when keeping code as source of truth not changing values outside of code)

### 10.1.0

- return boolean, number from translator
- initial set language on translator if non set yet (after that only if loaded) [#998](https://github.com/i18next/i18next/issues/998)

### 10.0.7

- support all overloadTranslationOptionHandler in getFixedT [react-i18next/issues/332](https://github.com/i18next/react-i18next/issues/332)

### 10.0.6

- native browser es modules via adding .js where needed [PR980](https://github.com/i18next/i18next/pull/980)

### 10.0.5

- should fix sync of options in clone and its translator

### 10.0.2

- fixes issue in object return when passing in multiple keys

### 10.0.1

- fixes support for using suffix `_0` on languages only having "singular" form

### 10.0.0

- **[BREAKING]** brings pt, pt-PT, pt-BR plurals in line with, new pt reflects pt-BR and pt-PT gets a special case for plural handling http://www.unicode.org/cldr/charts/26/supplemental/language_plural_rules.html

### 9.1.0

- support for using suffix `_0` on languages only having "singular" form enables easier convert in tool chains

### 9.0.1

- propagate changeLanguage to translator after loadResources

### 9.0.0

- **[BREAKING]** removes the compatibility options to i18next v1 you can add that back like we do in our backward compatibility tests: [https://github.com/i18next/i18next/blob/master/test/backward/v1.11.1.compat.js#L45-L52](https://github.com/i18next/i18next/blob/master/test/backward/v1.11.1.compat.js#L45-L52)
- removes the compatibility options to i18next v1
- allows passing in second param as string on getFixedT returned t function so we could use that as defaultValue
- add setting maxReplaces in interpolation options to prevent endless loop in interpolation

### 8.4.3

- getFixedT lng parameter of array type -> pass as lngs to t function [PR949](https://github.com/i18next/i18next/pull/949)

### 8.4.2

- fixes merging options in clone instance...do not override passed values by values on main instance

### 8.4.1

- emits correct lng to changeLanguage event (fixes async detection behaviour) [PR933](https://github.com/i18next/i18next/pull/933)

### 8.4.0

- expose i18next.options.interpolation.format on i18next.format
- i18next.dir if not passing lng use first of i18next.languages before using i18next.language

### 8.3.0

- allows nesting objects/arrays into objects [#925](https://github.com/i18next/i18next/issues/925)

### 8.2.1

- fixes issue in async lng detection

### 8.2.0

- supports now async language detection - when language detector has member async = true

### 8.1.0

- option to disable nesting by calling `i18next.t('key', { nest: false })` [PR920](https://github.com/i18next/i18next/pull/920)
- fixes passing lng from options to formatter function if available

### 8.0.0

- nonExplicitWhitelist flag now not only gets considered on a fallback lng but also on user language. Eg. userlng 'de-AT' and whitelist ['de'] will now let de-AT pass as whitelisted if nonExplicitWhitelist is set true.

### 7.2.3

- rebuild seems we had a mistake in pushing latest build

### 7.2.2

- fixes issue in accepting string as a result of "nested" lookup [PR909](https://github.com/i18next/i18next/pull/909)

### 7.2.1

- fixes iterating over object's own properties [#904](https://github.com/i18next/i18next/pull/904)

### 7.2.0

- new init option simplifyPluralSuffix - setting it to false will treat all plurals using suffix numbers even for locals only having singular and plural
- even if no lng set or detected at least load the fallback languages
- delay init call on createInstance if not set initImmediate to false [#879](https://github.com/i18next/i18next/issues/879)

### 7.1.3

- fixes issue in returnObject tree called with options including ns: [react-i18next #240](https://github.com/i18next/react-i18next/issues/240)

### 7.1.2

- remove regex escape from format separators [#896](https://github.com/i18next/i18next/pull/896)

### 7.1.1

- change to named plugins for 3rd party - just calling init

### 7.1.0

- add option to include plugins not directly related - they get called their init function with current instance of i18next on init

### 7.0.1

- fix issue in fallback lng detection if no code was detected
- check for having a lng in append when searching locals to load on loadResources - avoid error on express middleware

### 7.0.0

- [BREAKING] Removed special cases for norwegian which resolved nb-NO to nb-NO, no will now resolve to nb-NO, nb [#870](https://github.com/i18next/i18next/issues/870) using norwegian you could migrate to old behaviour like:

  fallbackLng: {
  'nb': ['no', 'en'],
  'nn': ['no', 'en'],
  'default': ['en']
  }

- adding exports for named import (destruction es6) [#873](https://github.com/i18next/i18next/issues/873)
- change entry point for umd build to /src/i18next to avoid mixed export
- replace cloning in interpolation nesting to use object assign instead of json.stringify/parse so circular structures can be used [#875](https://github.com/i18next/i18next/issues/875)
- update all build dependencies

### 6.1.2

- fixes fix in 6.1.1

### 6.1.1

- patching same separators to lookup if the ns exists - else guess the first item is just part of the key and not meant as a namespace

### 6.1.0

- you now can use same nsSeparator and keySeparator (eg. use a dot for both)

### 6.0.3

- do not loop over objectTree if keySeparator is set to false

### 6.0.2

- fixes init flow of clone

### 6.0.1

- fixes issue in event emitter, assert all emitters get called even if one called get removed and changes the array index

### 6.0.0

- Return namespace in cimode with appendNamespaceToCIMode option (default now will only return key without namespace - independent of call to t function) [#863](https://github.com/i18next/i18next/issues/863)

### 5.0.0

- Nested keys should not be escaped by default [#854](https://github.com/i18next/i18next/issues/854)
- Make sure i18next.init() runs for i18next.cloneInstance() [#860](https://github.com/i18next/i18next/pull/860)

### 4.2.0

- adds i18next.isInitialized when isInitialized
- triggers backend loaded event before initialized

### 4.1.3 / 4.1.4

- smaller changes suggested to still inofficial support ie8 [#852](https://github.com/i18next/i18next/issues/852)

### 4.1.2

- fixes same interpolation object with multiple getFixedT() in different locales yields wrong translation [#851](https://github.com/i18next/i18next/issues/851)
- updated all build deps

### 4.1.1

- remove subs array from logger - no longer keep changing debug flag on subs if changing on main

### 4.1.0

- Custom escape function, single-quotes in nested [#843](https://github.com/i18next/i18next/pull/843)

### 4.0.0

- [BREAKING; only webpack2-beta users] will add module entry point used by webpack2, this might break your current build with webpack2-beta if configured incorrectly, see: [#836](https://github.com/i18next/i18next/issues/836)

### 3.5.2

- remove the module entry point again will be added in 4.0.0

### 3.5.1

- fix build output add a test file to test the generated build

### 3.5.0

- Setting options on individual translations override, rather than merge global configs [#832](https://github.com/i18next/i18next/issues/832)
- Create an new translator when cloning i18next instance [#834](https://github.com/i18next/i18next/pull/834)
- allows fallbackLng to be an string, an array or an object defining fallbacks for lng, lng-region plus default, eg

  fallbackLng: {
  'de-CH': ['fr', 'it', 'en'],
  'de': ['fr', 'en'],
  'zh-Hans': ['zh-Hant', 'en'],
  'zh-Hant': ['zh-Hans', 'en'],
  'default': ['en']
  }

### 3.4.4

- Fix Interpolator.escapeValue defaulting to undefined in some cases [#826](https://github.com/i18next/i18next/issues/826)

### 3.4.3

- Fix Interpolator formatter exception error propagation due to not reset RegExp indices [#820](https://github.com/i18next/i18next/issues/820)

### 3.4.2

- assert dir function does not crash if no language available

### 3.4.1

- fix issue with format containing formatSeparator for interpolation formatting

### 3.4.0

- adds formatting 'format this: {{var, formatRule}}' having a function on options.interpolation.format: function(value, format, lng) { return value } like suggested here [#774](https://github.com/i18next/i18next/issues/774)

### 3.3.1

- fixed an issue with several unescaped key in the interpolation string [#746](https://github.com/i18next/i18next/pull/746)

### 3.3.0

- allows option `nonExplicitWhitelist` on init [#741](https://github.com/i18next/i18next/pull/741)

### 3.2.0

- adds api function i18next.reloadResources(), i18next.reloadResources(lngs, ns) to trigger a reload of translations

### 3.1.0

- emits missingKey always (like console.log) even if saveMissing is of -> use missingKeyHandler if you only want the trigger only on saveMissing: true

### 3.0.0

- **[BREAKING]** per default i18next uses now the same index as used in gettext for plurals. eg. for arabic suffixes are 0,1,2,3,4,5 instead of 0,1,2,3,11,100. You can enforce old behaviour by setting compatibilityJSON = 'v2' on i18next init.
- **[BREAKING]** AMD export will be unnamed now
- don't call saveMissing if no lng

### 2.5.1

- fixes rtl support [#656](https://github.com/i18next/i18next/pull/656/files)

### 2.5.0

- allow null or empty string as defaultValue
- init option `initImmediate (default: true)` to init without immediate

### 2.4.1

- if passing resources don't immediate loading fixes [#636](https://github.com/i18next/i18next/issues/636)

### 2.4.0

- support now language code variants with scripts and other exotic forms: zh-Hans-MO, sgn-BE-fr, de-AT-1996,...
- trigger of changeLanguage, load of data with a setTimeout to allow other operations meanwhile

### 2.3.5

- Only add language to preload array when new [#613](https://github.com/i18next/i18next/pull/613/files)

### 2.3.4

- get babel 6 output IE compatible: https://jsfiddle.net/jamuhl/2qc7oLf8/

### 2.3.2

- add index to make export compatible again

### 2.3.1

- build /dist/es with included babelhelpers

### 2.3.0

- change build chain to use rollup...allows 'js:next' and reduces build from 45kb to 33kb minified (/lib --> /dist/commonjs folder, new /dist/es for rollup,...)
- fixes detection when using both context and pluralization and context not found. [#851](https://github.com/i18next/i18next/pull/581)

### 2.2.0

- return instance after init for further chaning
- make init optional on backend, cache
- package.json entry points now to /lib not to mangled version...this might be the better solution for most use cases (build chains built on npm, webpack, browserify, node,...)

### 2.1.0

- allow keySeparator, nsSeparator = false to turn that off

### 2.0.26

- extended emitted arguments on 'added' event

### 2.0.24

- fixes unneeded reload of resources that failed to load

### 2.0.23

- fixes returnObjects in case of multiple namespaces

### 2.0.22

- add options for context, pluralSeparator

### 2.0.21

- clear done load request in backendConnector

### 2.0.20

- pass full options to detectors as third arg

### 2.0.19

- do not callback err in backendConnector if no backend is specified

### 2.0.18

- check for fallbackLng exist

### 2.0.17

- adds cimode to options.whitelist if set
- emits failedLoading on load error

### 2.0.16

- adds addResource to i18next API
- fix init of i18next without options, callback

### 2.0.15

- avoid loading of resources for lng=cimode

### 2.0.14

- enhance callback on load from backend...wait for pendings

### 2.0.10

- fixing build chain
- do not post process on nested translation resolve

### 2.0.5

- fixing allow nesting on interpolated nesting vars

### 2.0.4

- don't log lng changed if no lng was detected
- extend result on arrayJoins

### 2.0.1

- assert defaults are arrays where needed
- assert calling lngUtils.toResolveHierarchy does not add undefined as code if called without code param

### 2.0.0

- complete rewrite of i18next codebase

---

### 1.11.2

- replace forEach loop to support IE8 [PR 461](https://github.com/i18next/i18next/pull/461)

### 1.11.1

- fixes issue in nesting using multiple namespaces and lookups in fallback namespaces
- Fix use of sprintf as shortcutFunction when first argument falsey [PR 453](https://github.com/i18next/i18next/pull/453)

### 1.11.0

- Add nsseparator and keyseparator as options to translation function [PR 446](https://github.com/i18next/i18next/pull/446)
- Resolves issue #448 - TypeScript errors [PR 449](https://github.com/i18next/i18next/pull/449)
- Fixing \_deepExtend to handle keys deep existing in source and target [PR 444](https://github.com/i18next/i18next/pull/444)
- `resource` to `resources` in addResources function [PR 440](https://github.com/i18next/i18next/pull/440)
- Runs multiple post processes for missing translations [PR 438](https://github.com/i18next/i18next/pull/438)
- Add support to override Ajax HTTP headers [PR 431](https://github.com/i18next/i18next/pull/431)
- Fixed mnk plural definition [PR 427](https://github.com/i18next/i18next/pull/427)
- Add dir function to return directionality of current language, closes… [PR 413](https://github.com/i18next/i18next/pull/413)

### 1.10.3

- fixes issue where lng get fixed on data-i18n-options
- [SECURITY] merges Reimplement XSS-vulnerable sequential replacement code [PR 443](https://github.com/i18next/i18next/pull/443)

### 1.10.2

- streamline callback(err, t) for case where resStore is passed in

### 1.10.1

- fixes Adds jquery like functionality without the jquery plugin. [PR 403](https://github.com/i18next/i18next/pull/403) by adding it to output

### 1.10.0

- [BREAKING] new callbacks will be node.js conform function(err, t) | Forward the error from sync fetch methods to the init callback function [PR 402](https://github.com/i18next/i18next/pull/402)
- fix fallback lng option during translations [PR 399](https://github.com/i18next/i18next/pull/399)
- Adds jquery like functionality without the jquery plugin. [PR 403](https://github.com/i18next/i18next/pull/403)

### 1.9.1

- fix fallback lng option during translations [PR 399](https://github.com/i18next/i18next/pull/399)
- Adds jquery like functionality without the jquery plugin. [PR 403](https://github.com/i18next/i18next/pull/403)

### 1.9.0

- i18n.noConflict() [PR 371](https://github.com/i18next/i18next/pull/371)
- fix fallback to default namepsace when namespace passed as an option [PR 375](https://github.com/i18next/i18next/pull/375)
- cache option for ajax requests [PR 376](https://github.com/i18next/i18next/pull/376)
- option to show key on value is empty string [PR 379](https://github.com/i18next/i18next/pull/379)
- Add isInitialized method [PR 380](https://github.com/i18next/i18next/pull/380)
- Null check for detectLngFromLocalStorage [PR 384](https://github.com/i18next/i18next/pull/384)
- support for adding timeout in configuration for ajax request [PR 387](https://github.com/i18next/i18next/pull/387)

### 1.8.2

- fixes build of commonjs with jquery file

### 1.8.0

- [BREAKING] adds custom build for commonjs with jquery...default will be without require for jquery
- fixes issue [issue 360](https://github.com/i18next/i18next/issues/360)
- expose applyReplacement on api
- save resources to localStorage when useLocaleStore is true
- add support on key is a number
- added getResourceBundle to API
- allow multiple post-processors
- fallback to singular if no plural is found fixes issue [issue 356](https://github.com/i18next/i18next/issues/356)
- access localstorage always with try catch fixes issue [issue 353](https://github.com/i18next/i18next/issues/353)

### 1.7.7

- fixes issue with stack overflow on t(lng, count)
- fixes empty value fallback when processing secondary ns

### 1.7.6

- fixes lng detection (i18next-client on npm)

### 1.7.5

- adds option to define defaultOptions, which gets merged into t(options) [issue 307](https://github.com/i18next/i18next/issues/307)
- optimization of size added by plural rules
- handle error on json parse when using internal xhr
- fixes plural/singular on count if going on fallbacks eg. fr --> en
- fixes global leak of sync in amd versions
- apply options.lowerCaseLng to fallbackLng too
- added hasResourceBundle(lng, ns) to check if bundle exists
- added experimental i18n.sync.reload --> resets resStore and reloads resources
- catch issues with localStorage quota
- changes detectlanguage to support whitelist entries

### 1.7.4

- add resource bundle gets deep extend flag i18n.addResourceBundle(lng, ns, { 'deep': { 'key2': 'value2' }}, true);
- new functions to add one key value or multiple i18n.addResource(lng, ns, key, value);, i18n.addResources(lng, ns, {'key1': 'value1', 'deep.key2': 'value2'});
- lngWhitelist merged
- override postMissing function
- allow floats for count
- added indefinite functionality for plurals
- optional set replacing vars to replace member to avoid collision with other options
- experimental optional detectLngFromLocalStorage
- fix for norwegian language

### 1.7.3

- solves issue with ie8 not providing .trim function on string -> added to shim
- set data using \$(selector).i18n() on data-i18n='[data-someDataAttr]key'
- more bullet proof state handling on failed file load
- corrected latvian plurals based on [issue 231](https://github.com/jamuhl/i18next/issues/231)
- allow array of fallback languages
- allow int in values passed to shortcut sprintf
- setLng to 'cimode' will trigger a CI mode returning 'key' instead of translation

### 1.7.2

- introducing option fallbackOnEmpty -> empty string will fallback
- added function removeResourceBundle(lng, ns) -> removes a resource set
- fixed issue with no option passed to setLng
- added ability to prepend, append content with data-i18n attributes
- introducing objectTreeKeyHandler
- fixes issue with i18n.t(null), i18n.t(undefined) throwing exception
- returnObjectTrees does not mangle arrays, functions, and regexps
- optimized structure for bower support

### 1.7.1

- fixed some typo
- allow translate to take an array of keys - take first found
- allow numbers in object trees

### 1.7.0

- test if initialisation finished before allowing calling t function
- setting option fixLng=true will return t function on init or setLng with the lng fixed for every subsequent call to t
- grab key from content if attr data-i18n has no value
- setting shortcutFunction to 'defaultValue' allows calling i18n.t(key, defaultValue)
- empty string in defaultValue is now valid no longer displaying key
- allow option cookieDomain
- fixes issue #115 out of stack exception in IE8 by recursing \_translate in objectTrees

### 1.6.3

- option to parse key if missing
- fixes issue where plural don't get translated if language is passed in t options
- fixes issue where key or defaultValue aren't postProcessed with itself as value
- fixes issue with fallbackLng = false in combination with sendMissingTo = fallback
- fixes namespace fallback loop to only loop if array has really a ns in it

### 1.6.2

- fixes some var typo
- fixes sendMissing to correct namespace
- fixes sendMissing in combination with fallbackNS

### 1.6.1

- PR #106 optionally un/escape interpolated content
- PR #101 automatic gettext like sprintf syntax detection + postprocess injection
- customload will get called on dynamicLoad too
- fixes namespace array settings if loaded resourcebundle or additional namespaces
- lookup of not existend resouces can be fallbacked to other namespaces - see option fallbackNS (array or string if one ns to fallback to)
- defaultValues get postProcessed
- BREAKING: per default null values in resources get translated to fallback. This can be changed by setting option fallbackOnNull to false
- PR #81 added support for passing options to nested resources
- PR #88 added an exists method to check for the existence of a key in the resource store
- fixed issue with null value throws in applyReplacement function
- fixed issue #80 empty string lookup ends in fallback instead of returning result in language
- fixed issue with null value in resources not returning expected value
- optimized tests to use on server (nodejs) too
- allow zepto as drop in replacement for \$
- using testacular as runner
- upgraded to grunt 0.4.0
- fixed optional interpolation prefix/suffix not used in plural translation cases
- optimized check if there are multiple keys for the data-i18n attribute to parse

### 1.6.0

- option to specify target to set attributes with jquery function by using 'data-i18n-target attribute'
- function to set new options for nesting functionality
- function to add resources after init
- option to lookup in default namespace if value is not found in given namespace
- option to change interpolation prefix and suffix via translation options
- fixed issue with using ns/keyseparator on plurals, context,...
- fixed issue with posting missing when not using jquery
- post missing in correct lng if lng is given in translation options
- proper usage of deferred object in init function
- fixed issue replacing values in objectTree

### 1.5.10

- BREAKING: fixed plural rules for languages with extended plural forms (more than 2 forms)
- merged pull #61 - custom loader (enables jsonp or other loading custom loading strategies)
- escaping interpolation prefix/suffix for proper regex replace

### 1.5.9

- functions to load additional namespaces after init and to set default namespace to something else
- set if you don't want to read defaultValues from content while using jquery fc
- set dataAttribute to different value
- set cookieName to different value
- some smallbugfixes
- typesafe use of console if in debug mode

### 1.5.8

- disable cookie usage by setting init option useCookie to false
- accept empty string as translation value
- fixed bug in own ajax implementation not using proper sendType
- fixed bug for returning objTree in combination with namespace
- fixed bug in plurals of romanic lngs

### 1.5.7

- pass namespace in t() options
- interpolation nesting
- changable querystring param to look language up from

### 1.5.6

- typesafe check for window, document existance
- runnable under rhino
- seperated amd builds with/without jquery

### 1.5.5

- **BREAKING** added all plurals: suffixes will new be same as in gettext usage (number indexes key_plural_0|2|3|4|5|7|8|10|11|20|100), additional if needed signature of addRule has changed
- added sprintf as postprocessor -> postProcess = 'sprintf' and sprintf = obj or array
- set default postProcessor on init
- redone build process with grunt
- drop in replacement for jquery each, extend, ajax
- setting fallbackLng to false will stop loading and looking it up
- option to load only current or unspecific language files

### 1.5.0

- pass options to sync.\_fetchOne, use options for fetching
- support for i18next-webtranslate

### 1.4.1

- post processor
- **BREAKING:** localStorage defaults to false
- added localStorageExpirationTime for better caching control
- few bug fixes

### 1.4.0

- preload multiple languages
- translate key to other language than current
- fixed issue with namespace usage in combination with context and plurals
- more options to send missing values
- better amd support

### 1.3.4

- set type of ajax request to GET (options sendType: default POST)
- set cookie expiration (options cookieExpirationTime: in minutes)
- read / cache translation options (context, count, ...) in data-attribute (options useDataAttrOptions: default false)

### 1.3.3

- optional return an objectTree from translation
- use jquery promises or callback in initialisation
- rewrote all tests with mocha.js

### 1.3.2

- options to init i18next sync (options -> getAsync = false)
- replace all occurence of replacement string

### 1.3.1

- pass options to selector.i18n() thanks to [@hugojosefson](https://github.com/jamuhl/i18next/pull/10)
- close [issue #8(https://github.com/jamuhl/i18next/issues/8)]: Fail silently when trying to access a path with children
- cleanup
- debug flag (options.debug -> write infos/errors to console)

### 1.2.5

- fix for IE8

### 1.2.4

- added indexOf for non ECMA-262 standard compliant browsers (IE < 9)
- calling i28n() on element with data-i18n attribute will localize it now (i18n now not only works on container elements child)

### 1.2.3

- extended detectLng: switch via qs _setLng=_ or cookie _i18next_
- assert county in locale will be uppercased `en-us` -> `en-US`
- provide option to have locale always lowercased _option lowerCaseLng_
- set lng cookie when set in init function

### 1.2

- support for translation context
- fixed zero count in plurals
- init without options, callback

### 1.1

- support for multiple plural forms
- common.js enabled (for node.js serverside)
- changes to be less dependent on jquery (override it's functions, add to root if no jquery)
- enable it on serverside with node.js [i18next-node](https://github.com/jamuhl/i18next-node)

### 1.0

- support for other attribute translation via _data-i18n_ attribute
- bug fixes
- tests with qunit and sinon

### 0.9

- multi-namespace support
- loading static files or dynamic route
- jquery function for _data-i18n_ attibute
- post missing translations to the server
- graceful fallback en-US -> en -> fallbackLng
- localstorage support
- support for pluralized strings
- insertion of variables into translations
- translation nesting
