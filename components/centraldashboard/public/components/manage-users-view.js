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

import {html, PolymerElement} from '@polymer/polymer';

import './manage-users-view-contributor.js';
import css from './manage-users-view.css';
import template from './manage-users-view.pug';
import utilitiesMixin from './utilities-mixin.js';
import localizationMixin from './localization-mixin.js';

// eslint-disable-next-line max-len
export class ManageUsersView extends utilitiesMixin(localizationMixin(PolymerElement)) {
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
            multiOwnedNamespaces: {type: Array, value: []},
        };
    }

    /**
     * Main ready method for Polymer Elements.
     */
    ready() {
        super.ready();
    }

    /**
     * Returns namespaces and roles
     * @param {[object]} ns Namespaces array.
     * @return {[string, [string]]} rows for namespace table.
     */
    nsBreakdown(ns) {
        const {namespaces} = this;
        if (!namespaces) return;
        const roleStrings = {
            'contributor': this.localize('manageUsersView.lblContributor'),
            'owner': this.localize('manageUsersView.lblOwner'),
            'other': this.localize('manageUsersView.lblOther'),
        };
        const arr = [];
        for (let i = 0; i < namespaces.length; i++) {
            arr.push(
                [namespaces[i].namespace,
                    roleStrings[namespaces[i].role] || roleStrings['other']],
            );
        }
        return arr;
    }

    /**
     * Used to uppercase the first letter of the role name
     * @param {string} string A string
     * @return {string} A string where the first character is capitalized
     */
    uppercaseFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
     * @param {object} multiOwnedNamespaces
     * @param {boolean} isClusterAdmin
     * @return {boolean}
     */
    shouldFetchAllNamespaces(multiOwnedNamespaces, isClusterAdmin) {
        return isClusterAdmin && !this.empty(multiOwnedNamespaces);
    }
}

customElements.define('manage-users-view', ManageUsersView);
