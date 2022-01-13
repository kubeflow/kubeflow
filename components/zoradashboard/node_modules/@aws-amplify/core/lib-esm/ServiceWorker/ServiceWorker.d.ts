/**
 * Provides a means to registering a service worker in the browser
 * and communicating with it via postMessage events.
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/
 *
 * postMessage events are currently not supported in all browsers. See:
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 *
 * At the minmum this class will register the service worker and listen
 * and attempt to dispatch messages on state change and record analytics
 * events based on the service worker lifecycle.
 */
export declare class ServiceWorkerClass {
    private _serviceWorker;
    private _registration;
    private _publicKey;
    private _subscription;
    private _logger;
    constructor();
    /**
     * Get the currently active service worker
     */
    get serviceWorker(): ServiceWorker;
    /**
     * Register the service-worker.js file in the browser
     * Make sure the service-worker.js is part of the build
     * for example with Angular, modify the angular-cli.json file
     * and add to "assets" array "service-worker.js"
     * @param {string} - (optional) Service worker file. Defaults to "/service-worker.js"
     * @param {string} - (optional) The service worker scope. Defaults to "/"
     *  - API Doc: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register
     * @returns {Promise}
     *	- resolve(ServiceWorkerRegistration)
     *	- reject(Error)
     **/
    register(filePath?: string, scope?: string): Promise<unknown>;
    /**
     * Enable web push notifications. If not subscribed, a new subscription will
     * be created and registered.
     * 	Test Push Server: https://web-push-codelab.glitch.me/
     * 	Push Server Libraries: https://github.com/web-push-libs/
     * 	API Doc: https://developers.google.com/web/fundamentals/codelabs/push-notifications/
     * @param publicKey
     * @returns {Promise}
     * 	- resolve(PushSubscription)
     *  - reject(Error)
     */
    enablePush(publicKey: string): Promise<unknown>;
    /**
     * Convert a base64 encoded string to a Uint8 array for the push server key
     * @param base64String
     */
    private _urlB64ToUint8Array;
    /**
     * Send a message to the service worker. The service worker needs
     * to implement `self.addEventListener('message') to handle the
     * message. This ***currently*** does not work in Safari or IE.
     * @param {object | string} - An arbitrary JSON object or string message to send to the service worker
     *	- see: https://developer.mozilla.org/en-US/docs/Web/API/Transferable
     * @returns {Promise}
     **/
    send(message: object | string): void;
    /**
     * Listen for service worker state change and message events
     * https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker/state
     **/
    _setupListeners(): void;
}
/**
 * @deprecated use named import
 */
export default ServiceWorkerClass;
