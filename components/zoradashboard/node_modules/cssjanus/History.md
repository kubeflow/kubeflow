# Release History

## v2.1.0 / 2021-05-02

* Fix unexpected flipping in selectors with the general sibling combinator (Mainframe98, [#85](https://github.com/cssjanus/cssjanus/issues/85)).

## v2.0.0 / 2020-08-23

Node.js 10 or later is required.

* Fix unexpected flipping in certain cases involving double quotes or comments in selectors (YairRand, [#35](https://github.com/cssjanus/cssjanus/issues/35)).
* Drop support for Node.js 6 and 8 (Timo Tijhof).

## v1.3.2 / 2019-05-10

* test: Add a large test case to catch backtrack limit problem (James Forrester).
* Document a known backtrack issue, not yet known to affect Node.js (Timo Tijhof).

## v1.3.1 / 2018-10-15

* Fix bug where `transform` didn't flip on lines without semicolon (YairRand).

## v1.3.0 / 2018-07-03

* Fix unintended flipping of selectors containing a backslash (YairRand).
* Make cssjanus.js compatible with Closure Compiler (Chris Scribner).
* Drop support for Node.js 4; This release requires Node 6 (Timo Tijhof).

## v1.2.2 / 2018-02-11

* build: Add 'files' publishing whitelist to package.json (Timo Tijhof).

## v1.2.1 / 2017-10-23

* Drop support for Node.js v0.10 and v0.12 (Timo Tijhof).
* test: Cover border-radius with three values (Timo Tijhof).

## v1.2.0 / 2017-03-14

* Flip `translate(x[,y,z])` and `translateX(x)` (Ed Sanders).

## v1.1.3 / 2016-12-23

* Do not flip offset-y in text-shadow, even when color isn't as first value (Ed Sanders).

## v1.1.2 / 2015-02-03

* Support !important and slash in border-radius values (Dominik Schilling).

## v1.1.1 / 2014-11-19

* Support !important in four-value declarations (Matthew Flaschen).

## v1.1.0 / 2014-09-23

* Move repository to github.com/cssjanus (Timo Tijhof).
* Drop support for node.js v0.8 (Timo Tijhof).
* Correct documentation of calculateNewBorderRadius (Ed Sanders).
* test: Convert test cases to JSON (Timo Tijhof).
* Do not flip unknown properties starting with "left" or "right" (Timo Tijhof).
* Do not flip five or more consecutive values (Timo Tijhof).
* Support CSS3 rgb(a) and hsl(a) color notation (Timo Tijhof).
* Flip text-shadow and box-shadow (Timo Tijhof).
* Account for attribute selectors in open brace lookahead (Timo Tijhof).
* Account for minified values in border-radius (Roan Kattouw).
* Flip border-style (Timo Tijhof).
* Account for decimals and lack of vertical value in background-position (Roan Kattouw).

## v1.0.2 / 2014-01-28

* Prevent issues with css selectors containing parentheses (Yoav Farhi).
* Fix bgHorizontalPercentageRegExp to not be too greedy (Dion Hulse).
* Support `/*!` syntax for @noflip (Tom Yam).

## v1.0.1 / 2013-08-08

* Fix global variable leak (Trevor Parscal).

## v1.0.0 / 2012-06-28

* Initial commit (Trevor Parscal).
