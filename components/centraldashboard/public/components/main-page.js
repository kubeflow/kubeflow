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
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-media-query/iron-media-query.js';
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

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import css from './main-page.css';
import template from './main-page.pug';

import './namespace-selector.js';
import './dashboard-view.js';
import './activity-view.js';
import './not-found-view.js';

/**
 * Entry point for application UI.
 */
export class MainPage extends PolymerElement {
    static get template() {
        return html([`
        <style is="custom-style"
            include="iron-flex iron-flex-alignment iron-positioning">
        <style>${css.toString()}</style>${template()}
        `]);
    }

    static get properties() {
        return {
            page: String,
            routeData: Object,
            subRouteData: Object,
            queryParams: {
                type: Object,
                value: null,
            },
            iframeRoute: Object,
            menuLinks: {
                type: Array,
                value: [
                    {
                        iframeUrl: 'https://www.kubeflow.org/docs/about/kubeflow/',
                        text: 'Kubeflow docs',
                        href: '/docs',
                    },
                    {
                        iframeUrl: '/jupyter/',
                        text: 'Notebooks',
                        href: '/notebooks',
                    },
                    {
                        iframeUrl: '/tfjobs/ui/',
                        text: 'TFJob Dashboard',
                        href: '/tjob-dashboard',
                    },
                    {
                        iframeUrl: '/katib/',
                        text: 'Katib Dashboard',
                        href: '/katib-dashboard',
                    },
                    {
                        iframeUrl: '/pipeline/',
                        text: 'Pipeline Dashboard',
                        href: '/pipeline-dashboard',
                    },
                ],
            },
            sidebarItemIndex: {type: Number, value: 0},
            iframeUrl: {type: String, value: ''},
            buildVersion: {type: String, value: BUILD_VERSION},
            dashVersion: {type: String, value: VERSION},
            inIframe: {type: Boolean, value: false, readOnly: true},
            hideTabs: {type: Boolean, value: false, readOnly: true},
            notFoundInIframe: {type: Boolean, value: false, readOnly: true},
        };
    }


    /**
     * Array of strings describing multi-property observer methods and their
     * dependant properties
     */
    static get observers() {
        return [
            '_routePageChanged(routeData.page)',
        ];
    }

    ready() {
        super.ready();
        fetch('assets/kf-logo_64px.svg')
            .then((r) => r.text())
            .then((svg) => {
                this.$['Narrow-Slider'].querySelector('.Logo').innerHTML += [
                    svg,
                    `<figcaption>Kubeflow</figcaption>`,
                ].join('');
            });
    }

    /**
     * [MACRO] Provide a logical OR functionality for the Polymer DOM
     * @param {...boolean} e
     * @return {boolean}
     */
    or(...e) {
        return e.some((i) => Boolean(i));
    }

    /**
     * [MACRO] Provide a logical equals functionality for the Polymer DOM
     * @param {...any} e
     * @return {boolean}
     */
    equals(...e) {
        const crit = e.shift();
        if (!e.length) return true;
        return e.every((e) => e === crit);
    }

    /**
     * Intercepts any external links and ensures that they are captured in
     * the route and sent to the iframe source.
     * @param {MouseEvent} e
     */
    openInIframe(e) {
        const url = new URL(e.currentTarget.href);
        window.history.pushState({}, null, `_${url.pathname}`);
        window.dispatchEvent(new CustomEvent('location-changed'));
        e.preventDefault();
    }

    /**
     * Handles route changes by evaluating the page path component
     * @param {string} newPage
     */
    _routePageChanged(newPage) {
        let isIframe = false;
        let notFoundInIframe = false;
        let hideTabs = true;
        switch (newPage) {
        case 'activity':
            this.sidebarItemIndex = 0;
            this.page = 'activity';
            hideTabs = false;
            break;
        case '_': // iframe case
            this._setIframeFromRoute(this.subRouteData.path);
            isIframe = true;
            break;
        case '':
            this.sidebarItemIndex = 0;
            this.page = 'dashboard';
            hideTabs = false;
            break;
        default:
            this.sidebarItemIndex = -1;
            this.page = 'not_found';
            // Handles case when an iframed page requests an invalid route
            if (window.location !== window.parent.location) {
                notFoundInIframe = true;
            }
        }
        this._setNotFoundInIframe(notFoundInIframe);
        this._setHideTabs(hideTabs);
        this._setInIframe(isIframe);
        // If iframe <-> [non-frame OR other iframe]
        if (isIframe !== this.inIframe || isIframe) {
            this.$.MainDrawer.close();
        }
    }

    /**
     * Sets the iframeUrl and sidebarItem based on the subpage component
     * provided.
     * @param {string} href
     */
    _setIframeFromRoute(href) {
        const menuLinkIndex = this.menuLinks.findIndex((m) => m.href === href);
        if (menuLinkIndex >= 0) {
            this.page = 'iframe';
            this.iframeUrl = this.menuLinks[menuLinkIndex].iframeUrl;
            this.sidebarItemIndex = menuLinkIndex + 1;
        } else {
            this.sidebarItemIndex = -1;
            this.page = 'not_found';
        }
    }
}

window.customElements.define('main-page', MainPage);
