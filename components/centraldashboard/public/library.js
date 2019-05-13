/**
 * @fileoverview Library for use with pages that need to communicate with the
 * Central Dashboard.
 */
export const PARENT_CONNECTED_EVENT = 'parent-connected';
export const IFRAME_CONNECTED_EVENT = 'iframe-connected';
export const NAMESPACE_SELECTED_EVENT = 'namespace-selected';
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
        this._messageEventListener = null;
        this._onParentConnected = null;
        this._onNamespaceSelected = null;
    }

    /**
     * Invokes the supplied callback function, then establishes the
     * communication with the parent frame.
     * @param {Function} callback - Callback invoked with this instance and a
     *  boolean indicating whether the page importing the library is iframed.
     */
    init(callback) {
        const isIframed = this.window.location !== this.parent.location;
        callback(this, isIframed);
        if (isIframed) {
            this._messageEventListener = this._onMessageReceived.bind(this);
            this.window.addEventListener(MESSAGE, this._messageEventListener);
            this.parent.postMessage({type: IFRAME_CONNECTED_EVENT},
                this.parent.origin);
        }
    }

    /**
     * Removes the message event listener.
     */
    detach() {
        if (this._messageEventListener) {
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
        }
    }
}

// Exports a singleton instance
export const CentralDashboardEventHandler = new CentralDashboardEventHandler_();
