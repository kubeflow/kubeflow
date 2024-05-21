/* eslint-disable max-len */
import '@polymer/test-fixture/test-fixture';
import 'jasmine-ajax';
import {mockIronAjax, yieldForRequests} from '../ajax_test_helper';
import {flush} from '@polymer/polymer/lib/utils/flush.js';

import './dashboard-view';

const FIXTURE_ID = 'manage-users-view-contributor-fixture';
const MU_VIEW_SELECTOR_ID = 'test-manage-users-contributor-view';
const TEMPLATE = `
<test-fixture id="${FIXTURE_ID}">
  <template>
    <manage-users-view-contributor id="${MU_VIEW_SELECTOR_ID}"></manage-users-view-contributor>
  </template>
</test-fixture>
`;
const user = 'test@kubeflow.org';
const ownedNs = {namespace: 'ns1', role: 'owner'};

describe('Manage Users View Contributor', () => {
    let manageUsersViewContributor;

    beforeAll(() => {
        jasmine.Ajax.install();
        const div = document.createElement('div');
        div.innerHTML = TEMPLATE;
        document.body.appendChild(div);
    });

    beforeEach(() => {
        document.getElementById(FIXTURE_ID).create();
        manageUsersViewContributor = document.getElementById(MU_VIEW_SELECTOR_ID);
    });

    afterEach(() => {
        document.getElementById(FIXTURE_ID).restore();
    });

    afterAll(() => {
        jasmine.Ajax.uninstall();
    });

    it('Should handle errors correctly', async () => {
        mockIronAjax(
            manageUsersViewContributor.$.GetContribsAjax,
            'Failed for test',
            true,
        );

        manageUsersViewContributor.user = user;
        manageUsersViewContributor.ownedNamespace = ownedNs;

        flush();
        await yieldForRequests();

        expect(manageUsersViewContributor.$.ContribError.opened)
            .toBe(
                true,
                'Error toast is not opened'
            );
        expect(manageUsersViewContributor.contribError)
            .toBe('Failed for test');
    });

    it('Should add contributors correctly', async () => {
        const contribList = ['foo@kubeflow.org', 'bar@kubeflow.org'];
        const verificationContribs = ['ap@kubeflow.org'];
        mockIronAjax(
            manageUsersViewContributor.$.GetContribsAjax,
            contribList,
        );
        mockIronAjax(
            manageUsersViewContributor.$.AddContribAjax,
            verificationContribs,
        );

        manageUsersViewContributor.user = user;
        manageUsersViewContributor.ownedNamespace = ownedNs;

        flush();
        await yieldForRequests();

        const input = manageUsersViewContributor.shadowRoot.querySelector('md2-input');
        input.value = 'new@google.com';
        input.fireEnter();

        await yieldForRequests();

        expect(manageUsersViewContributor.contributorList)
            .toEqual(
                verificationContribs,
                'Invalid list of contributors'
            );
    });

    it('Should remove contributors correctly', async () => {
        const contribList = ['foo@kubeflow.org', 'bar@kubeflow.org'];
        const verificationContribs = ['ap@kubeflow.org'];
        mockIronAjax(
            manageUsersViewContributor.$.GetContribsAjax,
            contribList,
        );
        mockIronAjax(
            manageUsersViewContributor.$.RemoveContribAjax,
            verificationContribs,
        );

        manageUsersViewContributor.user = user;
        manageUsersViewContributor.ownedNamespace = ownedNs;

        flush();
        await yieldForRequests();

        const chip = manageUsersViewContributor.shadowRoot.querySelector('md2-input paper-chip:nth-of-type(1)');
        chip.fireRemove({});

        await yieldForRequests();

        expect(manageUsersViewContributor.contributorList)
            .toEqual(
                verificationContribs,
                'Invalid list of contributors'
            );
    });

    it('UI State should show contribs when namespace available', async () => {
        const contribList = ['foo@kubeflow.org', 'bar@kubeflow.org'];
        mockIronAjax(
            manageUsersViewContributor.$.GetContribsAjax,
            contribList,
        );

        manageUsersViewContributor.user = user;
        manageUsersViewContributor.ownedNamespace = ownedNs;

        flush();
        await yieldForRequests();

        expect(manageUsersViewContributor.shadowRoot.querySelector('h2 > .text').innerText)
            .toBe('Contributors for - ns1');

        // View prop expectations
        expect(manageUsersViewContributor.contributorList)
            .toEqual(
                contribList,
                'Invalid list of contributors'
            );
    });
});
