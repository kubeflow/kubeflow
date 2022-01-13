/**
 * @license
 * Copyright 2017 Google LLC
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

export interface FirebasePerformance {
  /**
   * Creates an uninitialized instance of trace and returns it.
   *
   * @param traceName The name of trace instance.
   * @return The trace instance.
   */
  trace(traceName: string): PerformanceTrace;

  /**
   * Controls the logging of automatic traces and HTTP/S network monitoring.
   */
  instrumentationEnabled: boolean;
  /**
   * Controls the logging of custom traces.
   */
  dataCollectionEnabled: boolean;
}

export interface PerformanceTrace {
  /**
   * Starts the timing for the trace instance.
   */
  start(): void;
  /**
   * Stops the timing of the trace instance and logs the data of the instance.
   */
  stop(): void;
  /**
   * Records a trace from given parameters. This provides a direct way to use trace without a need to
   * start/stop. This is useful for use cases in which the trace cannot directly be used
   * (e.g. if the duration was captured before the Performance SDK was loaded).
   *
   * @param startTime trace start time since epoch in millisec.
   * @param duration The duraction of the trace in millisec.
   * @param options An object which can optionally hold maps of custom metrics and
   * custom attributes.
   */
  record(
    startTime: number,
    duration: number,
    options?: {
      metrics?: { [key: string]: number };
      attributes?: { [key: string]: string };
    }
  ): void;
  /**
   * Adds to the value of a custom metric. If a custom metric with the provided name does not
   * exist, it creates one with that name and the value equal to the given number.
   *
   * @param metricName The name of the custom metric.
   * @param num The number to be added to the value of the custom metric. If not provided, it
   * uses a default value of one.
   */
  incrementMetric(metricName: string, num?: number): void;
  /**
   * Sets the value of the specified custom metric to the given number regardless of whether
   * a metric with that name already exists on the trace instance or not.
   *
   * @param metricName Name of the custom metric.
   * @param num Value to of the custom metric.
   */
  putMetric(metricName: string, num: number): void;
  /**
   * Returns the value of the custom metric by that name. If a custom metric with that name does
   * not exist will return zero.
   *
   * @param metricName Name of the custom metric.
   */
  getMetric(metricName: string): number;
  /**
   * Set a custom attribute of a trace to a certain value.
   *
   * @param attr Name of the custom attribute.
   * @param value Value of the custom attribute.
   */
  putAttribute(attr: string, value: string): void;
  /**
   * Retrieves the value which a custom attribute is set to.
   *
   * @param attr Name of the custom attribute.
   */
  getAttribute(attr: string): string | undefined;
  /**
   * Removes the specified custom attribute from a trace instance.
   *
   * @param attr Name of the custom attribute.
   */
  removeAttribute(attr: string): void;
  /**
   * Returns a map of all custom attributes of a trace instance.
   */
  getAttributes(): { [key: string]: string };
}

declare module '@firebase/component' {
  interface NameServiceMapping {
    'performance': FirebasePerformance;
  }
}
