import Ember from 'ember';
import layout from '../templates/components/validated-area';

const {
  Component,
  computed
  } = Ember;

export default Component.extend({
  layout: layout,

  submitErrors: null,
  errors: null,
  totalErrors: computed('submitErrors', 'errors', function() {
    const submitErrors = this.get('submitErrors') || [];
    const errors = this.get('errors') || [];
    return [].concat(submitErrors).concat(errors);
  }),
  valid: null,

  changedErrors: computed('errors', function() {
    const errors = this.get('errors');
    const valid = this.get('valid');

    if(errors.length && valid) {
      this.set('valid', false);
    }
  }),

  validationState: computed('valid', function() {
    const valid = this.get('valid');
    let state = {};

    state.isValid = valid === true;
    state.isInvalid = valid === false;
    state.isInitial = valid === null;
    state.text = valid === true ? 'valid' : (valid === false ? 'invalid' : 'initial');

    return state;
  }),

  actions: {
    setState(params) {
      this.set('errors', params.errors);
      this.set('valid', params.valid);
    }
  }
});
