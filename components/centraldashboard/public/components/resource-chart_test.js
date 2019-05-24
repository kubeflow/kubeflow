import '@polymer/test-fixture/test-fixture';
import 'jasmine-ajax';
import {flush} from '@polymer/polymer/lib/utils/flush.js';

import './resource-chart';
import {mockRequest} from '../ajax_test_helper';

const FIXTURE_ID = 'resource-chart-fixture';
const RESOURCE_CHART_SELECTOR_ID = 'test-resource-chart';
const TEMPLATE = `
<test-fixture id="${FIXTURE_ID}">
  <template>
    <resource-chart id="${RESOURCE_CHART_SELECTOR_ID}"></resource-chart>
  </template>
</test-fixture>
`;

describe('Resource Chart', () => {
    let resourceChart;

    beforeAll(() => {
        jasmine.Ajax.install();
        const div = document.createElement('div');
        div.innerHTML = TEMPLATE;
        document.body.appendChild(div);
    });

    beforeEach(() => {
        document.getElementById(FIXTURE_ID).create();
        resourceChart = document.getElementById(RESOURCE_CHART_SELECTOR_ID);
        resourceChart.headerText = 'Test Resource Chart';
        resourceChart.externalLink = 'http://test.link';
        resourceChart.externalLinkText = 'View in External Metrics Site';
    });

    afterEach(() => {
        document.getElementById(FIXTURE_ID).restore();
    });

    afterAll(() => {
        jasmine.Ajax.uninstall();
    });

    it('Draws chart from node time-series metrics', async () => {
        resourceChart.metric = 'node';
        resourceChart.interval = 'Last60m';
        const metrics = [
            {timestamp: 1558621807, label: 'node-1', value: 0.5},
            {timestamp: 1558621807, label: 'node-2', value: 0.4},
            {timestamp: 1558621867, label: 'node-1', value: 0.5},
            {timestamp: 1558621867, label: 'node-2', value: 0.4},
            {timestamp: 1558621927, label: 'node-1', value: 0.5},
            {timestamp: 1558621927, label: 'node-2', value: 0.4},
            {timestamp: 1558621987, label: 'node-1', value: 0.5},
            {timestamp: 1558621987, label: 'node-2', value: 0.4},
            {timestamp: 1558622047, label: 'node-1', value: 0.5},
            {timestamp: 1558622047, label: 'node-2', value: 0.4},
        ];
        const responsePromise = mockRequest(resourceChart, {
            status: 200,
            responseText: JSON.stringify(metrics),
        }, false, '/api/metrics/node?interval=Last60m');
        await responsePromise;
        flush();

        expect(resourceChart.shadowRoot.getElementById('interval')
            .selectedItem.innerText).toBe('1h');
        // Validate chart properties and callback behavior directly
        expect(resourceChart._chart.data.datasets.length).toBe(2);
        expect(resourceChart._chart.options.legend.display).toBe(true);
        expect(resourceChart._chart.options.scales.yAxes[0].ticks
            .stepSize).toBe(0.2);
        expect(resourceChart._chart.options.scales.yAxes[0].ticks
            .callback(0.5)).toBe('50%');

        const [ds1, ds2] = resourceChart._chart.data.datasets;
        expect(ds1.label).toBe('node-1');
        expect(ds1.backgroundColor).toBe('#1e88e5');
        expect(ds1.borderColor).toBe('#1e88e5');
        expect(ds1.data).toEqual([
            {t: new Date('2019-05-23T14:30:07.000Z'), y: 0.5},
            {t: new Date('2019-05-23T14:31:07.000Z'), y: 0.5},
            {t: new Date('2019-05-23T14:32:07.000Z'), y: 0.5},
            {t: new Date('2019-05-23T14:33:07.000Z'), y: 0.5},
            {t: new Date('2019-05-23T14:34:07.000Z'), y: 0.5},
        ]);
        expect(ds2.data).toEqual([
            {t: new Date('2019-05-23T14:30:07.000Z'), y: 0.4},
            {t: new Date('2019-05-23T14:31:07.000Z'), y: 0.4},
            {t: new Date('2019-05-23T14:32:07.000Z'), y: 0.4},
            {t: new Date('2019-05-23T14:33:07.000Z'), y: 0.4},
            {t: new Date('2019-05-23T14:34:07.000Z'), y: 0.4},
        ]);
        expect(ds2.label).toBe('node-2');
        expect(ds2.backgroundColor).toBe('#00acc1');
        expect(ds2.borderColor).toBe('#00acc1');
        expect(resourceChart.shadowRoot.getElementById('header-text').innerText)
            .toBe('Test Resource Chart');
    });

    it('Draws chart with top 5 time-series for podmem', async () => {
        resourceChart.metric = 'podmem';
        resourceChart.interval = 'Last30m';
        const metrics = [
            {timestamp: 1558621807, label: 'node-1', value: 1},
            {timestamp: 1558621867, label: 'node-1', value: 1},
            {timestamp: 1558621927, label: 'node-1', value: 1},
            {timestamp: 1558621807, label: 'node-2', value: 2},
            {timestamp: 1558621867, label: 'node-2', value: 2},
            {timestamp: 1558621927, label: 'node-2', value: 2},
            {timestamp: 1558621807, label: 'node-3', value: 3},
            {timestamp: 1558621867, label: 'node-3', value: 3},
            {timestamp: 1558621927, label: 'node-3', value: 3},
            {timestamp: 1558621807, label: 'node-4', value: 4},
            {timestamp: 1558621867, label: 'node-4', value: 4},
            {timestamp: 1558621927, label: 'node-4', value: 4},
            {timestamp: 1558621807, label: 'node-5', value: 5},
            {timestamp: 1558621867, label: 'node-5', value: 5},
            {timestamp: 1558621927, label: 'node-5', value: 5},
            {timestamp: 1558621807, label: 'node-6', value: 6},
            {timestamp: 1558621867, label: 'node-6', value: 6},
            {timestamp: 1558621927, label: 'node-6', value: 6},
            {timestamp: 1558621807, label: 'node-7', value: 7},
            {timestamp: 1558621867, label: 'node-7', value: 7},
            {timestamp: 1558621927, label: 'node-7', value: 7},
            {timestamp: 1558621807, label: 'node-8', value: 8},
            {timestamp: 1558621867, label: 'node-8', value: 8},
            {timestamp: 1558621927, label: 'node-8', value: 8},
            {timestamp: 1558621807, label: 'node-9', value: 9},
            {timestamp: 1558621867, label: 'node-9', value: 9},
            {timestamp: 1558621927, label: 'node-9', value: 9},
            {timestamp: 1558621807, label: 'node-10', value: 10},
            {timestamp: 1558621867, label: 'node-10', value: 10},
            {timestamp: 1558621927, label: 'node-10', value: 10},
        ];
        const responsePromise = mockRequest(resourceChart, {
            status: 200,
            responseText: JSON.stringify(metrics),
        }, false, '/api/metrics/podmem?interval=Last30m');
        await responsePromise;
        flush();

        expect(resourceChart.shadowRoot.getElementById('interval')
            .selectedItem.innerText).toBe('30m');
        // Validate chart properties directly
        expect(resourceChart._chart.data.datasets.length).toBe(5);
        expect(resourceChart._chart.options.scales.yAxes[0].ticks
            .stepSize).toBeUndefined();
        expect(resourceChart._chart.options.legend.display).toBe(false);

        const [ds1, ds2, ds3, ds4, ds5] = resourceChart._chart.data.datasets;
        expect(ds1.label).toBe('node-10');
        expect(ds1.backgroundColor).toBe('#1e88e5');
        expect(ds1.borderColor).toBe('#1e88e5');
        expect(ds2.label).toBe('node-9');
        expect(ds2.backgroundColor).toBe('#00acc1');
        expect(ds2.borderColor).toBe('#00acc1');
        expect(ds3.label).toBe('node-8');
        expect(ds3.backgroundColor).toBe('#e91e63');
        expect(ds3.borderColor).toBe('#e91e63');
        expect(ds4.label).toBe('node-7');
        expect(ds4.backgroundColor).toBe('#ff9800');
        expect(ds4.borderColor).toBe('#ff9800');
        expect(ds5.label).toBe('node-6');
        expect(ds5.backgroundColor).toBe('#9ccc65');
        expect(ds5.borderColor).toBe('#9ccc65');
        expect(resourceChart.shadowRoot.getElementById('header-text').innerText)
            .toBe('Test Resource Chart (Top 5)');
    });

    it('Refreshes when interval is changed', (done) => {
        resourceChart.metric = 'podcpu';
        resourceChart.interval = 'Last180m';
        resourceChart.addEventListener('iron-ajax-request', (event) => {
            expect(event.detail.options.url).toBe(
                '/api/metrics/podcpu?interval=Last60m');
            done();
        });
        resourceChart.shadowRoot.getElementById('interval')
            .selected = 'Last60m';
        flush();
    });

    it('Refreshes when clicked is changed', (done) => {
        let requests = 0;
        resourceChart.addEventListener('iron-ajax-request', (event) => {
            expect(event.detail.options.url).toBe(
                '/api/metrics/node?interval=Last30m');
            if (++requests === 2) done();
        });
        resourceChart.metric = 'node';
        resourceChart.interval = 'Last30m';

        resourceChart.shadowRoot.getElementById('refresh').click();
        flush();
    });

    it('Formats tooltip labels based on metric type and label length', () => {
        const item = {datasetIndex: 0, value: 0.45755};
        const data = {datasets: [{label: 'short'}]};
        resourceChart.metric = 'podcpu';
        expect(resourceChart._buildTooltipsLabel(item, data))
            .toBe('short - 45.76%');

        data.datasets[0].label = 'truncatedlabel';
        expect(resourceChart._buildTooltipsLabel(item, data))
            .toBe('truncatedl... - 45.76%');


        item.value = 600;
        resourceChart.metric = 'podmem';
        expect(resourceChart._buildTooltipsLabel(item, data))
            .toBe('truncatedl... - 600');
    });
});
