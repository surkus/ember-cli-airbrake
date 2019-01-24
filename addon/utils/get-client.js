/* global airbrakeJs */

import EmberObject from '@ember/object';
import { assert } from '@ember/debug';
import { isPresent } from '@ember/utils';

let NullClient = EmberObject.extend({
  notify() {},
  addFilter() {},
  setSession() {}
});

function validateAirbrakeConfig(config) {
  assert('airbrake projectId must be set in config', isPresent(config.projectId));
  assert('airbrake projectKey must be set in config', isPresent(config.projectKey));
}

export default function getClient(config, options={}) {
  let airbrakeConfig = config.airbrake;

  if (!airbrakeConfig) {
    return NullClient.create();
  } else {
    validateAirbrakeConfig(airbrakeConfig);
    const { projectId, projectKey } = airbrakeConfig;

    let client = new airbrakeJs.Client({
      projectId,
      projectKey
    });
    let filters = options.filters || [];

    filters.forEach(f => client.addFilter(f));

    return client;
  }
}
