import '@polymer/test-fixture/test-fixture';
import 'jasmine-ajax';
import {flush} from '@polymer/polymer/lib/utils/flush.js';

import './activity-view';
import {mockRequest} from '../ajax_test_helper';

const FIXTURE_ID = 'activity-view-fixture';
const ACTIVITY_VIEW_SELECTOR_ID = 'test-activity-view';
const TEMPLATE = `
<test-fixture id="${FIXTURE_ID}">
  <template>
    <activity-view id="${ACTIVITY_VIEW_SELECTOR_ID}"></activity-view>
  </template>
</test-fixture>
`;

describe('Activity View', () => {
    let activityView;

    beforeAll(() => {
        const div = document.createElement('div');
        div.innerHTML = TEMPLATE;
        document.body.appendChild(div);
    });

    beforeEach(() => {
        jasmine.Ajax.install();
        document.getElementById(FIXTURE_ID).create();
        activityView = document.getElementById(ACTIVITY_VIEW_SELECTOR_ID);

        // Prevents the activitiesList component from trying to render
        spyOn(activityView.shadowRoot.querySelector('activities-list'),
            '_activitiesChanged');
    });

    afterEach(() => {
        document.getElementById(FIXTURE_ID).restore();
        jasmine.Ajax.uninstall();
    });

    it('Fetches activities when namespace is set', async () => {
        const activities = ['activity-1', 'activity-2'];
        const responsePromise = mockRequest(activityView, {
            status: 200,
            responseText: JSON.stringify(activities),
        });
        activityView.namespace = 'default';
        flush();
        await responsePromise;

        expect(activityView.activities).toEqual(activities);
        expect(activityView.shadowRoot.querySelector('.message')
            .hasAttribute('hidden')).toBe(true);
    });

    it('Shows message when no activities are returned', async () => {
        const activities = [];
        const responsePromise = mockRequest(activityView, {
            status: 200,
            responseText: JSON.stringify(activities),
        });
        activityView.namespace = 'default';
        flush();
        await responsePromise;

        expect(activityView.activities).toEqual(activities);
        const message = activityView.shadowRoot.querySelector('.message');
        expect(message.hasAttribute('hidden')).toBe(false);
        expect(message.innerText).toBe('No activities for namespace default');
    });

    it('Shows error message when activites request fails', async () => {
        const activities = [];
        const responsePromise = mockRequest(activityView, {
            status: 500,
        }, true);
        activityView.namespace = 'default';
        flush();
        await responsePromise;

        expect(activityView.activities).toEqual(activities);
        const message = activityView.shadowRoot.querySelector('.message');
        expect(message.hasAttribute('hidden')).toBe(false);
        expect(message.innerText)
            .toBe('Error retrieving activities for namespace default');
    });
});
