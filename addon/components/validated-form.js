import Ember from 'ember';
import layout from '../templates/components/validated-form';

const {
  computed,
  Component,
  set: set
  } = Ember;

export default Component.extend({
  layout: layout,

  tagName: 'form',
  attributeBindings: ['role'],
  fields: null,
  role: null,

  action: 'submit',

  resetFields: function() {
    this.send('reset');
  },

  submit(e) {

    e.preventDefault();
    this.send('submit');
    return false;

  },

  submitErrors: null,

  _submitResolve: function() {
    this.set('submitErrors', null);
    console.log('setting promise state to resolved');
    this.set('_promiseState', 'resolved');
  },
  _submitReject: function(errors) {
    this.set('submitErrors', errors);
    console.log('setting promise state to rejected');
    this.set('_promiseState', 'rejected');
  },

  _promiseState: 'default',

  disableDuringSubmit: true,
  formState: computed('isValid', '_promiseState', function() {
    const state = this.get('_promiseState');
    const isValid = this.get('isValid');
    const disableDuringSubmit = this.get('disableDuringSubmit');

    return {
      isDefault: state === 'default',
      isPending: state === 'pending',
      isResolved: state === 'resolved',
      isRejected: state === 'rejected',
      disabled: !isValid || (disableDuringSubmit && state === 'pending'),
      text: state
    };

  }),

  isValid: computed('fields.@each.valid', function() {
    return this.get('fields').every(field => field.get('valid'));
  }),

  actions: {

    register(params) {
      this.get('fields').push(params);
    },

    submit() {

      this.get('fields').forEach(field => field.send('validate'));

      const reset = this.resetFields.bind(this);
      var _this = this;
      function callbackHandler(promise) {

        console.log('setting promise state to pending');
        set(_this, '_promiseState', 'pending');

        promise.then(
          _this._submitResolve.bind(_this),
          _this._submitReject.bind(_this)
        );

      }

      if(this.get('isValid')) {
        this.sendAction('action', reset, callbackHandler);
      }

      return false;

    },

    reset() {
      this.get('fields').forEach(field => field.send('reset'));
      this.set('_promiseState', 'default');
    }
  },

  init: function() {
    this._super();
    this.set('fields', Ember.A());
  }
});
