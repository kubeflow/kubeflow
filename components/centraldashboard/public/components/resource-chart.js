import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu-light';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-styles/element-styles/paper-material-styles.js';
import 'chartjs-plugin-crosshair';

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {Chart} from 'chart.js';

Chart.defaults.global.defaultFontFamily = '"Google Sans", sans-serif';

// Preferred colors for Material Charts
const LINE_COLORS = [
    '#1e88e5', // google-blue-600,
    '#00acc1', // paper-cyan-600
    '#e91e63', // paper-pink-500
    '#ff9800', // paper-orange-500
    '#9ccc65', // paper-light-green-400
];
const METRICS = new Set(['node', 'podcpu', 'podmem']);
const INTERVALS = new Set([
    'Last5m',
    'Last15m',
    'Last30m',
    'Last60m',
    'Last180m',
]);
const MAX_SERIES = 5;
const MAX_TOOLTIP_LENGTH = 10;

class ResourceChart extends PolymerElement {
    static get template() {
        return html`
        <style include="paper-material-styles">
            :host {
                @apply --paper-material-elevation-1;
                background-color: var(--paper-card-background-color,
                    var(--primary-background-color));
                border-radius: 5px;
                display: inline-block;
                font-size: 14px;
                max-width: 400px;
                min-width: 320px;
                position: relative;
                overflow: hidden;
                width: 100%;
            }
            header {
                height: 62px;
                border-bottom: 1px solid var(--divider-color);
                @apply --layout-horizontal;
                @apply --layout-center;
            }
            footer {
                height: 62px;
                padding: 0 16px;
                @apply --layout-horizontal;
                @apply --layout-center;
                @apply --layout-justified;
            }
            #header-text {
                font-family: "Google Sans";
                font-size: 16px;
                font-weight: 500;
                flex: 1;
                height: 20px;
                padding: 0 16px;
            }
            #chart-container {
                position: relative;
                padding: 16px;
                height: 250px;
            }
            #interval {
                flex-basis: 33%;
            }
            #external-link {
                flex: 0 1 auto;
                text-decoration: none;
                --iron-icon-width: 20px;
                --iron-icon-height: 20px;
                --paper-button: {
                    color: var(--paper-blue-700);
                    text-transform: none;
                };
            }
        </style>
        <iron-ajax auto url="[[metricUrl]]" handle-as="json"
            on-response="_onResponse"></iron-ajax>
        <article id="card">
            <header>
                <h1 id="header-text">[[heading]]</h1>
                <paper-icon-button icon="refresh" title="Refresh Chart"
                    alt="Refresh chart"></paper-button>
            </header>
            <section id="chart-container">
                <canvas id="chart" height="400" width="400"></canvas></section>
            <footer>
                <paper-dropdown-menu-light id="interval" label="Interval">
                    <paper-listbox slot="dropdown-content"
                        attr-for-selected="value" selected="{{interval}}">
                        <paper-item value="Last5m">5m</paper-item>
                        <paper-item value="Last15m">15m</paper-item>
                        <paper-item value="Last30m">30m</paper-item>
                        <paper-item value="Last60m">1h</paper-item>
                        <paper-item value="Last180m">3h</paper-item>
                    </paper-listbox>
                </paper-dropdown-menu-light>
                <a id="external-link" href="[[externalLink]]".
                    target="_blank" tabindex="-1">
                    <paper-button>
                        View more
                        <iron-icon icon="launch"></iron-icon>
                    </paper-button>
                </a>
            </footer>
        </article>
        `;
    }

    static get properties() {
        return {
            heading: String,
            metric: String,
            interval: String,
            externalLink: String,
            metricUrl: {
                type: String,
                computed: '_getUrl(metric, interval)',
            },
        };
    }

    constructor() {
        super();
        const tooltipFontColor = '#666'; // Matches default Chart.js color
        this._chartOptions = {
            type: 'line',
            data: {
                datasets: [],
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderWidth: 1,
                    borderColor: '#eeeeef',
                    titleFontColor: tooltipFontColor,
                    bodyFontColor: tooltipFontColor,
                    footerFontColor: tooltipFontColor,
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: this._buildTooltipsLabel.bind(this),
                    },
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        gridLines: {
                            display: false,
                        },
                        distribution: 'series',
                        ticks: {
                            source: 'auto',
                        },
                    }],
                    yAxes: [{
                        type: 'linear',
                    }],
                },
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        boxWidth: 6,
                        usePointStyle: true,
                    },
                },
                plugins: {
                    crosshair: {
                        line: {
                            color: '#dadce0',
                            width: 1,
                        },
                        zoom: {
                            enabled: false,
                        },
                    },
                },
            },
        };
    }

    /**
     * Instantiates the Chart object using the canvas context.
     */
    ready() {
        super.ready();
        this._chart = new Chart(this.$.chart, this._chartOptions);
    }

    /**
     * Handles the Metrics response to build datasets and create the Chart.
     * @param {Event} responseEvent
     */
    _onResponse(responseEvent) {
        let i = 0;
        this._chartOptions.data.datasets = [];
        for (const ds of this._buildDatasets(responseEvent.detail.response)) {
            this._chartOptions.data.datasets.push({
                type: 'line',
                label: ds[0],
                backgroundColor: LINE_COLORS[i % LINE_COLORS.length],
                borderColor: LINE_COLORS[i % LINE_COLORS.length],
                data: ds[1].data,
                fill: false,
                borderWidth: 2,
                lineTension: 0,
                pointRadius: 0,
            });
            i++;
        }
        // Adds % formatting for CPU utilization
        if (this.metric !== 'podmem') {
            this._chartOptions.options.scales.yAxes[0].ticks = {
                stepSize: 0.2,
                callback: (value) => `${(value * 100).toFixed(0)}%`,
            };
        }
        this._chart.resize();
        this._chart.update();
    }

    /**
     * Builds a list of Chart.js compatible datasets from the timeSeriesPoints
     * returned from the server.
     * @param {Array} timeSeriesPoints
     * @return {Array}
     */
    _buildDatasets(timeSeriesPoints) {
        // Create a Map from timeseries label to objects with the following
        // shape:
        // {
        //   mean: cumulative moving average
        //   data: [{t: timestamp in s, y: value}]
        // }
        const dataPointsByLabel = new Map();
        timeSeriesPoints.forEach((point) => {
            if (!dataPointsByLabel.has(point.label)) {
                dataPointsByLabel.set(point.label, {
                    mean: 0,
                    data: [],
                });
            }
            const p = dataPointsByLabel.get(point.label);
            p.data.push({
                t: new Date(point.timestamp * 1000),
                y: point.value,
            });
            p.mean = ((p.mean * (p.data.length - 1) + point.value) /
                p.data.length);
        });
        let series = dataPointsByLabel.entries();
        if (dataPointsByLabel.size > MAX_SERIES) {
            series = Array.from(dataPointsByLabel.entries());
            series.sort((a, b) => b[1].mean - a[1].mean);
            series.splice(MAX_SERIES);
            this._chartOptions.options.legend.display = false;
        }
        return series;
    }

    /**
     * Computer property function to returns the URL to use for obtaining
     * metrics.
     * @param {string} metric
     * @param {string} interval
     * @return {string}
     */
    _getUrl(metric, interval) {
        let _metric = 'node';
        let _interval = 'Last15m';
        if (METRICS.has(metric)) {
            _metric = metric;
        }
        if (INTERVALS.has(interval)) {
            _interval = interval;
        }
        return `/api/metrics/${_metric}?interval=${_interval}`;
    }

    /**
     * Trims and formats the tooltip label values according to callback spec:
     * https://www.chartjs.org/docs/latest/configuration/tooltip.html#label-callback
     * @param {Object} item
     * @param {Object} data
     * @return {string}
     */
    _buildTooltipsLabel(item, data) {
        let seriesLabel = data.datasets[item.datasetIndex].label;
        if (seriesLabel.length > MAX_TOOLTIP_LENGTH) {
            seriesLabel = seriesLabel.slice(0, MAX_TOOLTIP_LENGTH) + '...';
        }
        let value = item.value;
        if (this.metric !== 'podmem') {
            value = `${(Number(item.value) * 100).toFixed(2)}%`;
        }
        return `${seriesLabel} - ${value}`;
    }
}

customElements.define('resource-chart', ResourceChart);
