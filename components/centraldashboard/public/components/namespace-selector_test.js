import '@polymer/test-fixture/test-fixture';
import 'jasmine-ajax';
import {flush} from '@polymer/polymer/lib/utils/flush.js';

import './namespace-selector';
import {mockRequest} from '../ajax_test_helper';

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
        jasmine.Ajax.install();
        document.getElementById(FIXTURE_ID).create();
        namespaceSelector = document.getElementById(NAMESPACE_SELECTOR_ID);
    });

    afterEach(() => {
        document.getElementById(FIXTURE_ID).restore();
        jasmine.Ajax.uninstall();
    });

    it('Shows Namespaces from /api/namespaces', async () => {
        const responsePromise = mockRequest(namespaceSelector, {
            status: 200,
            responseText: JSON.stringify([
                {
                    metadata: {
                        uid: '1',
                        name: 'default',
                    },
                },
                {
                    metadata: {
                        uid: '2',
                        name: 'other-namespace',
                    },
                },
            ]),
        });
        await responsePromise;
        flush();

        const namespaces = [];
        namespaceSelector.shadowRoot.querySelectorAll('paper-item')
            .forEach((n) => {
                namespaces.push(n.innerText);
            });
        expect(namespaces).toEqual(['default', 'other-namespace']);
    });

    it('Shows empty list when error is received', async () => {
        const responsePromise = mockRequest(namespaceSelector, {
            status: 500,
            responseText: '{"error": "Bad thing happened"}',
        }, true);
        await responsePromise;
        flush();

        const items = namespaceSelector.shadowRoot
            .querySelectorAll('paper-item');
        expect(items.length).toBe(0);
    });

    it('Sets queryParams.ns when selected', async () => {
        namespaceSelector.queryParams = {};
        namespaceSelector.namespaces = [
            {
                uid: '1',
                name: 'default',
            },
            {
                uid: '2',
                name: 'other-namespace',
            },
        ];
        flush();
        const queryParamsChangedPromise = new Promise((resolve) => {
            namespaceSelector.addEventListener('query-params-changed',
                (event) =>resolve(event.detail));
        });

        namespaceSelector.shadowRoot.querySelector('paper-listbox').select(0);
        const eventDetail = await queryParamsChangedPromise;
        expect(eventDetail.path).toBe('queryParams.ns');
        expect(eventDetail.value).toBe('default');
    });

    it('Sets selected based on queryParams', async () => {
        namespaceSelector.queryParams = {
            ns: 'other-namespace',
        };
        namespaceSelector.namespaces = [
            {
                uid: '1',
                name: 'default',
            },
            {
                uid: '2',
                name: 'other-namespace',
            },
        ];
        flush();

        const dropDownMenu = namespaceSelector.shadowRoot
            .querySelector('paper-dropdown-menu-light');
        expect(dropDownMenu.value).toBe('other-namespace');
    });
});
