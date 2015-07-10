import Ember from 'ember';

export default Ember.Mixin.create({
	targetObject: Ember.computed.alias('parentView'),
	setup: Ember.on('didInsertElement', function() {
		this.sendAction('register', this);
		let rules = this.getWithDefault('rules', '').split(',');
		rules.push('required');

		this.set('selectedRules', rules);
	}),
	actions: {
		checkForValid() {
			const errors = runValidations(this);
			if (!errors.length) {
				this.sendAction('action', {
					valid: true,
					errors: null
				});
			}
		},
		validate() {
			const errors = runValidations(this);
			if (errors.length) {
				this.set('isValid', false);
				this.sendAction('action', {
					valid: false,
					errors: errors
				});
			} else {
				this.set('isValid', true);
				this.sendAction('action', {
					valid: true,
					errors: null
				});
			}
		},
		reset() {
			this.set('isValid', null);
			this.sendAction('action', {
				valid: null,
				errors: null
			});
		}
	}
});

function runValidations(self) {
	const value = self.get('value');

	if (self.get('optional') && !value) {
		return [];
	}

	let rules = self.get('selectedRules');

	return rules.map(rule => {
		return self.container.lookupFactory(`validation:${rule}`)(self, value);
	})
	.filter(rule => !!rule);
}
