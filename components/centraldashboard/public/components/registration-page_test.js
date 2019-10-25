/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import '@polymer/test-fixture/test-fixture';
import 'jasmine-ajax';
import {mockIronAjax, yieldForRequests as yieldForAsync, sleep} from '../ajax_test_helper';
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
const jasmineWait = async (t = 1) => {
    const pr = sleep(t);
    jasmine.clock().tick(t+3);
    await pr;
};

describe('Registration Page', () => {
    let registrationPage;
    let flowcomplete;
    let clockInstalled;

    beforeAll(() => {
        jasmine.Ajax.install();
        const div = document.createElement('div');
        div.innerHTML = TEMPLATE;
        document.body.appendChild(div);
        clockInstalled = 0;
    });

    beforeEach(() => {
        document.getElementById(FIXTURE_ID).create();
        registrationPage = document.getElementById(MU_VIEW_SELECTOR_ID);
        // eslint-disable-next-line no-console
        flowcomplete = jasmine.createSpy('Flow Completion Event');
        registrationPage.addEventListener('flowcomplete', flowcomplete);
    });

    afterEach(() => {
        document.getElementById(FIXTURE_ID).restore();
        clockInstalled && jasmine.clock().uninstall();
    });

    afterAll(() => {
        jasmine.Ajax.uninstall();
    });

    it('Should work in a Normal Flow', async () => {
        mockIronAjax(
            registrationPage.$.GetMyNamespace,
            {hasWorkgroup: true, hasAuth: true, user: 'test'},
        );
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
        await sleep(5);

        expect(flowcomplete).toHaveBeenCalled();
    });

    it('Should work when API DB is not consistent (use polling)', async () => {
        jasmine.clock().install();
        clockInstalled = 1;

        mockIronAjax(
            registrationPage.$.GetMyNamespace,
            {hasWorkgroup: false, hasAuth: true, user: 'test'},
        );
        mockIronAjax(
            registrationPage.$.MakeNamespace,
            {message: 'Success!'},
        );

        const $e = (selector) => registrationPage.shadowRoot.querySelector(selector);
        flush();
        await jasmineWait(); // So the view can render

        $e('.Main-Content .iron-selected .actions > paper-button').click();
        const input = registrationPage.$.Namespace;
        input.value = 'kubeflow';
        input.fireEnter();

        $e('.Main-Content .iron-selected .actions > paper-button:nth-of-type(1)').click();

        await jasmineWait(2);
        expect(flowcomplete).not.toHaveBeenCalled();

        mockIronAjax(
            registrationPage.$.GetMyNamespace,
            {hasWorkgroup: true, hasAuth: true, user: 'test'},
        );

        for (const _ of Array(~~(600/300)).fill()) {
            await jasmineWait(300);
        }
        expect(flowcomplete).toHaveBeenCalled();
    });

    it('Should Fail when API DB is not consistent for more than 20s (use polling)', async () => {
        jasmine.clock().install();
        clockInstalled = 1;
        mockIronAjax(
            registrationPage.$.GetMyNamespace,
            {hasWorkgroup: false, hasAuth: true, user: 'test'},
        );
        mockIronAjax(
            registrationPage.$.MakeNamespace,
            {message: 'Success!'},
        );

        const $e = (selector) => registrationPage.shadowRoot.querySelector(selector);
        flush();
        await jasmineWait(); // So the view can render

        $e('.Main-Content .iron-selected .actions > paper-button').click();
        const input = registrationPage.$.Namespace;
        input.value = 'kubeflow';
        input.fireEnter();

        $e('.Main-Content .iron-selected .actions > paper-button:nth-of-type(1)').click();

        for (const _ of Array(~~(20e3/300)).fill()) {
            await jasmineWait(300);
        }

        expect(flowcomplete).not.toHaveBeenCalled();

        mockIronAjax(
            registrationPage.$.GetMyNamespace,
            {hasWorkgroup: true, hasAuth: true, user: 'test'},
        );

        await jasmineWait(1e3);
        expect(flowcomplete).not.toHaveBeenCalled();
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

    it('Should show validate client side errors', async () => {
        mockIronAjax(
            registrationPage.$.MakeNamespace,
            {error: 'Ajax Ran!'},
            true,
        );

        const $e = (selector) => registrationPage.shadowRoot.querySelector(selector);
        flush();
        await yieldForAsync(); // So the view can render

        $e('.Main-Content .iron-selected .actions > paper-button').click();
        const input = registrationPage.$.Namespace;
        input.value = 'kubeflow-';
        input.fireEnter();

        $e('.Main-Content .iron-selected .actions > paper-button:nth-of-type(1)').click();

        await yieldForAsync(); // So the view can render

        expect(flowcomplete).not.toHaveBeenCalled();
        expect(input.error).not.toBe('Ajax Ran!');
        expect(input.error).toBe(
            `Name can only start and end with alpha-num characters, `+
            `dashes are only permitted between start and end. (minlength >= 1)`
        );
    });
});
