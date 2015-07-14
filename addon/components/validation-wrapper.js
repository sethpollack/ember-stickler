import Ember from 'ember';
import layout from '../templates/components/validation-wrapper';
import ValidationBase from '../mixins/validation-base';

const {
  computed,
  Component,
  observer,
  on
  } = Ember;

export default Component.extend(ValidationBase, {
  layout: layout,

  value: null,
  _isWrapperComponent: true,

  _isInitialized: false,
  _setValueInitialization: on('didInsertElement', function() {
    this.set('_isInitialized', true);
  }),
  _runValidations: observer('value', function() {
    if (this.get('_isInitialized')) {
      this.send('validate');
    }
  }),

  valid: false,
  errors: null,

  validationState: computed('valid', function() {
    const valid = this.get('valid');
    let state = {};

    state.isValid = valid === true;
    state.isInvalid = valid === false;
    state.isInitial = valid === null;
    state.text = valid === true ? 'valid' : (valid === false ? 'invalid' : 'initial');

    return state;
  }),

  setState: function(params) {
    this.setProperties({
      errors: params.errors,
      valid: params.valid
    });
  },

  actions: {
    checkForValid() {
      const errors = runValidations(this);

      if (!errors.length) {
        this.setState({
          valid: true,
          errors: null
        });
      }
    },

    validate() {
      const errors = runValidations(this);

      if (errors.length) {
        this.setState({
          valid: false,
          errors: errors
        });
      } else {
        this.setState({
          valid: true,
          errors: null
        });
      }
    },

    reset() {
      this.setState({
        valid: null,
        errors: null
      });
    }
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
