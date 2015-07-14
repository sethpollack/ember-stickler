import Ember from 'ember';

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
		submit(reset) {

      this.controller.setProperties({
				firstName: '',
				lastName: '',
				email: '',
				optional: ''
			});

			reset();

      return { hello: 'world' };
		}
	}
});
