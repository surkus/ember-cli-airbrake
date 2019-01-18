# @surkus/ember-cli-airbrake

`@surkus/ember-cli-slick` is an [Ember CLI](http://www.ember-cli.com/) addon for integrating the [Airbrake JS](https://github.com/airbrake/airbrake-js) error notifier into your app.

This was originally written by [201 Created](https://github.com/201-created/ember-cli-airbrake) and has since been upgraded to work with Ember CLI >= 3.7.1 and support the newest airbrake client library.

### Compatibility

* Ember.js v2.18 or above
* Ember CLI v2.13 or above

### Installation

From inside your ember-cli project, run the following:

```bash
ember install ember-cli-airbrake
```

 Update your `config/environment.js` with the following:

```javascript
// in "production" environment section, e.g.:
ENV.airbrake = {
  projectId:  '<project_id>',
  projectKey: '<project_key>'
}
```

Installing the addon will install the airbrake client. This addon uses the airbrake client version **~1.6.3**. The versioning will follow the version of airbrake that is supported.

### Configuration

The `window.onerror` and `Ember.onerror` handlers will only be set if there is an airbrake configuration for a particular environment.
In all cases, an `airbrake` service will be exposed. If airbrake isn't configured the airbrake service uses the "no-op" function for its methods. This facilitates the usage of the airbrake service without having to add environment-checking code in your app.

If you are using [Errbit](https://github.com/errbit/errbit), the open-source Airbrake API compatible error catcher, you must also set the host parameter to your errbit installation.

Example configuration for the production environment:
```javascript
ENV.airbrake = {
  projectId:  '<project_id>',
  projectKey: '<project_key>'
  host: '<errbit_host>'
};
```

### Usage

After installing the addon and configuring it properly, errors will be reported to airbrake.
If you want to use the airbrake client to explicitly notify errors, you can use the exposed airbrake service.

### `airbrake` service

The airbrake service exposes the following methods:

  * `notify(error)` -- if you want to explicitly notify errors. Normally this will not be necessary
  * `addFilter(filterFn)` -- refer to the [airbrake client js documentation](https://github.com/airbrake/airbrake-js)
  * `addReporter(reporter)` -- refer to the [airbrake client js documentation](https://github.com/airbrake/airbrake-js)
  * `setSession(sessionData)` -- adds a filter to the client that sets the session data to all future error notifications

### Examples

Include user data with error reports

The airbrake js client uses "filters" to optionally limit reported notifications or to modify the body of an individual notification.
To include user data with your error notices, add a filter that modifies `notice.session`.

```javascript
// in application route, or somewhere else that has determined a user is logged in
airbrake: service(),

identifyUser: function(userData) {
  this.airbrake.setSession(userData);
}
```

Explicitly notify of an error

Normally the `window.onerror` or `Ember.onerror` handlers will do this for you, but if you want to
explicitly notify of an error, use the airbrake service's `notify` method:

```javascript
// ... some-component.js
airbrake: service(),

notifyOfError: function() {
  this.airbrake.notify(new Error('this is the error'));
}
```

### Testing

In any environment where `config.airbrake` is not set (such as your test environment, typically),
the error handlers for airbrake notification will not be set up. The `airbrake` service will still
exist, but all its methods will be no-ops. This way your tests will still run happily even
if they use, e.g. `airbrake.setSession` to set user session information.


###Contributing

## Installation

* `git clone <repository-url>`
* `cd my-addon`
* `npm install`

## Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

## Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

## Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

### License

This project is licensed under the [MIT License](LICENSE.md).
