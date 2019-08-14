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
                :host {
                    --icon-colors: #5f6062;
                    --primary-background-color: var(--icon-colors);
                }
                paper-menu-button {
                    --paper-menu-button: {
                        font-size: 14px;
                        color: #3c4043
                    }
                }
                iron-icon {
                    color: var(--icon-colors)
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

                paper-item {
                    cursor: pointer;
                }
                #SelectedNamespace {
                    display: flex;
                    @apply --layout-center;
                }
                [owner]:not([all-namespaces]):after {
                    content: '(Owner)';
                    margin-left: .25em;
                    font-size: .8em;
                }
                paper-listbox {
                    --paper-listbox-background-color: white;
                    --paper-listbox-color: black;
                }
                paper-button {
                    --paper-button-ink-color: var(--accent-color);
                }
            </style>
            <paper-menu-button no-overlap horizontal-align="left"
                    disabled='[[allNamespaces]]'>
                <paper-button id="dropdown-trigger" slot="dropdown-trigger">
                    <iron-icon icon="kubeflow:namespace"></iron-icon>
                    <article id="SelectedNamespace">
                        <span class='text'
                            all-namespaces$='[[allNamespaces]]'
                            owner$='[[selectedNamespaceIsOwned]]'>
                            [[getNamespaceText(selected,
                                allNamespaces,
                                namespaces)]]
                        </span>
                    </article>
                    <iron-icon icon="arrow-drop-down"></iron-icon>
                </paper-button>
                <paper-listbox slot="dropdown-content"
                    attr-for-selected="name" selected="{{selected}}">
                    <template is="dom-repeat" items="{{namespaces}}" as="n">
                        <paper-item name="[[n.namespace]]" title$='[[n.role]]'
                                owner$='[[isOwner(n.role)]]'>
                            [[n.namespace]]
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
            allNamespaces: {type: Boolean, value: false},
            selectedNamespaceIsOwned: {
                type: Boolean,
                readOnly: true,
                notify: true,
                value: false,
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
     * Check if role is owner
     * @param {string} selected
     * @param {boolean} allNamespaces
     * @param {[object]} namespaces
     * @return {string} Text that should show in namespace selector
     */
    getNamespaceText(selected, allNamespaces, namespaces) {
        if (allNamespaces) return 'All Namespaces';
        if (!namespaces || !namespaces.length) return 'No Namespaces';
        if (!selected) return 'Select namespace';
        return selected;
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
     * Update the `selectedNamespaceIsOwned` property based on
     *   selected namespace.
     * @param {[object]} namespaces
     * @param {string} selected
     */
    _ownedContextChanged(namespaces, selected) {
        const namespace = (namespaces || []).find((i) =>
            i.namespace == selected
        ) || this.selectedNamespaceIsOwned;
        this._setSelectedNamespaceIsOwned(
            this.isOwner(namespace.role)
        );
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
