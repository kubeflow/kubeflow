### 11.11.4

- typescript: add returnNull and returnEptyString options to TypeOptions interface [1341](https://github.com/i18next/react-i18next/pull/1341)

### 11.11.3

- Trans: parse first, then interpolate [1345](https://github.com/i18next/react-i18next/pull/1345)

### 11.11.2

- feat(typings): support readonly namespaces in TFuncKey [1340](https://github.com/i18next/react-i18next/pull/1340)

### 11.11.1

- feat(types): allow readonly namespaces in useTranslation [1339](https://github.com/i18next/react-i18next/pull/1339)

### 11.11.0

- introduce `CustomTypeOptions` type definition and deprecate the `Resources` type definition [1328](https://github.com/i18next/react-i18next/pull/1328)

### 11.10.0

- add transWrapTextNodes option [1324](https://github.com/i18next/react-i18next/pull/1324) to prevent a well-known Google Translate issue with React apps [1323](https://github.com/i18next/react-i18next/issues/1323), thanks to [feross](https://github.com/feross)

### 11.9.0

- typescript/icu macro: add new syntax for interpolation of complex types [1316](https://github.com/i18next/react-i18next/pull/1316) -> [docs for template usage](https://react.i18next.com/misc/using-with-icu-format#tagged-template-for-icu)

### 11.8.15

- ignore null children in Trans component [1307](https://github.com/i18next/react-i18next/issues/1307)

### 11.8.14

- update html-parse-stringify to fix uppercase elements in Trans component [1304](https://github.com/i18next/react-i18next/issues/1304)

### 11.8.13

- Replace html-parse-stringify2 with html-parse-stringify [1283](https://github.com/i18next/react-i18next/pull/1283) to prevent [CVE-2021-23346](https://github.com/i18next/react-i18next/issues/1275)

### 11.8.12

- refactor: remove unneeded object [1286](https://github.com/i18next/react-i18next/pull/1286)

### 11.8.11

- typescript: Bug fixes [1284](https://github.com/i18next/react-i18next/pull/1284)

### 11.8.10

- typescript: Move type definition files [1276](https://github.com/i18next/react-i18next/pull/1276)

### 11.8.9

- Fix allow to replace i18n in provider with useTranslation hook [1273](https://github.com/i18next/react-i18next/pull/1273)

### 11.8.8

- typescript: Allow `TFuncKey` to be used without specifying the namespace, in the same way TFunction and useTranslation work [1262](https://github.com/i18next/react-i18next/pull/1262)

### 11.8.7

- warning for old wait usage

### 11.8.6

- typescript: Updated TS definitions (adding useSuspense option in TranslationProps) [1247](https://github.com/i18next/react-i18next/pull/1247)

### 11.8.5

- typescript: fix: Inference for specific keys ts 4.1 [1230](https://github.com/i18next/react-i18next/pull/1230)

### 11.8.4

- typescript: Add workaround to suppress infinite instantiation warning [1227](https://github.com/i18next/react-i18next/pull/1227)
- typescript: withTranslation() typing fix for defaultProps [1226](https://github.com/i18next/react-i18next/pull/1226)
- typescript: Accept const components prop for Trans [1224](https://github.com/i18next/react-i18next/pull/1224)

### 11.8.3

- Fix: Return type inference for t function (typescript 4.1) [1221](https://github.com/i18next/react-i18next/pull/1221)

### 11.8.2

- fix: type definitions for typescript 4.1 [1220](https://github.com/i18next/react-i18next/pull/1220)

### 11.8.1

- fix: typescript definitions for t function without namespaces [1214](https://github.com/i18next/react-i18next/pull/1214)

### 11.8.0

- typescript: Make the translation function fully type-safe [1193](https://github.com/i18next/react-i18next/pull/1193)
- trans should work with misleading overloaded empty elements in components [1206](https://github.com/i18next/react-i18next/pull/1206)

### 11.7.4

- fixes passing interpolations options via Trans components tOptions prop [1204](https://github.com/i18next/react-i18next/pull/1204)

### 11.7.3

- Avoid redundant re-rendering in I18nextProvider [1174](https://github.com/i18next/react-i18next/pull/1174)

### 11.7.2

- Avoid setState while react is rendering [1165](https://github.com/i18next/react-i18next/pull/1165)

### 11.7.1

- typescript: fix: typescript definition of context object [1160](https://github.com/i18next/react-i18next/pull/1160)

### 11.7.0

- Trans interpolating self-closing tags in components prop(object) [1140](https://github.com/i18next/react-i18next/pull/1140)

### 11.6.0

- Trans allow components props to be an object containing named interpolation elements

### 11.5.1

- providing filename when running babel.parse in icu.macro [1133](https://github.com/i18next/react-i18next/pull/1133)

### 11.5.0

- Trans: merge option in mapAST [1120](https://github.com/i18next/react-i18next/pull/1120)

### 11.4.0

- Add sideEffects false to package json to allow tree shaking [1097](https://github.com/i18next/react-i18next/pull/1097)

### 11.3.5

- fix returning defaultValue for Trans component [1092](https://github.com/i18next/react-i18next/pull/1092)

### 11.3.4

- [useTranslation] Avoid setting the new `t` function if the component is unmounted. (1051)[https://github.com/i18next/react-i18next/pull/1051]

### 11.3.3

- fixes copying ns in useSSR

### 11.3.2

- typescript: Add optional defaultN [1050](https://github.com/i18next/react-i18next/pull/1050)

### 11.3.1

- typescript: Translation component's ready parameter is missing in TypeScript definition [1044](https://github.com/i18next/react-i18next/pull/1044)
- change hook condition in Trans to equal useTranslations implementation

### 11.3.0

- useSSR: add namespaces to init options options.ns [1031](https://github.com/i18next/react-i18next/issues/1031)
- typescript: Fix the type of the components props of Trans [1036](https://github.com/i18next/react-i18next/pull/1036)

### 11.2.7

- typescript: Allow ComponentType for Trans' `parent` type [1021](https://github.com/i18next/react-i18next/pull/1021)

### 11.2.6

- typescript: Allow html props on Trans, fix `parent` prop type [1019](https://github.com/i18next/react-i18next/pull/1019)

### 11.2.5

- handle array fallback on wrongly configured app ;) [1010](https://github.com/i18next/react-i18next/pull/1010)

### 11.2.4

- typescript: Extend withTranslation tests to include optional props [1009](https://github.com/i18next/react-i18next/pull/1009)

### 11.2.3

- Store should be initialized after useSSR [1008](https://github.com/i18next/react-i18next/pull/1008)

### 11.2.2

- Only pass forwardedRef to children if options.withRef is false [999](https://github.com/i18next/react-i18next/pull/999)

### 11.2.1

- remove used jsx in withTranslation to avoid issues while compiling [994](https://github.com/i18next/react-i18next/pull/994)

### 11.2.0

- withTranslation allow not only passing a ref with option withRef but also passing a forwardedRef from outside as props (before forwardedRef was only added to wrapped component if the withRef option was set) [992](https://github.com/i18next/react-i18next/pull/992)

### 11.1.0

- Update `rollup.config.js` for IE11 Transpilations [988](https://github.com/i18next/react-i18next/pull/988)

### 11.0.1

- typescript: Use updated ts export default from i18next [984](https://github.com/i18next/react-i18next/pull/984)

### 11.0.0

- **Breaking** based on i18next changes made in [v18.0.0](https://github.com/i18next/i18next/blob/master/CHANGELOG.md#1800) changing the language should not trigger a Suspense anylonger. The state will be ready and `t` bound to the previous language until `languageChanged` get triggered -> this results in a nicer experience for users (no flickering Suspense while changing the language). Based on issue "Suspence is fired during lang change when useTranslation called in between" [975](https://github.com/i18next/react-i18next/issues/975)
- the default bindI18n is now `languageChanged` and `languageChanging` was removed from that default
- Adding `languageChanging` to bindI18n will bring back old behaviour where a language change will trigger a Suspense / ready: false while loading those new translations
- You can now override the defaults in i18next.options.react for `bindI18n`, `bindI18nStore` and `useSuspense` in the hook by `useTranslation(ns, { bindI18n, bindI18nStore, useSuspense})` or in the HOC by passing those as props.

### 10.13.2

- typescript: Add t function to TransProps types [969](https://github.com/i18next/react-i18next/pull/969)
- lint: Fix linter errors [966](https://github.com/i18next/react-i18next/pull/966)

### 10.13.1

- avoid conditional hook call in edge case (was only issue in wrong setup useContext outside I18nextProvider) [951](https://github.com/i18next/react-i18next/pull/951)

### 10.13.0

- also use count from `values` object passed to Trans if passed - else use the one on props [947](https://github.com/i18next/react-i18next/pull/947)

### 10.12.5

- typescript: Update types for reportNamespaces [945](https://github.com/i18next/react-i18next/pull/945)
- typescript: Improve withSSR type definition [943](https://github.com/i18next/react-i18next/pull/943)

### 10.12.4

- ICU: Fixes macro to support count prop and expressions better [939](https://github.com/i18next/react-i18next/pull/939)

### 10.12.3

- avoid conditional hook call in edge case (wrong setup) [935](https://github.com/i18next/react-i18next/pull/935)

### 10.12.2

- Trans: do not replace html tags in translation strings that are not in the transKeepBasicHtmlNodesFor array [919](https://github.com/i18next/react-i18next/issues/919)

### 10.12.1

- Set ready flag to false when i18n instance has not been initialised [918](https://github.com/i18next/react-i18next/pull/918)

### 10.12.0

- fix / extend icu.macro: ICU: Trans macro will parse defaults as alternate to children [917](https://github.com/i18next/react-i18next/pull/917)

### 10.11.5

- typescript: fix types for use() [912](https://github.com/i18next/react-i18next/pull/912)

### 10.11.4

- assert edge case trans component get set a key
- assert context get destructed of empty object if context gets used falsely on a component got pulled out of main tree from react-portal or similar

### 10.11.3

- only apply initial values in useSSR, withSSR on i18next instances not being a clone (eg. created by express middleware on server) ==> don't apply on serverside

### 10.11.2

- Reload translations whenever namespaces passed to useTranslation() change [878](https://github.com/i18next/react-i18next/pull/878)

### 10.11.1

- fixes a regression in Trans component taking namespace from passed t function [867](https://github.com/i18next/react-i18next/issues/867#issuecomment-502395958)

### 10.11.0

- Restore support passing the defaultNS via I18nextProvider prop [860](https://github.com/i18next/react-i18next/pull/860)

### 10.10.0

- HOC: expose wrapped component as WrappedComponent property [853](https://github.com/i18next/react-i18next/pull/853)

### 10.9.1

- Fix useEffect mount/unmount usage [852](https://github.com/i18next/react-i18next/pull/852)

### 10.9.0

- trigger suspense on languageChanging by add listening to that event too (new in i18next@15.1.0) - if you do not like this behaviour of suspending during languageChange - remove it from bindI18n

### 10.8.1

- expose context [829](https://github.com/i18next/react-i18next/pull/829)

### 10.8.0

- Support taking values for interpolation not only from content but the props count, values too: Replace count prop from <Trans> in translation string automatically [826](https://github.com/i18next/react-i18next/issues/826)

### 10.7.0

- brings back nsMode=default|fallback [822](https://github.com/i18next/react-i18next/pull/822)
- typescript: Add missing type definition for withTranslation options [821](https://github.com/i18next/react-i18next/pull/821)

### 10.6.2

- Fix Trans component ignore default options [818](https://github.com/i18next/react-i18next/pull/818)

### 10.6.1

- useTranslation useEffect also guard against unmounted for bound events...seems unmount and actual call to useEffect cleanup are not in correct order (component is first unmounted and then unbound - should be vice versa)

### 10.6.0

- use forwardRef for withTranslation [802](https://github.com/i18next/react-i18next/pull/802)
- fixes Translation reset after component is unmounted with useTranslation [801](https://github.com/i18next/react-i18next/issues/801)

### 10.5.3

- Fix the displayName of HOC components [798](https://github.com/i18next/react-i18next/pull/798)

### 10.5.2

- fixes: transSupportBasicHtmlNodes doesn't work with self-closing Trans [790](https://github.com/i18next/react-i18next/issues/790)

### 10.5.1

- ReferenceError: setImmediate is not defined [787](https://github.com/i18next/react-i18next/issues/787)

### 10.5.0

- Adding support for nested component inside Trans that are a list.map like `<ul>{['a', 'b'].map(item => ( <li key={item}>{item}</li> ))}</ul>` [784](https://github.com/i18next/react-i18next/pull/784) (Adding `<ul i18nIsDynamicList>` will also create correct missing string)

### 10.4.2

- typescript: updated typescript definition of the UseTranslationOptions interface, added the useSuspense configuration property [778](https://github.com/i18next/react-i18next/pull/778)

### 10.4.1

- allow p in Trans

### 10.4.0

- allow br, strong, i tags be used for translations handled by Trans

### 10.3.1

- IE11 sending console as the first argument to apply [774](https://github.com/i18next/react-i18next/pull/774)

### 10.3.0

- Allow to enable/disable useSuspense at a hook or component level [769](https://github.com/i18next/react-i18next/pull/769)
- typescript: Add ready/tReady type definitions [753](https://github.com/i18next/react-i18next/pull/753)

### 10.2.1

- fix cimode won't load therefore won't be ready [768](https://github.com/i18next/react-i18next/issues/768)

### 10.2.0

- Add bindI18nStore event options to listen to store changes if needed [749](https://github.com/i18next/react-i18next/pull/749)

### 10.1.2

- allow passing ready if i18next not initialized yet but initialStore set (timing issue in razzle)

### 10.1.1

- forward ready state in withTranslation, Translation

### 10.1.0

- better naming for Wrappers in HOC for easier use of react debugger in console
- allow setting options react.useSuspense to false on i18next.init to avoid usage of suspense

### 10.0.5

- fixes namespace loading for false inital state undefined
- typescript: Make children optional within TransProps [728](https://github.com/i18next/react-i18next/pull/728)

### 10.0.4

- try avoiding pull in of regenerator runtime for async usage -> use Promise for now

### 10.0.3

- fix initial props on withSSR

### 10.0.2

- refactor ready state in useTranslation

### 10.0.1

- allow object spread `const { t } = useTranslation()` [714](https://github.com/i18next/react-i18next/pull/714)
- typescript: add types for I18nextProvider [721](https://github.com/i18next/react-i18next/pull/721)

### 10.0.0

- released to npm
- for MIGRATION READ [https://react.i18next.com/latest/migrating-v9-to-v10](https://react.i18next.com/latest/migrating-v9-to-v10)

### 10.0.0-alpha.3

- hooks: make reportNS bound to the i18n instance - so report is per request [711](https://github.com/i18next/react-i18next/issues/711)

### 10.0.0-alpha.2

- hooks: add Translation render prop [708](https://github.com/i18next/react-i18next/issues/708)
- hooks: add I18nextProvider for passing i18n instance via context
- hooks: might fix infinit loop issue on undefined language (set ready to true anyway) [673](https://github.com/i18next/react-i18next/issues/673)

### 10.0.0-alpha.1

- hooks: initial alpha version with all build targets -> preparing v10 release

### 9.0.10

- typescript: Add TS definition for reportNS prop [699](https://github.com/i18next/react-i18next/pull/699)

### 9.0.9

- typescript: fix: useTranslation hooks typing [698](https://github.com/i18next/react-i18next/pull/698)

### 9.0.8

- typescript: TFunction usage inside NamespacesConsumer should behave [694](https://github.com/i18next/react-i18next/pull/694)

### 9.0.7

- fixing react-i18next throwing webpack error when initializeing using @babel/runtime 7.3.0 [685](https://github.com/i18next/react-i18next/issues/685)

### 9.0.6

- updated all deps

### 9.0.5

- UMD: Environment optimization with rollup-plugin-replace support [683](https://github.com/i18next/react-i18next/pull/683)

### 9.0.4

- typescript: add generic type to t function and the tests [665](https://github.com/i18next/react-i18next/pull/665)
- hooks: enable passing in i18n to useTranslation hook so we could wrap that with a useContext enabled hook

### 9.0.3

- fix useSSR for hooks storing state on i18n instance and not globally [671](https://github.com/i18next/react-i18next/issues/671)
- should fix case where fallbackLng is set false and invalid lng is loaded in hooks -> never ready [677](https://github.com/i18next/react-i18next/issues/677)
- multiple typescript improvements

### 9.0.2

- fix hooks ts [658](https://github.com/i18next/react-i18next/pull/658)

### 9.0.1

- fix ts [655](https://github.com/i18next/react-i18next/pull/655)

### 9.0.0

- allow defining `transEmptyNodeValue` in i18next.options.react to set a default fallback value for empty nodes to allow i18next fallback flow [462](https://github.com/i18next/react-i18next/pull/462)
- Warn if i18next instance is a promise [652](https://github.com/i18next/react-i18next/pull/652)
- keeping legacy names (no deprecation on them as this will be last version using those -> v10 will be based on hooks)

**BREAKING**

- out of licensing reasons the ponyfill for react-context had to be removed [635](https://github.com/i18next/react-i18next/issues/635)

Using react >= 16.3.0 will be save - in other cases you will need to polyfill react.createContext yourself!!

### 8.4.0

- update typescript definitions for i18next v13 [631](https://github.com/i18next/react-i18next/pull/631)

### 8.3.9

- try fixing hooks ready algorithm [642](https://github.com/i18next/react-i18next/issues/642)

### 8.3.8

- try fixing edge case of unset state: [615](https://github.com/i18next/react-i18next/issues/615)

### 8.3.7

- handle initial SSR props only once

### 8.3.6

- remove componentWillReceiveProps call in I18nextProvider to comply with react strict mode [596](https://github.com/i18next/react-i18next/pull/596)

### 8.3.5

- rename named export to window.ReactI18next for standalone js

### 8.3.4

- try fixing standalone browser build

### 8.3.3

- remove wait option in hooks code (not used anylonger)

### 8.3.2

- use react suspense in hooks experimental code [learn more](https://react.i18next.com/experimental/using-with-hooks)

### 8.3.1

- make export in ./hooks.js explicit

### 8.3.0

- Ensure withI18n hoists static members. [584](https://github.com/i18next/react-i18next/pull/584)

### 8.2.0

- comes with support for hooks that are experimental in react v16.7.0-alpha [learn more](https://react.i18next.com/experimental/using-with-hooks)

### 8.1.2

- publish changes to typescript definitions [567](https://github.com/i18next/react-i18next/pull/567)

### 8.1.1

- persisting generated i18nOptions on withI18n hoc to avoid rerenders on pure components

### 8.1.0

- add typedefinitions [557](https://github.com/i18next/react-i18next/pull/557)

### 8.0.8

- add innerRefs support to withContext, withI18n

### 8.0.7

- replaces getWrappedInstance on withNamespaces / translate with passing a innerRef https://github.com/facebook/react/issues/13456 [534](https://github.com/i18next/react-i18next/issues/534)

### 8.0.6

- fix SSR cases

### 8.0.5

- fix issue with context not applied when merging i18n options

### 8.0.4

- add prop-types to peer deps as long we use the ponyfill create-react-context

### 8.0.3

- remove prop-types in tests

### 8.0.2

- remove proptypes dependency - not needed anylonger as we do not define old context
- move out ssr stuff to utils
- move reportNS to the NamespacesConsumer

### 8.0.1

- use @babel/plugin-transform-runtime

### 8.0.0

- translate HOC was renamed to "withNamespaces" as it controls which namespaces should be loaded
- I18n render prop was renamed to "NamespacesConsumer" as it controls which namespaces should be "consumed"
- there is a new context.consuming HOC "withI18n" adds i18n, t to component props (without the extra options of withNamespaces)

- there is a simplification for interpolation in translations

`'Hello <1><0>{{name}}</0></1>, you have <3>{{count}}</3> message. Open <5>hear</5>.'`

can be written as:

`'Hello <1>{{name}}</1>, you have {{count}} message. Open <5>hear</5>.'`

=> there is no need to add `<0>...</0>` around interpolated values anylonger
=> your old files having those extra pseudo tags will still work without needing to change them

- there is a new I18nContext -> I18nContext.provider, I18next.consumer using new react context api

**Using react's new context api**

should be non breaking in most cases, with following exceptions:

- using preact you will have to use preact.createContext plugin (or eventual hope the provided polyfill works for preact too)
- you used the translate.getWrappedInstance function -> you will need to use instance.getWrappedInstance().getWrappedInstance() now as the translate hoc is now wrapped in an additional I18nContext.Consumer

still we prefer to increase this to a **major version** as beside the described egde cases there might be other effects we not have covered with our tests

### 7.13.0

- Load missing namespaces when updating ns prop on I18n component [523](https://github.com/i18next/react-i18next/pull/523)

### 7.12.0

- pass down lng via props in I18n and translate HOC - for use cases like [508](https://github.com/i18next/react-i18next/issues/508)

### 7.11.1

- fix related to issue #504: also report default Namespace with translate() [506](https://github.com/i18next/react-i18next/pull/506)

### 7.11.0

- Added reportNS function to I18NextProvider to report used namespaces [500](https://github.com/i18next/react-i18next/pull/500)

### 7.10.1

- fix small issue in icu.macro introduced on refactoring

### 7.10.0

- Adds import { Trans, Plural, Select } from `react-i18next/icu.macro` a babel macro to allow nicer components used with ICU format (which as default would result in invalid JSX). [discussion](https://github.com/i18next/react-i18next/issues/439)

### 7.9.1

- Skip custom html tags in Trans component translation [PR482](https://github.com/i18next/react-i18next/pull/482)

### 7.9.0

- Support defaultNS from I18nextProvider props [PR478](https://github.com/i18next/react-i18next/pull/478)
- Don't polyfill Object.entries globally [476](https://github.com/i18next/react-i18next/pull/476)

### 7.8.1

- i18n in context is optional as it can be passed via props too [474](https://github.com/i18next/react-i18next/pull/474)

### 7.8.0

- avoid rerenders triggered by bound i18next events while I18n or translate hoc are not ready yet (omitBoundRerender: true --- is default) [456](https://github.com/i18next/react-i18next/issues/456)

### 7.7.0

- Allow Trans component to be used with props only for icu use case (next step babel makro) [439](https://github.com/i18next/react-i18next/issues/439)

### 7.6.1

- Allow to pass a function as parent for <Trans /> component [PR424](https://github.com/i18next/react-i18next/pull/424)

### 7.6.0

- adds tOptions to Trans component to support ICU
- removes componentWillMount lifecycle method from I18n.js render props as it will get deprecated on react 16.3 [404](https://github.com/i18next/react-i18next/issues/404)

### 7.5.1

- Fix reference to props in constructor [PR411](https://github.com/i18next/react-i18next/pull/411)

### 7.5.0

- passes down tReady from translate hoc for cases you prefer showing a placeholder instead of default return null in case of wait: true and not yet loaded translations [PR400](https://github.com/i18next/react-i18next/pull/400)
- I18n render prop calls with ready as third param

### 7.4.0

- enables setting prop `ns` on Trans component to override namespace passed by render prop or hoc
- allows trans component with no children just returning the string getting from translations

### 7.3.6

- reorder selection of i18n in I18n render prop

### 7.3.5

- reorder selection of i18n in I18n render prop

### 7.3.4

- more save access to options in general

### 7.3.3

- more save access to options.react

### 7.3.2

- replace Interpolate PureComponent with Component to assert it gets rerendered on lng change

### 7.3.1

- remove react-dom from peer dependencies as module is used in react-native too

### 7.3.0

- Allow translate HOC to take a function for getting namespaces [372](https://github.com/i18next/react-i18next/pull/372)

### 7.2.0

- Add usePureComponent option [PR357](https://github.com/i18next/react-i18next/pull/357)
- Render empty string on empty string as Trans child [PR364](https://github.com/i18next/react-i18next/pull/364)

### 7.1.1

- fixes: bring back Trans component t fc from context

### 7.1.0

- optional take i18n.t in Trans component if non t function passed in via props or context

### 7.0.2

- fixes rendering in Trans component in case of no parent

### 7.0.1

- working Trans component without the need of setting options.react

### 7.0.0

- **[BREAKING]** As with react 16 you can return multiple elements from render - based on that we do not need to return a wrapper any longer from Trans component.

Starting with v7.0.0 Trans component per default won't add a parent div around content passed as children. It will just return it's children.

You still got the option to set a parent if you prefer content being wrapped.

If you prefer wrapping for all your Trans components (or for backwards compatibility) you can set option `react.defaultTransParent` to an element on i18next init.

### 6.2.0

- adds hashTransKey function for custom key generation in case of not passing a key to Trans component and not like having the source value as key

### 6.1.0

- pre-check namespaces to avoid unnecessary initial `null` render [PR336](https://github.com/i18next/react-i18next/pull/336)

### 6.0.6

- remove PureComponent from Trans

### 6.0.5

- fixes support passing i18n and t to Trans as props [PR315](https://github.com/i18next/react-i18next/pull/315)

### 6.0.4

- fixes translate hoc build

### 6.0.3

- stop using PureComponent and use Component again...seems we get an issue with react-router v4 if using PureComponents
- recreate t function on i18next updates so PureComponents relying on t get an update triggered

### 6.0.2

- rebuild needed cause of uppercasing for components name was not reflected in last build

### 6.0.1

- remove react from dependencies - not sure how that came into the package.json

### 6.0.0

- **[BREAKING]** removes options to set translateFuncName in translate hoc (was not supported in Trans and Interpolate component anyway)
- setting i18n instance and defaults can now be done by i18next.use(reactI18nextModule) making I18nextProvider obsolete
- As an alternative to the translate hoc you now can use the I18n component supporting a render props (for details about render props https://www.youtube.com/watch?v=BcVAq3YFiuc)

### 5.4.1

- fixes AST implementation for preact

### 5.4.0

- replaces regex used to parse nodes from string to an ast implementation solving [#298](https://github.com/i18next/react-i18next/issues/298)

### 5.3.0

- Pass extra parameters to Trans parent component

### 5.2.0

- adds module export in package.json pointing to es dist files.

### 5.1.0

- you now can set i18n instance on translate hoc once using setI18n:

```
import translate from 'react-i18next';
import i18n from './i18n';

translate.setI18n(i18n);
```

### 5.0.0

- **[BREAKING]** we no longer accept wait to be specified on i18next init options like `{ wait: true }` -> all overrides for the translate hoc now have to be in child `react` like `{ react: { wait: true } }`
- you now can override all the default options for translate hoc by setting them on i18next.init (excluding `translateFuncName` as we need that upfront to define childContextTypes)

```
i18next.init({
  // ... other options
  react: {
    wait: false,
    withRef: false,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default'
  }
});
```

- you now can override all defaults for translate hoc options (including `translateFuncName`) by using:

```
import translate from 'react-i18next';

translate.setDefaults({
  wait: false,
  withRef: false,
  bindI18n: 'languageChanged loaded',
  bindStore: 'added removed',
  nsMode: 'default',
  translateFuncName: 't'
});
```

### 4.8.0

- make trans component work with preact and preact-compat
- add preact example

### 4.7.0

- Trans component parent element configurable [PR278](https://github.com/i18next/react-i18next/pull/278)

### 4.6.4

- optimize generated defaultValue for components not having children

### 4.6.3

- move react, prop-types, ... to peerDependency again

### 4.6.2

- optimize trans component output

### 4.6.1

- fixes issue in changeLanguage on set via translate hoc ssr

### 4.6.0

- allow passing initialI18nStore and initialLanguage to I18nextProvider via props to support simpler ssr
- adds a serverside rendering sample based on razzle

### 4.5.0

- pass i18n instance to context inside translate hoc to simplify usage in nextjs
- options.react.exposeNamespace will expose namespace on data-i18next-options for consuming in editors

### 4.4.0

- introduces Trans component which enables you to translate nested components incl. interpolation by resulting in one translatable string. [learn more](https://react.i18next.com/components/trans-component.html)

### 4.3.0

- allow passing down initialI18nStore and initialLanguage to translate hoc to support ssr scenario better see example/nextjs

### 4.2.0

- allow passing i18next instance in translate hoc options makes integration in nextjs easier

### 4.1.2

- Remove workaround to set ready if there was no initialized signal [PR263](https://github.com/i18next/react-i18next/pull/263)

### 4.1.1

- Fix react-i18next to work with TypeScript [PR261](https://github.com/i18next/react-i18next/pull/261)

### 4.1.0

- eslint cleanup
- a lot more tests
- flag nsMode: 'fallback' -> uses namespaces passed to translate hoc as fallbacks [#254](https://github.com/i18next/react-i18next/issues/254)

### 4.0.0

- deploys 3.1.1 as possible breaking: fixes issue in fixing t function - pass only first namespace not an array of namespaces (access other namespaces like: this.props.t('namespace:key'))

### 3.1.2

- reverts last change

### 3.1.1

- fixes issue in fixing t function - pass only first namespace not an array of namespaces

### 3.1.0

- fixes wrong warning of missing prop on interpolate with format
- the wait flag on translate hoc can now be set globally on i18next options `i18next.init({ wait: true })`

### 3.0.0

- [BREAKING] assert you install prop-types as a peerDependency based on changes in react >= 15.5.x
- update react to 15.5.x use prop-types module to remove react warnings [PR248](https://github.com/i18next/react-i18next/pull/248)
- update all dependencies
- move react, prop-types to peerDependencies

### 2.2.3

- try not access store if undefined for hmr

### 2.2.1

- fixes validation for missing prop in interpolate component

### 2.2.0

- support formatting inside interpolate component

### 2.1.0

- tanslate hoc: expose the i18n instance via props

### 2.0.0

- translate hoc wait option asserts now that i18next is initialized before rendering (waits for lng detection)
- [BREAKING] needs i18next >= 4.2.0

### 1.11.0

- pass style prop to interpolate component
- define i18next as a peerDependency

### 1.10.1

- Suppresses required context type warning if passing i18n as a prop [PR205](https://github.com/i18next/react-i18next/pull/205)

### 1.10.0

- allow passing i18next instance via props to translate hoc [PR203](https://github.com/i18next/react-i18next/pull/203)

### 1.9.0

- adds options bindI18n, bindStore can be set to false or string of events to bind for triggering updates

### 1.8.0

- allows to set a className on interpolate component
- update all dependencies and devDependencies

### 1.7.0

- add option to change t function name to something else [PR196](https://github.com/i18next/react-i18next/pull/196)
- Added an option of using the <Interpolate /> with a raw HTML [PR195](https://github.com/i18next/react-i18next/pull/195)

### 1.6.3

- only trigger loaded namespaces if mounted

### 1.6.2

- update for react 15.2, eliminates Unknown Prop Warning

### 1.6.1

- Added conditional warning on unmatched variable during interpolation [PR 160](https://github.com/i18next/react-i18next/pull/160

### 1.6.0

- Hoist non react statics [PR 150](https://github.com/i18next/react-i18next/pull/150

### 1.5.3

- Handle i18next added and removed resource events [PR 150](https://github.com/i18next/react-i18next/pull/150

### 1.5.2

- move ns loading to did mount

### 1.5.1

- possible fix for HRM issues

### 1.5.0

- adds wait option, which delays initial rendering until translations are loaded

### 1.4.2

- possible fix for HRM issues

### 1.4.1

- change global name

### 1.4.0

- adds getWrappedInstance() to translate wrapper

### 1.3.0

- Support for universal apps / server-side rendering [PR 52](https://github.com/i18next/react-i18next/pull/52)

### 1.2.2

- fixes bower json - bower publish only

### 1.2.0

- change build to rollup

### 1.1.0

- added WrappedComponent property to translate wrapper [PR 15](https://github.com/i18next/react-i18next/pull/15)

### 1.0.1

- fixing export of index

### 1.0.0

- change package.json main to `/lib/index.js`
- move build from gulp to npm run script
