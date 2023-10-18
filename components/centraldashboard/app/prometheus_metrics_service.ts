import {Interval, MetricsInfo, MetricsService, TimeSeriesPoint} from "./metrics_service";
import {PrometheusDriver, RangeVector, ResponseType} from 'prometheus-query';

export class PrometheusMetricsService implements MetricsService {
    private readonly prometheusDriver: PrometheusDriver;
    private readonly dashboardUrl: string | undefined;

    constructor(prometheusDriver: PrometheusDriver, dashboardUrl: string | undefined) {
        this.prometheusDriver = prometheusDriver;
        this.dashboardUrl = dashboardUrl;
    }

    async getNodeCpuUtilization(interval: Interval): Promise<TimeSeriesPoint[]> {
        const query = `sum(rate(node_cpu_seconds_total[5m])) by (instance)`;
        const result = await this.queryPrometheus(query, this.getCorrespondingTime(interval));
        return this.convertToTimeSeriesPoints(result);
    }

    async getPodCpuUtilization(interval: Interval): Promise<TimeSeriesPoint[]> {
        const query = `sum(rate(container_cpu_usage_seconds_total[5m]))`;
        const result = await this.queryPrometheus(query, this.getCorrespondingTime(interval));
        return this.convertToTimeSeriesPoints(result);
    }

    async getPodMemoryUsage(interval: Interval): Promise<TimeSeriesPoint[]> {
        const query = `sum(container_memory_usage_bytes)`;
        const result = await this.queryPrometheus(query, this.getCorrespondingTime(interval));
        return this.convertToTimeSeriesPoints(result);
    }

    private async queryPrometheus(query: string, start: number, end: number = Date.now()): Promise<RangeVector[]> {
        const result = await this.prometheusDriver.rangeQuery(query, start, end, 10);
        if(result.resultType !== ResponseType.MATRIX) {
            console.warn(`The prometheus server returned invalid result type: ${result.resultType}`);
            return [];
        }
        return result.result as RangeVector[];
    }

    private getCorrespondingTime(interval: Interval): number {
        let minutes = 0;
        switch (interval) {
            case Interval.Last5m:
                minutes = 5;
                break;
            case Interval.Last15m:
                minutes = 15;
                break;
            case Interval.Last30m:
                minutes = 30;
                break;
            case Interval.Last60m:
                minutes = 60;
                break;
            case Interval.Last180m:
                minutes = 180;
                break;
            default:
                console.warn("unknown interval.");
        }
        return Date.now() - minutes * 60 * 1000;
    }

    private convertToTimeSeriesPoints(series: RangeVector[]): TimeSeriesPoint[] {
        const timeSeriesPoints: TimeSeriesPoint[] = [];
        series.forEach(serie => {

            const label = Object.entries(serie.metric.labels).map((entry) => {
                return entry[0] + "=" + entry[1];
            }).join(",");

            // The `public/components/resource-chart.js` is multiplying the timestamp by 1000 and the value by 100
            serie.values.forEach(value => {
                timeSeriesPoints.push({
                    timestamp: value.time.getTime() / 1000,
                    label,
                    value: value.value / 100,
                });
            });
        });
        return timeSeriesPoints;
    }

    getChartsLink(): MetricsInfo {
        return {
            resourceChartsLink: this.dashboardUrl,
            resourceChartsLinkText: 'View in dashboard'
        };
    }
}
