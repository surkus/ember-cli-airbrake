import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | airbrake loads', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function(assert) {
    await visit('/');

    assert.ok(this.element.querySelector('#airbrake-service'), 'has airbrake service on route');
  });

  test('global airbrakeJs exists', async function(assert) {
    await visit('/');

    assert.ok(window.airbrakeJs);
  });
});
