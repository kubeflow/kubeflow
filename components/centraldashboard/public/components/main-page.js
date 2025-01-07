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
import '@polymer/iron-image/iron-image.js';
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
import logo from '../assets/logo.svg';

import './registration-page.js';
import './namespace-selector.js';
import './dashboard-view.js';
import './activity-view.js';
import './not-found-view.js';
import './namespace-needed-view.js';
import './manage-users-view.js';
import './resources/kubeflow-icons.js';
import './iframe-container.js';
import './logout-button.js';
import utilitiesMixin from './utilities-mixin.js';
import {IFRAME_LINK_PREFIX} from './iframe-link.js';
import {
    ALL_NAMESPACES_ALLOWED_LIST, ALL_NAMESPACES,
} from './namespace-selector';


/**
 * Entry point for application UI.
 */
export class MainPage extends utilitiesMixin(PolymerElement) {
    static get template() {
        const vars = {logo};
        return html([
            `<style>${css.toString()}</style>${template(vars)}`]);
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
            iframeSrc: String,
            iframePage: {type: String, observer: '_iframePageChanged'},
            documentationItems: {
                type: Array,
                value: [],
            },
            quickLinks: {
                type: Array,
                value: [],
            },
            menuLinks: {
                type: Array,
                value: [],
                observer: '_menuLinksChanged',
            },
            externalLinks: {
                type: Array,
                value: [],
            },
            errorText: {type: String, value: ''},
            buildVersion: {type: String, value: BUILD_VERSION},
            dashVersion: {type: String, value: VERSION},
            logoutUrl: {type: String, value: '/logout'},
            platformInfo: Object,
            metrics: Object,
            inIframe: {type: Boolean, value: false, readOnly: true},
            hideTabs: {type: Boolean, value: false, readOnly: true},
            hideSidebar: {type: Boolean, value: false, readOnly: true},
            persistent: {type: Boolean, value: true, readOnly: true},
            hideNamespaces: {type: Boolean, value: false, readOnly: true},
            allNamespaces: {type: Boolean, value: false, readOnly: true},
            notFoundInIframe: {type: Boolean, value: false, readOnly: true},
            registrationFlow: {type: Boolean, value: false, readOnly: true},
            workgroupStatusHasLoaded: {
                type: Boolean,
                value: false,
                readOnly: true,
            },
            namespaces: Array,
            namespace: String,
            user: String,
            isClusterAdmin: {type: Boolean, value: false},
            isolationMode: {type: String, value: 'undecided', readOnly: true},
            _shouldFetchEnv: {
                type: Boolean,
                // eslint-disable-next-line max-len
                computed: 'computeShouldFetchEnv(registrationFlow, workgroupStatusHasLoaded)',
            },
            matchingIndex: Number,
            namespacedItemTemplete: String,
        };
    }

    /**
     * Array of strings describing multi-property observer methods and their
     * dependant properties
     */
    static get observers() {
        return [
            // eslint-disable-next-line
            '_routePageChanged(routeData.page,subRouteData.path,routeHash.path)',
            '_namespaceChanged(queryParams.ns)',
        ];
    }

    /**
     * Return a username without the @example.com
     * @param {string} user User email
     * @return {string} User Name.
     */
    _extractLdap(user) {
        return user.replace(/@.*$/, '');
    }

    /**
     * Resync the app with environment information
     */
    async resyncApp() {
        await this.$.envInfo.generateRequest().completes;
        this.$.welcomeUser.show();
    }

    /**
     * Show a toast error on main-page
     * @param {string} err Error message to show
     */
    showError(err) {
        this.errorText = err;
    }

    closeError() {
        this.errorText = '';
    }

    /**
     * Set state for loading registration flow in case no dashboard links exists
     * @param {Event} ev AJAX-response
     */
    _onHasDashboardLinksError(ev) {
        const error = ((ev.detail.request||{}).response||{}).error ||
            ev.detail.error;
        this.showError(error);
        return;
    }

    /**
     * Set state for Central dashboard links
     * @param {Event} ev AJAX-response
     */
    _onHasDashboardLinksResponse(ev) {
        const {
            menuLinks,
            externalLinks,
            quickLinks,
            documentationItems,
        } = ev.detail.response;
        this.menuLinks = menuLinks || [];
        this.externalLinks = externalLinks || [];
        this.quickLinks = quickLinks || [];
        this.documentationItems = documentationItems || [];
    }

    /**
     * Set state for loading registration flow in case no workgroup exists
     * @param {Event} ev AJAX-response
     */
    _onHasWorkgroupError(ev) {
        const error = ((ev.detail.request||{}).response||{}).error ||
            ev.detail.error;
        this.showError(error);
        return;
    }

    /**
     * Set state for loading registration flow in case no workgroup exists
     * @param {Event} ev AJAX-response
     */
    _onHasWorkgroupResponse(ev) {
        const {user, hasWorkgroup, hasAuth,
            registrationFlowAllowed} = ev.detail.response;
        this._setIsolationMode(hasAuth ? 'multi-user' : 'single-user');
        if (registrationFlowAllowed && hasAuth && !hasWorkgroup) {
            this.user = user;
            this._setRegistrationFlow(true);
        }
        this._setWorkgroupStatusHasLoaded(true);
    }

    /**
     * Simulate page changed to activate the correct menu link. This callback
     * is called in response to the async call to /api/dashboard-links that
     * happens at every page refresh.
     *
     * @param {Array} newValue - new menu links
     */
    _menuLinksChanged(newValue) {
        if (newValue) {
            this._routePageChanged(this.routeData.page, this.subRouteData.path,
                this.routeHash.path);
        }
    }

    /**
     * Handles route changes by evaluating the page path component
     * @param {string} newPage
     * @param {string} path
     * @param {string} hashPath
     */
    _routePageChanged(newPage, path, hashPath) {
        let isIframe = false;
        let notFoundInIframe = false;
        let hideTabs = true;
        let hideNamespaces = false;
        let allNamespaces = false;
        let hideSidebar = false;

        switch (newPage) {
        case 'logout':
            window.top.location.href = '/logout';
            break;
        case 'activity':
            this.page = 'activity';
            hideTabs = false;
            this._setActiveLink(this.$.home);
            break;
        case IFRAME_LINK_PREFIX:
            this.page = 'iframe';
            isIframe = true;
            hideNamespaces = false;
            this._setActiveMenuLink(path, hashPath);
            this._setIframeSrc();
            break;
        case 'manage-users':
            this.page = 'manage-users';
            hideTabs = true;
            allNamespaces = true;
            hideSidebar = false;
            // need to use the shadowRoot selector instead of this.$ because
            // this.$ does not contain dynamically created DOM nodes
            this._setActiveLink(this.shadowRoot.querySelector('#contributors'));
            break;
        case '':
            this.page = 'dashboard';
            hideTabs = false;
            this._setActiveLink(this.$.home);
            break;
        default:
            // Handles case when an iframed page requests an invalid route
            if (this._isInsideOfIframe()) {
                notFoundInIframe = true;
                hideSidebar = true;
            }
            if (path && path.includes('{ns}')) {
                this.page = 'namespace_needed';
            } else {
                this.page = 'not_found';
            }
        }

        this._setNotFoundInIframe(notFoundInIframe);
        this._setHideTabs(hideTabs);
        this._setAllNamespaces(allNamespaces);
        this._setHideNamespaces(hideNamespaces);
        this._setInIframe(isIframe);
        this._setHideSidebar(hideSidebar);

        // If iframe <-> [non-frame OR other iframe]
        if (!this.persistent || hideSidebar || isIframe !== this.inIframe) {
            this.$.MainDrawer.close();
        }

        if (!isIframe) {
            this.iframeSrc = 'about:blank';
        }
        this._enableAllNamespaceOption();
    }

    _namespaceChanged(namespace) {
        // update namespaced menu item when namespace is changed
        // by namespace selector

        if (namespace) {
            // Save the user's choice so we are able to restore it,
            // when re-loading the page without a queryParam
            const localStorageKey = '/centraldashboard/selectedNamespace/' +
                (this.user && '.' + this.user || '');
            localStorage.setItem(localStorageKey, namespace);
        }

        if (this.namespacedItemTemplete &&
            this.namespacedItemTemplete.includes('{ns}')) {
            this.set('subRouteData.path',
                this.namespacedItemTemplete.replace('{ns}', namespace));
        }
    }

    _buildHref(href, queryParamsChange) {
        // The "queryParams" value from "queryParamsChange" is not updated as
        // expected in the "iframe-link", but it works in anchor element.
        // A temporary workaround is  to use "this.queryParams" as an input
        // instead of "queryParamsChange.base".
        // const queryParams = queryParamsChange.base;
        const queryParams = this.queryParams;
        if (!queryParams || !queryParams['ns']) {
            return this.buildHref(href, this.queryParams);
        }
        return this.buildHref(href.replace('{ns}', queryParams['ns']),
            queryParams);
    }

    /**
     * Parse namespace in external links
     * @param {string} href - external link
     * @param {Object} queryParamsChange - queryParams updated on-the-fly
     * @return {string}
     */
    _buildExternalHref(href, queryParamsChange) {
        // The "queryParams" value from "queryParamsChange" is not updated as
        // expected in the "iframe-link", but it works in anchor element.
        // A temporary workaround is  to use "this.queryParams" as an input
        // instead of "queryParamsChange.base".
        // const queryParams = queryParamsChange.base;
        const queryParams = this.queryParams;
        if (!queryParams || !queryParams['ns']) {
            return href.replace('{ns}', '');
        }
        return href.replace('{ns}', queryParams['ns']);
    }

    /**
     * Builds the new iframeSrc string based on the subroute path, current
     * hash fragment, and the query string parameters other than ns.
     */
    _setIframeSrc() {
        const iframeUrl = new URL(this.subRouteData.path,
            window.location.origin);
        iframeUrl.hash = window.location.hash;
        iframeUrl.search = window.location.search;
        iframeUrl.searchParams.delete('ns');
        this.iframeSrc = iframeUrl.toString();
    }

    /**
     * Observer to reflect navigation in iframed pages and replace history.
     * @param {string} newPage - iframe page path
     */
    _iframePageChanged(newPage) {
        const l = new URL(`${IFRAME_LINK_PREFIX}${newPage}`
            , window.location.origin);
        for (const key in this.queryParams) {
            if (this.queryParams.hasOwnProperty(key)) {
                l.searchParams.append(key, this.queryParams[key]);
            }
        }
        window.history.replaceState(null, null, l.toString());
    }

    /**
     * [ComputeProp] `shouldFetchEnv`
     * @param {boolean} registrationFlow
     * @param {boolean} workgroupStatusHasLoaded
     * @return {boolean}
     */
    computeShouldFetchEnv(registrationFlow, workgroupStatusHasLoaded) {
        return !registrationFlow && workgroupStatusHasLoaded;
    }

    /**
     * Tries to determine which menu link to activate based on the provided
     * path.
     * @param {string} path
     * @param {string} hashPath
     */
    _setActiveMenuLink(path, hashPath) {
        const htmlElements = this._clearActiveLink();
        let matchPath = path;
        let matchingLink = '';
        const allLinksTemplete = this.menuLinks.map((m) => {
            return m.type === 'section' ? m.items.map((x) => x.link) : m.link;
        }).flat().sort();
        const allLinks = allLinksTemplete.map((m) => {
            // replace namespaced menu items
            const queryParams = this.queryParams;
            if (!queryParams || !queryParams['ns']) {
                return m;
            }
            return m.replace('{ns}', queryParams['ns']);
        });
        if (hashPath) {
            matchPath = path + '#' + hashPath;
            this.matchingIndex = allLinks
                .findIndex((l) => this.compareLinks(l, matchPath));
        } else {
            allLinks.forEach((link, index) => {
                if (path.startsWith(link)) {
                    this.matchingIndex = index;
                }
            });
        }
        matchingLink = allLinks[this.matchingIndex];

        // find the HTML element that references the active link
        const activeMenuEl = Array.from(htmlElements).find(
            (x) => this.compareLinks(x.parentElement.href, matchingLink));
        if (activeMenuEl) {
            // in case the item is a section item, open its section
            this.namespacedItemTemplete = allLinksTemplete[this.matchingIndex];
            activeMenuEl.parentElement.parentElement.opened = true;
            activeMenuEl.classList.add('iron-selected');
        }
    }

    _setActiveLink(elemRef) {
        this._clearActiveLink();
        if (elemRef) {
            elemRef.classList.add('iron-selected');
        }
    }

    _clearActiveLink() {
        const htmlElements = this.shadowRoot.querySelectorAll(
            '.menu-item:not(.section-item)');
        // remove the selection from every menu item
        htmlElements.forEach((x) => x.classList.remove('iron-selected'));
        return htmlElements;
    }

    compareLinks(link, matchingLink) {
        const url = new URL(link, window.location.origin);
        const matchingUrl = new URL(matchingLink, window.location.origin);
        return url.pathname.replace(/\/$/, '')
            === matchingUrl.pathname.replace(/\/$/, '')
            && matchingUrl.hash.startsWith(url.hash);
    }

    _toggleMenuSection(e) {
        // look upwards until we find <paper-item>
        let el = e.target;
        while (el && el.tagName !== 'PAPER-ITEM') {
            el = el.parentElement;
        }

        // if we found paper-item, the next sibling is the section
        if (el) {
            el.nextElementSibling.toggle();
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

    /**
     * Handles the AJAX response from the platform-info API.
     * @param {Event} responseEvent AJAX-response
     */
    _onEnvInfoResponse(responseEvent) {
        const {
            platform, user, namespaces, isClusterAdmin,
        } = responseEvent.detail.response;
        Object.assign(this, {user, isClusterAdmin});
        this.namespaces = namespaces;
        if (this.namespaces.length) {
            this._setRegistrationFlow(false);
        } else if (this.isolationMode == 'single-user') {
            // This case is for non-identity networks, that have no namespaces
            this._setRegistrationFlow(true);
        }
        const ownedNamespaces = [];
        const editNamespaces = [];
        const viewNamespaces = [];
        if (this.namespaces.length) {
            this.namespaces.forEach((ns) => {
                if (ns.role === 'owner') {
                    ownedNamespaces.push(ns);
                } else if (ns.role === 'contributor') {
                    editNamespaces.push(ns);
                } else if (ns.role === 'viewer') {
                    viewNamespaces.push(ns);
                }
            });
            this.ownedNamespaces = ownedNamespaces;
            this.editNamespaces = editNamespaces;
            this.viewNamespaces = viewNamespaces;
            this.hasNamespaces = true;
        }
        this.platformInfo = platform;
        const kVer = this.platformInfo.kubeflowVersion;
        if (kVer && kVer != 'unknown') {
            this.buildVersion = this.platformInfo.kubeflowVersion;
        }
        if (platform.logoutUrl) {
            this.logoutUrl = platform.logoutUrl;
        }
        // trigger template render
        this.menuLinks = JSON.parse(JSON.stringify(this.menuLinks));
        this._enableAllNamespaceOption();
    }

    _enableAllNamespaceOption(iframeSrc) {
        if (!iframeSrc) {
            iframeSrc = this.iframeSrc;
        }
        if (!this.namespaces) {
            return;
        }
        const allNamespaces = {
            namespace: ALL_NAMESPACES,
            role: '',
            user: '',
            disabled: true,
        };
        const namespaces = this.namespaces.filter(
            (ns) => ns.namespace !== ALL_NAMESPACES
        );

        const allowedUIs = ALL_NAMESPACES_ALLOWED_LIST
            .map((ui) => new URL(ui, window.location.origin).toString());

        if (allowedUIs.find((ui)=>iframeSrc.startsWith(ui))) {
            allNamespaces.disabled = false;
        }

        this.namespaces = [allNamespaces, ...namespaces];
    }
}

window.customElements.define('main-page', MainPage);
