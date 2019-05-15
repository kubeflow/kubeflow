import '@polymer/test-fixture/test-fixture';
import 'jasmine-ajax';
import {flush} from '@polymer/polymer/lib/utils/flush.js';

import './iframe-link';

const FIXTURE_ID = 'iframe-link-fixture';
const IFRAME_LINK_SELECTOR_ID = 'test-iframe-link';
const TEMPLATE = `
<test-fixture id="${FIXTURE_ID}">
  <template>
    <iframe-link id="${IFRAME_LINK_SELECTOR_ID}"></iframe-link>
  </template>
</test-fixture>
`;

describe('Iframe Link', () => {
    let iframeLink;

    beforeAll(() => {
        const div = document.createElement('div');
        div.innerHTML = TEMPLATE;
        document.body.appendChild(div);
    });

    beforeEach(() => {
        document.getElementById(FIXTURE_ID).create();
        iframeLink = document.getElementById(IFRAME_LINK_SELECTOR_ID);
    });

    afterEach(() => {
        document.getElementById(FIXTURE_ID).restore();
    });

    it('Sets the anchor element href with the iframe prefix', () => {
        iframeLink.href = '/test-page';
        flush();

        expect(iframeLink.shadowRoot.getElementById('link').pathname)
            .toBe('/_/test-page');
    });

    it('Forwards click event to the anchor element', (done) => {
        iframeLink.href = '/test-page';
        flush();
        spyOn(iframeLink.shadowRoot.getElementById('link'), 'click');

        iframeLink.addEventListener('click', () => {
            expect(iframeLink.shadowRoot.getElementById('link').click)
                .toHaveBeenCalled();
            done();
        });
        iframeLink.click();
    });


    it('Pushes history when clicked clicked', async () => {
        iframeLink.href = '/test-page';
        spyOn(window.history, 'pushState');
        const locationChanged = new Promise((resolve) => {
            window.addEventListener('location-changed', () => {
                resolve();
            });
        });
        flush();
        iframeLink.click();
        await locationChanged;

        expect(window.history.pushState)
            .toHaveBeenCalledWith({}, null, '/_/test-page');
    });
});
