import Ember from 'ember';
import layout from './template';
import runValidations from '../../utils/run-validations';

const {
  Component,
  computed,
  run,
  getOwner
  } = Ember;

export default Component.extend({
  layout,

  tagName: '',
  submitErrors: undefined,
  errors: undefined,
  valid: undefined,
  selectedRules: undefined,
  isRequired: false,
  register: undefined,
  forget: undefined,

  willDestroy() {
    this._super();
    let forget = this.get('forget');
    let register = this.get('register');

    forget(this);
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

    state.valid = valid;
    state.isValid = valid === true;
    state.isInvalid = valid === false;
    state.isInitial = valid === undefined;
    state.text = valid === true ? 'valid' : (valid === false ? 'invalid' : 'initial');

    return state;
  }),

  actions: {

    checkForValid(value) {
      if (value !== undefined) {
        this.set('value', value);
      }
      const errors = runValidations(this);

      if (!errors.length) {
        this.setProperties({
          valid: true,
          errors: undefined,
          submitErrors: undefined
        });
      }
    },

    validate(value) {
      if (value !== undefined) {
        this.set('value', value);
      }
      const errors = runValidations(this);

      if (errors.length) {
        this.setProperties({
          valid: false,
          errors
        });
      } else {
        this.setProperties({
          valid: true,
          errors: undefined,
          submitErrors: undefined
        });
      }
    },

    reset() {
      this.setProperties({
        valid: undefined,
        errors: undefined
      });
    }
  },

  init() {
    this._super();

    let rules = this.get('rules');
    let owner = getOwner(this);
    const register = this.get('register');
    const forget = this.get('forget');

    rules = rules ? rules.split(' ') : [];

    if (rules.indexOf('required') !== -1 || rules.indexOf('exists') !== -1) {
      this.set('isRequired', true);
    }

    rules = rules.map((rule) => {
      return owner._lookupFactory(`validation:${rule}`);
    })
      .filter((rule) => {
        return !!rule;
      });

    this.set('selectedRules', rules);

    register(this);
  }

});
