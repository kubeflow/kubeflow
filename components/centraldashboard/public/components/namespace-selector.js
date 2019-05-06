import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
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
                paper-menu-button {
                    --paper-menu-button: {
                        font-size: 14px;
                        color: #3c4043
                    }
                }

                #dropdown-trigger {
                    @apply --layout-horizontal;
                    @apply --layout-center;
                    text-transform: none;
                }

                #dropdown-trigger iron-icon:first-child {
                    padding-right: 0.5em;
                    --iron-icon-fill-color: var(--primary-background-color);
                    --iron-icon-height: 20px;
                    --iron-icon-width: 20px;
                }

                #dropdown-trigger span {
                    min-width: 120px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                #dropdown-trigger span:empty::before {
                    content: 'Select namespace';
                }

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
            <paper-menu-button no-overlap horizontal-align="right">
                <paper-button id="dropdown-trigger" slot="dropdown-trigger">
                    <iron-icon icon="group-work"></iron-icon>
                    <span>[[selected]]</span>
                    <iron-icon icon="arrow-drop-down"></iron-icon>
                </paper-button>
                <paper-listbox slot="dropdown-content"
                    attr-for-selected="name" selected="{{selected}}">
                    <template is="dom-repeat" items="{{namespaces}}">
                        <paper-item name="[[item.name]]">
                            [[item.name]]
                        </paper-item>
                    </template>
                </paper-listbox>
            </paper-menu-button>
        `;
    }

    /**
     * Object describing property-related metadata used by Polymer features
     */
    static get properties() {
        return {
            queryParams: Object,
            namespaces: {
                type: Array,
                value: [],
            },
            selected: {
                type: String,
                observer: '_onSelected',
                value: '',
                notify: true,
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
        const {response} = responseEvent.detail;
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
