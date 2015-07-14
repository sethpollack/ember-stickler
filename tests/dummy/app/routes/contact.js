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
			optional: ''
		});
	},

	actions: {
		submit(reset, callback) {

      console.log('submit occurred :/');

      var _this = this;
      var promise = new Ember.RSVP.Promise(function(resolve, reject) {

        Ember.run.later(_this, function() {
          var status = didFail();
          if (!status) {
            this.controller.setProperties({
              firstName: '',
              lastName: '',
              email: '',
              optional: ''
            });
            reset();
            resolve();
          } else {
            reject({
              firstName: ['That firstname is too fake!'],
              email: ['That email is bozo!']
            });
          }
        }, 5000);

      });

      callback(promise);
		}
	}
});
