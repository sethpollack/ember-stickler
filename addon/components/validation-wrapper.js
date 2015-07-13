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

  isValid: false,
  errors: null,

  validationState: computed('isValid', function() {
    const valid = this.get('isValid');
    let state = {};

    state.isValid = valid === true;
    state.isInvalid = valid === false;
    state.isInitial = valid === null;
    state.text = valid === true ? 'valid' : (valid === false ? 'invalid' : 'initial');

    return state;
  }),

  setState: function(params) {
    this.set('errors', params.errors);
    this.set('isValid', params.valid);
  }

});
