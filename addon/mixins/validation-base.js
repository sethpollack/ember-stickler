import Ember from 'ember';

const {
  on,
  Mixin
  } = Ember;

export default Mixin.create({
  isValid: null,
  selectedRules: null,
  errorMessages: null,
  isRequired: false,
  _isWrapperComponent: false,

  registerWithParent: on('didInsertElement', function() {
    const register = this.get('register');
    register(this);
  }),

  actions: {
    checkForValid() {
      const errors = runValidations(this);
      const setState = this.get('setState');

      if (!errors.length) {
        setState({
          valid: true,
          errors: null
        });
      }
    },

    validate() {
      const errors = runValidations(this);
      const isWrapper = this.get('_isWrapperComponent');
      const setState = isWrapper ? this.setState.bind(this) : this.get('setState');

      if (errors.length) {
        this.set('isValid', false);

        setState({
          valid: false,
          errors: errors
        });
      } else {
        this.set('isValid', true);

        setState({
          valid: true,
          errors: null
        });
      }
    },

    reset() {
      const setState = this.get('setState');

      this.set('isValid', null);

      setState({
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
      this.set('isRequired', true);
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
  let errors = Ember.A();

  if (!self.get('isRequired') && !value) { //change to || and remove !
    return [];
  }

  const rules = self.get('selectedRules');

  rules.forEach(rule => rule(value, errors));
  return errors;
}
