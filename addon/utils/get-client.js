/* global airbrakeJs */

import EmberObject from '@ember/object';
import { assert } from '@ember/debug';

let NullClient = EmberObject.extend({
  notify() {},
  addFilter() {},
  setSession() {}
});

function validateAirbrakeConfig(config) {
  assert('airbrake projectId must be set in config', !!config.projectId);
  assert('airbrake projectKey must be set in config', !!config.projectKey);
}

export default function getClient(config, options={}) {
  let airbrakeConfig = config.airbrake;

  if (!airbrakeConfig) {
    return NullClient.create();
  } else {
    validateAirbrakeConfig(airbrakeConfig);

    const { projectId, projectKey } = airbrakeConfig.projectId;
    let client = new airbrakeJs.Client({projectId, projectKey});
    let filters = options.filters || [];

    filters.forEach(f => client.addFilter(f));

    return client;
  }
}
