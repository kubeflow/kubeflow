import '@polymer/test-fixture/test-fixture';
import 'jasmine-ajax';
import {flush} from '@polymer/polymer/lib/utils/flush.js';

import './pipelines-card';
import {mockRequest} from '../ajax_test_helper';

const FIXTURE_ID = 'pipelines-card-fixture';
const PIPELINES_CARD_ID = 'test-pipelines-card';
const TEMPLATE = `
<test-fixture id="${FIXTURE_ID}">
  <template>
    <pipelines-card id="${PIPELINES_CARD_ID}"></pipelines-card>
  </template>
</test-fixture>
`;

const BASE_DATE = new Date('2019-05-01T00:00:00.00Z');

describe('Pipelines Card', () => {
    let pipelinesCard;

    beforeAll(() => {
        const div = document.createElement('div');
        div.innerHTML = TEMPLATE;
        document.body.appendChild(div);
    });

    beforeEach(() => {
        jasmine.Ajax.install();
        document.getElementById(FIXTURE_ID).create();
        pipelinesCard = document.getElementById(PIPELINES_CARD_ID);
    });

    afterEach(() => {
        document.getElementById(FIXTURE_ID).restore();
        jasmine.Ajax.uninstall();
    });

    it('Shows 5 most recently created Pipelines', async () => {
        const pipelines = [];
        for (let i = 10; i > 0; i--) {
            pipelines.push({
                id: i,
                name: `pipeline-${i}`,
                created: new Date(BASE_DATE.valueOf() + (i * 86400000)),
            });
        }
        const requestPromise = mockRequest(pipelinesCard, {
            status: 200,
            responseText: JSON.stringify({pipelines}),
        }, false, '/pipeline/apis/v1beta1/pipelines?' +
                'page_size=5&sort_by=created_at%20desc');

        pipelinesCard.artifactType = 'pipelines';
        await requestPromise;
        flush();

        const header = pipelinesCard.shadowRoot
            .getElementById('message');
        expect(header.hasAttribute('hidden')).toBe(true);
        const pipelineLinks = Array.from(pipelinesCard.shadowRoot
            .querySelectorAll('iframe-link').values());
        expect(pipelineLinks.length).toBe(5);
        const hrefPrefix = '/pipeline/#/pipelines/details';
        expect(pipelineLinks.map((l) => l.href)).toEqual([
            `${hrefPrefix}/10`,
            `${hrefPrefix}/9`,
            `${hrefPrefix}/8`,
            `${hrefPrefix}/7`,
            `${hrefPrefix}/6`,
        ]);

        const pipelineNames = Array.from(pipelinesCard.shadowRoot
            .querySelectorAll('paper-item-body .header').values());
        expect(pipelineNames.map((l) => l.innerText)).toEqual([
            'pipeline-10',
            'pipeline-9',
            'pipeline-8',
            'pipeline-7',
            'pipeline-6',
        ]);
    });

    it('Shows 5 most recently created Pipeline Runs', async () => {
        const runs = [];
        const statuses = ['Succeeded', 'Failed', 'Running'];
        for (let i = 10; i > 0; i--) {
            runs.push({
                id: i,
                status: statuses[i % statuses.length],
                name: `pipeline-run-${i}`,
                created: new Date(BASE_DATE.valueOf() + (i * 86400000)),
            });
        }
        const requestPromise = mockRequest(pipelinesCard, {
            status: 200,
            responseText: JSON.stringify({runs}),
        }, false, '/pipeline/apis/v1beta1/runs?' +
                'page_size=5&sort_by=created_at%20desc');

        pipelinesCard.artifactType = 'runs';
        await requestPromise;
        flush();

        const header = pipelinesCard.shadowRoot
            .getElementById('message');
        expect(header.hasAttribute('hidden')).toBe(true);
        const pipelineLinks = Array.from(pipelinesCard.shadowRoot
            .querySelectorAll('iframe-link').values());
        expect(pipelineLinks.length).toBe(5);
        const hrefPrefix = '/pipeline/#/runs/details';
        expect(pipelineLinks.map((l) => l.href)).toEqual([
            `${hrefPrefix}/10`,
            `${hrefPrefix}/9`,
            `${hrefPrefix}/8`,
            `${hrefPrefix}/7`,
            `${hrefPrefix}/6`,
        ]);

        const pipelineNames = Array.from(pipelinesCard.shadowRoot
            .querySelectorAll('paper-item-body .header').values());
        expect(pipelineNames.map((l) => l.innerText)).toEqual([
            'pipeline-run-10',
            'pipeline-run-9',
            'pipeline-run-8',
            'pipeline-run-7',
            'pipeline-run-6',
        ]);

        const icons = Array.from(pipelinesCard.shadowRoot
            .querySelectorAll('paper-icon-item iron-icon').values());
        expect(icons.map((l) => l.icon)).toEqual([
            'icons:error',
            'icons:check-circle',
            'icons:schedule',
            'icons:error',
            'icons:check-circle',
        ]);
    });

    it('Shows error message when Pipelines request fails', async () => {
        const requestPromise = mockRequest(pipelinesCard, {
            status: 500,
            responseText: 'Some internal error',
        }, true, '/pipeline/apis/v1beta1/pipelines?' +
                'page_size=5&sort_by=created_at%20desc');
        pipelinesCard.artifactType = 'pipelines';
        await requestPromise;
        flush();

        const header = pipelinesCard.shadowRoot.getElementById('message');
        expect(header.hasAttribute('hidden')).toBe(false);
        expect(header.innerText).toBe('Error retrieving Pipelines');
    });

    it('Shows error message when Pipeline Runs request fails', async () => {
        const requestPromise = mockRequest(pipelinesCard, {
            status: 500,
            responseText: 'Some internal error',
        }, true, '/pipeline/apis/v1beta1/runs?' +
                'page_size=5&sort_by=created_at%20desc');
        pipelinesCard.artifactType = 'runs';
        await requestPromise;
        flush();

        const header = pipelinesCard.shadowRoot.getElementById('message');
        expect(header.hasAttribute('hidden')).toBe(false);
        expect(header.innerText).toBe('Error retrieving Pipeline Runs');
    });

    it('Shows message when no Pipelines are found', async () => {
        const requestPromise = mockRequest(pipelinesCard, {
            status: 200,
            responseText: JSON.stringify({pipelines: []}),
        }, false, '/pipeline/apis/v1beta1/pipelines?' +
                'page_size=5&sort_by=created_at%20desc');

        pipelinesCard.artifactType = 'pipelines';
        await requestPromise;
        flush();

        const header = pipelinesCard.shadowRoot
            .getElementById('message');
        expect(header.hasAttribute('hidden')).toBe(false);
        expect(header.innerText).toBe('None Found');
    });
});
