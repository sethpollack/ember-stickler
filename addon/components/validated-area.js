import Ember from 'ember';
import layout from '../templates/components/validated-area';

const {
  Component,
  computed
  } = Ember;

export default Component.extend({

  layout: layout,

  errors: null,

  valid: null,

  state: computed('valid', function() {

    let valid = this.get('valid');
    let state = {};

    state.isValid = valid === true;
    state.isInvalid = valid === false;
    state.isInitial = valid === null;
    state.text = valid === true ? 'valid' : (valid === false ? 'invalid' : 'initial');

    return state;
  }),

  register: 'register',

  actions: {
    setState(params) {
      this.set('errors', params.errors);
      this.set('valid', params.valid);
    }
  }

});
