/* global airbrakeJs */

import EmberObject from '@ember/object';
import { assert } from '@ember/debug';
import { isPresent } from '@ember/utils';

const requiredConfigKeys = [
  'projectId',
  'projectKey'
];

let NullClient = EmberObject.extend({
  notify() {},
  addFilter() {},
  setSession() {}
});

function validateAirbrakeConfig(config) {
  requiredConfigKeys.forEach((key) => {
    assert(`airbrake config is missing ${key}`, isPresent(config[key]));
  })
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
