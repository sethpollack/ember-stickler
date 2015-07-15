import Ember from 'ember';
import layout from '../templates/components/validation-wrapper';
import ValidationBase from '../mixins/validation-base';
import runValidations from '../utils/run-validations';

const {
  observer,
  on,
  Component,
  computed,
  run
  } = Ember;

export default Component.extend(ValidationBase, {
  layout: layout,

  tagName: '',
  value: null,
  submitErrors: null,
  errors: null,
  valid: null,

  setState: function(params) {
    this.setProperties(params);
  },

  totalErrors: computed('submitErrors', 'errors', function() {
    let submitErrors = this.get('submitErrors') || [];
    let errors = this.get('errors') || [];

    let total = [].concat(submitErrors).concat(errors);

    if (total.length) {
      if (this.get('valid') !== false) {
        run.next(this, this.set, 'valid', false);
      }
    }

    return total;
  }),

  validationState: computed('valid', function() {
    const valid = this.get('valid');
    let state = {};

    state.valid = valid
    state.isValid = valid === true;
    state.isInvalid = valid === false;
    state.isInitial = valid === null;
    state.text = valid === true ? 'valid' : (valid === false ? 'invalid' : 'initial');

    return state;
  }),

  actions: {
    checkForValid(v) {
      console.log('checkForValid')
      run(() => {
        this.set('value', v);
      });

      const errors = runValidations(this);

      if (!errors.length) {
        this.setState({
          valid: true,
          errors: null
        });
      }
    },

    validate(v) {
      console.log('validate')
      run(() => {
        this.set('value', v);
      });

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
