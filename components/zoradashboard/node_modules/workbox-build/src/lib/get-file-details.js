/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const glob = require('glob');
const upath = require('upath');

const errors = require('./errors');
const getFileSize = require('./get-file-size');
const getFileHash = require('./get-file-hash');

module.exports = ({
  globDirectory,
  globFollow,
  globIgnores,
  globPattern,
  globStrict,
}) => {
  let globbedFiles;
  let warning;

  try {
    globbedFiles = glob.sync(globPattern, {
      cwd: globDirectory,
      follow: globFollow,
      ignore: globIgnores,
      strict: globStrict,
    });
  } catch (err) {
    throw new Error(errors['unable-to-glob-files'] + ` '${err.message}'`);
  }

  if (globbedFiles.length === 0) {
    warning = errors['useless-glob-pattern'] + ' ' +
      JSON.stringify({globDirectory, globPattern, globIgnores}, null, 2);
  }

  const fileDetails = globbedFiles.map((file) => {
    const fullPath = upath.join(globDirectory, file);
    const fileSize = getFileSize(fullPath);
    if (fileSize === null) {
      return null;
    }

    const fileHash = getFileHash(fullPath);
    return {
      file: `${upath.relative(globDirectory, fullPath)}`,
      hash: fileHash,
      size: fileSize,
    };
  });

  // If !== null, means it's a valid file.
  const globbedFileDetails = fileDetails.filter((details) => details !== null);

  return {globbedFileDetails, warning};
};
