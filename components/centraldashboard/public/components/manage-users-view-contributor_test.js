/* eslint-disable max-len */
import '@polymer/test-fixture/test-fixture';
import 'jasmine-ajax';
import {mockIronAjax, yieldForRequests} from '../ajax_test_helper';
import {flush} from '@polymer/polymer/lib/utils/flush.js';

import './dashboard-view';
import {languages} from '../assets/i18n/languages.json';

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
const oNs = {namespace: 'ns1', role: 'owner'};
const generalNs = [oNs, {namespace: 'ns2', role: 'contributor', user}, {namespace: 'ns3', role: 'contributor', user}];

describe('Manage Users View Contributor', () => {
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
                'Error toast is not opened',
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

        const input = manageUsersView.shadowRoot.querySelector('.contributor md2-input');
        input.value = 'new@google.com';
        input.fireEnter();

        await yieldForRequests();

        expect(manageUsersView.contributorList)
            .toEqual(
                verificationContribs,
                'Invalid list of contributors',
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

        const chip = manageUsersView.shadowRoot.querySelector('.contributor md2-input paper-chip:nth-of-type(1)');
        chip.fireRemove({});

        await yieldForRequests();

        expect(manageUsersView.contributorList)
            .toEqual(
                verificationContribs,
                'Invalid list of contributors',
            );
    });

    it('UI State should show contribs when namespace available', async () => {
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

        expect(manageUsersView.shadowRoot.querySelector('.contributor > h2 > .text').innerText)
            .toBe('Contributors to your namespace - ns1');

        // View prop expectations
        expect(manageUsersView.contributorList)
            .toEqual(
                contribList,
                'Invalid list of contributors',
            );
    });
});
