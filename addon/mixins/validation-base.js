import Ember from 'ember';

export default Ember.Mixin.create({
	targetObject: Ember.computed.alias('parentView'),
	setup: Ember.on('didInsertElement', function() {
	  this.sendAction('register', this);
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
	},
	baseRules: {
		required(self, value) {
		  if (!value.length) {
		    return { message: self.get('required') || 'this field is required'};
		  }
		}
	}
});

function runValidations(self) {
  const value = self.get('value');

  if (self.get('optional') && !value) {
    return [];
  }

  const rules = Ember.merge(self.get('baseRules'), self.get('rules'));

  let selectedValidations = Object.keys(rules)
    .filter(key => !!self.get(key));

  selectedValidations.push('required');

  return selectedValidations
    .map(v => rules[v](self, value))
    .filter(v => !!v);
}
