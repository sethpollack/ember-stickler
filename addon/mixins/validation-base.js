import Ember from 'ember';
import validatedForm from '../components/validated-form';
import validatedArea from '../components/validated-area';

export default Ember.Mixin.create({
  isValid: null,
  selectedRules: null,

  setup: Ember.on('didInsertElement', function() {
    const parentForm = this.nearestOfType(validatedForm);
    parentForm.send('register', this);
  }),

  actions: {
    checkForValid() {
      const errors = runValidations(this);
      const parentArea = this.nearestOfType(validatedArea);

      if (!errors.length) {
        parentArea.send('setState', {
          valid: true,
          errors: null
        });
      }
    },

    validate() {
      const errors = runValidations(this);
      const parentArea = this.nearestOfType(validatedArea);

      if (errors.length) {
        this.set('isValid', false);

        parentArea.send('setState', {
          valid: false,
          errors: errors
        });
      } else {
        this.set('isValid', true);

        parentArea.send('setState', {
          valid: true,
          errors: null
        });
      }
    },

    reset() {
      const parentArea = this.nearestOfType(validatedArea);

      this.set('isValid', null);

      parentArea.send('setState', {
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
