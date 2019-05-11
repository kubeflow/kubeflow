import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-progress/paper-progress.js';

import {html, PolymerElement} from '@polymer/polymer';
import './activities-list.js';

export class ActivityView extends PolymerElement {
    static get template() {
        return html`
            <style is="custom-style" include="iron-flex iron-flex-alignment">
            </style>
            <style>
                :host {
                    background: #f1f3f4;
                    padding: 1em;
                    overflow: auto;
                    --accent-color: #007dfc;
                    @apply --layout-vertical;
                }
                paper-progress {
                    width: 100%;
                    --paper-progress-active-color: var(--accent-color)
                }
                .message {
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
                [hidden] {
                    display: none;
                    opacity: 0;
                    pointer-events: none
                }
            </style>
            <iron-ajax id="ajax" url="/api/activities/[[namespace]]"
                handle-as="json" loading="{{loading}}"
                on-response="_onResponse" on-error="_onError">
            </iron-ajax>
            <paper-progress indeterminate class="slow"
                hidden$="[[!loading]]"></paper-progress>
            <aside class="message" hidden$="[[!message]]">
                [[message]]
            </aside>
            <activities-list activities="[[activities]]"></activities-list>
            `;
    }

    /**
     * Object describing property-related metadata used by Polymer features
     */
    static get properties() {
        return {
            namespace: {
                type: String,
                observer: '_namespaceChanged',
                value: null,
            },
            message: {
                type: String,
                value: 'Select a namespace to see recent events',
            },
            loading: {
                type: Boolean,
                value: false,
            },
            activities: {
                type: Array,
                value: () => [],
            },
        };
    }

    /**
     * Retrieves Events when namespace is selected.
     * @param {string} newNamespace
     */
    _namespaceChanged(newNamespace) {
        if (!newNamespace) return;
        this.message = '';
        this.$['ajax'].generateRequest();
    }

    /**
     * Handles a successful Activities response.
     * @param {Event} responseEvent
     */
    _onResponse(responseEvent) {
        const response = responseEvent.detail.response;
        this.splice('activities', 0);
        if (!response.length) {
            this.message = `No activities for namespace ${this.namespace}`;
        } else {
            this.push('activities', ...response);
        }
    }

    /**
     * Handles an Activities error response.
     */
    _onError() {
        this.splice('activities', 0);
        this.message =
            `Error retrieving activities for namespace ${this.namespace}`;
    }
}

window.customElements.define('activity-view', ActivityView);
