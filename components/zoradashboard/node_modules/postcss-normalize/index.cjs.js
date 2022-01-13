function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var postcss = _interopDefault(require('postcss'));
var postcssBrowserComments = _interopDefault(require('postcss-browser-comments'));
var Module = _interopDefault(require('module'));
var path = _interopDefault(require('path'));

var fs = _interopDefault(require('fs'));

const assign = (...objects) => Object.assign(...objects);
const create = (...objects) => assign(Object.create(null), ...objects);

const currentFilename = __filename;
const currentDirname = path.dirname(currentFilename); // get resolved filenames for css libraries

const normalizeCSS = resolve('@csstools/normalize.css');
const normalizeOpinionatedCSS = resolve('@csstools/normalize.css/opinionated.css');
const sanitizeCSS = resolve('sanitize.css');
const sanitizeFormsCSS = resolve('sanitize.css/forms.css');
const sanitizePageCSS = resolve('sanitize.css/page.css');
const sanitizeTypographyCSS = resolve('sanitize.css/typography.css'); // export a hashmap of css library filenames

const parsableFilenames = create({
  [normalizeCSS]: true,
  [normalizeOpinionatedCSS]: true,
  [sanitizeCSS]: true,
  [sanitizeFormsCSS]: true,
  [sanitizePageCSS]: true,
  [sanitizeTypographyCSS]: true
}); // export a hashmap of css library filenames by id

const resolvedFilenamesById = create({
  'normalize': [normalizeCSS],
  'normalize/opinionated': [normalizeOpinionatedCSS],
  'normalize/*': [normalizeOpinionatedCSS],
  'sanitize': [sanitizeCSS],
  'sanitize/forms': [sanitizeCSS, sanitizeFormsCSS],
  'sanitize/page': [sanitizeCSS, sanitizePageCSS],
  'sanitize/typography': [sanitizeCSS, sanitizeTypographyCSS],
  'sanitize/*': [sanitizeCSS, sanitizeFormsCSS, sanitizePageCSS, sanitizeTypographyCSS]
}); // get the resolved filename of a package/module

function resolve(id) {
  return resolve[id] = resolve[id] || Module._resolveFilename(id, {
    id: currentFilename,
    filename: currentFilename,
    paths: Module._nodeModulePaths(currentDirname)
  });
}

const cache = create();
async function readFile(filename) {
  filename = path.resolve(filename);
  cache[filename] = cache[filename] || create();
  return new Promise((resolve, reject) => fs.stat(filename, (statsError, {
    mtime
  }) => statsError ? reject(statsError) : mtime === cache[filename].mtime ? resolve(cache[filename].data) : fs.readFile(filename, 'utf8', (readFileError, data) => readFileError ? reject(readFileError) : resolve((cache[filename] = {
    data,
    mtime
  }).data))));
}

const cache$1 = create(null);
var parse = ((filename, transformer) => readFile(filename).then( // cache the parsed css root
css => cache$1[css] = cache$1[css] || postcss.parse(css, {
  from: filename
})).then( // clone the cached root
root => root.clone()).then( // transform the cloned root
clone => Promise.resolve(transformer(clone)).then( // resolve the cloned root
() => clone)));

var postcssImportNormalize = (commentsTransformer => opts => {
  opts = create(opts); // return an postcss-import configuration

  return create({
    load(filename, importOptions) {
      return filename in parsableFilenames // parse the file (the file and css are conservatively cached)
      ? parse(filename, commentsTransformer).then(root => root.toResult({
        to: filename,
        map: true
      }).css) : typeof opts.load === 'function' // otherwise, use the override loader
      ? opts.load.call(null, filename, importOptions) // otherwise, return the (conservatively cached) contents of the file
      : readFile(filename);
    },

    resolve(id, basedir, importOptions) {
      // get the css id by removing css extensions
      const cssId = id.replace(cssExtRegExp, '');
      return cssId in resolvedFilenamesById // return the known resolved path for the css id
      ? resolvedFilenamesById[cssId] : typeof opts.resolve === 'function' // otherwise, use the override resolver
      ? opts.resolve.call(null, id, basedir, importOptions) // otherwise, return the id to be resolved by postcss-import
      : id;
    }

  });
});
const cssExtRegExp = /\.css\b/g;

const postcssPlugin = (commentsTransformer, opts) => root => {
  const promises = [];
  const insertedFilenames = {}; // use @import insertion point

  root.walkAtRules(importRegExp, atrule => {
    // get name as a fallback value for the library (e.g. @import-normalize is like @import "normalize.css")
    const name = atrule.name.match(importRegExp)[1]; // get url from "library", 'library', url("library"), url('library'), or the fallback value

    const url = (atrule.params.match(paramsRegExp) || []).slice(1).find(part => part) || name;

    if (url) {
      // get the css id by removing css extensions
      const cssId = url.replace(cssExtRegExp$1, '');

      if (cssId in resolvedFilenamesById) {
        // promise the library import is replaced with its contents
        promises.push(Promise.all(resolvedFilenamesById[cssId].filter( // ignore filenames that have already been inserted
        filename => insertedFilenames[filename] = opts.allowDuplicates || !(filename in insertedFilenames)).map( // parse the file (the file and css are conservatively cached)
        filename => parse(filename, commentsTransformer))).then(roots => {
          if (roots.length) {
            // combine all the library nodes returned by the parsed files
            const nodes = roots.reduce((all, root) => all.concat(root.nodes), []); // replace the import with all the library nodes

            atrule.replaceWith(...nodes);
          }
        }));
      }
    }
  });
  return Promise.all([].concat( // promise the library imports are replaced with their contents
  promises, // promise certain libraries are prepended
  Promise.all([].concat(opts.forceImport || []).reduce( // filter the id to be a known id or boolean true
  (all, id) => {
    if (id === true) {
      all.push(...resolvedFilenamesById.normalize);
    } else if (typeof id === 'string') {
      const cssId = id.replace(cssExtRegExp$1, '');

      if (cssId in resolvedFilenamesById) {
        all.push(...resolvedFilenamesById[cssId]);
      }
    }

    return all;
  }, []).filter( // ignore filenames that have already been inserted
  filename => insertedFilenames[filename] = opts.allowDuplicates || !(filename in insertedFilenames)).map( // parse the file (the file and css are conservatively cached)
  filename => parse(filename, commentsTransformer))).then(roots => {
    if (roots.length) {
      // combine all the library nodes returned by the parsed files
      const nodes = roots.reduce((all, root) => all.concat(root.nodes), []); // prepend the stylesheet with all the library nodes

      root.prepend(...nodes);
    }
  })));
};

const cssExtRegExp$1 = /\.css\b/g;
const importRegExp = /^import(?:-(normalize|sanitize))?$/;
const paramsRegExp = /^\s*(?:url\((?:"(.+)"|'(.+)')\)|"(.+)"|'(.+)')[\W\w]*$/;

var index = postcss.plugin('postcss-normalize', opts => {
  opts = create(opts);
  const commentsTransformer = postcssBrowserComments(opts);
  const normalizeTransformer = postcssPlugin(commentsTransformer, opts);
  const postcssImportConfig = postcssImportNormalize(commentsTransformer);
  return assign(normalizeTransformer, {
    postcssImport: postcssImportConfig
  });
});

module.exports = index;
//# sourceMappingURL=index.cjs.js.map
