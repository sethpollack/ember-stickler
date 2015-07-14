import Ember from 'ember';
import runValidations from '../utils/run-validations';

const {
  on,
  Mixin
  } = Ember;

export default Mixin.create({

  valid: null,
  selectedRules: null,
  isRequired: false,

  register: null,
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
      const setState = this.get('setState');

      if (errors.length) {
        this.set('valid', false);

        setState({
          valid: false,
          errors: errors
        });
      } else {
        this.set('valid', true);

        setState({
          valid: true,
          errors: null
        });
      }
    },

    reset() {
      const setState = this.get('setState');

      this.set('valid', null);

      setState({
        valid: null,
        errors: null
      });
    }
  },

  init: function() {
    this._super();

    let rules = this.get('rules');
    const register = this.get('register');

    rules = rules ? rules.split(' ') : [];

    if (rules.indexOf('required') !== -1) {
      this.set('isRequired', true);
    }

    rules = rules.map(rule => {
      let validator = this.container.lookupFactory(`validation:${rule}`);
      return validator.validate.bind(this);
    });

    this.set('selectedRules', rules);

    register(this);
  }
});
