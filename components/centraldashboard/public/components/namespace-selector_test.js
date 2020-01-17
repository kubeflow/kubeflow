import '@polymer/test-fixture/test-fixture';
import {flush} from '@polymer/polymer/lib/utils/flush.js';

import './namespace-selector';

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
    const namespaces = [
        {
            user: 'testuser',
            namespace: 'default',
            role: 'contributor',
        },
        {
            user: 'testuser',
            namespace: 'other-namespace',
            role: 'contributor',
        },
    ];
    let namespaceSelector;


    beforeAll(() => {
        const div = document.createElement('div');
        div.innerHTML = TEMPLATE;
        document.body.appendChild(div);
    });

    beforeEach(() => {
        document.getElementById(FIXTURE_ID).create();
        namespaceSelector = document.getElementById(NAMESPACE_SELECTOR_ID);
    });

    afterEach(() => {
        document.getElementById(FIXTURE_ID).restore();
    });

    it('Sets queryParams.ns when selected', async () => {
        namespaceSelector.queryParams = {};
        namespaceSelector.namespaces = namespaces;
        flush();
        const queryParamsChangedPromise = new Promise((resolve) => {
            namespaceSelector.addEventListener('query-params-changed',
                (event) =>resolve(event.detail));
        });

        namespaceSelector.shadowRoot.querySelector('paper-listbox')
            .select('default');
        const eventDetail = await queryParamsChangedPromise;
        expect(eventDetail.path).toBe('queryParams.ns');
        expect(eventDetail.value).toBe('default');
    });

    it('Sets selected based on queryParams', async () => {
        namespaceSelector.queryParams = {
            ns: 'other-namespace',
        };
        namespaceSelector.namespaces = namespaces;
        flush();

        expect(namespaceSelector.selected).toBe('other-namespace');
        expect(namespaceSelector.shadowRoot.querySelector('paper-button span')
            .innerText).toBe('other-namespace');
    });
});
