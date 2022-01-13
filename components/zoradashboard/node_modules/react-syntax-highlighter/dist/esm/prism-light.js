import highlight from './highlight';
import refractor from 'refractor/core';
var SyntaxHighlighter = highlight(refractor, {});

SyntaxHighlighter.registerLanguage = function (_, language) {
  return refractor.register(language);
};

export default SyntaxHighlighter;