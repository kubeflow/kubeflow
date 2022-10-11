import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-ripple/paper-ripple.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-progress/paper-progress.js';
import './iframe-link.js';

import {html, PolymerElement} from '@polymer/polymer';

import './card-styles.js';

const MAX_NOTEBOOKS = 5;

// Formatting function to return the list Notebooks URL for a Notebooks server
const getListNotebooksUrl = (namespace, server) =>
    `/notebook/${namespace}/${server}/api/contents`;

/**
 * Component to retrieve and display recently modified Jupyter Notebooks.
 */
export class NotebooksCard extends PolymerElement {
    static get template() {
        return html`
        <style include="card-styles">
            :host {
                @apply --layout-vertical;
            }
        </style>
        <iron-ajax auto url="[[listNotebookServersUrl]]" handle-as="json"
            loading="{{loading}}" on-response="_onNotebookServersResponse"
            on-error="_onError">
        </iron-ajax>
        <paper-card heading="Recent Notebooks">
            <paper-progress indeterminate class="slow"
                hidden$="[[!loading]]"></paper-progress>
            <header id="message" hidden$="[[!message]]">[[message]]</header>
            <template is="dom-repeat" items="[[notebooks]]">
                <iframe-link class="link" href$="[[item.href]]">
                    <paper-icon-item>
                        <paper-ripple></paper-ripple>
                        <iron-icon icon="chrome-reader-mode" slot="item-icon">
                        </iron-icon>
                        <paper-item-body two-line>
                            <div class="header">[[item.name]]</div>
                            <aside secondary>
                                Accessed [[item.lastModified]]
                            </aside>
                        </paper-item-body>
                    </paper-icon-item>
                </iframe-link>
            </template>
        </paper-card>
        `;
    }

    static get properties() {
        return {
            loading: {
                type: Boolean,
                value: false,
            },
            message: {
                type: String,
                value: 'Choose a namespace to see Notebooks',
            },
            namespace: String,
            listNotebookServersUrl: {
                type: String,
                computed: '_getListNotebookServersUrl(namespace)',
            },
            notebooks: {
                type: Array,
                value: () => [],
            },
        };
    }

    /**
     * Returns the URL to list the available Jupyter servers for the namespace.
     * @param {string} namespace
     * @return {string}
     */
    _getListNotebookServersUrl(namespace) {
        if (!namespace) return null;
        return `/jupyter/api/namespaces/${namespace}/notebooks`;
    }

    /**
     * Handles the list Notebooks Servers response to set date format and icon.
     * @param {Event} responseEvent
     */
    async _onNotebookServersResponse(responseEvent) {
        const response = responseEvent.detail.response;
        this.loading = true;
        try {
            const listNotebooksResults = await Promise.all(
                response.notebooks.map((n) =>
                    this._getNotebooksFromServer(n.namespace, n.name)));
            const notebooks = [];
            listNotebooksResults.map((r) => notebooks.push(...r));
            notebooks.sort((n1, n2) => n2.sortTime - n1.sortTime);
            this.splice('notebooks', 0,
                this.notebooks.length, ...notebooks.slice(0, MAX_NOTEBOOKS));
        } catch (err) {
            this._onError();
        }
        this.message = this.notebooks.length ?
            '' : `No Notebooks in namespace ${this.namespace}`;
        this.loading = false;
    }

    /**
     * Retrieves the Notebook instances found in the Jupyter server specified
     * by the namespace and server name.
     * @param {string} namespace
     * @param {string} server
     * @return {Array} list of objects to be displayed in the card.
     */
    async _getNotebooksFromServer(namespace, server) {
        try {
            const response = await fetch(
                getListNotebooksUrl(namespace, server));
            const notebooks = await response.json();
            return notebooks.content.map((n) => {
                const date = new Date(n.last_modified);
                return {
                    href:
                        `/notebook/${namespace}/${server}/notebooks/${n.name}`,
                    name: n.name,
                    lastModified: date.toLocaleString(),
                    server: server,
                    sortTime: date.getTime(),
                };
            });
        } catch (err) {
            return [];
        }
    }

    /**
     * Handles an Notebooks error response.
     */
    _onError() {
        this.splice('notebooks', 0);
        this.message = 'Error retrieving Notebooks';
    }
}

customElements.define('notebooks-card', NotebooksCard);
