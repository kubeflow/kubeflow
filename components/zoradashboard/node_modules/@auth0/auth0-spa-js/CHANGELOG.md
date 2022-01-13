# Change Log

## [v1.16.1](https://github.com/auth0/auth0-spa-js/tree/v1.16.1) (2021-07-07)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.16.0...v1.16.1)

**Fixed**

- Changes to logout and cache synchronicity [\#758](https://github.com/auth0/auth0-spa-js/pull/758) ([stevehobbsdev](https://github.com/stevehobbsdev))

## [v1.16.0](https://github.com/auth0/auth0-spa-js/tree/v1.16.0) (2021-07-05)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.15.0...v1.16.0)

**Added**

- [SDK-2555] Extensible Cache [\#743](https://github.com/auth0/auth0-spa-js/pull/743) ([stevehobbsdev](https://github.com/stevehobbsdev))

## [v1.15.0](https://github.com/auth0/auth0-spa-js/tree/v1.15.0) (2021-04-29)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.14.0...v1.15.0)

**Added**

- Add Popup cancelled event [\#724](https://github.com/auth0/auth0-spa-js/pull/724) ([degrammer](https://github.com/degrammer))

**Fixed**

- Fix popup blocker showing for loginWithPopup in Firefox & Safari [\#732](https://github.com/auth0/auth0-spa-js/pull/732) ([stevehobbsdev](https://github.com/stevehobbsdev))

## [v1.14.0](https://github.com/auth0/auth0-spa-js/tree/v1.14.0) (2021-03-22)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.13.6...v1.14.0)

**Added**

- feat(loginWithRedirect): add redirectMethod option [\#717](https://github.com/auth0/auth0-spa-js/pull/717) ([slaywell](https://github.com/slaywell))
- Export errors for type checking [\#716](https://github.com/auth0/auth0-spa-js/pull/716) ([adamjmcgrath](https://github.com/adamjmcgrath))

**Changed**

- Add screen_hint parameter to BaseLoginOptions [\#721](https://github.com/auth0/auth0-spa-js/pull/721) ([damieng](https://github.com/damieng))

**Fixed**

- Updated minor syntax, to allow for TypeScript compiler to be happier [\#714](https://github.com/auth0/auth0-spa-js/pull/714) ([kachihro](https://github.com/kachihro))
- Revert [SDK-2183] Add warning when requested scopes differ from retrieved scopes [\#712](https://github.com/auth0/auth0-spa-js/pull/712) ([frederikprijck](https://github.com/frederikprijck))

## [v1.13.6](https://github.com/auth0/auth0-spa-js/tree/v1.13.6) (2021-01-07)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.13.5...v1.13.6)

**Changed**

- Update docs for getIdTokenClaims and getUser [\#690](https://github.com/auth0/auth0-spa-js/pull/690) ([adamjmcgrath](https://github.com/adamjmcgrath))
- [SDK-2238] Only use timeout promise when using fetchWithTimeout without a worker [\#689](https://github.com/auth0/auth0-spa-js/pull/689) ([frederikprijck](https://github.com/frederikprijck))
- Do not use AbortController in the worker if not available [\#679](https://github.com/auth0/auth0-spa-js/pull/679) ([stevehobbsdev](https://github.com/stevehobbsdev))
- Do not send useCookiesForTransactions to authorize request [\#673](https://github.com/auth0/auth0-spa-js/pull/673) ([frederikprijck](https://github.com/frederikprijck))

**Fixed**

- Remove the nonce check in handleRedirectCallback [\#678](https://github.com/auth0/auth0-spa-js/pull/678) ([stevehobbsdev](https://github.com/stevehobbsdev))

**Security**

- Update wait-on to solve security vulnerability [\#687](https://github.com/auth0/auth0-spa-js/pull/687) ([frederikprijck](https://github.com/frederikprijck))
- [Security] Bump ini from 1.3.5 to 1.3.7 [\#672](https://github.com/auth0/auth0-spa-js/pull/672) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

## [v1.13.5](https://github.com/auth0/auth0-spa-js/tree/v1.13.5) (2020-12-08)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.13.4...v1.13.5)

**Changed**

- [SDK-2173] Expand on behaviour of checkSession in docs [\#666](https://github.com/auth0/auth0-spa-js/pull/666) ([stevehobbsdev](https://github.com/stevehobbsdev))
- [SDK-2183] Add warning when requested scopes differ from retrieved scopes [\#665](https://github.com/auth0/auth0-spa-js/pull/665) ([frederikprijck](https://github.com/frederikprijck))
- [SDK-2170] Avoid the possibility to do simultaneous calls to the token endpoint [\#664](https://github.com/auth0/auth0-spa-js/pull/664) ([frederikprijck](https://github.com/frederikprijck))
- [SDK-2025] Internal module refactor [\#661](https://github.com/auth0/auth0-spa-js/pull/661) ([stevehobbsdev](https://github.com/stevehobbsdev))
- [SDK-2039] Change cache lookup mechanism [\#652](https://github.com/auth0/auth0-spa-js/pull/652) ([frederikprijck](https://github.com/frederikprijck))

**Fixed**

- [SDK-1739] Recover and logout when throwing invalid_grant on Refresh Token [\#668](https://github.com/auth0/auth0-spa-js/pull/668) ([frederikprijck](https://github.com/frederikprijck))

**Remarks**

This release updates the `getUser` return type to be more correct. Instead of returning `Promise<TUser>`, it now returns `Promise<TUser | undefined>`, which might lead to an `Object is possible 'undefined'` compiler error in situation where the return value is not checked for being undefined while having set the TypeScript's `--strictNullChecks` compiler flag to `true`.

## [v1.13.4](https://github.com/auth0/auth0-spa-js/tree/v1.13.4) (2020-12-02)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.13.3...v1.13.4)

**Added**

- [SDK-2172] Add SDK metrics to all API calls [\#659](https://github.com/auth0/auth0-spa-js/pull/659) ([frederikprijck](https://github.com/frederikprijck))

**Changed**

- [SDK-1159] Use generics for getUser [\#651](https://github.com/auth0/auth0-spa-js/pull/651) ([frederikprijck](https://github.com/frederikprijck))

## [v1.13.3](https://github.com/auth0/auth0-spa-js/tree/v1.13.3) (2020-11-13)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.13.2...v1.13.3)

**Fixed**

- [SDK-2156] Heed timeoutInSeconds when calling getTokenSilently with refresh tokens [\#639](https://github.com/auth0/auth0-spa-js/pull/639) ([stevehobbsdev](https://github.com/stevehobbsdev))

## [v1.13.2](https://github.com/auth0/auth0-spa-js/tree/v1.13.2) (2020-11-09)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.13.1...v1.13.2)

**Added**

- [SDK-2121] Add support for token validation for Organizations [\#631](https://github.com/auth0/auth0-spa-js/pull/631) ([stevehobbsdev](https://github.com/stevehobbsdev))

## [v1.13.1](https://github.com/auth0/auth0-spa-js/tree/v1.13.1) (2020-10-29)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.13.0...v1.13.1)

**Changed**

- [SDK-2037] Remove cacheLocation guard from checkSession [\#613](https://github.com/auth0/auth0-spa-js/pull/613) ([frederikprijck](https://github.com/frederikprijck))
- [SDK-2092] Do not use Web Worker for Safari < 12.1 [\#612](https://github.com/auth0/auth0-spa-js/pull/612) ([frederikprijck](https://github.com/frederikprijck))

**Fixed**

- Fix leaking windows message event listener [\#422](https://github.com/auth0/auth0-spa-js/pull/422) ([yinzara](https://github.com/yinzara))

## [v1.13.0](https://github.com/auth0/auth0-spa-js/tree/v1.13.0) (2020-10-21)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.12.1...v1.13.0)

**Added**

- [SDK-2042] Fallback option for transactions using cookies [\#603](https://github.com/auth0/auth0-spa-js/pull/603) ([stevehobbsdev](https://github.com/stevehobbsdev))
- Refactor logout to use buildLogoutUrl [\#595](https://github.com/auth0/auth0-spa-js/pull/595) ([rnwolfe](https://github.com/rnwolfe))
- Add an option to extend cookie expire day [\#586](https://github.com/auth0/auth0-spa-js/pull/586) ([luisfmsouza](https://github.com/luisfmsouza))

**Fixed**

- Use AbortController polyfill in Web Worker [\#598](https://github.com/auth0/auth0-spa-js/pull/598) ([frederikprijck](https://github.com/frederikprijck))
- [SDK-1994] GMaps breaks SPA JS on IE11 [\#592](https://github.com/auth0/auth0-spa-js/pull/592) ([adamjmcgrath](https://github.com/adamjmcgrath))

## [v1.12.1](https://github.com/auth0/auth0-spa-js/tree/v1.12.1) (2020-09-17)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.12.0...v1.12.1)

**Fixed**

- Remove `sessionStorage` requirement from instantiation to fix SSR environments [\#578](https://github.com/auth0/auth0-spa-js/pull/578) ([adamjmcgrath](https://github.com/adamjmcgrath))

## [v1.12.0](https://github.com/auth0/auth0-spa-js/tree/v1.12.0) (2020-09-04)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.11.0...v1.12.0)

**Added**

- [SDK-1858] Create legacy samsite cookie by default [\#568](https://github.com/auth0/auth0-spa-js/pull/568) ([adamjmcgrath](https://github.com/adamjmcgrath))

**Changed**

- Dependency updates [\#569](https://github.com/auth0/auth0-spa-js/pull/569) ([stevehobbsdev](https://github.com/stevehobbsdev))
- Update FAQ.md with information on silent authentication problems [\#550](https://github.com/auth0/auth0-spa-js/pull/550) ([stevehobbsdev](https://github.com/stevehobbsdev))

**Fixed**

- [SDK-1837] Session storage support for transactions [\#564](https://github.com/auth0/auth0-spa-js/pull/564) ([stevehobbsdev](https://github.com/stevehobbsdev))
- [SDK-1924] client methods should handle partially filled arguments [\#561](https://github.com/auth0/auth0-spa-js/pull/561) ([adamjmcgrath](https://github.com/adamjmcgrath))
- [SDK-1885] Add some additional state validation [\#560](https://github.com/auth0/auth0-spa-js/pull/560) ([adamjmcgrath](https://github.com/adamjmcgrath))
- [SDK-1912] Unnecessary latency in `getTokenSilently` with primed cache [\#558](https://github.com/auth0/auth0-spa-js/pull/558) ([adamjmcgrath](https://github.com/adamjmcgrath))
- fix: add missing types to utils.ts and errors.ts [\#547](https://github.com/auth0/auth0-spa-js/pull/547) ([SeyyedKhandon](https://github.com/SeyyedKhandon))
- Exclude windows absolute paths as well as posix [\#534](https://github.com/auth0/auth0-spa-js/pull/534) ([adamjmcgrath](https://github.com/adamjmcgrath))

## [v1.11.0](https://github.com/auth0/auth0-spa-js/tree/v1.11.0) (2020-07-21)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.10.0...v1.11.0)

**Added**

- [SDK-1560] Allow issuer as url [\#523](https://github.com/auth0/auth0-spa-js/pull/523) ([adamjmcgrath](https://github.com/adamjmcgrath))
- [SDK-1790] use refresh_tokens with multiple audiences [\#521](https://github.com/auth0/auth0-spa-js/pull/521) ([adamjmcgrath](https://github.com/adamjmcgrath))
- [SDK-1650] Add `message` to errors that don't have one [\#520](https://github.com/auth0/auth0-spa-js/pull/520) ([adamjmcgrath](https://github.com/adamjmcgrath))

**Fixed**

- [SDK-1798] prevent unnecessary token requests [\#525](https://github.com/auth0/auth0-spa-js/pull/525) ([adamjmcgrath](https://github.com/adamjmcgrath))
- [SDK-1789] Add custom initial options to the 2 getToken methods [\#524](https://github.com/auth0/auth0-spa-js/pull/524) ([adamjmcgrath](https://github.com/adamjmcgrath))

## [v1.10.0](https://github.com/auth0/auth0-spa-js/tree/v1.10.0) (2020-06-17)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.9.0...v1.10.0)

**Changed**

- [SDK-1696] Allow caller of cache.get to specify an expiry time adjustment [\#491](https://github.com/auth0/auth0-spa-js/pull/491) ([stevehobbsdev](https://github.com/stevehobbsdev))

**Fixed**

- Don't include mocks in build [\#503](https://github.com/auth0/auth0-spa-js/pull/503) ([adamjmcgrath](https://github.com/adamjmcgrath))
- [SDK-1699] Fix ID token validation for auth_time [\#497](https://github.com/auth0/auth0-spa-js/pull/497) ([stevehobbsdev](https://github.com/stevehobbsdev))
- Add secure attribute to cookies if served over HTTPS [\#472](https://github.com/auth0/auth0-spa-js/pull/472) ([ties-v](https://github.com/ties-v))

## [v1.9.0](https://github.com/auth0/auth0-spa-js/tree/v1.9.0) (2020-06-02)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.8.2...v1.9.0)

**Added**

- [SDK-1695] Add `auth0Client` option so wrapper libraries can send their own client info [\#490](https://github.com/auth0/auth0-spa-js/pull/490) ([adamjmcgrath](https://github.com/adamjmcgrath))
- Add `checkSession` and ignore recoverable errors [\#482](https://github.com/auth0/auth0-spa-js/pull/482) ([adamjmcgrath](https://github.com/adamjmcgrath))

**Fixed**

- Update docs for returnTo and client_id params on logout [\#484](https://github.com/auth0/auth0-spa-js/pull/484) ([stevehobbsdev](https://github.com/stevehobbsdev))

## [v1.8.2](https://github.com/auth0/auth0-spa-js/tree/v1.8.2) (2020-05-26)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.8.1...v1.8.2)

**Fixed**

- [SDK-1640] Allow the client to be constructed in a Node SSR environment [\#471](https://github.com/auth0/auth0-spa-js/pull/471) ([adamjmcgrath](https://github.com/adamjmcgrath))
- [SDK-1634] Pass custom options to the token endpoint [\#465](https://github.com/auth0/auth0-spa-js/pull/465) ([stevehobbsdev](https://github.com/stevehobbsdev))
- [SDK-1649] Fix issue where cache was missed when scope parameter was provided [\#461](https://github.com/auth0/auth0-spa-js/pull/461) ([adamjmcgrath](https://github.com/adamjmcgrath))

## [v1.8.1](https://github.com/auth0/auth0-spa-js/tree/v1.8.1) (2020-05-06)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.8.0...v1.8.1)

**Fixed**

- Fix issue with create-react-app webpack build [\#451](https://github.com/auth0/auth0-spa-js/pull/451) ([adamjmcgrath](https://github.com/adamjmcgrath))

## [v1.8.0](https://github.com/auth0/auth0-spa-js/tree/v1.8.0) (2020-04-30)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.7.0...v1.8.0)

**Added**

- [SDK-1417] Customizable default scopes [\#435](https://github.com/auth0/auth0-spa-js/pull/435) ([stevehobbsdev](https://github.com/stevehobbsdev))
- include polyfill for Set [\#426](https://github.com/auth0/auth0-spa-js/pull/426) ([tony-aq](https://github.com/tony-aq))

**Fixed**

- Update rollup-plugin-web-worker-loader to 1.1.1 [\#443](https://github.com/auth0/auth0-spa-js/pull/443) ([stevehobbsdev](https://github.com/stevehobbsdev))
- Updated `login_hint` js docs to clarify usage with Lock [\#441](https://github.com/auth0/auth0-spa-js/pull/441) ([stevehobbsdev](https://github.com/stevehobbsdev))

## [v1.7.0](https://github.com/auth0/auth0-spa-js/tree/v1.7.0) (2020-04-15)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.7.0-beta.5...v1.7.0)

**Added**

- Support for rotating refresh tokens [\#315](https://github.com/auth0/auth0-spa-js/pull/315) ([stevehobbsdev](https://github.com/stevehobbsdev))
- Export types from global TypeScript file. [\#310](https://github.com/auth0/auth0-spa-js/pull/310) ([maxswa](https://github.com/maxswa))
- Local Storage caching mechanism [\#303](https://github.com/auth0/auth0-spa-js/pull/303) ([stevehobbsdev](https://github.com/stevehobbsdev))

**Changed**

- Use Web Workers for token endpoint call for in-memory storage [\#409](https://github.com/auth0/auth0-spa-js/pull/409) ([adamjmcgrath](https://github.com/adamjmcgrath))
- Export constructor [\#385](https://github.com/auth0/auth0-spa-js/pull/385) ([adamjmcgrath](https://github.com/adamjmcgrath))
- Fall back to iframe method if no refresh token is available [\#364](https://github.com/auth0/auth0-spa-js/pull/364) ([stevehobbsdev](https://github.com/stevehobbsdev))
- Removed setTimeout cache removal in favour of removal-on-read [\#354](https://github.com/auth0/auth0-spa-js/pull/354) ([stevehobbsdev](https://github.com/stevehobbsdev))
- Stop checking `isAuthenticated` cookie on initialization when using local storage [\#352](https://github.com/auth0/auth0-spa-js/pull/352) ([stevehobbsdev](https://github.com/stevehobbsdev))
- getTokenSilently retry logic [\#336](https://github.com/auth0/auth0-spa-js/pull/336) ([stevehobbsdev](https://github.com/stevehobbsdev))
- Fixed issue with cache not retaining refresh token [\#333](https://github.com/auth0/auth0-spa-js/pull/333) ([stevehobbsdev](https://github.com/stevehobbsdev))

**Fixed**

- Check if source of event exists before closing it [\#410](https://github.com/auth0/auth0-spa-js/pull/410) ([gerritdeperrit](https://github.com/gerritdeperrit))
- Check if iframe is still in body before removing [\#399](https://github.com/auth0/auth0-spa-js/pull/399) ([paulfalgout](https://github.com/paulfalgout))
- Fix typings to allow custom claims in ID token [\#386](https://github.com/auth0/auth0-spa-js/pull/386) ([picosam](https://github.com/picosam))
- Fix error in library type definitions [\#367](https://github.com/auth0/auth0-spa-js/pull/367) ([devoto13](https://github.com/devoto13))

**Security**

- Dependency upgrade [\#405](https://github.com/auth0/auth0-spa-js/pull/405) ([stevehobbsdev](https://github.com/stevehobbsdev))

## [v1.7.0-beta.5](https://github.com/auth0/auth0-spa-js/tree/v1.7.0-beta.5) (2020-03-26)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.7.0-beta.4...v1.7.0-beta.5)

**Changed**

- [SDK-1379] Export constructor [\#385](https://github.com/auth0/auth0-spa-js/pull/385) ([adamjmcgrath](https://github.com/adamjmcgrath))

## [v1.7.0-beta.4](https://github.com/auth0/auth0-spa-js/tree/v1.7.0-beta.4) (2020-03-03)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.7.0-beta.3...v1.7.0-beta.4)

**Changed**

- [SDK-1386] Fall back to iframe method if no refresh token is available [\#364](https://github.com/auth0/auth0-spa-js/pull/364) ([stevehobbsdev](https://github.com/stevehobbsdev))

**Fixed**

- Fix error in library type definitions [\#367](https://github.com/auth0/auth0-spa-js/pull/367) ([devoto13](https://github.com/devoto13))

## [v1.7.0-beta.3](https://github.com/auth0/auth0-spa-js/tree/v1.7.0-beta.3) (2020-02-17)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.7.0-beta.2...v1.7.0-beta.3)

**Added**

- Export types from global TypeScript file. [\#310](https://github.com/auth0/auth0-spa-js/pull/310) ([maxswa](https://github.com/maxswa))

**Changed**

- [SDK-1352] Removed setTimeout cache removal in favour of removal-on-read [\#354](https://github.com/auth0/auth0-spa-js/pull/354) ([stevehobbsdev](https://github.com/stevehobbsdev))
- [SDK-1352] Stop checking `isAuthenticated` cookie on initialization when using local storage [\#352](https://github.com/auth0/auth0-spa-js/pull/352) ([stevehobbsdev](https://github.com/stevehobbsdev))
- [SDK-1279] getTokenSilently retry logic [\#336](https://github.com/auth0/auth0-spa-js/pull/336) ([stevehobbsdev](https://github.com/stevehobbsdev))

## [v1.7.0-beta.2](https://github.com/auth0/auth0-spa-js/tree/v1.7.0-beta.2) (2020-01-16)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.7.0-beta.1...v1.7.0-beta.2)

**Changed**

- Fixed issue with cache not retaining refresh token [\#333](https://github.com/auth0/auth0-spa-js/pull/333) ([stevehobbsdev](https://github.com/stevehobbsdev))

## [v1.7.0-beta.1](https://github.com/auth0/auth0-spa-js/tree/v1.7.0-beta.1) (2020-01-08)

**Added**

- Ability to use either an in-memory cache (the default) or localstorage to store tokens - [stevehobbsdev](https://github.com/stevehobbsdev) - https://github.com/auth0/auth0-spa-js/pull/303
- Added support for rotating refresh tokens - [stevehobbsdev](https://github.com/stevehobbsdev) - https://github.com/auth0/auth0-spa-js/pull/315

## [v1.6.5](https://github.com/auth0/auth0-spa-js/tree/v1.6.5) (2020-03-19)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.6.4...v1.6.5)

**Changed**

- [SDK-1395] Refactor loginWithPopup to optionally accept an existing popup window [\#368](https://github.com/auth0/auth0-spa-js/pull/368) ([stevehobbsdev](https://github.com/stevehobbsdev))
- handleRedirectCallback wont pass redirect_uri undefined if not set in transaction [\#374](https://github.com/auth0/auth0-spa-js/pull/374) ([albertlockett](https://github.com/albertlockett))
- Update dependencies within semver ranges [\#371](https://github.com/auth0/auth0-spa-js/pull/371) ([stevehobbsdev](https://github.com/stevehobbsdev))
- [SDK-1099] Add `localOnly` logout option [\#362](https://github.com/auth0/auth0-spa-js/pull/362) ([adamjmcgrath](https://github.com/adamjmcgrath))
- center popup over owner window [\#356](https://github.com/auth0/auth0-spa-js/pull/356) ([ggascoigne](https://github.com/ggascoigne))

**Fixed**

- [SDK-1127] Delay removal of iframe to prevent Chrome hanging status bug #240 [\#376](https://github.com/auth0/auth0-spa-js/pull/376) ([adamjmcgrath](https://github.com/adamjmcgrath))
- [SDK-1125] createAuth0Client now throws errors that are not login_required [\#369](https://github.com/auth0/auth0-spa-js/pull/369) ([stevehobbsdev](https://github.com/stevehobbsdev))

## [v1.6.4](https://github.com/auth0/auth0-spa-js/tree/v1.6.4) (2020-02-10)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.6.3...v1.6.4)

**Changed**

- [SDK-1308] Return appState value on error from handleRedirectCallback [\#348](https://github.com/auth0/auth0-spa-js/pull/348) ([stevehobbsdev](https://github.com/stevehobbsdev))
- Configurable timeout for getTokenSilently() [\#347](https://github.com/auth0/auth0-spa-js/pull/347) ([Serjlee](https://github.com/Serjlee))

## [v1.6.3](https://github.com/auth0/auth0-spa-js/tree/v1.6.3) (2020-01-28)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.6.2...v1.6.3)

**Fixed**

- Send same redirect_uri as /authorize to /token [\#341](https://github.com/auth0/auth0-spa-js/pull/341) ([stevehobbsdev](https://github.com/stevehobbsdev))
- No longer acquires a browser lock if there was a hit on the cache [\#339](https://github.com/auth0/auth0-spa-js/pull/339) ([stevehobbsdev](https://github.com/stevehobbsdev))
- Use user provided params on silent login [\#318](https://github.com/auth0/auth0-spa-js/pull/318) ([nkete](https://github.com/nkete))

## [v1.6.2](https://github.com/auth0/auth0-spa-js/tree/v1.6.2) (2020-01-13)

[Full Changelog](https://github.com/auth0/auth0-spa-js/compare/v1.6.1...v1.6.2)

**Removed**

Removed future issued-at claim check [stevehobbsdev](https://github.com/stevehobbsdev) - https://github.com/auth0/auth0-spa-js/pull/329

## [v1.6.1](https://github.com/auth0/auth0-spa-js/tree/v1.6.1) (2020-01-07)

**Fixed**

Included core-js polyfill for `String.includes` to fix an issue with browser-tabs-lock in IE11 [stevehobbsdev](https://github.com/stevehobbsdev) - https://github.com/auth0/auth0-spa-js/pull/325
Added import definition to Getting Started section in the Readme for clarity [thundermiracle](https://github.com/thundermiracle) - https://github.com/auth0/auth0-spa-js/pull/294

## [v1.6.0](https://github.com/auth0/auth0-spa-js/tree/v1.6.0) (2019-11-19)

**Added**
Added buildAuthorizeUrl and url parameter to handleRedirectCallback - [austin43](https://github.com/austin43) - https://github.com/auth0/auth0-spa-js/pull/280

**Fixed**
Released browser lock on getTokenSilently error - https://github.com/auth0/auth0-spa-js/pull/276
Updates browser-tabs-lock to fix issue of long acquired lock - [super-tokens](https://github.com/super-tokens) - https://github.com/auth0/auth0-spa-js/commit/3413e30bdb5955c818989cdc050079fa6efb6050

## [v1.5.0](https://github.com/auth0/auth0-spa-js/tree/v1.5.0) (2019-10-31)

**Added**
Add a new property 'fragment' to be appended to the authorize URL on redirect - https://github.com/auth0/auth0-spa-js/pull/249

## [v1.4.2](https://github.com/auth0/auth0-spa-js/tree/v1.4.2) (2019-10-30)

**Fixed**
Update typescript definition for max_age param - https://github.com/auth0/auth0-spa-js/pull/260
Fix for typings files in packaged SDK - https://github.com/auth0/auth0-spa-js/pull/263

## [v1.4.1](https://github.com/auth0/auth0-spa-js/tree/v1.4.1) (2019-10-30)

**Fixed**
Updated types path in package.json https://github.com/auth0/auth0-spa-js/pull/261

## [v1.4.0](https://github.com/auth0/auth0-spa-js/tree/v1.4.0) (2019-10-30)

**Added**
Add 'lock' to prevent `getTokenSilently` to be invoked in parallel https://github.com/auth0/auth0-spa-js/pull/238
Improved OIDC compliance https://github.com/auth0/auth0-spa-js/pull/248

**Fixed**
Fix for race condition when using `sha256` on IE11 https://github.com/auth0/auth0-spa-js/pull/252
Fixed the codeowners file with the correct group https://github.com/auth0/auth0-spa-js/pull/253
Document leeway default value https://github.com/auth0/auth0-spa-js/pull/256
Clear transaction data on error https://github.com/auth0/auth0-spa-js/pull/254

## [v1.3.2](https://github.com/auth0/auth0-spa-js/tree/v1.3.2) (2019-10-17)

**Fixed**
`parseQueryString` now removes hash fragment on query before parsing https://github.com/auth0/auth0-spa-js/pull/246

## [v1.3.1](https://github.com/auth0/auth0-spa-js/tree/v1.3.1) (2019-10-14)

**Fixed**
Fix IE msCrypto.subtle usage https://github.com/auth0/auth0-spa-js/pull/242

## [v1.3.0](https://github.com/auth0/auth0-spa-js/tree/v1.3.0) (2019-10-10)

**Fixed**
Add missing char for nonce/state generation https://github.com/auth0/auth0-spa-js/pull/230
Fix query parsing when using hash routing https://github.com/auth0/auth0-spa-js/pull/231
Fix safari10 initialization error https://github.com/auth0/auth0-spa-js/pull/232

**Changed**
Add early expiration of Access Token in cache https://github.com/auth0/auth0-spa-js/pull/233

## [v1.2.4](https://github.com/auth0/auth0-spa-js/tree/v1.2.4) (2019-09-24)

**Fixed**

Fix empty PKCE code challenge https://github.com/auth0/auth0-spa-js/pull/221

## [v1.2.3](https://github.com/auth0/auth0-spa-js/tree/v1.2.3) (2019-09-02)

**Fixed**

Fix incorrect state extraction from query string https://github.com/auth0/auth0-spa-js/pull/197

## [v1.2.2](https://github.com/auth0/auth0-spa-js/tree/v1.2.2) (2019-08-28)

**Fixed**

Fix SSR errors with fetch polyfill usage https://github.com/auth0/auth0-spa-js/pull/184

## [v1.2.1](https://github.com/auth0/auth0-spa-js/tree/v1.2.1) (2019-08-27)

**Fixed**

Replace promise polyfill for a pure one. This fixes using this library with zone.js. https://github.com/auth0/auth0-spa-js/pull/180

## [v1.2.0](https://github.com/auth0/auth0-spa-js/tree/v1.2.0) (2019-08-26)

**Fixed**

- Expose raw id_token in the getIdTokenClaims method https://github.com/auth0/auth0-spa-js/pull/175
- Fix bug where oauth/token call ignores `options.audience` https://github.com/auth0/auth0-spa-js/pull/134

**Added**

- Add IE11 polyfills https://github.com/auth0/auth0-spa-js/pull/154
- Add popup timeout config https://github.com/auth0/auth0-spa-js/pull/133
- Add ?federated logout param https://github.com/auth0/auth0-spa-js/pull/129

## [v1.1.1](https://github.com/auth0/auth0-spa-js/tree/v1.1.1) (2019-07-22)

**Fixed**

- Make sure the production bundle is ES5 compatible. https://github.com/auth0/auth0-spa-js/pull/98

## [v1.1.0](https://github.com/auth0/auth0-spa-js/tree/v1.1.0) (2019-07-15)

**Changed**

- Allow redirect_uri override in loginWithRedirect - https://github.com/auth0/auth0-spa-js/pull/66
- Make options argument for popup and redirect optional - https://github.com/auth0/auth0-spa-js/pull/61
- Mark redirect_uri optional in RedirectLoginOptions - https://github.com/auth0/auth0-spa-js/pull/53

## [v1.0.2](https://github.com/auth0/auth0-spa-js/tree/v1.0.2) (2019-07-02)

**Changed**

- Add polyfill for TextEncoder - https://github.com/auth0/auth0-spa-js/pull/46

## [v1.0.1](https://github.com/auth0/auth0-spa-js/tree/v1.0.1) (2019-06-24)

**Changed**

- Reduce transaction cookie size - https://github.com/auth0/auth0-spa-js/pull/32

## [v1.0.0](https://github.com/auth0/auth0-spa-js/tree/v1.0.0) (2019-06-19)

**Initial Release**
