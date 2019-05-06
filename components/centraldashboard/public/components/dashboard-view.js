import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

import {html, PolymerElement} from '@polymer/polymer';
import css from './dashboard-view.css';
import template from './dashboard-view.pug';

import './iframe-link.js';

const DOCS = 'https://www.kubeflow.org/docs/started';
const GCP_LINKS = [
    {
        text: 'Stackdriver Logging',
        link: 'https://console.cloud.google.com/logs/viewer?resource=k8s_cluster&project=',
    },
    {
        text: 'Project Overview',
        link: 'https://console.cloud.google.com/home/dashboard?project=',
    },
    {
        text: 'Deployment Manager',
        link: 'https://console.cloud.google.com/dm/deployments?project=',
    },
    {
        text: 'Kubernetes Engine',
        link: 'https://console.cloud.google.com/kubernetes/list?project=',
    },
];

export class DashboardView extends PolymerElement {
    static get template() {
        return html([`<style>${css.toString()}</style> ${template()}`]);
    }

    /**
     * Object describing property-related metadata used by Polymer features
     */
    static get properties() {
        return {
            gettingStartedItems: {
                type: Array,
                value: [
                    {
                        text: 'Getting started with Kubeflow',
                        desc: 'Quickly get running with your ML workflow on ' +
                            'an existing Kubernetes installation',
                        link: `${DOCS}/getting-started/`,
                    },
                    {
                        text: 'Microk8s for Kubeflow',
                        desc: 'Quickly get Kubeflow running locally on ' +
                            'native hypervisors',
                        link: `${DOCS}/getting-started-multipass/`,
                    },
                    {
                        text: 'Minikube for Kubeflow',
                        desc: 'Quickly get Kubeflow running locally',
                        link: `${DOCS}/getting-started-minikube/`,
                    },
                    {
                        text: 'Kubernetes Engine for Kubeflow',
                        desc: 'Get Kubeflow running on Google Cloud ' +
                                'Platform. This guide is a quickstart' +
                                ' to deploying Kubeflow on Google' +
                                ' Kubernetes Engine',
                        link: `${DOCS}/getting-started-gke/`,
                    },
                    {
                        text: 'Requirements for Kubeflow',
                        desc: 'Get more detailed information about using ' +
                'Kubeflow and its components',
                        link: `${DOCS}/requirements/`,
                    },
                ],
            },
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
                        link: `/pipeline/#/archive`,
                    },
                    {
                        text: 'Create a new Notebook server',
                        desc: 'Notebook Servers',
                        link: `/jupyter/new?namespace=kubeflow`,
                    },
                    {
                        text: 'View all TF Jobs',
                        desc: 'TF Jobs',
                        link: `/tfjobs/ui/`,
                    },
                    {
                        text: 'View Katib Studies',
                        desc: 'Katib',
                        link: `/katib/`,
                    },
                ],
            },
            platformName: String,
            platformLinks: Array,
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
            this.platformLinks = GCP_LINKS.map((l) => {
                return {
                    text: l.text,
                    link: l.link + gcpProject,
                };
            });
        }
    }
}

customElements.define('dashboard-view', DashboardView);
