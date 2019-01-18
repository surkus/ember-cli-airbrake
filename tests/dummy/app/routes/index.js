import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  airbrake: service(),

  setupController(controller) {
    controller.set('airbrakeService', this.airbrake);
  }
});
