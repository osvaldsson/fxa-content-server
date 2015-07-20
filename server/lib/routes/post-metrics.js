/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */


var MetricsCollector = require('../metrics-collector-stderr');
var StatsDCollector = require('../statsd-collector');
var logger = require('mozlog')('server.post-metrics');

module.exports = function () {
  var metricsCollector = new MetricsCollector();
  var statsd = new StatsDCollector();
  statsd.init();

  return {
    method: 'post',
    path: '/metrics',
    process: function (req, res) {
      try {
        // don't wait around to send a response.
        res.json({ success: true });

        var metrics = req.body;
        var contentType = req.get('content-type') || '';
        if (contentType.indexOf('text/plain') === 0) {
          metrics = JSON.parse(metrics);
        }

        metrics.agent = req.get('user-agent');
        metricsCollector.write(metrics);

        // send the metrics body to the StatsD collector for processing
        statsd.write(metrics);
      } catch (error) {
        logger.error(error);
      }
    }
  };
};
