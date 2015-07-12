import Ember from 'ember';
<<<<<<< HEAD
import validatedForm from '../components/validated-form';
import validatedArea from '../components/validated-area';
import dasherizedToCamel from '../utils/dasherized-to-camel';
=======
>>>>>>> update registration

const {
  computed,
  on,
  Mixin
  } = Ember;

export default Mixin.create({

  isValid: null,

  selectedRules: null,
  errorMessages: null,

  required: false,

  register: 'register',

  registerWithParent: on('didInsertElement', function() {
    this.sendAction('register', this);
  }),

  targetObject: computed.alias('parentView'),

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

    if (rules.indexOf('required') !== -1) {
      this.set('required', true);
    }

    rules = rules.map(rule => {
      let validator = this.container.lookupFactory(`validation:${rule}`);
      return validator.validate.bind(this);
    });

    this.set('selectedRules', rules);
  }
});

function runValidations(self) {
  const value = self.get('value');

  if (!self.get('required') && !value) {
    return [];
  }

  const rules = self.get('selectedRules');

  return rules.map(rule => rule())
    .filter(rule => !!rule);
}
