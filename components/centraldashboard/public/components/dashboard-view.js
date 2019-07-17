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

const DOCS = 'https://www.kubeflow.org/docs';

export class DashboardView extends PolymerElement {
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
                        text: 'Getting Started with Kubeflow',
                        desc: 'Get your machine-learning workflow up and ' +
                            'running on Kubeflow',
                        link: `${DOCS}/started/getting-started/`,
                    },
                    {
                        text: 'MiniKF',
                        desc: 'A fast and easy way to deploy Kubeflow locally',
                        link: `${DOCS}/started/getting-started-minikf/`,
                    },
                    {
                        text: 'Microk8s for Kubeflow',
                        desc: 'Quickly get Kubeflow running locally on ' +
                            'native hypervisors',
                        link: `${DOCS}/started/getting-started-multipass/`,
                    },
                    {
                        text: 'Minikube for Kubeflow',
                        desc: 'Quickly get Kubeflow running locally',
                        link: `${DOCS}/started/getting-started-minikube/`,
                    },
                    {
                        text: 'Kubeflow on GCP',
                        desc: 'Running Kubeflow on Kubernetes Engine and ' +
                            'Google Cloud Platform',
                        link: `${DOCS}/gke/`,
                    },
                    {
                        text: 'Kubeflow on AWS',
                        desc: 'Running Kubeflow on Elastic Container Service ' +
                            'and Amazon Web Services',
                        link: `${DOCS}/aws/`,
                    },
                    {
                        text: 'Requirements for Kubeflow',
                        desc: 'Get more detailed information about using ' +
                'Kubeflow and its components',
                        link: `${DOCS}/started/requirements/`,
                    },
                ],
            },
            namespace: String,
            quickLinks: {
                type: Array,
                value: [
                    {
                        text: 'Upload a pipeline',
                        desc: 'Pipelines',
                        link: `/pipeline/`,
                    },
                    {
                        text: 'View all pipeline runs',
                        desc: 'Pipelines',
                        link: `/pipeline/#/runs`,
                    },
                    {
                        text: 'Create a new Notebook server',
                        desc: 'Notebook Servers',
                        link: `/jupyter/new?namespace=kubeflow`,
                    },
                    {
                        text: 'View Katib Studies',
                        desc: 'Katib',
                        link: `/katib/`,
                    },
                    {
                        text: 'View Metadata Artifacts',
                        desc: 'Artifact Store',
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
}

customElements.define('dashboard-view', DashboardView);
