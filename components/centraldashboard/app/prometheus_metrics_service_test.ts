import {Metric, PrometheusDriver, QueryResult, ResponseType} from "prometheus-query";
import {PrometheusMetricsService} from "./prometheus_metrics_service";
import {Interval, MetricsService, TimeSeriesPoint} from "./metrics_service";
import {SampleValue} from "prometheus-query/dist/types";

type MetricsServiceKeys = keyof MetricsService;
const methods: MetricsServiceKeys[] = ["getNodeCpuUtilization", "getPodCpuUtilization", "getPodMemoryUsage"];
const queries: {[id: string]: string} = {
    "getNodeCpuUtilization": "sum(rate(node_cpu_seconds_total[5m])) by (instance)",
    "getPodCpuUtilization": "sum(rate(container_cpu_usage_seconds_total[5m]))",
    "getPodMemoryUsage": "sum(container_memory_usage_bytes)"
};

const fixedDate = 1557705600000;

const emptyDataSet: QueryResult = {"resultType": ResponseType.MATRIX,"result":[]};
const singleInstanceDataSet: QueryResult = {
    "resultType": ResponseType.MATRIX,
    "result":[
        {
            "metric": {"labels": {"instance":"one"}} as Metric,
            "values":[
                {
                    time: new Date(fixedDate),
                    value: 95.5,
                } as SampleValue
            ]
        }
    ]
};
const multipleInstancesDataSet: QueryResult = {
    "resultType": ResponseType.MATRIX,
    "result":[
        {
            "metric": {"labels": {"instance":"one"}} as Metric,
            "values":[
                {
                    time: new Date(fixedDate),
                    value: 1.0,
                } as SampleValue
            ]
        },
        {
            "metric": {"labels": {"instance":"two"}} as Metric,
            "values":[
                {
                    time: new Date(fixedDate),
                    value: 2.0,
                } as SampleValue
            ]
        },
        {
            "metric": {"labels": {"instance":"three"}} as Metric,
            "values":[
                {
                    time: new Date(fixedDate),
                    value: 3.0,
                } as SampleValue
            ]
        }
    ]
};

describe('PrometheusMetricsService', () => {
    let prometheusDriverClient: jasmine.SpyObj<PrometheusDriver>;
    let service: PrometheusMetricsService;

    beforeEach(() => {
        jasmine.clock().install();
        jasmine.clock().mockDate(new Date(1557705600000));
        prometheusDriverClient = jasmine.createSpyObj<PrometheusDriver>(
            'prometheusDriverClient', ['rangeQuery']);

        service =
            new PrometheusMetricsService(prometheusDriverClient, undefined);
    });

    // Iterate over all methods since they have the same behavior
    methods.forEach((method) => {
        describe(method, async () => {
            it('Empty return', async () => {
                prometheusDriverClient.rangeQuery.withArgs(
                    queries[method],
                    Date.now() - 5 * 60 * 1000,
                    Date.now(),
                    10
                ).and.returnValue(Promise.resolve(emptyDataSet));

                const emptyResult = await service[method](Interval.Last5m);
                expect(emptyResult).toEqual(Array.of<TimeSeriesPoint>());
            });

            it('One instance', async () => {
                prometheusDriverClient.rangeQuery.withArgs(
                    queries[method],
                    Date.now() - 5 * 60 * 1000,
                    Date.now(),
                    10
                ).and.returnValue(Promise.resolve(singleInstanceDataSet));

                const singleInstanceResult = await service[method](Interval.Last5m);
                expect(singleInstanceResult).toEqual(Array.of<TimeSeriesPoint>({
                    timestamp: fixedDate / 1000,
                    value: 0.955,
                    label: "instance=one"
                }));
            });

            it('Multiple instances', async () => {
                prometheusDriverClient.rangeQuery.withArgs(
                    queries[method],
                    Date.now() - 5 * 60 * 1000,
                    Date.now(),
                    10
                ).and.returnValue(Promise.resolve(multipleInstancesDataSet));

                const singleInstanceResult = await service[method](Interval.Last5m);
                expect(singleInstanceResult).toEqual(
                    Array.of<TimeSeriesPoint>({
                            timestamp: fixedDate / 1000,
                            value: 0.010,
                            label: "instance=one"
                        },
                        {
                            timestamp: fixedDate / 1000,
                            value: 0.020,
                            label: "instance=two"
                        },
                        {
                            timestamp: fixedDate / 1000,
                            value: 0.030,
                            label: "instance=three"
                        })
                );
            });
        });
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });
});
