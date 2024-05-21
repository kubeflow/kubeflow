/* eslint-disable max-len */
import '@polymer/test-fixture/test-fixture';
import 'jasmine-ajax';
import {mockIronAjax, yieldForRequests} from '../ajax_test_helper';
import {flush} from '@polymer/polymer/lib/utils/flush.js';

import './dashboard-view';

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
const ownNs = [{namespace: 'ns1', role: 'owner'}];
const editNs = [{namespace: 'ns2', role: 'contributor'}, {namespace: 'ns3', role: 'contributor', user}];
const viewNs = [{namespace: 'ns4', role: 'viewer'}, {namespace: 'ns5', role: 'viewer', user}];
const allNs = ownNs.concat(editNs).concat(viewNs);

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
        expect(manageUsersView.shadowRoot.querySelector('.Contributors'))
            .toBeNull('Contributors should have been hidden');
        expect(manageUsersView.shadowRoot.querySelector('.Cluster-Namespaces'))
            .toBeNull('Cluster Namespaces should have been hidden');
    });

    it('UI State should show user / contribs and unhide sections when namespace available', async () => {
        manageUsersView.user = user;
        manageUsersView.ownedNamespaces = ownNs;
        manageUsersView.editNamespaces = editNs;
        manageUsersView.viewNamespaces = viewNs;
        manageUsersView.hasNamespaces = true;
        manageUsersView.namespaces = allNs;

        flush();
        await yieldForRequests();

        expect(manageUsersView.shadowRoot.querySelector('.Acct-Info > .content').innerText)
            .toBe('test@kubeflow.org');
        expect(manageUsersView.shadowRoot.querySelector('.Contributors'))
            .toBeDefined('Contributors was still hidden');
        expect(manageUsersView.shadowRoot.querySelector('.Cluster-Namespaces'))
            .toBeNull('Cluster Namespaces should have been hidden');

        // View prop expectations
        expect(manageUsersView.shadowRoot.querySelector('.Namespaces vaadin-grid').items)
            .toEqual(
                [['Owner', 'ns1'], ['Contributor', 'ns2, ns3'], ['Viewer', 'ns4, ns5']],
                'Invalid namespace memberships'
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
        manageUsersView.ownedNamespaces = ownNs;
        manageUsersView.editNamespaces = editNs;
        manageUsersView.viewNamespaces = viewNs;
        manageUsersView.hasNamespaces = true;
        manageUsersView.namespaces = allNs;

        flush();
        await yieldForRequests();

        expect(manageUsersView.shadowRoot.querySelector('.Cluster-Namespaces'))
            .toBeDefined('Cluster Namespaces was still hidden');

        // View prop expectations
        expect(manageUsersView.shadowRoot.querySelector('.Cluster-Namespaces vaadin-grid').items)
            .toEqual(
                allPeeps,
                'Invalid list of all namespace memberships'
            );
    });
});
