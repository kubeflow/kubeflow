/*
    This file defines the custom iconset we need for various assets
    not found within iron-icons.
*/
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

import {html, htmlLiteral} from '@polymer/polymer/lib/utils/html-tag.js';
import bolt from '../../assets/icons/ic_bolt.svg';

/**
 * Takes SVG source returns its contents.
 * @param {string} svg
 * @return {string}
 */
function stripSVG(svg) {
    const content = svg
        .replace(/\r?\n|(?=>)\s+(?=<)/g, ' ')
        .replace(/.*?<svg.*?>(.+?)<\/svg>/, '$1');
    if (content == svg) throw Error('Invalid SVG data');
    return htmlLiteral([content]);
}

const template = html`<iron-iconset-svg name="kubeflow" size="24">
<svg><defs>
<g id="bolt">${stripSVG(bolt)}</g>
</defs></svg>
</iron-iconset-svg>`;

document.head.appendChild(template.content);
