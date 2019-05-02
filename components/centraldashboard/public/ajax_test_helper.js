/**
 * @fileoverview Helper functions for testing iron-ajax interactions.
 */
import 'jasmine-ajax';

/**
 * Intercepts the iron-ajax-request event to be able to respond with a mock
 * response. Returns a Promise that resolves whenever the mockRequest is
 * handled.
 * @param {HTMLElement} component
 * @param {object} response
 * @param {boolean=} respondWithError
 * @param {string=} matchUrl
 * @return {Promise} Resolves when iron-ajax-response is handled
 */
export function mockRequest(component, response, respondWithError = false,
    matchUrl = null) {
    const responseEvent = respondWithError ?
        'iron-ajax-error' : 'iron-ajax-response';
    return new Promise((resolve) => {
        component.addEventListener('iron-ajax-request', (event) => {
            if (!matchUrl || matchUrl === event.detail.options.url) {
                jasmine.Ajax.requests.mostRecent().respondWith(response);
            }
        });
        component.addEventListener(responseEvent, () => resolve());
    });
}
