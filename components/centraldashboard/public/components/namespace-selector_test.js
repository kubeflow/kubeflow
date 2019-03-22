import '@polymer/test-fixture/test-fixture';
import 'jasmine-ajax';
import './namespace-selector';

import {flush} from '@polymer/polymer/lib/utils/flush.js';

const FIXTURE_ID = 'namespace-selector-fixture';
const NAMESPACE_SELECTOR_ID = 'test-namespace-selector';
const TEMPLATE = `
<test-fixture id="${FIXTURE_ID}">
  <template>
    <namespace-selector id="${NAMESPACE_SELECTOR_ID}"></namespace-selector>
  </template>
</test-fixture>
`;

describe('Namespace Selector', () => {
    let namespaceSelector;

    beforeAll(() => {
        const div = document.createElement('div');
        div.innerHTML = TEMPLATE;
        document.body.appendChild(div);
    });

    beforeEach(() => {
    // server = createFakeServer();
        jasmine.Ajax.install();
        document.getElementById(FIXTURE_ID).create();
        namespaceSelector = document.getElementById(NAMESPACE_SELECTOR_ID);
    });

    afterEach(() => {
        document.getElementById(FIXTURE_ID).restore();
        jasmine.Ajax.uninstall();
    });

    it('Shows Namespaces from /api/namespaces', (done) => {
        namespaceSelector.addEventListener('iron-ajax-request', () => {
            jasmine.Ajax.requests.mostRecent().respondWith({
                status: 200,
                responseText: JSON.stringify([
                    {
                        metadata: {
                            name: 'default',
                        },
                    },
                    {
                        metadata: {
                            name: 'other-namespace',
                        },
                    },
                ]),
            });
        });
        namespaceSelector.addEventListener('iron-ajax-response', () => {
            flush();
            expect(namespaceSelector.namespaces.length).toBe(2);
            done();
        });
    });

    it('Shows empty list when error is received', (done) => {
        namespaceSelector.addEventListener('iron-ajax-request', () => {
            jasmine.Ajax.requests.mostRecent().respondWith({
                status: 500, responseText: '{"error": "Bad thing happened"}',
            });
        });
        namespaceSelector.addEventListener('iron-ajax-error', () => {
            flush();
            expect(namespaceSelector.namespaces.length).toBe(0);
            done();
        });
    });
});
