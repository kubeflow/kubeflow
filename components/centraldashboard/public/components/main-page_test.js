import '@polymer/test-fixture/test-fixture';
import 'jasmine-ajax';
import {flush} from '@polymer/polymer/lib/utils/flush.js';

import './main-page';

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
        document.getElementById(FIXTURE_ID).restore();
    });

    afterAll(() => {
        jasmine.Ajax.uninstall();
    });

    it('Pushes history when menu link is clicked', async () => {
        spyOn(window.history, 'pushState');
        const locationChanged = new Promise((resolve) => {
            window.addEventListener('location-changed', () => {
                resolve();
            });
        });
        flush();
        const link = mainPage.shadowRoot
            .querySelector('#MainDrawer a[href="/docs"]');
        link.click();
        await locationChanged;
        flush();

        expect(window.history.pushState)
            .toHaveBeenCalledWith({}, null, '_/docs');
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
        expect(mainPage.shadowRoot.querySelector('#NamespaceSelector')
            .hasAttribute('hidden')).toBe(true);

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
        expect(mainPage.shadowRoot.querySelector('#NamespaceSelector')
            .hasAttribute('hidden')).toBe(false);

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
        expect(mainPage.shadowRoot.querySelector('#NamespaceSelector')
            .hasAttribute('hidden')).toBe(true);
        expect(mainPage.shadowRoot.querySelector('paper-tabs')
            .hasAttribute('hidden')).toBe(true);
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
            expect(mainPage.shadowRoot.querySelector('#NamespaceSelector')
                .hasAttribute('hidden')).toBe(true);
            expect(mainPage.shadowRoot.querySelector('paper-tabs')
                .hasAttribute('hidden')).toBe(true);
        });

    it('Sets view state when iframe page is active', () => {
        spyOn(mainPage.$.MainDrawer, 'close');

        mainPage.subRouteData.path = '/docs';
        mainPage._routePageChanged('_');
        flush();

        expect(mainPage.page).toBe('iframe');
        expect(mainPage.sidebarItemIndex).toBe(1);
        expect(mainPage.inIframe).toBe(true);
        expect(mainPage.shadowRoot.querySelector('paper-tabs')
            .hasAttribute('hidden')).toBe(true);
        expect(mainPage.shadowRoot.querySelector('app-toolbar')
            .hasAttribute('blue')).toBe(true);
        expect(mainPage.$.MainDrawer.close).toHaveBeenCalled();
    });
});
