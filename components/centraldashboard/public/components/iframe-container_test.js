import '@polymer/test-fixture/test-fixture';

import {
    APP_CONNECTED_EVENT,
    NAMESPACE_SELECTED_EVENT,
    PARENT_CONNECTED_EVENT,
} from '../library.js';
import {sleep} from '../ajax_test_helper';
import './iframe-container';

const FIXTURE_ID = 'iframe-container-fixture';
const IFRAME_CONTAINER_SELECTOR_ID = 'test-iframe-container';
const TEMPLATE = `
<test-fixture id="${FIXTURE_ID}">
  <template>
    <iframe-container id="${IFRAME_CONTAINER_SELECTOR_ID}"></iframe-container>
  </template>
</test-fixture>
`;

describe('Iframe Container', () => {
    let iframeContainer;
    let postMessageSpy;

    beforeAll(() => {
        const div = document.createElement('div');
        div.innerHTML = TEMPLATE;
        document.body.appendChild(div);
    });

    beforeEach(async () => {
        document.getElementById(FIXTURE_ID).create();
        iframeContainer = document.getElementById(IFRAME_CONTAINER_SELECTOR_ID);

        // Set iframe src and spy on child iframe component
        iframeContainer.src = 'about:test';
        await new Promise((resolve) => {
            iframeContainer.$.iframe.addEventListener('load', () => {
                postMessageSpy = spyOn(iframeContainer.$.iframe.contentWindow,
                    'postMessage');
                resolve();
            });
        });
    });

    afterEach(() => {
        document.getElementById(FIXTURE_ID).restore();
    });

    it('Should replace iframe location when src changes', async () => {
        const locationSpy = jasmine.createSpyObj('spyLocation', ['replace']);
        spyOnProperty(iframeContainer.$.iframe, 'contentWindow')
            .and.returnValue({location: locationSpy});

        iframeContainer.src = 'http://foo.bar';
        iframeContainer.src = 'http://foo.bar';
        iframeContainer.src = 'http://foo.bar?test=1';
        iframeContainer.src = 'http://other.bar/#/path';

        expect(locationSpy.replace).toHaveBeenCalledTimes(3);
        const calledWith = locationSpy.replace.calls.all()
            .map((a) => a.args[0]);
        expect(calledWith).toEqual([
            'http://foo.bar',
            'http://foo.bar?test=1',
            'http://other.bar/#/path',
        ]);
    });

    it('Should reflect iframe URL changes to page property', async () => {
        const fakeLocation = {
            href: 'http://testsite.com/foo/bar?name=blah',
            origin: 'http://testsite.com',
        };
        spyOnProperty(iframeContainer.$.iframe, 'contentWindow').and
            .returnValue({location: fakeLocation});
        expect(iframeContainer.page).toBe(undefined);
        iframeContainer.$.iframe.contentDocument.firstChild.click();
        expect(iframeContainer.page).toBe('/foo/bar?name=blah');
    });

    it('Should reflect iframe URL changes on hashchange event', async () => {
        const fakeLocation = {
            href: 'http://testsite.com/foo/bar?name=blah',
            origin: 'http://testsite.com',
        };
        spyOnProperty(iframeContainer.$.iframe, 'contentWindow').and
            .returnValue({location: fakeLocation});
        expect(iframeContainer.page).toBe(undefined);
        fakeLocation.href = 'http://testsite.com/foo/bar?name=blah#new-hash';
        iframeContainer.$.iframe.contentDocument
            .dispatchEvent(new Event('hashchange'));
        expect(iframeContainer.page).toBe('/foo/bar?name=blah#new-hash');
    });

    it('Should send messages to iframed page', async () => {
        const origin = window.location.origin;
        // Simulate message being sent from iframe
        window.postMessage({type: APP_CONNECTED_EVENT});
        await sleep(1);
        expect(postMessageSpy.calls.count()).toBe(1);
        expect(postMessageSpy.calls.argsFor(0)).toEqual([
            {
                type: PARENT_CONNECTED_EVENT,
                value: null,
            },
            origin,
        ]);

        // Set namespace
        iframeContainer.namespace = 'test-namespace';
        expect(postMessageSpy.calls.count()).toBe(2);
        expect(postMessageSpy.calls.argsFor(1)).toEqual([
            {
                type: NAMESPACE_SELECTED_EVENT,
                value: 'test-namespace',
            },
            origin,
        ]);
    });
});
