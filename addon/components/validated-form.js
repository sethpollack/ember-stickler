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
  submitErrors: null,
  action: 'submit',
  disableDuringSubmit: false,

  _promiseState: 'default',

  resetFields() {
    this.send('reset');
  },

  submit(e) {
    e.preventDefault();

    this.send('submit');

    return false;
  },

  _submitResolve() {
    this.set('submitErrors', null);
    this.set('_promiseState', 'resolved');
  },

  _submitReject(errors) {
    this.set('submitErrors', errors);
    this.set('_promiseState', 'rejected');
  },

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
      let self = this;

      function callback(promise) {
        set(self, '_promiseState', 'pending');

        promise.then(
          self._submitResolve.bind(self),
          self._submitReject.bind(self)
        );
      }

      if(this.get('isValid')) {
        this.sendAction('action', reset, callback);
      }
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
