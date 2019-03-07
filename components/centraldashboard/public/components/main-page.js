import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import 'web-animations-js/web-animations-next.min.js';
import '@polymer/neon-animation/neon-animatable.js';
import '@polymer/neon-animation/neon-animated-pages.js';
import '@polymer/neon-animation/animations/fade-in-animation.js';
import '@polymer/neon-animation/animations/fade-out-animation.js';

import css from './main-page.css';
import template from './main-page.pug';

/**
 * Entry point for application UI.
 */
export class MainPage extends PolymerElement {
    static get template() {
        return html([`<style>${css.toString()}</style> ${template()}`]);
    }

    static get properties() {
        return {
            links: {
                type: Array,
                value: [
                    {text: 'Home', defaultPage: true, hasDivider: true},
                    {
                        link: 'https://www.kubeflow.org/docs/about/kubeflow/',
                        text: 'Kubeflow docs',
                    },
                    {link: '/jupyter/', text: 'Notebooks'},
                    {link: '/tfjobs/ui/', text: 'TFJob Dashboard'},
                    {link: '/katib/', text: 'Katib Dashboard'},
                    {link: '/pipeline/', text: 'Pipeline Dashboard'},
                ],
            },
            gettingStartedItems: {
                type: Array,
                value: [
                    {
                        text: 'Getting started with Kubeflow',
                        desc: 'Quickly get running with your ML workflow on an existing Kubernetes installation',
                        link: 'https://www.kubeflow.org/docs/started/getting-started/',
                        icon: 'launch',
                    },{
                        text: 'Microk8s for Kubeflow',
                        desc: 'Quickly get Kubeflow running locally on native hypervisors',
                        link: 'https://www.kubeflow.org/docs/started/getting-started-multipass/',
                        icon: 'launch',
                    },{
                        text: 'Minikube for Kubeflow',
                        desc: 'Quickly get Kubeflow running locally',
                        link: 'https://www.kubeflow.org/docs/started/getting-started-minikube/',
                        icon: 'launch',
                    },{
                        text: 'Kubernetes Engine for Kubeflow',
                        desc: 'Get Kubeflow running on Google Cloud Platform. This guide is a quickstart to deploying Kubeflow on Google Kubernetes Engine',
                        link: 'https://www.kubeflow.org/docs/started/getting-started-gke/',
                        icon: 'launch',
                    },{
                        text: 'Requirements for Kubeflow',
                        desc: 'Get more detailed information about using Kubeflow and its components',
                        link: 'https://www.kubeflow.org/docs/started/requirements/',
                        icon: 'launch',
                    },
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
            sidebarItemIndex: {type: Number, value: 0},
            primaryViewIndex: {type: Number, value: 0},
            homeOrIframeViewIndex: {type: Number, value: 0},
            url: {type: String, value: ''},
            buildVersion: {type: String, value: '0.4.1'},
            dashVersion: {type: String, value: VERSION},
            _devMode: {type: Boolean, value: false},
        };
    }

    openExternalLink(href) {
        const a = document.createElement('a');
        a.href = href;
        a.target = '_blank';
        a.click();
    }

    openQuickLink(e) {
        const {link} = e.model.item;
        this.openExternalLink(link);
    }

    openLink(e) {
        const {link, defaultPage} = e.model.item;
        this.homeOrIframeViewIndex = defaultPage ? 0 : 1;
        if (defaultPage) return;
        this.url = link;
    }

    toggleSidebar() {
        this.$.MainDrawer.toggle();
    }

    isZero(i) {
        return i === 0;
    }
}

window.customElements.define('main-page', MainPage);
