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
    root.hyphenationPatternsNn = factory();
  }
})(this, function () {
  var patterns = [],
    hyphenation = [];

  // title: Hyphenation patterns for Norwegian, nynorsk
  // copyright: Copyright (C) 2007 Karl Ove Hufthammer
  // notice: This file is part of the hyph-utf8 package.
  //     See http://www.hyphenation.org/tex for more information.
  // language:
  //     name: Norwegian Nynorsk, nynorsk
  //     tag: nn
  // version: 2007-02-10
  // licence:
  //     text: >
  //         Copying and distribution of this file, with or without modification,
  //         are permitted in any medium without royalty, provided the copyright
  //         notice and this notice are preserved.
  // ==========================================
  // This file contains hyphenation patterns for Norwegian Nynorsk.
  // It uses the Norwegian hyphenation patterns from hyph-no.tex,
  // created by Rune Kleveland and Ole Michael Selberg. Please see
  // that file for copyright information on those patterns.
  //
  // The patterns in hyph-no.tex are based on both Norwegian Bokmål
  // and Norwegian Nynorsk, and works about equally well for both
  // languages. This file, hyph-nn.tex, contains only a few hyphenation
  // exceptions, for words that needs to be hyphenated differently for
  // the two languages.
  //
  // Please send bugs or suggestions to karl@huftis.org.
  //

  var input = "hyph-no.tex";

  var hyphenation = ["att-en-de", "bet-re", ""];

  return {
    patterns: patterns,
    exceptions: hyphenation
  };
});
