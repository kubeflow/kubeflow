import {html, PolymerElement} from '@polymer/polymer';

export class NotFoundView extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    background: #f1f3f4;
                    color: var(--google-grey-500);
                    font-style: italic;
                    font-size: 2em;
                    font-family: Google Sans;
                    padding: 1em;
                    text-align: center;
                    align-self: center;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }
            </style>
            <p>Sorry, <strong>[[path]]</strong> is not a valid page</p>
        `;
    }

    /**
      * Object describing property-related metadata used by Polymer features
      */
    static get properties() {
        return {
            path: String,
        };
    }
}

window.customElements.define('not-found-view', NotFoundView);
