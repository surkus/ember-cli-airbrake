import Service from '@ember/service';
import getClient from '../utils/get-client';
import setEnvironment from '../filters/environment';
import setSession from '../filters/session';
import { getOwner } from '@ember/application';

export default Service.extend({
  init: function() {
    this._super(...arguments);
    this.client = this._getClient();
  },

  // airbrakeJs client API
  notify(...args) {
    this.client.notify(...args);
  },

  // airbrakeJs client API
  addFilter(...args) {
    this.client.addFilter(...args);
  },

  // convenience API
  setSession(session) {
    this.client.addFilter(setSession(session));
  },

  // private
  _getClient() {
    let config = getOwner(this).resolveRegistration('config:environment');

    let client = getClient(config, {
      filters:   [setEnvironment(config.environment)]
    });

    return client;
  },
});
