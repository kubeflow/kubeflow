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

import './resources/paper-chip.js';
import css from './manage-users-view.css';
import template from './manage-users-view.pug';
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
            ownedNamespace: {type: Object, value: () => ({})},
            newContribEmail: String,
            contribError: Object,
            contributorInputEl: Object,
        };
    }
    ready() {
        super.ready();
        this.contributorInputEl = this.$.ContribEmail;
    }
    nsBreakdown(ns) {
        this.ownedNamespace = this.namespaces[0];
        const {ownedNamespace, namespaces} = this;
        if (!ownedNamespace) return;
        const arr = [
            ['Owner', ownedNamespace.namespace],
        ];
        if (ns.length <= 1) return arr;
        const otherNamespaces = namespaces
            .filter((n) => n != ownedNamespace)
            .map((i) => i.namespace).join(', ');
        arr.push(
            ['Contributor', otherNamespaces],
        );
        return arr;
    }
    addNewContrib(e) {
        const api = this.$.AddContribAjax;
        api.body = {contributor: this.newContribEmail};
        api.generateRequest();
    }
    _isolateErrorFromIronRequest(e) {
        return (e.detail.request.response||{}).error ||
            e.detail.error || e.detail;
    }
    onContribCreateError(e) {
        const error = this._isolateErrorFromIronRequest(e);
        this.contribCreateError = error;
    }
    onContribFetchError(e) {
        const error = this._isolateErrorFromIronRequest(e);
        this.contribErrorType = 'fetch contributor list';
        this.contribError = error;
        this.$.ContribError.show();
        // todo: remove
        this.contributorList = ['apv.123@google.com', 'foo_bar12@google.com',
            'dsoadopsa@google.com'];
    }
}

customElements.define('manage-users-view', ManageUsersView);
