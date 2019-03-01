import {PolymerElement, html} from '@polymer/polymer';

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
        return {
            gettingStartedItems: {
                type: Array,
                value: [
                    {text: 'Build a model in a notebook', icon: 'donut-large'},
                    {text: 'Launch a pipeline', icon: 'donut-large'},
                    {text: 'Deploy a solution', icon: 'donut-large'},
                    {text: 'Compare run output', icon: 'donut-large'},
                    {text: 'Share solution on AI Hub', icon: 'donut-large'},
                ],
            },
            quickLinks: {
                type: Array,
                value: [
                    {
                        text: 'Open docs',
                        link: 'https://www.kubeflow.org/docs/started/getting-started/',
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

window.customElements.define('dashboard-view', DashboardView);
