/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import '@polymer/test-fixture/test-fixture';
import 'jasmine-ajax';
import {mockIronAjax, yieldForRequests as yieldForAsync} from '../ajax_test_helper';
import {flush} from '@polymer/polymer/lib/utils/flush.js';

import './dashboard-view';

const FIXTURE_ID = 'registration-page-fixture';
const MU_VIEW_SELECTOR_ID = 'test-registration-page';
const TEMPLATE = `
<test-fixture id="${FIXTURE_ID}">
  <template>
    <registration-page id="${MU_VIEW_SELECTOR_ID}"></registration-page>
  </template>
</test-fixture>
`;

describe('Registration Page', () => {
    let registrationPage;
    let flowcomplete;

    beforeAll(() => {
        jasmine.Ajax.install();
        const div = document.createElement('div');
        div.innerHTML = TEMPLATE;
        document.body.appendChild(div);
    });

    beforeEach(() => {
        document.getElementById(FIXTURE_ID).create();
        registrationPage = document.getElementById(MU_VIEW_SELECTOR_ID);
        flowcomplete = jasmine.createSpy('Flow Completion Event');
        registrationPage.addEventListener('flowcomplete', flowcomplete);
    });

    afterEach(() => {
        document.getElementById(FIXTURE_ID).restore();
    });

    afterAll(() => {
        jasmine.Ajax.uninstall();
    });

    it('Should work in a Normal Flow', async () => {
        mockIronAjax(
            registrationPage.$.MakeNamespace,
            {message: 'Success!'},
        );

        const $e = (selector) => registrationPage.shadowRoot.querySelector(selector);
        flush();
        await yieldForAsync(); // So the view can render

        $e('.Main-Content .iron-selected .actions > paper-button').click();
        const input = registrationPage.$.Namespace;
        input.value = 'kubeflow';
        input.fireEnter();

        $e('.Main-Content .iron-selected .actions > paper-button:nth-of-type(1)').click();

        await yieldForAsync(); // So the view can render

        expect(flowcomplete).toHaveBeenCalled();
    });

    it('Should show errors correctly', async () => {
        mockIronAjax(
            registrationPage.$.MakeNamespace,
            {error: 'Test Error!'},
            true,
        );

        const $e = (selector) => registrationPage.shadowRoot.querySelector(selector);
        flush();
        await yieldForAsync(); // So the view can render

        $e('.Main-Content .iron-selected .actions > paper-button').click();
        const input = registrationPage.$.Namespace;
        input.value = 'kubeflow';
        input.fireEnter();

        $e('.Main-Content .iron-selected .actions > paper-button:nth-of-type(1)').click();

        await yieldForAsync(); // So the view can render

        expect(flowcomplete).not.toHaveBeenCalled();
        expect(input.error).toBe('Test Error!');
    });
});
