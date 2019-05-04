import '@polymer/test-fixture/test-fixture';
import 'jasmine-ajax';
import {flush} from '@polymer/polymer/lib/utils/flush.js';

import './main-page';
import {mockRequest} from '../ajax_test_helper';
import {
    IFRAME_CONNECTED_EVENT, PARENT_CONNECTED_EVENT, NAMESPACE_SELECTED_EVENT,
} from '../library';

const FIXTURE_ID = 'main-page-fixture';
const MAIN_PAGE_SELECTOR_ID = 'test-main-page';
const TEMPLATE = `
<test-fixture id="${FIXTURE_ID}">
  <template>
    <main-page id="${MAIN_PAGE_SELECTOR_ID}"></main-page>
  </template>
</test-fixture>
`;

describe('Main Page', () => {
    let mainPage;

    beforeAll(() => {
        jasmine.Ajax.install();
        const div = document.createElement('div');
        div.innerHTML = TEMPLATE;
        document.body.appendChild(div);
    });

    beforeEach(() => {
        document.getElementById(FIXTURE_ID).create();
        mainPage = document.getElementById(MAIN_PAGE_SELECTOR_ID);
    });

    afterEach(() => {
        mainPage.set('queryParams', null);
        document.getElementById(FIXTURE_ID).restore();
    });

    afterAll(() => {
        jasmine.Ajax.uninstall();
    });

    it('Sets view state when dashboard page is active', async () => {
        const selectedTabPromise = new Promise((resolve) => {
            const paperTabs = mainPage.shadowRoot.querySelector('paper-tabs');
            paperTabs.addEventListener('selected-item-changed', () => {
                resolve();
            });
        });
        mainPage._routePageChanged('');
        flush();

        expect(mainPage.page).toBe('dashboard');
        expect(mainPage.sidebarItemIndex).toBe(0);
        expect(mainPage.inIframe).toBe(false);

        await selectedTabPromise;
        expect(mainPage.shadowRoot.querySelector('paper-tab[page="dashboard"]')
            .classList.contains('iron-selected')).toBe(true);
    });

    it('Sets view state when activities page is active', async () => {
        const selectedTabPromise = new Promise((resolve) => {
            const paperTabs = mainPage.shadowRoot.querySelector('paper-tabs');
            paperTabs.addEventListener('selected-item-changed', () => {
                resolve();
            });
        });
        mainPage._routePageChanged('activity');
        flush();

        expect(mainPage.page).toBe('activity');
        expect(mainPage.sidebarItemIndex).toBe(0);
        expect(mainPage.inIframe).toBe(false);

        await selectedTabPromise;
        expect(mainPage.shadowRoot.querySelector('paper-tab[page="activity"]')
            .classList.contains('iron-selected')).toBe(true);
    });

    it('Sets view state when an invalid page is specified', () => {
        spyOn(mainPage, '_isInsideOfIframe').and.returnValue(false);
        mainPage._routePageChanged('not-a-valid-page');
        flush();

        expect(mainPage.page).toBe('not_found');
        expect(mainPage.sidebarItemIndex).toBe(-1);
        expect(mainPage.notFoundInIframe).toBe(false);
        expect(mainPage.inIframe).toBe(false);
        expect(mainPage.shadowRoot.querySelector('paper-tabs')
            .hasAttribute('hidden')).toBe(true);
    });

    it('Sets view state when iframe page is active', () => {
        spyOn(mainPage.$.MainDrawer, 'close');

        mainPage.subRouteData.path = '/jupyter/';
        mainPage._routePageChanged('_');
        flush();

        expect(mainPage.page).toBe('iframe');
        expect(mainPage.sidebarItemIndex).toBe(2);
        expect(mainPage.inIframe).toBe(true);
        expect(mainPage.shadowRoot.querySelector('paper-tabs')
            .hasAttribute('hidden')).toBe(true);
        expect(mainPage.$.MainDrawer.close).toHaveBeenCalled();
    });

    it('Sets view state when an invalid page is specified from an iframe',
        () => {
            spyOn(mainPage, '_isInsideOfIframe').and.returnValue(true);
            mainPage._routePageChanged('not-a-valid-page-in-iframe');
            flush();

            expect(mainPage.page).toBe('not_found');
            expect(mainPage.sidebarItemIndex).toBe(-1);
            expect(mainPage.notFoundInIframe).toBe(true);
            expect(mainPage.shadowRoot.querySelector('paper-tabs')
                .hasAttribute('hidden')).toBe(true);
            expect(mainPage.shadowRoot.querySelector('paper-tabs')
                .hasAttribute('hidden')).toBe(true);
        });

    it('Appends query string when building links', () => {
        const sidebarLinkSelector = '#MainDrawer iron-selector a.iframe-link';
        const headerLinkSelector = 'app-header paper-tabs a';

        // Base case
        const hrefs = [];
        mainPage.shadowRoot.querySelectorAll(sidebarLinkSelector)
            .forEach((l) => hrefs.push(l.href));
        mainPage.shadowRoot.querySelectorAll(headerLinkSelector)
            .forEach((l) => hrefs.push(l.href));
        hrefs.forEach((h) => expect(h).not.toContain('?'));

        // Set namespace case
        mainPage.namespace = 'another-namespace';
        flush();
        hrefs.splice(0);
        mainPage.shadowRoot.querySelectorAll(sidebarLinkSelector)
            .forEach((l) => hrefs.push(l.href));
        mainPage.shadowRoot.querySelectorAll(headerLinkSelector)
            .forEach((l) => hrefs.push(l.href));
        hrefs.forEach((h) => expect(h).toContain('?ns=another-namespace'));
    });

    it('Hides namespace selector when showing Pipelines dashboard', () => {
        expect(mainPage.shadowRoot.querySelector('#NamespaceSelector')
            .hasAttribute('hidden')).toBe(false);

        mainPage.subRouteData.path = '/pipeline/';
        mainPage._routePageChanged('_');
        flush();
        expect(mainPage.shadowRoot.querySelector('#NamespaceSelector')
            .hasAttribute('hidden')).toBe(true);
        expect(mainPage.page).toBe('iframe');
        expect(mainPage.sidebarItemIndex).toBe(1);
        expect(mainPage.inIframe).toBe(true);
        expect(mainPage.shadowRoot.querySelector('paper-tabs')
            .hasAttribute('hidden')).toBe(true);
        expect(mainPage.shadowRoot.querySelector('app-toolbar')
            .hasAttribute('blue')).toBe(true);
    });

    it('Sets build version when platform info is received', async () => {
        const responsePromise = mockRequest(mainPage, {
            status: 200,
            responseText: JSON.stringify({
                provider: 'gce://test-project/us-east1-c/gke-kubeflow-node-123',
                providerName: 'gce',
                kubeflowVersion: '1.0.0',
            }),
        }, false, '/api/platform-info');
        await responsePromise;
        flush();

        const buildVersion = mainPage.shadowRoot.querySelector(
            'section.build span');
        // textContent is used because innerText would be empty if sidebar is
        // hidden
        expect(buildVersion.textContent).toEqual('1.0.0');
    });

    it('Communicates with iframed page after it connects', async () => {
        mainPage.namespace = 'another-namespace';
        const iframeMessagesPromise = new Promise((resolve) => {
            const messages = [];
            spyOn(mainPage.$.PageFrame.contentWindow,
                'postMessage').and.callFake((m) => {
                messages.push(m);
                if (messages.length === 2) {
                    resolve(messages);
                }
            });
        });

        window.postMessage({type: IFRAME_CONNECTED_EVENT});
        const messages = await iframeMessagesPromise;
        expect(messages).toEqual([
            {
                type: PARENT_CONNECTED_EVENT,
                value: null,
            },
            {
                type: NAMESPACE_SELECTED_EVENT,
                value: 'another-namespace',
            },
        ]);
    });
});
