import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/iron-selector/iron-selector.js';
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
import logo from '../assets/kf-logo.svg';

import './namespace-selector.js';
import './dashboard-view.js';
import './activity-view.js';
import './not-found-view.js';
import utilitiesMixin from './utilities-mixin.js';
import {MESSAGE, PARENT_CONNECTED_EVENT, IFRAME_CONNECTED_EVENT,
    NAMESPACE_SELECTED_EVENT} from '../library.js';
import {IFRAME_LINK_PREFIX} from './iframe-link.js';

/**
 * Entry point for application UI.
 */
export class MainPage extends utilitiesMixin(PolymerElement) {
    static get template() {
        const pugVariables = {logo: logo};
        return html([
            `<style>${css.toString()}</style>${template(pugVariables)}`]);
    }

    static get properties() {
        return {
            page: String,
            routeData: Object,
            subRouteData: Object,
            queryParams: {
                type: Object,
                value: null, // Necessary to preserve queryString from load
            },
            iframeRoute: Object,
            menuLinks: {
                type: Array,
                value: [
                    {
                        link: '/pipeline/',
                        text: 'Pipelines',
                    },
                    {
                        link: '/jupyter/',
                        text: 'Notebook Servers',
                    },
                    {
                        link: '/tfjobs/ui/',
                        text: 'TF Jobs Dashboard',
                    },
                    {
                        link: '/katib/',
                        text: 'Katib Dashboard',
                    },
                ],
            },
            sidebarItemIndex: {type: Number, value: 0,
                observer: '_revertSidebarIndexIfExternal'},
            iframeUrl: {type: String, value: ''},
            buildVersion: {type: String, value: BUILD_VERSION},
            dashVersion: {type: String, value: VERSION},
            platformInfo: Object,
            inIframe: {type: Boolean, value: false, readOnly: true},
            hideTabs: {type: Boolean, value: false, readOnly: true},
            hideNamespaces: {type: Boolean, value: false, readOnly: true},
            notFoundInIframe: {type: Boolean, value: false, readOnly: true},
            namespace: {type: String, observer: '_namespaceChanged'},
        };
    }

    /**
     * Initializes private iframe state variables and attaches a listener for
     * messages received by the window object.
     */
    ready() {
        super.ready();
        this._iframeConnected = false;
        this._iframeOrigin = null;
        this._messageListener = this._onMessageReceived.bind(this);
        window.addEventListener(MESSAGE, this._messageListener);
    }

    /**
     * Remove the event listener for messages.
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener(MESSAGE, this._messageListener);
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

    /**
     * Handles route changes by evaluating the page path component
     * @param {string} newPage
     */
    _routePageChanged(newPage) {
        let isIframe = false;
        let notFoundInIframe = false;
        let hideTabs = true;
        let hideNamespaces = false;
        let iframeUrl;

        switch (newPage) {
        case 'activity':
            this.sidebarItemIndex = 0;
            this.page = 'activity';
            hideTabs = false;
            break;
        case IFRAME_LINK_PREFIX:
            this.page = 'iframe';
            iframeUrl = new URL(this.subRouteData.path, window.location.origin);
            iframeUrl.hash = window.location.hash;
            iframeUrl.search = window.location.search;
            this.iframeUrl = iframeUrl.toString();
            isIframe = true;
            hideNamespaces = this.subRouteData.path.startsWith('/pipeline');
            this._setActiveMenuLink(this.subRouteData.path);
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
            if (this._isInsideOfIframe()) {
                notFoundInIframe = true;
            }
        }
        this._setNotFoundInIframe(notFoundInIframe);
        this._setHideTabs(hideTabs);
        this._setHideNamespaces(hideNamespaces);
        this._setInIframe(isIframe);

        this._iframeConnected = this._iframeConnected && isIframe;
        // If iframe <-> [non-frame OR other iframe]
        if (isIframe !== this.inIframe || isIframe) {
            this.$.MainDrawer.close();
        }
    }

    /**
     * Revert the sidebar index if the item clicked is an external link
     * @param {int} curr
     * @param {int} old
     */
    _revertSidebarIndexIfExternal(curr, old=0) {
        if (curr <= this.menuLinks.length) return;
        this.sidebarItemIndex = old;
    }

    /**
     * Handles namespace change. Sends message if the value has changed.
     * @param {string} newValue
     * @param {string} oldValue
     */
    _namespaceChanged(newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
            this._sendNamespaceMessage();
        }
    }

    /**
     * Tries to determine which menu link to activate based on the provided
     * path.
     * @param {string} path
     */
    _setActiveMenuLink(path) {
        const menuLinkIndex = this.menuLinks
            .findIndex((m) => path.startsWith(m.link));
        if (menuLinkIndex >= 0) {
            // Adds 1 since Overview is hard-coded
            this.sidebarItemIndex = menuLinkIndex + 1;
        } else {
            this.sidebarItemIndex = -1;
        }
    }

    /**
     * Returns true when this component is found to be iframed inside of a
     * parent page.
     * @return {boolean}
     */
    _isInsideOfIframe() {
        return window.location !== window.parent.location;
    }

    /* Handles the AJAX response from the platform-info API.
     * @param {Event} responseEvent AJAX-response
     */
    _onPlatformInfoResponse(responseEvent) {
        const {response} = responseEvent.detail;
        this.platformInfo = response;
        if (this.platformInfo.kubeflowVersion) {
            this.buildVersion = this.platformInfo.kubeflowVersion;
        }
    }

    /**
     * Sends a message to the iframe message bus. This is used on the iframe
     * load event as well as when the namespace changes.
     */
    _sendNamespaceMessage() {
        if (!this._iframeConnected) return;
        this.$.PageFrame.contentWindow.postMessage({
            type: NAMESPACE_SELECTED_EVENT,
            value: this.namespace,
        }, this._iframeOrigin);
    }

    /**
     * Receives a message from an iframe page and passes the selected namespace.
     * @param {MessageEvent} event
     */
    _onMessageReceived(event) {
        const {data, origin} = event;
        this._iframeOrigin = origin;
        switch (data.type) {
        case IFRAME_CONNECTED_EVENT:
            this._iframeConnected = true;
            this.$.PageFrame.contentWindow.postMessage({
                type: PARENT_CONNECTED_EVENT,
                value: null,
            }, origin);
            this._sendNamespaceMessage();
            break;
        }
    }
}

window.customElements.define('main-page', MainPage);
