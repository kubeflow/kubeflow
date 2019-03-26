import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu-light';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * Component to retrieve and allow namespace selection. Bubbles the selected
 * items up to the query string in the 'ns' parameter.
 */
export class NamespaceSelector extends PolymerElement {
    static get template() {
        return html`
            <style>
                paper-item {
                    cursor: pointer;
                }
                paper-listbox {
                    --paper-listbox-background-color: white;
                    --paper-listbox-color: black;
                }
            </style>
            <iron-ajax auto url="/api/namespaces" handle-as="json"
                on-response="_onResponse">
            </iron-ajax>
            <app-route query-params="{{queryParams}}"></app-route>
            <paper-dropdown-menu-light label="Namespace" vertical-offset="60"
                value="{{selected}}">
                <paper-listbox slot="dropdown-content">
                    <template is="dom-repeat" items="{{namespaces}}">
                        <paper-item>[[item.name]]</paper-item>
                    </template>
                </paper-listbox>
            </paper-dropdown-menu>
        `;
    }

    /**
     * Object describing property-related metadata used by Polymer features
     */
    static get properties() {
        return {
            queryParams: {
                type: Object,
                notify: true,
            },
            namespaces: Array,
            selected: {
                type: String,
                observer: '_onSelected',
            },
        };
    }

    /**
     * Array of strings describing multi-property observer methods and their
     * dependant properties
     */
    static get observers() {
        return [
            '_queryParamChanged(queryParams.ns)',
        ];
    }

    /**
     * Allows setting the selected namespace from the initial query parameter.
     * @param {string} namespace
     */
    _queryParamChanged(namespace) {
        if (namespace && this.selected !== namespace) {
            this.selected = namespace;
        }
    }

    /**
     * Handles the Activities response to set date format and icon.
     * @param {Event} responseEvent
     */
    _onResponse(responseEvent) {
        const {status, response} = responseEvent.detail;
        this.namespaces = [];
        // TODO: Surface the error in some manner
        if (status !== 200) return;
        this.namespaces = response.map((n) => {
            return {name: n.metadata.name, id: n.metadata.uid};
        });
    }

    /**
     * Sets the query string namespace parameter to the selected value.
     * @param {string} selected
     */
    _onSelected(selected) {
        this.set('queryParams.ns', selected);
    }
}

window.customElements.define('namespace-selector', NamespaceSelector);
