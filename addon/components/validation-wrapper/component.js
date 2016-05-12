import Ember from 'ember';
import layout from './template';
import runValidations from '../../utils/run-validations';
import getOwner from 'ember-getowner-polyfill';

const {
  Component,
  computed,
  run
  } = Ember;

export default Component.extend({
  layout,

  tagName: '',
  submitErrors: null,
  errors: null,
  valid: null,
  selectedRules: null,
  isRequired: false,
  register: null,

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
    state.isInitial = valid === null;
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
          errors: null,
          submitErrors: null
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
          errors: null,
          submitErrors: null
        });
      }
    },

    reset() {
      this.setProperties({
        valid: null,
        errors: null
      });
    }
  },

  init() {
    this._super();

    let rules = this.get('rules');
    let owner = getOwner(this);
    const register = this.get('register');

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
