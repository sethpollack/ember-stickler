import Ember from 'ember';

export default Ember.Mixin.create({
  isValid: null,
  selectedRules: null,

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

  init: function() {
    this._super();

    let rules = this.get('rules');

    rules = rules ? rules.split(' ') : [];

    rules.unshift('required');

    rules = rules.map(rule => {
      return this.container.lookupFactory(`validation:${rule}`).validate.bind(this);
    });

    this.set('selectedRules', rules);
  }
});

function runValidations(self) {
  const value = self.get('value');

  if (self.get('optional') && !value) {
    return [];
  }

  const rules = self.get('selectedRules');

  return rules.map(rule => rule())
    .filter(rule => !!rule);
}
