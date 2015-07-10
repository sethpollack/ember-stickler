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
		submit(form) {
			this.controller.setProperties({
				firstName: '',
				lastName: '',
				email: '',
				optional: ''
			});
			form.send('resetFields');
		}
	}
});