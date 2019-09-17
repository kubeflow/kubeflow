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
const oNs = {namespace: 'ns1', role: 'owner'};
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
        const contribList = ['foo@kubeflow.org', 'bar@kubeflow.org'];
        mockIronAjax(
            manageUsersView.$.GetContribsAjax,
            contribList,
        );

        manageUsersView.user = user;
        manageUsersView.ownedNamespace = oNs;
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
        expect(manageUsersView.shadowRoot.querySelector('.Contributors > h2 > .text').innerText)
            .toBe('Contributors to your namespace - ns1');

        // View prop expectations
        expect(manageUsersView.shadowRoot.querySelector('.Namespaces vaadin-grid').items)
            .toEqual(
                [['ns1', 'Owner'], ['ns2, ns3', 'Contributor']],
                'Invalid namespace memberships'
            );
        expect(manageUsersView.contributorList)
            .toEqual(
                contribList,
                'Invalid list of contributors'
            );
    });

    it('Should render cluster admin view correctly', async () => {
        const contribList = ['foo@kubeflow.org', 'bar@kubeflow.org'];
        const allPeeps = [
            ['ns1', user, contribList.join(', ')],
        ];
        mockIronAjax(
            manageUsersView.$.GetContribsAjax,
            contribList,
        );
        mockIronAjax(
            manageUsersView.$.GetAllNamespacesAjax,
            allPeeps,
        );

        manageUsersView.user = user;
        manageUsersView.isClusterAdmin = true;
        manageUsersView.ownedNamespace = oNs;
        manageUsersView.namespaces = [oNs];

        flush();
        await yieldForRequests();

        expect(manageUsersView.shadowRoot.querySelector('.Cluster-Namespaces')
            .hasAttribute('hidden')).toBe(false, 'Cluster Namespaces was still hidden');

        // View prop expectations
        expect(manageUsersView.shadowRoot.querySelector('.Cluster-Namespaces vaadin-grid').items)
            .toEqual(
                allPeeps,
                'Invalid list of all namespace memberships'
            );
    });

    it('Should handle errors correctly', async () => {
        mockIronAjax(
            manageUsersView.$.GetContribsAjax,
            'Failed for test',
            true,
        );

        manageUsersView.user = user;
        manageUsersView.ownedNamespace = oNs;
        manageUsersView.namespaces = [oNs];

        flush();
        await yieldForRequests();

        expect(manageUsersView.$.ContribError.opened)
            .toBe(
                true,
                'Error toast is not opened'
            );
        expect(manageUsersView.contribError)
            .toBe('Failed for test');
    });

    it('Should add contributors correctly', async () => {
        const contribList = ['foo@kubeflow.org', 'bar@kubeflow.org'];
        const verificationContribs = ['ap@kubeflow.org'];
        mockIronAjax(
            manageUsersView.$.GetContribsAjax,
            contribList,
        );
        mockIronAjax(
            manageUsersView.$.AddContribAjax,
            verificationContribs,
        );

        manageUsersView.user = user;
        manageUsersView.ownedNamespace = oNs;
        manageUsersView.namespaces = generalNs;

        flush();
        await yieldForRequests();

        const input = manageUsersView.shadowRoot.querySelector('.Contributors md2-input');
        input.value = 'new@google.com';
        input.fireEnter();

        await yieldForRequests();

        expect(manageUsersView.contributorList)
            .toEqual(
                verificationContribs,
                'Invalid list of contributors'
            );
    });

    it('Should remove contributors correctly', async () => {
        const contribList = ['foo@kubeflow.org', 'bar@kubeflow.org'];
        const verificationContribs = ['ap@kubeflow.org'];
        mockIronAjax(
            manageUsersView.$.GetContribsAjax,
            contribList,
        );
        mockIronAjax(
            manageUsersView.$.RemoveContribAjax,
            verificationContribs,
        );

        manageUsersView.user = user;
        manageUsersView.ownedNamespace = oNs;
        manageUsersView.namespaces = generalNs;

        flush();
        await yieldForRequests();

        const chip = manageUsersView.shadowRoot.querySelector('.Contributors md2-input paper-chip:nth-of-type(1)');
        chip.fireRemove({});

        await yieldForRequests();

        expect(manageUsersView.contributorList)
            .toEqual(
                verificationContribs,
                'Invalid list of contributors'
            );
    });
});
