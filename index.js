'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const resolve = require('resolve');
const fs = require('fs');

module.exports = {
  name: require('./package').name,

  included: function() {
    this._super.included.apply(this, arguments);

    const vendorPath = `vendor/${this.name}`;
    const host = this._findHost();
    const filePath = path.join(vendorPath, 'client.js');

    host.import(filePath);
  },

  treeForVendor() {
    let airbrakePath = path.join(this.resolvePackagePath('airbrake-js'), 'dist');

    this._removeRefToSourceMap(airbrakePath);

    let airbrakeJs = new Funnel(airbrakePath, {
      files: ['client.js'],
      destDir: this.name
    });

    return mergeTrees([airbrakeJs]);
  },

  resolvePackagePath(packageName) {
    let host = this._findHost();
    return path.dirname(resolve.sync(`${packageName}/package.json`, { basedir: host.project.root }));
  },

  async _removeRefToSourceMap(jsPath) {
    const filePath = path.join(jsPath, 'client.js')

    await fs.readFile(filePath, 'utf8', function(err, data) {
      let file = data.split('\n');

      file.pop();
      fs.writeFileSync(filePath, file.join('\n'));
    });
  },

  _ensureFindHost() {
    if (!this._findHost) {
      this._findHost = function findHostShim() {
        let current = this;
        let app;

        do {
          app = current.app || app;
        } while (current.parent.parent && (current = current.parent));

        return app;
      };
    }
  }
};
