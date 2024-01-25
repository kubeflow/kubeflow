import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-ripple/paper-ripple.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-progress/paper-progress.js';
import './iframe-link.js';
// eslint-disable-next-line max-len
import {AppLocalizeBehavior} from '@polymer/app-localize-behavior/app-localize-behavior.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';

import {html, PolymerElement} from '@polymer/polymer';

import './card-styles.js';

/**
 * Component to retrieve and display the default notebook
 */
// eslint-disable-next-line max-len
export class NotebookDefaultCard extends mixinBehaviors([AppLocalizeBehavior], PolymerElement) {
    static get template() {
        return html`
        <style include="card-styles">
            :host {
                @apply --layout-vertical;
            }
        </style>
        <iron-ajax auto url="[[defaultNotebookUrl]]" handle-as="json"
            loading="{{loading}}" on-response="_onNotebookServersResponse"
            on-error="_onError">
        </iron-ajax>
            <paper-card heading="Default Notebook">
            <table>
                <tr>
                    <td>Name</td>
                    <td>[[defaultNotebook.name]]</td>
                </tr>
                <tr>
                    <td>Type</td>
                    <td>[[defaultNotebook.shortImage]]</td>
                </tr>
                <tr>
                    <td colspan="2">
                        <button on-click="_connectNotebook">Connect</button>
                    </td>
                </tr>
            </table>
        </paper-card>
        `;
    }

    static get properties() {
        return {
            namespace: String,
            defaultNotebookUrl: {
                type: Object,
                computed: '_getNotebookUrl(namespace)',
            },
            defaultNotebook: {Object},
        };
    }

    _getNotebookUrl(namespace) {
        if (!namespace) return null;
        return `/jupyter/api/namespaces/${namespace}/defaultnotebook`;
    }

    _connectNotebook() {
        // eslint-disable-next-line max-len
        window.open(`/notebook/${this.namespace}/${this.defaultNotebook.name}/`);
    }

    /**
     * Handles the response to set the default notebook
     * @param {Event} responseEvent
     */
    async _onNotebookServersResponse(responseEvent) {
        const response = responseEvent.detail.response;
        this.loading = true;
        try {
            this.defaultNotebook = await response.notebook;
        } catch (err) {
            this._onError();
        }
        this.message = this.defaultNotebook.name ?
            '' : 'notebookCard.errNoNotebooks';
        this.loading = false;
    }

    /**
     * Handles an Notebooks error response.
     */
    _onError() {
        this.message = 'notebookCard.errRetrievingNotebooks';
    }
}

customElements.define('notebook-default-card', NotebookDefaultCard);
