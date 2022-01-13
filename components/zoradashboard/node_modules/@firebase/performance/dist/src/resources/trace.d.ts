/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { PerformanceTrace } from '@firebase/performance-types';
export declare class Trace implements PerformanceTrace {
    readonly name: string;
    readonly isAuto: boolean;
    private state;
    startTimeUs: number;
    durationUs: number;
    private customAttributes;
    counters: {
        [counterName: string]: number;
    };
    private api;
    private randomId;
    private traceStartMark;
    private traceStopMark;
    private traceMeasure;
    /**
     * @param name The name of the trace.
     * @param isAuto If the trace is auto-instrumented.
     * @param traceMeasureName The name of the measure marker in user timing specification. This field
     * is only set when the trace is built for logging when the user directly uses the user timing
     * api (performance.mark and performance.measure).
     */
    constructor(name: string, isAuto?: boolean, traceMeasureName?: string);
    /**
     * Starts a trace. The measurement of the duration starts at this point.
     */
    start(): void;
    /**
     * Stops the trace. The measurement of the duration of the trace stops at this point and trace
     * is logged.
     */
    stop(): void;
    /**
     * Records a trace with predetermined values. If this method is used a trace is created and logged
     * directly. No need to use start and stop methods.
     * @param startTime Trace start time since epoch in millisec
     * @param duration The duraction of the trace in millisec
     * @param options An object which can optionally hold maps of custom metrics and custom attributes
     */
    record(startTime: number, duration: number, options?: {
        metrics?: {
            [key: string]: number;
        };
        attributes?: {
            [key: string]: string;
        };
    }): void;
    /**
     * Increments a custom metric by a certain number or 1 if number not specified. Will create a new
     * custom metric if one with the given name does not exist. The value will be floored down to an
     * integer.
     * @param counter Name of the custom metric
     * @param numAsInteger Increment by value
     */
    incrementMetric(counter: string, numAsInteger?: number): void;
    /**
     * Sets a custom metric to a specified value. Will create a new custom metric if one with the
     * given name does not exist. The value will be floored down to an integer.
     * @param counter Name of the custom metric
     * @param numAsInteger Set custom metric to this value
     */
    putMetric(counter: string, numAsInteger: number): void;
    /**
     * Returns the value of the custom metric by that name. If a custom metric with that name does
     * not exist will return zero.
     * @param counter
     */
    getMetric(counter: string): number;
    /**
     * Sets a custom attribute of a trace to a certain value.
     * @param attr
     * @param value
     */
    putAttribute(attr: string, value: string): void;
    /**
     * Retrieves the value a custom attribute of a trace is set to.
     * @param attr
     */
    getAttribute(attr: string): string | undefined;
    removeAttribute(attr: string): void;
    getAttributes(): {
        [key: string]: string;
    };
    private setStartTime;
    private setDuration;
    /**
     * Calculates and assigns the duration and start time of the trace using the measure performance
     * entry.
     */
    private calculateTraceMetrics;
    /**
     * @param navigationTimings A single element array which contains the navigationTIming object of
     * the page load
     * @param paintTimings A array which contains paintTiming object of the page load
     * @param firstInputDelay First input delay in millisec
     */
    static createOobTrace(navigationTimings: PerformanceNavigationTiming[], paintTimings: PerformanceEntry[], firstInputDelay?: number): void;
    static createUserTimingTrace(measureName: string): void;
}
