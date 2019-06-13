import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

export const IFRAME_LINK_PREFIX = '_';

/**
  * Wraps an anchor element and handles its click event in order to
  * set a location path that can be loaded into the Dashboard's iframe
  * component.
  *
  * --iframe-link is exposed as a style mixin which is applied to the anchor
  *     element.
  */
export class IframeLink extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    cursor: pointer;
                    @apply --iframe-link;
                }
                a {
                    display: inline-block;
                    width: 100%
                }
                a, a:hover, a:active {
                    text-decoration: inherit;
                    color: inherit
                }
            </style>
            <a id="link" href$="/[[prefix]][[href]]" tabindex="-1">
                <slot></slot>
            </a>`;
    }

    static get properties() {
        return {
            prefix: {
                type: String,
                value: IFRAME_LINK_PREFIX,
                readOnly: true,
            },
            href: {
                type: String,
            },
            role: {
                type: String,
                value: 'link',
                reflectToAttribute: true,
            },
        };
    }
}

customElements.define('iframe-link', IframeLink);
