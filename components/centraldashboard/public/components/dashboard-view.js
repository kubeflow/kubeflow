import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-ripple/paper-ripple.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

import {html, PolymerElement} from '@polymer/polymer';

import css from './dashboard-view.css';
import template from './dashboard-view.pug';
import './card-styles.js';
import './iframe-link.js';
import './notebooks-card.js';
import './pipelines-card.js';
import './resource-chart.js';
import {getGCPData} from './resources/cloud-platform-data.js';
import utilitiesMixin from './utilities-mixin.js';


export class DashboardView extends utilitiesMixin(PolymerElement) {
    static get template() {
        return html([`
            <style include="card-styles">
                ${css.toString()}
            </style>
            ${template()}
        `]);
    }

    /**
     * Object describing property-related metadata used by Polymer features
     */
    static get properties() {
        return {
            documentationItems: Array,
            quickLinks: Array,
            namespace: {
                type: Object,
                observer: '_namespaceChanged',
            },
            platformDetails: Object,
            metrics: Object,
            platformInfo: {
                type: Object,
                observer: '_platformInfoChanged',
            },
        };
    }

    /**
     * Observer for platformInfo property
     */
    _platformInfoChanged() {
        if (this.platformInfo && this.platformInfo.providerName === 'gce') {
            this.platformName = 'GCP';
            const pieces = this.platformInfo.provider.split('/');
            let gcpProject = '';
            if (pieces.length >= 3) {
                gcpProject = pieces[2];
            }
            this.platformDetails = getGCPData(gcpProject);
        }
    }

    /**
     * Rewrites the links adding the namespace as a query parameter.
     * @param {namespace} namespace
     */
    _namespaceChanged(namespace) {
        this.quickLinks.map((quickLink) => {
            quickLink.link = this.buildHref(quickLink.link, {ns: namespace});
            return quickLink;
        });
        // We need to deep-copy and re-assign in order to trigger the
        // re-rendering of the component
        this.quickLinks = JSON.parse(JSON.stringify(this.quickLinks));
    }
}

customElements.define('dashboard-view', DashboardView);
