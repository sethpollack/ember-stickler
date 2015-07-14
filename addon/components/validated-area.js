import Ember from 'ember';
import layout from '../templates/components/validated-area';

const {
  Component,
  computed,
  run
  } = Ember;

export default Component.extend({
  layout: layout,

  submitErrors: null,
  errors: null,
  totalErrors: computed('submitErrors', 'errors', function() {
    let submitErrors = this.get('submitErrors') || [];
    let errors = this.get('errors') || [];
    var total = [].concat(submitErrors).concat(errors);
    if (total.length) {
      if (this.get('valid') !== false) {
        run.next(this, this.set, 'valid', false);
      }
    }
    return total;
  }),
  valid: null,

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
