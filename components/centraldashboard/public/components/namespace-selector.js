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
                    padding-right: 2em;
                }
                .owned-badge {
                    width: 0;
                    height: 0;
                    border: 4px solid var(--accent-color);
                    border-radius: 50%;
                }
                #SelectedNamespace {
                    display: flex;
                    @apply --layout-center;
                }
                #SelectedNamespace .owned-badge {
                    margin-right: .5em;
                }
                paper-item .owned-badge {
                    position: absolute;
                    top: 50%;
                    right: .75em;
                    transform: translateY(-50%);
                }
                paper-listbox {
                    --paper-listbox-background-color: white;
                    --paper-listbox-color: black;
                }
                paper-button {
                    --paper-button-ink-color: var(--accent-color);
                }
            </style>
            <paper-menu-button no-overlap horizontal-align="right">
                <paper-button id="dropdown-trigger" slot="dropdown-trigger">
                    <iron-icon icon="group-work"></iron-icon>
                    <article id="SelectedNamespace">
                        <aside class='owned-badge'
                            hidden$='[[!isOwner(selectedNamespace.role)]]'>
                        </aside>
                        <span class='text'>[[selected]]</span>
                    </article>
                    <iron-icon icon="arrow-drop-down"></iron-icon>
                </paper-button>
                <paper-listbox slot="dropdown-content"
                    attr-for-selected="name" selected="{{selected}}">
                    <template is="dom-repeat" items="{{namespaces}}" as="n">
                        <paper-item name="[[n.namespace]]" title$='[[n.role]]'>
                            [[n.namespace]]
                            <aside class='owned-badge'
                                hidden$='[[!isOwner(n.role)]]'></aside>
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
            namespaces: Array,
            selected: {
                type: String,
                observer: '_onSelected',
                value: '',
                notify: true,
            },
            selectedNamespace: {
                type: Object,
                readOnly: true,
                notify: true,
                value: () => ({}),
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
            '_ownedContextChanged(namespaces, selected)',
        ];
    }

    /**
     * Check if role is owner
     * @param {string} role
     * @return {string} Is role an owner.
     */
    isOwner(role) {
        return role == 'owner';
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
     * @param {[object]} namespaces
     * @param {string} selected
     */
    _ownedContextChanged(namespaces, selected) {
        const namespace = (namespaces || []).find((i) =>
            i.namespace == selected
        );
        this._setSelectedNamespace(namespace || this.selectedNamespace);
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
