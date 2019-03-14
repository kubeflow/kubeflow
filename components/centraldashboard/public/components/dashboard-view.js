import {html, PolymerElement} from '@polymer/polymer';
import css from './dashboard-view.css';
import template from './dashboard-view.pug';

export class DashboardView extends PolymerElement {
    static get template() {
        return html([`<style>${css.toString()}</style> ${template()}`]);
    }

    /**
     * Object describing property-related metadata used by Polymer features
     */
    static get properties() {
        const kubeflowDocs = 'https://www.kubeflow.org/docs/started';

        return {
            gettingStartedItems: {
                type: Array,
                value: [
                    {
                        text: 'Getting started with Kubeflow',
                        desc: 'Quickly get running with your ML workflow on ' +
                            'an existing Kubernetes installation',
                        link: `${kubeflowDocs}/getting-started/`,
                    },
                    {
                        text: 'Microk8s for Kubeflow',
                        desc: 'Quickly get Kubeflow running locally on ' +
                            'native hypervisors',
                        link: `${kubeflowDocs}/getting-started-multipass/`,
                    },
                    {
                        text: 'Minikube for Kubeflow',
                        desc: 'Quickly get Kubeflow running locally',
                        link: `${kubeflowDocs}/getting-started-minikube/`,
                    },
                    {
                        text: 'Kubernetes Engine for Kubeflow',
                        desc: 'Get Kubeflow running on Google Cloud ' +
                                'Platform. This guide is a quickstart' +
                                ' to deploying Kubeflow on Google' +
                                ' Kubernetes Engine',
                        link: `${kubeflowDocs}/getting-started-gke/`,
                    },
                    {
                        text: 'Requirements for Kubeflow',
                        desc: 'Get more detailed information about using ' +
                'Kubeflow and its components',
                        link: `${kubeflowDocs}/requirements/`,
                    },
                ],
            },
            quickLinks: {
                type: Array,
                value: [
                    {
                        text: 'Open docs',
                        link: `${kubeflowDocs}/getting-started/`,
                    },
                    {
                        text: 'Open Github',
                        link: 'https://github.com/kubeflow/kubeflow',
                    },
                ],
            },
        };
    }
}

customElements.define('dashboard-view', DashboardView);
