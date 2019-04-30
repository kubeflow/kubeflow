import {flush} from '@polymer/polymer/lib/utils/flush.js';
import '@polymer/test-fixture/test-fixture';

import './activities-list';

const ONE_DAY = 24 * 60 * 60 * 1000;
const FIXTURE_ID = 'activities-list-fixture';
const ACTIVITIES_LIST_ID = 'test-activities-list';
const TEMPLATE = `
<test-fixture id="${FIXTURE_ID}">
  <template>
    <activities-list id="${ACTIVITIES_LIST_ID}"></activities-list>
  </template>
</test-fixture>
`;

describe('Activities List', () => {
    let activitiesList;

    beforeAll(() => {
        const div = document.createElement('div');
        div.innerHTML = TEMPLATE;
        document.body.appendChild(div);
    });

    beforeEach(() => {
        document.getElementById(FIXTURE_ID).create();
        activitiesList = document.getElementById(ACTIVITIES_LIST_ID);
    });

    afterEach(() => {
        document.getElementById(FIXTURE_ID).restore();
    });

    it('Shows two Activities By Day', () => {
        const today = new Date();
        const yesterday = new Date(today - ONE_DAY);
        activitiesList.activities = [{
            lastTimestamp: today.toLocaleString(),
            message: 'Something happened',
            type: 'Normal',
            involvedObject: {
                name: 'some-pod',
            },
        }, {
            lastTimestamp: yesterday.toLocaleString(),
            message: 'Something bad happened',
            type: 'Error',
            involvedObject: {
                name: 'a-failing-pod',
            },
        }];
        flush();

        const shadowRoot = activitiesList.shadowRoot;
        expect(shadowRoot.querySelectorAll('.activity-row').length).toBe(2);
        expect(shadowRoot.querySelectorAll('h2').length).toBe(2);
        expect(shadowRoot.querySelectorAll('h2')[0].innerText).toBe('Today');
        expect(shadowRoot.querySelectorAll('iron-icon.error').length).toBe(1);
    });

    it('Shows Activities in descending by lastTimestamp', () => {
        const eventDate = new Date();
        eventDate.setHours(20, 0, 0);
        const activities = [];

        for (let i = 10; i > 0; i--) {
            // Add i hours to each activities
            activities.push({
                lastTimestamp: new Date(eventDate - (i * 60 * 60 * 1000))
                    .toLocaleString(),
                message: `Something happened ${i}`,
                type: 'Normal',
                involvedObject: {
                    name: 'some-pod',
                },
            });
        }

        activitiesList.activities = activities;
        flush();

        const shadowRoot = activitiesList.shadowRoot;
        expect(shadowRoot.querySelectorAll('.activity-row').length).toBe(10);
        expect(shadowRoot.querySelectorAll('h2').length).toBe(1);
        const times = [];
        shadowRoot.querySelectorAll('.time').forEach((t) => {
            times.push(t.innerText);
        });
        expect(times).toEqual([
            '7:00:00 PM',
            '6:00:00 PM',
            '5:00:00 PM',
            '4:00:00 PM',
            '3:00:00 PM',
            '2:00:00 PM',
            '1:00:00 PM',
            '12:00:00 PM',
            '11:00:00 AM',
            '10:00:00 AM']);
    });
});
