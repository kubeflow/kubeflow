import {html, PolymerElement} from '@polymer/polymer';
// eslint-disable-next-line max-len
import {AppLocalizeBehavior} from '@polymer/app-localize-behavior/app-localize-behavior.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';

// eslint-disable-next-line max-len
export class NotFoundView extends mixinBehaviors([AppLocalizeBehavior], PolymerElement) {
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
            <p>{{localize('notFound.invalidPagePart1')}}
                <strong>[[path]]</strong>
                {{localize('notFound.invalidPagePart2')}}
            </p>
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
