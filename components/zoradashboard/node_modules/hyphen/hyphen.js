/** Text hyphenation in Javascript.
 *  Copyright (C) 2021 Yevhen Tiurin (yevhentiurin@gmail.com)
 *  https://github.com/ytiurin/hyphen
 *
 *  Released under the ISC license
 *  https://github.com/ytiurin/hyphen/blob/master/LICENSE
 */
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.createHyphenator = factory();
  }
})(this, function () {
  var SETTING_DEFAULT_ASYNC = false,
    SETTING_DEFAULT_DEBUG = false,
    SETTING_DEFAULT_HTML = false,
    SETTING_DEFAULT_HYPH_CHAR = "\u00AD",
    SETTING_DEFAULT_MIN_WORD_LENGTH = 5,
    SETTING_NAME_ASYNC = "async",
    SETTING_NAME_DEBUG = "debug",
    SETTING_NAME_HTML = "html",
    SETTING_NAME_HYPH_CHAR = "hyphenChar",
    SETTING_NAME_MIN_WORD_LENGTH = "minWordLength";

  var _global =
    typeof global === "object"
      ? global
      : typeof window === "object"
      ? window
      : typeof this === "object"
      ? this
      : {};

  function cloneObj(source) {
    var target = {};
    for (var key in source) {
      target[key] = source[key];
    }
    return target;
  }

  function keyOrDefault(object, key, defaultValue) {
    if (key in object) {
      return object[key];
    }
    return defaultValue;
  }

  function exceptionsFromDefinition(patternsDefinition, hyphenChar) {
    return patternsDefinition.exceptions.reduce(function (
      exceptions,
      exception
    ) {
      exceptions[exception.replace(/\-/g, "")] = exception.replace(
        /\-/g,
        hyphenChar
      );
      return exceptions;
    },
    {});
  }

  function createHyphenator(patternsDefinition, options) {
    options = options || {};
    var //
      asyncMode = keyOrDefault(
        options,
        SETTING_NAME_ASYNC,
        SETTING_DEFAULT_ASYNC
      ),
      caches = {},
      debug = keyOrDefault(options, SETTING_NAME_DEBUG, SETTING_DEFAULT_DEBUG),
      exceptions = {},
      hyphenChar = keyOrDefault(
        options,
        SETTING_NAME_HYPH_CHAR,
        SETTING_DEFAULT_HYPH_CHAR
      ),
      patterns = patternsDefinition.patterns.map(preprocessPattern),
      minWordLength =
        keyOrDefault(
          options,
          SETTING_NAME_MIN_WORD_LENGTH,
          SETTING_DEFAULT_MIN_WORD_LENGTH
        ) >> 0,
      skipHTML = keyOrDefault(options, SETTING_NAME_HTML, SETTING_DEFAULT_HTML);

    // Prepare cache
    var cacheKey = hyphenChar + minWordLength;
    exceptions[cacheKey] = exceptionsFromDefinition(
      patternsDefinition,
      hyphenChar
    );
    caches[cacheKey] = cloneObj(exceptions[cacheKey]);

    if (asyncMode && !("Promise" in _global)) {
      throw new Error(
        "Failed to create hyphenator: Could not find global Promise object, needed for hyphenator to work in async mode"
      );
    }

    return function (text, options) {
      options = options || {};

      var localDebug = keyOrDefault(options, SETTING_NAME_DEBUG, debug),
        localHyphenChar = keyOrDefault(
          options,
          SETTING_NAME_HYPH_CHAR,
          hyphenChar
        ),
        localMinWordLength =
          keyOrDefault(options, SETTING_NAME_MIN_WORD_LENGTH, minWordLength) >>
          0,
        cacheKey = localHyphenChar + localMinWordLength;

      if (!exceptions[cacheKey]) {
        exceptions[cacheKey] = exceptionsFromDefinition(
          patternsDefinition,
          localHyphenChar
        );
      }

      if (!caches[cacheKey]) {
        caches[cacheKey] = cloneObj(exceptions[cacheKey]);
      }

      return start(
        text,
        patterns,
        caches[cacheKey],
        localDebug,
        localHyphenChar,
        skipHTML,
        localMinWordLength,
        asyncMode
      );
    };
  }
  function createTextChunkReader(text, hyphenChar, skipHTML, minWordLength) {
    function readNextTextChunk() {
      var nextTextChunk = "";

      shouldHyphenate = void 0;

      chunkReader: while (nextCharIndex <= text.length) {
        var //
          nextChar = text.charAt(nextCharIndex++),
          charIsLetter =
            !!nextChar && !/\s|[\!-\@\[-\`\{-\~\u2013-\u203C]/.test(nextChar),
          charIsAngleOpen = nextChar === "<",
          charIsAngleClose = nextChar === ">",
          charIsHyphen = nextChar === hyphenChar;

        do {
          if (state === STATE_READ_TAG) {
            if (charIsAngleClose) {
              state = STATE_RETURN_UNTOUCHED;
            }
            break;
          }

          if (charIsHyphen) {
            shouldHyphenate = SHOULD_SKIP;
            state = STATE_READ_WORD;
            break;
          }

          if (charIsLetter) {
            state = STATE_READ_WORD;
            break;
          }

          if (state === STATE_READ_WORD) {
            state = STATE_RETURN_WORD;
            shouldHyphenate =
              shouldHyphenate ||
              (nextTextChunk.length >= minWordLength && SHOULD_HYPHENATE);
            break;
          }

          shouldHyphenate = SHOULD_SKIP;
          state = STATE_RETURN_UNTOUCHED;
        } while (0);

        if (
          charIsAngleOpen &&
          state !== STATE_RETURN_WORD &&
          skipHTML &&
          !isSpacelike(text.charAt(nextCharIndex))
        ) {
          shouldHyphenate = SHOULD_SKIP;
          state = STATE_READ_TAG;
        }

        switch (state) {
          case STATE_READ_TAG:
            nextTextChunk += nextChar;
            break;

          case STATE_READ_WORD:
            nextTextChunk += nextChar;
            break;

          case STATE_RETURN_UNTOUCHED:
            nextTextChunk += nextChar;
            break chunkReader;

          case STATE_RETURN_WORD:
            nextCharIndex--;
            break chunkReader;
        }
      }
      return nextTextChunk || void 0;
    }

    function shouldNextHyphenate() {
      return shouldHyphenate === SHOULD_HYPHENATE;
    }

    var isSpacelike = RegExp.prototype.test.bind(/\s/);

    var //
      nextCharIndex = 0,
      SHOULD_HYPHENATE = 1,
      SHOULD_SKIP = 2,
      shouldHyphenate,
      STATE_READ_TAG = 1,
      STATE_READ_WORD = 2,
      STATE_RETURN_UNTOUCHED = 3,
      STATE_RETURN_WORD = 4,
      state;

    return [readNextTextChunk, shouldNextHyphenate];
  }
  function hyphenateWord(text, patterns, debug, hyphenChar) {
    var //
      levels = new Array(text.length + 1),
      loweredText = text.toLocaleLowerCase(),
      p = [],
      patternData,
      patternIndex = 0;

    for (var i = levels.length; i--; ) levels[i] = 0;

    while ((patternData = patterns[patternIndex++])) {
      var //
        fromChar = 0,
        endPattern = false;
      while (!endPattern) {
        var //
          patternEntityIndex = loweredText.indexOf(patternData.text, fromChar),
          patternFits =
            patternEntityIndex > -1 &&
            (patternData.stickToLeft ? patternEntityIndex === 0 : true) &&
            (patternData.stickToRight
              ? patternEntityIndex + patternData.text.length === text.length
              : true);

        if (patternFits) {
          p.push(patternData.pattern + ">" + patternData.levels.join(""));

          for (var i = 0; i < patternData.levels.length; i++)
            levels[patternEntityIndex + i] = Math.max(
              patternData.levels[i],
              levels[patternEntityIndex + i]
            );
        }
        if (patternEntityIndex > -1 && patternData.text.length > 0) {
          fromChar = patternEntityIndex + patternData.text.length + 1;
        } else {
          endPattern = true;
        }
      }
    }

    levels[0] = levels[1] = levels[levels.length - 1] = levels[
      levels.length - 2
    ] = 0;

    var //
      hyphenatedText = "",
      leveledText = "",
      debugHyphenatedText = "";

    for (var i = 0; i < levels.length; i++) {
      hyphenatedText +=
        (levels[i] % 2 === 1 ? hyphenChar : "") + text.charAt(i);
      debugHyphenatedText += (levels[i] % 2 === 1 ? "-" : "") + text.charAt(i);
      leveledText += (levels[i] > 0 ? levels[i] : "") + text.charAt(i);
    }

    if (debug)
      console.log.apply(
        console,
        [text, "->"]
          .concat(p)
          .concat(["->"])
          .concat(levels)
          .concat(["->", leveledText])
          .concat(["->", debugHyphenatedText])
      );

    return hyphenatedText;
  }
  function preprocessPattern(pattern) {
    var //
      patternCharIndex = 0,
      patternChar,
      patternData = {
        pattern: pattern,
        text: "",
        levels: [],
        stickToLeft: 0,
        stickToRight: 0
      },
      states = { alphabet: 1, level: 2, stickToLeft: 3, stickToRight: 4 };

    while ((patternChar = pattern.charAt(patternCharIndex++))) {
      var //
        charIsDot = patternChar === ".",
        charIsNumber = !charIsDot && /\d/.test(patternChar),
        state = charIsDot
          ? patternCharIndex - 1 === 0
            ? states.stickToLeft
            : states.stickToRight
          : charIsNumber
          ? states.level
          : states.alphabet;

      switch (state) {
        case states.alphabet:
          !prevCharIsNumber && patternData.levels.push(0);
          patternData.text += patternChar;
          break;

        case states.level:
          patternData.levels.push(parseInt(patternChar));
          break;

        case states.stickToLeft:
          patternData.stickToLeft = true;
          break;

        case states.stickToRight:
          patternData.stickToRight = true;
          break;
      }

      var prevCharIsNumber = charIsNumber;
    }

    return patternData;
  }
  function start(
    text,
    patterns,
    cache,
    debug,
    hyphenChar,
    skipHTML,
    minWordLength,
    isAsync
  ) {
    function done() {
      allTime = new Date() - allTime;
      resolveNewText(newText);

      if (debug) {
        console.log(
          "----------------\nHyphenation stats: " +
            processedN +
            " text chunks processed, " +
            hyphenatedN +
            " words hyphenated"
        );
        console.log("Work time: " + workTime / 1000);
        console.log("Wait time: " + (allTime - workTime) / 1000);
        console.log("All time: " + allTime / 1000);
      }
    }

    var //
      cacheKey,
      newText = "",
      textChunk,
      reader = createTextChunkReader(text, hyphenChar, skipHTML, minWordLength),
      readNextTextChunk = reader[0],
      shouldNextHyphenate = reader[1],
      processedN = 0,
      hyphenatedN = 0;

    var //
      allTime = new Date(),
      workTime = 0;

    var resolveNewText = function () {};

    function nextTick() {
      var loopStart = new Date();

      while (
        (!isAsync || new Date() - loopStart < 10) &&
        (textChunk = readNextTextChunk())
      ) {
        cacheKey = textChunk.length ? "$" + textChunk : "";

        if (shouldNextHyphenate()) {
          if (cache[cacheKey] === undefined) {
            cache[cacheKey] = hyphenateWord(
              textChunk,
              patterns,
              debug,
              hyphenChar
            );
          }

          if (textChunk !== cache[cacheKey]) {
            hyphenatedN++;
          }

          textChunk = cache[cacheKey];
        }

        newText += textChunk;
        processedN++;
      }

      workTime += new Date() - loopStart;

      if (!textChunk) {
        done();
      } else {
        setTimeout(nextTick);
      }
    }

    if (isAsync) {
      setTimeout(nextTick);
      return new Promise(function (resolve) {
        resolveNewText = resolve;
      });
    } else {
      nextTick();
      return newText;
    }
  }

  return createHyphenator;
});
