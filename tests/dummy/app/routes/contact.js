import Ember from 'ember';

function didFail() {
  return Math.round(Math.random());
}

export default Ember.Route.extend({
	setupController(controller) {
		controller.setProperties({
			firstName: '',
			lastName: '',
			email: '',
			optional: '',
      isIntense: false,
      intensity: 3,
      choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      coolness: 2
		});
	},

	actions: {
		submit(reset, callback) {
      let self = this;
      let promise = new Ember.RSVP.Promise(function(resolve, reject) {

        Ember.run.later(self, function() {
          let status = didFail();
          if (!status) {
            this.controller.setProperties({
              firstName: '',
              lastName: '',
              email: '',
              optional: '',
              isIntense: false,
              intensity: 3,
              coolness: 2
            });
            reset();
            resolve();
          } else {
            reject({
              firstName: ['That firstname is too fake!'],
              email: ['That email is bozo!']
            });
          }
        }, 1000);

      });

      callback(promise);
		}
	}
});
