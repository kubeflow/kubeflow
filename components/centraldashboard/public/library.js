/**
 * @fileoverview Library for use with pages that need to communicate with the
 * Central Dashboard.
 */
export const PARENT_CONNECTED_EVENT = 'parent-connected';
export const APP_CONNECTED_EVENT = 'iframe-connected';
export const NAMESPACE_SELECTED_EVENT = 'namespace-selected';
export const ALL_NAMESPACES_EVENT = 'all-namespaces';
export const MESSAGE = 'message';

/**
 * Encapsulates the sending, receiving, and handling of events between iframed
 * pages and the CentralDashboard component. Events data should a type property
 * indicating the type of message and a value property with the payload.
 */
class CentralDashboardEventHandler_ {
    constructor() {
        this.window = window;
        this.parent = window.parent;
        this.opener = window.opener;
        this._messageEventListener = null;
        this._onParentConnected = null;
        this._onNamespaceSelected = null;
        this._onAllNamespacesSelected = null;
    }

    /**
     * Invokes the supplied callback function, then establishes the
     * communication with the parent frame.
     * @param {Function} callback - Callback invoked with this instance and a
     *  boolean indicating whether the page importing the library is iframed.
     * @param {boolean} disableForceIframe - In case DASHBOARD_FORCE_IFRAME
     *  is set to true, forcing every app to be iframed, set this flag to avoid
     *  the redirection.
     */
    init(callback, disableForceIframe = false) {
        callback(this, this.isIframed || this.isOpenedByApp);

        if (this.isOpenedByApp) {
            this._attachListenerToIframe();
        } else if (this.isIframed) {
            this._attachListenerToDashboard();
        } else if (!disableForceIframe) {
            fetch('/api/dashboard-settings')
                .then((res) => res.json())
                .then((data) => {
                    if (data.DASHBOARD_FORCE_IFRAME) {
                        // pre-pend `/_/` to navigate to central dashboard
                        const newLoc = this.window.location.origin
                            + this.window.location.href.replace(
                                this.window.location.origin, '/_');
                        this.window.location.replace(newLoc);
                    }
                })
                // eslint-disable-next-line no-console
                .catch((err) => console.error(err));
        }
    }

    /**
     * Removes the message event listener.
     */
    detach() {
        if (!this._messageEventListener) {
            return;
        }

        if (this.isOpenedByApp) {
            this.opener.removeEventListener(MESSAGE,
                this._messageEventListener);
        }

        if (this.isIframed) {
            this.window.removeEventListener(MESSAGE,
                this._messageEventListener);
        }
    }

    /**
     * Attaches a callback function to respond to the PARENT_CONNECTED_EVENT
     * event.
     * @param {Function} callback - Callback accepting an object that contains
     *  the event data.
     */
    set onParentConnected(callback) {
        if (typeof callback === 'function') {
            this._onParentConnected = callback;
        }
    }

    /**
     * Attaches a callback function to respond to the NAMESPACE_SELECTED_EVENT
     * event.
     * @param {Function} callback - Callback accepting an object that contains
     *  the event data.
     */
    set onNamespaceSelected(callback) {
        if (typeof callback === 'function') {
            this._onNamespaceSelected = callback;
        }
    }

    /**
     * Attaches a callback function to respond to the ALL_NAMESPACES_EVENT
     * event.
     * @param {Function} callback - Callback accepting an object that contains
     *  the event data.
     */
    set onAllNamespacesSelected(callback) {
        if (typeof callback === 'function') {
            this._onAllNamespacesSelected = callback;
        }
    }

    get isIframed() {
        return this.window.location !== this.parent.location;
    }

    get isOpenedByApp() {
        return this.opener !== null;
    }

    /**
     * Handle the receipt of a message and dispatch to any added callbacks.
     * @param {MessageEvent} event
     */
    _onMessageReceived(event) {
        const {data} = event;
        switch (data.type) {
        case PARENT_CONNECTED_EVENT:
            if (this._onParentConnected) {
                this._onParentConnected(data);
            }
            break;
        case NAMESPACE_SELECTED_EVENT:
            if (this._onNamespaceSelected) {
                this._onNamespaceSelected(data.value);
            }
            break;
        case ALL_NAMESPACES_EVENT:
            if (this._onAllNamespacesSelected) {
                this._onAllNamespacesSelected(data.value);
            }
            break;
        }
    }

    /**
     * If the app is iframed then it should add an eventListener on its own
     * window. The CentralDashboard will be sending NAMESPACE_SELECTED_EVENT
     * events to the iframed window.
     */
    _attachListenerToDashboard() {
        this._messageEventListener = this._onMessageReceived.bind(this);
        this.window.addEventListener(MESSAGE, this._messageEventListener);
        this.parent.postMessage({type: APP_CONNECTED_EVENT},
            this.parent.origin);
    }

    /**
     * If the app is opened by another app, then it should add an eventListener
     * to its opener window. We expect the opener window to be iframed in the
     * CentralDashboard.
     */
    _attachListenerToIframe() {
        this._messageEventListener = this._onMessageReceived.bind(this);
        this.opener.addEventListener(MESSAGE,
            this._messageEventListener);

        // Notify the Dashboard that an app connected, in order for Dashboard
        // to propagate the selected namespace. We expect the dasbhoard to be
        // in the opener's parent window.
        this.opener.parent.postMessage({type: APP_CONNECTED_EVENT},
            this.opener.parent.origin);

        // Remove event listener when the window closes in order to avoid
        // being called with wrong context.
        this.window.addEventListener('beforeunload', (evt) => {
            this.detach();
        });
    }
}

// Exports a singleton instance
export const CentralDashboardEventHandler = new CentralDashboardEventHandler_();
