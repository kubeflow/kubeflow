/*
    This file defines the custom iconset we need for various assets
    not found within iron-icons.
*/
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

import {html, htmlLiteral} from '@polymer/polymer/lib/utils/html-tag.js';

/**
 * Converts an imported folder into a Object.entries() type of
 *  [[key, val], ...] list.
 * @param {object} context
 * @return {[...[string, string]]}
 */
function createFileMap(context) {
    const keys = context.keys();
    const values = keys.map(context);
    const _v = (v) => stripSVG(v.default || v);
    const _name = (n) => n.split(/\/|\\/).slice(-1)[0].replace('.svg', '');
    return keys.map((k, i) => [_name(k), _v(values[i])]);
}

/**
 * Takes SVG source returns its contents.
 * @param {string} svg
 * @return {string}
 */
function stripSVG(svg) {
    const content = svg
        .replace(/\r?\n|(?=>)\s+(?=<)/g, ' ')
        .replace(/^.*?<svg.*?>(.+?)<\/svg>.*$/, '$1');
    if (content == svg) throw Error('Invalid SVG data');
    return content;
}

// Uses Webpack specific syntax to require all favicons
// eslint-disable-next-line no-undef
const importData = require.context('../../assets/icons', true, /\.svg$/);
const fileData = createFileMap(importData).map(([name, data]) =>
    `<g id="${name}">${data}</g>`
).join('');
// eslint-disable-next-line no-console
console.log(createFileMap(importData));

const template = html`<iron-iconset-svg name="kubeflow" size="24">
<svg><defs>
${htmlLiteral([fileData])}
</defs></svg>
</iron-iconset-svg>`;

document.head.appendChild(template.content);
