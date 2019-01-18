/* eslint-env node */
module.exports = {
  description: 'Add airbrake js to package.json',

  afterInstall() {
    return this.addPackagesToProject([
      { name: 'airbrake-js', target: '~1.6.3' },
      { name: 'cross-fetch', target: '>=2' }
    ]);
  }
};
