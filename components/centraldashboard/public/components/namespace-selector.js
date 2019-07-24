import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
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
                    max-width: 170px;
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
                paper-button {
                    --paper-button-ink-color: var(--accent-color);
                }
            </style>
            <paper-menu-button no-overlap horizontal-align="left">
                <paper-button id="dropdown-trigger" slot="dropdown-trigger">
                    <iron-icon icon="group-work"></iron-icon>
                    <span>[[selected]]</span>
                    <iron-icon icon="arrow-drop-down"></iron-icon>
                </paper-button>
                <paper-listbox slot="dropdown-content"
                    attr-for-selected="name" selected="{{selected}}">
                    <template is="dom-repeat" items="{{namespaces}}">
                        <paper-item name="[[item]]">[[item]]</paper-item>
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
            namespaces: Array,
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
     * Sets the query string namespace parameter to the selected value.
     * @param {string} selected
     */
    _onSelected(selected) {
        this.set('queryParams.ns', selected);
    }
}

window.customElements.define('namespace-selector', NamespaceSelector);
