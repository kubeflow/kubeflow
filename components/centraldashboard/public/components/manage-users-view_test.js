/* eslint-disable max-len */
import '@polymer/test-fixture/test-fixture';
import 'jasmine-ajax';
import {mockIronAjax, yieldForRequests} from '../ajax_test_helper';
import {flush} from '@polymer/polymer/lib/utils/flush.js';

import './dashboard-view';
import {languages} from '../assets/i18n/languages.json';

const FIXTURE_ID = 'manage-users-view-fixture';
const MU_VIEW_SELECTOR_ID = 'test-manage-users-view';
const TEMPLATE = `
<test-fixture id="${FIXTURE_ID}">
  <template>
    <manage-users-view id="${MU_VIEW_SELECTOR_ID}"></manage-users-view>
  </template>
</test-fixture>
`;
const user = 'test@kubeflow.org';
const oNs = {namespace: 'ns1', role: 'owner'};
const multiONs= [oNs];
const generalNs = [oNs, {namespace: 'ns2', role: 'contributor', user}, {namespace: 'ns3', role: 'contributor', user}];

describe('Manage Users View', () => {
    let manageUsersView;

    beforeAll(() => {
        jasmine.Ajax.install();
        const div = document.createElement('div');
        div.innerHTML = TEMPLATE;
        document.body.appendChild(div);
    });

    beforeEach(() => {
        document.getElementById(FIXTURE_ID).create();
        manageUsersView = document.getElementById(MU_VIEW_SELECTOR_ID);
        manageUsersView.language = 'en';
        manageUsersView.resources = languages;
    });

    afterEach(() => {
        document.getElementById(FIXTURE_ID).restore();
    });

    afterAll(() => {
        jasmine.Ajax.uninstall();
    });

    it('UI has loading and hidden sections when there\'s no data', () => {
        expect(manageUsersView.shadowRoot.querySelector('.Acct-Info > .content').innerText)
            .toBe('Loading...');
        expect(manageUsersView.shadowRoot.querySelector('.Namespaces')
            .hasAttribute('hidden')).toBe(true);
        expect(manageUsersView.shadowRoot.querySelector('.Contributors')
            .hasAttribute('hidden')).toBe(true);
        expect(manageUsersView.shadowRoot.querySelector('.Cluster-Namespaces')
            .hasAttribute('hidden')).toBe(true);
    });

    it('UI State should show user / contribs and unhide sections when namespace available', async () => {
        manageUsersView.user = user;
        manageUsersView.multiOwnedNamespaces = multiONs;
        manageUsersView.namespaces = generalNs;

        flush();
        await yieldForRequests();

        expect(manageUsersView.shadowRoot.querySelector('.Acct-Info > .content').innerText)
            .toBe('test@kubeflow.org');
        expect(manageUsersView.shadowRoot.querySelector('.Namespaces')
            .hasAttribute('hidden')).toBe(false, 'Namespaces was still hidden');
        expect(manageUsersView.shadowRoot.querySelector('.Contributors')
            .hasAttribute('hidden')).toBe(false, 'Contributors was still hidden');
        expect(manageUsersView.shadowRoot.querySelector('.Cluster-Namespaces')
            .hasAttribute('hidden')).toBe(true, 'Cluster Namespaces should have been hidden');
        // View prop expectations
        expect(manageUsersView.shadowRoot.querySelector('.Namespaces vaadin-grid').items)
            .toEqual(
                [['ns1', 'Owner'], ['ns2', 'Contributor'], ['ns3', 'Contributor']],
                'Invalid namespace memberships',
            );
    });

    it('Should render cluster admin view correctly', async () => {
        const contribList = ['foo@kubeflow.org', 'bar@kubeflow.org'];
        const allPeeps = [
            ['ns1', user, contribList.join(', ')],
        ];
        mockIronAjax(
            manageUsersView.$.GetAllNamespacesAjax,
            allPeeps,
        );

        manageUsersView.user = user;
        manageUsersView.isClusterAdmin = true;
        manageUsersView.multiOwnedNamespaces = multiONs;
        manageUsersView.namespaces = [oNs];

        flush();
        await yieldForRequests();

        expect(manageUsersView.shadowRoot.querySelector('.Cluster-Namespaces')
            .hasAttribute('hidden')).toBe(false, 'Cluster Namespaces was still hidden');

        // View prop expectations
        expect(manageUsersView.shadowRoot.querySelector('.Cluster-Namespaces vaadin-grid').items)
            .toEqual(
                allPeeps,
                'Invalid list of all namespace memberships',
            );
    });
});
