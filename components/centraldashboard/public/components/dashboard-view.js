import '@polymer/iron-ajax/iron-ajax.js';

import {html, PolymerElement} from '@polymer/polymer';
import css from './dashboard-view.css';
import template from './dashboard-view.pug';

const DOCS = 'https://www.kubeflow.org/docs/started';

export class DashboardView extends PolymerElement {
    static get template() {
        return html([`<style>${css.toString()}</style> ${template()}`]);
    }

    /**
     * Object describing property-related metadata used by Polymer features
     */
    static get properties() {
        return {
            platformType: String,
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
                        text: 'Open docs',
                        link: `${DOCS}/getting-started/`,
                    },
                    {
                        text: 'Open Github',
                        link: 'https://github.com/kubeflow/kubeflow',
                    },
                ],
            },
        };
    }

    // TODO: Move to mixin class
    equals(...e) {
        const crit = e.shift();
        if (!e.length) return true;
        return e.every((e) => e === crit);
    }

    _onPlatformInfoResponse(responseEvent) {
        const {response} = responseEvent.detail;
        this.platformType = response.provider;
    }
}

customElements.define('dashboard-view', DashboardView);
