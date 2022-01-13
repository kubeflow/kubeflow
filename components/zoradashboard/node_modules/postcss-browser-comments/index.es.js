import browserslist from 'browserslist';
import postcss from 'postcss';

var index = postcss.plugin('postcss-browser-comments', opts => root => {
  // client browserslist
  const clientBrowserList = browserslist(Object(opts).browsers || null, {
    path: root.source && root.source.input && root.source.input.file
  }); // root children references

  const references = root.nodes.slice(0); // for each child node of the root children references

  for (let node of references) {
    // if the node is a comment browser comment node
    if (isBrowserCommentNode(node)) {
      // rule following the browser comment
      const rule = node.next(); // browser data

      const browserdata = getBrowserData(node.text);

      if (browserdata.isNumbered) {
        rule.nodes.filter(isBrowserReferenceCommentNode).map(comment => {
          const browserdataIndex = parseFloat(comment.text) - 1;
          const browserslistPart = browserdata.browserslist[browserdataIndex]; // whether to remove the rule if the comment browserslist does not match the client browserslist

          const removeRule = !clientBrowserList.some(clientBrowser => browserslist(browserslistPart).some(commentBrowser => commentBrowser === clientBrowser)); // conditionally remove the declaration and reference comment

          if (removeRule) {
            comment.prev().remove();
            comment.remove();
          }
        }); // conditionally remove the empty rule and comment

        if (!rule.nodes.length) {
          rule.remove();
          node.remove();
        }
      } else {
        // whether to remove the rule if the comment browserslist does not match the client browserslist
        const removeRule = !clientBrowserList.some(clientBrowser => browserslist(browserdata.browserslist).some(commentBrowser => commentBrowser === clientBrowser)); // conditionally remove the rule and comment

        if (removeRule) {
          rule.remove();
          node.remove();
        }
      }
    }
  }
}); // returns whether a node is a browser comment

const isBrowserCommentNode = node => node.type === 'comment' && isBrowserCommentNodeRegExp.test(node.text) && node.next().type === 'rule';

const isBrowserCommentNodeRegExp = /^\*\n * /; // returns whether a node is a browser reference comment

const isBrowserReferenceCommentNode = node => node.type === 'comment' && isBrowserReferenceCommentNodeRegExp.test(node.text);

const isBrowserReferenceCommentNodeRegExp = /^\d+$/; // returns browser data from comment text

const getBrowserData = text => {
  const browserDataNumbered = text.match(browserDataMutliRegExp);
  const isNumbered = Boolean(browserDataNumbered);
  return {
    browserslist: isNumbered ? browserDataNumbered.map(browserslistPart => getBrowsersList(browserslistPart.replace(browserDataNumberedNewlineRegExp, '$1'))) : getBrowsersList(text.replace(browserDataNewlineRegExp, '')),
    isNumbered
  };
};

const browserDataMutliRegExp = /(\n \* \d+\. (?:[^\n]+|\n \* {4,})+)/g;
const browserDataNewlineRegExp = /^\*\n \* ?|\n \*/g;
const browserDataNumberedNewlineRegExp = /\n \* (?:( )\s*)?/g; // returns a browserlist from comment text

const getBrowsersList = text => text.split(getBrowsersListInSplitRegExp).slice(1).map(part => part.split(getBrowsersListAndSplitRegExp).filter(part2 => part2)).reduce((acc, val) => acc.concat(val), []).map(part => part.replace(getBrowsersListQueryRegExp, ($0, browser, query) => browser === 'all' ? '> 0%' : `${browser}${query ? /^((?:\d*\.)?\d+)-$/.test(query) ? ` <= ${query.slice(0, -1)}` : ` ${query}` : ' > 0'}`).toLowerCase());

const getBrowsersListInSplitRegExp = /\s+in\s+/;
const getBrowsersListAndSplitRegExp = /(?: and|, and|,)/;
const getBrowsersListQueryRegExp = /^\s*(\w+)(?: ((?:(?:\d*\.)?\d+-)?(?:\d*\.)?\d+[+-]?))?.*$/;

export default index;
