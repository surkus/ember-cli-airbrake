'use strict';

module.exports = {
  name: require('./package').name,

  included: function(app) {
    this._super.included(app);

    app.import('node_modules/airbrake-js/dist/client.min.js');
  }
};
