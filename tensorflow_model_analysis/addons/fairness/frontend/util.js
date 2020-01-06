/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

goog.module('tensorflow_model_analysis.addons.fairness.frontend.Util');

/**
 * @const {string}
 * @private
 */
const MULTIHEAD_METRIC_PREFIX_ = 'post_export_metrics/';


/**
 * The list of fainress metrics. The order is used to determine which
 * metrics is displayed by default.
 * @const
 * @private
 */
const FAIRNESS_METRICS_ = [
  'false_negative_rate',
  'false_positive_rate',
  'true_positive_rate',
  'true_negative_rate',
  'positive_rate',
  'negative_rate',
];

/**
 * @param {string} metricName
 * @return {string}
 */
exports.removePostExportMetrics = function(metricName) {
  return metricName.startsWith(MULTIHEAD_METRIC_PREFIX_) ?
      metricName.slice(MULTIHEAD_METRIC_PREFIX_.length) :
      metricName;
};

/**
 * Extracts short fairness metric name if applicable; null. otherwise.
 * @param {string} metricName
 * @return {?Object} An object containing fairness metric name and
 *     threshold or null if the named metric is not a fairness metric.
 */
exports.extractFairnessMetric = function(metricName) {
  for (let i = 0; i < FAIRNESS_METRICS_.length; i++) {
    const parts = metricName.split(FAIRNESS_METRICS_[i] + '@');
    const prefix = parts[0];
    if (parts.length == 2 &&
        (prefix == '' || prefix.indexOf(MULTIHEAD_METRIC_PREFIX_) == 0)) {
      return {name: parts[0] + FAIRNESS_METRICS_[i], threshold: parts[1]};
    }
  }
  return null;
};