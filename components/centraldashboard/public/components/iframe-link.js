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
                }
                a {
                    width: 100%;
                    @apply --iframe-link;
                }
            </style>
            <a id="link" href$="/[[prefix]][[href]]"
                on-click="onClick"><slot></slot></a>`;
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
        };
    }

    ready() {
        super.ready();
        this.addEventListener('click', () => this.$.link.click());
    }

    /**
     * Handles the anchor click event.
     * @param {MouseEvent} e
     */
    onClick(e) {
        // e.currentTarget is an HTMLAnchorElement
        const url = e.currentTarget.href.slice(e.currentTarget.origin.length);
        window.history.pushState({}, null, url);
        window.dispatchEvent(new CustomEvent('location-changed'));
        e.preventDefault();
    }
}

customElements.define('iframe-link', IframeLink);
