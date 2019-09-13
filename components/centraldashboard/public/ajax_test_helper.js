/**
 * @fileoverview Helper functions for testing iron-ajax interactions.
 */
import 'jasmine-ajax';

/**
 * Intercepts the iron-ajax-request event to be able to respond with a mock
 * response. Returns a Promise that resolves whenever the mockRequest is
 * handled.
 * @param {HTMLElement} component Any component that can access the event
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

/**
 * Simply yeilds to the next tick, so that all Promised requests can do their
 * thing.
 */
export async function yeildForRequests() {
    const sleep = (t) => new Promise((res) => setTimeout(res, t));
    await sleep(1);
}

/**
 * Helper method that will mock a request directly on the iron-ajax element
 * by overriding its `generateRequest()` method
 * @param {HTMLElement} component Iron Ajax elements only
 * @param {object} response
 * @param {boolean=} respondWithError
 */
export function mockIronAjax(component, response, respondWithError = false) {
    const {tagName} = component;
    expect(tagName).toBe(
        'IRON-AJAX', '[mockRequest] Element passed in was not iron-ajax'
    );
    // eslint-disable-next-line no-console
    const finalEvent = `${respondWithError?'error':'response'}`;
    component.generateRequest = async () => {
        if (respondWithError) {
            component._setLastError({error: response});
        } else {
            component._setLastResponse(response);
        }
        const eventPayload = createRespPayload(
            response,
            respondWithError
        );
        component.dispatchEvent(
            new CustomEvent(finalEvent, eventPayload)
        );
    };
}

function createRespPayload(response, isError) {
    const detail = {
        response,
    };
    isError && Object.assign(detail, {
        error: response,
        request: {response: {error: response}},
    });
    return {detail};
}
