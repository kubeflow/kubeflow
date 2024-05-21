import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/social-icons.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-ripple/paper-ripple.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column.js';
import '@vaadin/vaadin-grid/theme/material/vaadin-grid-styles.js';

import {html, PolymerElement} from '@polymer/polymer';

import css from './manage-users-view.css';
import template from './manage-users-view.pug';

import './manage-users-view-contributor.js';
import utilitiesMixin from './utilities-mixin.js';

export class ManageUsersView extends utilitiesMixin(PolymerElement) {
    static get template() {
        return html([`
            <style>${css.toString()}</style>
            ${template()}
        `]);
    }

    /**
     * Object describing property-related metadata used by Polymer features
     */
    static get properties() {
        return {
            user: {type: String, value: 'Loading...'},
            isClusterAdmin: {type: Boolean, value: false},
            namespaces: Array,
            hasNamespaces: {type: Boolean, value: false},
            ownedNamespaces: {type: Array, value: []},
            editNamespaces: {type: Array, value: []},
            viewNamespaces: {type: Array, value: []},
        };
    }
    /**
     * Main ready method for Polymer Elements.
     */
    ready() {
        super.ready();
    }
    /**
     * Returns rows for the namespace roles table.
     * Each row is an array with [Role, Namespaces],
     * where Namespaces is a comma-separated string.
     * @param {[object]} ownedNamespaces - List of namespaces the user owns.
     * @param {[object]} editNamespaces - List of namespaces the user can edit.
     * @param {[object]} viewNamespaces - List of namespaces the user can view.
     * @return {[[string, string]]} - Array of rows.
     */
    nsBreakdown(ownedNamespaces, editNamespaces, viewNamespaces) {
        const arr = [];
        if (ownedNamespaces.length > 0) {
            const ownedNamespacesList = ownedNamespaces
                .map((n) => n.namespace)
                .join(', ');
            arr.push(['Owner', ownedNamespacesList]);
        }
        if (editNamespaces.length > 0) {
            const editNamespacesList = editNamespaces
                .map((n) => n.namespace)
                .join(', ');
            arr.push(['Contributor', editNamespacesList]);
        }
        if (viewNamespaces.length > 0) {
            const viewNamespacesList = viewNamespaces
                .map((n) => n.namespace)
                .join(', ');
            arr.push(['Viewer', viewNamespacesList]);
        }
        return arr;
    }
    /**
     * Takes an event from iron-ajax and isolates the error from a request that
     * failed
     * @param {IronAjaxEvent} e
     * @return {string}
     */
    _isolateErrorFromIronRequest(e) {
        const bd = e.detail.request.response||{};
        return bd.error || e.detail.error || e.detail;
    }
    /**
     * Iron-Ajax error handler for getContributors
     * @param {IronAjaxEvent} e
     */
    onAllNamespaceFetchError(e) {
        const error = this._isolateErrorFromIronRequest(e);
        this.allNamespaceError = error;
        this.$.AllNamespaceError.show();
    }
    /**
     * [ComputedProp] Should the ajax call for all namespaces run?
     * @param {boolean} isClusterAdmin
     * @return {boolean}
     */
    shouldFetchAllNamespaces(isClusterAdmin) {
        return isClusterAdmin;
    }
}

customElements.define('manage-users-view', ManageUsersView);
