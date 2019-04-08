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
 * pages and the CentralDashboard component.
 */
export class CentralDashboardEventHandler {
    /**
     * Initializes the handler with a reference to its parent and flag
     * indicating whether it's iframed.
     */
    constructor() {
        this.window = window;
        this.parent = window.parent;
        this._onParentConnected = null;
        this._onNamespaceSelected = null;

        if (this.window.location !== this.parent.location) {
            this.window.addEventListener(MESSAGE,
                this._onMessageReceived.bind(this));
            this.parent.postMessage({type: IFRAME_CONNECTED_EVENT},
                this.parent.origin);
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
                this._onNamespaceSelected(data);
            }
            break;
        }
    }
}
