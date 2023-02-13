/**
 * This script replaces strings between '@' and '@'
 * in a text file.
 * It expects 3 arguments in the following order:
 * File name, String that should be replaced, New string
 */
const fs = require('fs');

const args = process.argv.slice(2);
if (args.length < 3) {
  console.error(
    'Error, not enough arguments given! This script expects 3 arguments in the following order: File name, String between "@" that should be replaced, New string\ne.g. node scripts/replace-string-in-file.js src/environments/environment.prod.ts BUILD_VERSION v1.5 ',
  );
  process.exit(1);
}
const file = args[0];
const current_string = args[1];
const new_string = args[2];

let fileString = fs.readFileSync(file).toString();
fileString = fileString.replace(/\@(.*?)\@/g, function (match, token) {
  if (token === current_string) {
    return new_string;
  }
  return match;
});

fs.writeFileSync(file, fileString);
