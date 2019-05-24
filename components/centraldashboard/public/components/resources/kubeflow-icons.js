/*
    This file defines the custom iconset we need for various assets
    not found within iron-icons.
*/
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

import {html, htmlLiteral} from '@polymer/polymer/lib/utils/html-tag.js';

/**
 * Converts an imported folder into a multiple <g> entries.
 * @param {NodeRequire} context
 * @return {[string]} Array of html strings.
 */
function getSvgGroupEntries(context) {
    const keys = context.keys();
    const values = keys.map(context);
    const _v = (v) => stripSVG(v.default || v);
    const _name = (n) => n.split(/\/|\\/).slice(-1)[0].replace('.svg', '');
    return keys.map((k, i) => {
        const [name, data] = [_name(k), _v(values[i])];
        if (!data) {
            // We actually want to show a warning in the console
            // eslint-disable-next-line no-console
            console.error(
                '[kubeflow-icons::stripSVG] Invalid SVG data provided in file',
                name
            );
            return '';
        }
        return `<g id="${name}">${data}</g>`;
    });
}

/**
 * Takes SVG source returns its contents.
 * @param {string} svg
 * @return {string} If return is empty, then handle as invalid SVG.
 */
function stripSVG(svg) {
    // The regex below first makes the multi-line HTML a single line.
    // Then it ignores anything outside the svg tags including:
    //  - The <svg> tag itself.
    //  - Any trailing whitespace.
    //  - <?xml> meta data.
    const content = svg
        .replace(/\r?\n|(?=>)\s+(?=<)/g, ' ')
        .replace(/^.*?<svg.*?>(.+?)<\/svg>.*$/, '$1');
    if (content == svg) return '';
    return content;
}

// Uses Webpack specific syntax to require all favicons
// eslint-disable-next-line no-undef
const importData = require.context('../../assets/icons', true, /\.svg$/);
const fileData = getSvgGroupEntries(importData).join('');

const template = html`<iron-iconset-svg name="kubeflow" size="24">
<svg><defs>
${htmlLiteral([fileData])}
</defs></svg>
</iron-iconset-svg>`;

document.head.appendChild(template.content);
