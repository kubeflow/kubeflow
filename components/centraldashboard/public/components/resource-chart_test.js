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
        resourceChart.heading = 'Test Resource Chart';
        resourceChart.externalLink = 'http://test.link';
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
        expect(ds2.label).toBe('node-2');
        expect(ds2.backgroundColor).toBe('#00acc1');
        expect(ds2.borderColor).toBe('#00acc1');
    });

    it('Shows top 5 time-series', async () => {
        resourceChart.metric = 'podcpu';
        resourceChart.interval = 'Last30m';
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
        }, false, '/api/metrics/podcpu?interval=Last30m');
        await responsePromise;
        flush();

        expect(resourceChart.shadowRoot.getElementById('interval')
            .selectedItem.innerText).toBe('30m');
        // Validate chart properties directly
        expect(resourceChart._chart.data.datasets.length).toBe(2);
        expect(resourceChart._chart.options.scales.yAxes[0].ticks
            .stepSize).toBe(0.2);

        // Validate callbacks behavior
        expect(resourceChart._chart.options.scales.yAxes[0].ticks
            .callback(0.5)).toBe('50%');

        const [ds1, ds2] = resourceChart._chart.data.datasets;
        expect(ds1.label).toBe('node-1');
        expect(ds1.backgroundColor).toBe('#1e88e5');
        expect(ds1.borderColor).toBe('#1e88e5');
        expect(ds2.label).toBe('node-2');
        expect(ds2.backgroundColor).toBe('#00acc1');
        expect(ds2.borderColor).toBe('#00acc1');
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
