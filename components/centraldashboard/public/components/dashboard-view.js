import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-ripple/paper-ripple.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import localizationMixin from './localization-mixin.js';

import {html, PolymerElement} from '@polymer/polymer';

import css from './dashboard-view.css';
import template from './dashboard-view.pug';
import './card-styles.js';
import './iframe-link.js';
import './notebooks-card.js';
import './pipelines-card.js';
import './resource-chart.js';
import {getGCPData} from './resources/cloud-platform-data.js';

// eslint-disable-next-line max-len
export class DashboardView extends localizationMixin(PolymerElement) {
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
            documentationItems: {
                type: Array,
                value: [
                    {
                        text: 'dashboardView.docItemAawdText',
                        desc: 'dashboardView.docItemAawdDesc',
                        link: 'dashboardView.docItemAawdLink',
                    },
                    {
                        text: 'dashboardView.docItemVideoTutorialText',
                        desc: 'dashboardView.docItemVideoTutorialDesc',
                        link: 'dashboardView.docItemVideoTutorialLink',
                    },
                    {
                        text: 'dashboardView.docItemCommunityChatText',
                        desc: 'dashboardView.docItemCommunityChatDesc',
                        link: 'dashboardView.docItemCommunityChatLink',
                    },
                    {
                        text: 'dashboardView.docItemOfficialKubeflowDocsText',
                        desc: 'dashboardView.docItemOfficialKubeflowDocsDesc',
                        link: 'dashboardView.docItemOfficialKubeflowDocsLink',
                    },
                ],
            },
            namespace: String,
            quickLinks: {
                type: Array,
                value: [
                    {
                        text: 'dashboardView.quicklinkUploadText',
                        desc: 'dashboardView.quicklinkUploadDesc',
                        link: `/pipeline/`,
                    },
                    {
                        text: 'dashboardView.quicklinkViewAllText',
                        desc: 'dashboardView.quicklinkViewAllDesc',
                        link: `/pipeline/#/runs`,
                    },
                    {
                        text: 'dashboardView.quicklinkCreateNewText',
                        desc: 'dashboardView.quicklinkCreateNewDesc',
                        link: `/jupyter/new?namespace=kubeflow`,
                    },
                    {
                        text: 'dashboardView.quicklinkViewKatibText',
                        desc: 'dashboardView.quicklinkViewKatibDesc',
                        link: `/katib/`,
                    },
                    {
                        text: 'dashboardView.quicklinkMetadataArtifactsText',
                        desc: 'dashboardView.quicklinkMetadataArtifactsDesc',
                        link: `/metadata/`,
                    },
                ],
            },
            platformDetails: Object,
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
