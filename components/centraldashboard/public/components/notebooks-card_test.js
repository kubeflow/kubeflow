import '@polymer/test-fixture/test-fixture';
import 'jasmine-ajax';
import {flush} from '@polymer/polymer/lib/utils/flush.js';

import './notebooks-card';
import {mockRequest} from '../ajax_test_helper';

const FIXTURE_ID = 'notebooks-card-fixture';
const NOTEBOOKS_CARD_ID = 'test-notebooks-card';
const TEMPLATE = `
<test-fixture id="${FIXTURE_ID}">
  <template>
    <notebooks-card id="${NOTEBOOKS_CARD_ID}"></notebooks-card>
  </template>
</test-fixture>
`;

const BASE_DATE = new Date('2019-05-01T00:00:00.00Z');
/**
 * Helper function to return an object representing a Notebooks server response.
 * @param {Number} number
 * @param {String} prefix
 * @return {Object}
 */
function generateNotebooksFetchResponse(number, prefix) {
    const notebooks = [];
    for (let i = 0; i < number; i++) {
        notebooks.push({
            name: `${prefix}-${i}.ipynb`,
            path: `${prefix}-${i}.ipynb`,
            last_modified:
                new Date(BASE_DATE.valueOf() + (i * 86400000)).toString(),
            type: 'notebook',
        });
    }
    return Promise.resolve({
        json: () => Promise.resolve({content: notebooks}),
    });
}


describe('Notebooks Card', () => {
    let notebooksCard;
    const fetch = window.fetch;
    const mockFetch = jasmine.createSpy();

    beforeAll(() => {
        const div = document.createElement('div');
        div.innerHTML = TEMPLATE;
        document.body.appendChild(div);
    });

    beforeEach(() => {
        jasmine.Ajax.install();
        window.fetch = mockFetch;
        document.getElementById(FIXTURE_ID).create();
        notebooksCard = document.getElementById(NOTEBOOKS_CARD_ID);
    });

    afterEach(() => {
        window.fetch = fetch;
        document.getElementById(FIXTURE_ID).restore();
        jasmine.Ajax.uninstall();
    });

    it('Shows 5 most recently modified Notebooks from namespace',
        async () => {
            mockRequest(notebooksCard, {
                status: 200,
                responseText: JSON.stringify({
                    notebooks: [
                        {
                            namespace: 'test-namespace',
                            name: 'server-1',
                        },
                        {
                            namespace: 'test-namespace',
                            name: 'server-2',
                        },
                    ],
                }),
            });
            mockFetch
                .withArgs('/notebook/test-namespace/server-1/api/contents')
                .and.returnValue(
                    generateNotebooksFetchResponse(10, 'server-1-nb'));
            mockFetch
                .withArgs('/notebook/test-namespace/server-2/api/contents')
                .and.returnValue(
                    generateNotebooksFetchResponse(10, 'server-2-nb'));
            // Wrapping the expectations for the fetch mock in a timeout
            // ensures that the component handles the responses before we
            // do any assertions
            const fetchPromise = new Promise((resolve) => {
                setTimeout(() => {
                    expect(mockFetch).toHaveBeenCalledWith(
                        '/notebook/test-namespace/server-1/api/contents');
                    expect(mockFetch).toHaveBeenCalledWith(
                        '/notebook/test-namespace/server-2/api/contents');
                    resolve();
                });
            });

            notebooksCard.namespace = 'test-namespace';
            await fetchPromise;
            flush();

            const header = notebooksCard.shadowRoot
                .getElementById('message');
            expect(header.hasAttribute('hidden')).toBe(true);
            const notebookLinks = Array.from(notebooksCard.shadowRoot
                .querySelectorAll('iframe-link').values());
            expect(notebookLinks.length).toBe(5);
            const hrefPrefix = '/notebook/test-namespace';
            expect(notebookLinks.map((l) => l.href)).toEqual([
                `${hrefPrefix}/server-1/notebooks/server-1-nb-9.ipynb`,
                `${hrefPrefix}/server-2/notebooks/server-2-nb-9.ipynb`,
                `${hrefPrefix}/server-1/notebooks/server-1-nb-8.ipynb`,
                `${hrefPrefix}/server-2/notebooks/server-2-nb-8.ipynb`,
                `${hrefPrefix}/server-1/notebooks/server-1-nb-7.ipynb`,
            ]);

            const notebookNames = Array.from(notebooksCard.shadowRoot
                .querySelectorAll('paper-item-body .header').values());
            expect(notebookNames.map((l) => l.innerText)).toEqual([
                'server-1-nb-9.ipynb',
                'server-2-nb-9.ipynb',
                'server-1-nb-8.ipynb',
                'server-2-nb-8.ipynb',
                'server-1-nb-7.ipynb',
            ]);
        });

    it('Handles errors from requests to Notebook servers',
        async () => {
            mockRequest(notebooksCard, {
                status: 200,
                responseText: JSON.stringify({
                    notebooks: [
                        {
                            namespace: 'test-namespace',
                            name: 'server-1',
                        },
                        {
                            namespace: 'test-namespace',
                            name: 'server-2',
                        },
                    ],
                }),
            });
            mockFetch
                .withArgs('/notebook/test-namespace/server-1/api/contents')
                .and.returnValue(Promise.reject(new Error('bad response')));
            mockFetch
                .withArgs('/notebook/test-namespace/server-2/api/contents')
                .and.returnValue(
                    generateNotebooksFetchResponse(10, 'server-2-nb'));
            // Wrapping the expectations for the fetch mock in a timeout
            // ensures that the component handles the responses before we
            // do any assertions
            const fetchPromise = new Promise((resolve) => {
                setTimeout(() => {
                    expect(mockFetch).toHaveBeenCalledWith(
                        '/notebook/test-namespace/server-1/api/contents');
                    expect(mockFetch).toHaveBeenCalledWith(
                        '/notebook/test-namespace/server-2/api/contents');
                    resolve();
                });
            });

            notebooksCard.namespace = 'test-namespace';
            await fetchPromise;
            flush();

            const header = notebooksCard.shadowRoot
                .getElementById('message');
            expect(header.hasAttribute('hidden')).toBe(true);
            const notebookLinks = Array.from(notebooksCard.shadowRoot
                .querySelectorAll('iframe-link').values());
            expect(notebookLinks.length).toBe(5);
            const hrefPrefix = '/notebook/test-namespace';
            expect(notebookLinks.map((l) => l.href)).toEqual([
                `${hrefPrefix}/server-2/notebooks/server-2-nb-9.ipynb`,
                `${hrefPrefix}/server-2/notebooks/server-2-nb-8.ipynb`,
                `${hrefPrefix}/server-2/notebooks/server-2-nb-7.ipynb`,
                `${hrefPrefix}/server-2/notebooks/server-2-nb-6.ipynb`,
                `${hrefPrefix}/server-2/notebooks/server-2-nb-5.ipynb`,
            ]);

            const notebookNames = Array.from(notebooksCard.shadowRoot
                .querySelectorAll('paper-item-body .header').values());
            expect(notebookNames.map((l) => l.innerText)).toEqual([
                'server-2-nb-9.ipynb',
                'server-2-nb-8.ipynb',
                'server-2-nb-7.ipynb',
                'server-2-nb-6.ipynb',
                'server-2-nb-5.ipynb',
            ]);
        });

    it('Shows message when no Notebooks are found',
        async () => {
            mockRequest(notebooksCard, {
                status: 200,
                responseText: JSON.stringify({
                    notebooks: [
                        {
                            namespace: 'test-namespace',
                            name: 'server-1',
                        },
                    ],
                }),
            });
            mockFetch
                .withArgs('/notebook/test-namespace/server-1/api/contents')
                .and.returnValue(
                    generateNotebooksFetchResponse(0, 'server-1-nb'));
            // Wrapping the expectations for the fetch mock in a timeout
            // ensures that the component handles the responses before we
            // do any assertions
            const fetchPromise = new Promise((resolve) => {
                setTimeout(() => {
                    expect(mockFetch).toHaveBeenCalledWith(
                        '/notebook/test-namespace/server-1/api/contents');
                    resolve();
                });
            });

            notebooksCard.namespace = 'test-namespace';
            await fetchPromise;
            flush();

            const header = notebooksCard.shadowRoot
                .getElementById('message');
            expect(header.hasAttribute('hidden')).toBe(false);
            expect(header.innerText).toBe(
                'No Notebooks in namespace test-namespace');
        });

    it('Shows error message when List Notebooks Server request fails',
        async () => {
            const responsePromise = mockRequest(notebooksCard, {
                status: 404,
                responseText: 'Not Found',
            }, true);
            notebooksCard.namespace = 'test-namespace';
            await responsePromise;
            flush();

            const header = notebooksCard.shadowRoot.getElementById('message');
            expect(header.hasAttribute('hidden')).toBe(false);
            expect(header.innerText).toBe('Error retrieving Notebooks');
        });
});
