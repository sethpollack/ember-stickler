import Ember from 'ember';
import layout from './template';

const {
  computed,
  Component,
  } = Ember;

export default Component.extend({
  layout,

  tagName: 'form',
  attributeBindings: ['name', 'role', 'autocomplete', 'novalidate'],

  name: '',
  autocomplete: 'off',
  novalidate: 'novalidate',

  fields: null,
  role: null,
  submitErrors: null,
  action: 'submit',
  disableDuringSubmit: false,
  _promiseState: 'default',

  submit(e) {
    e.preventDefault();

    this.send('submit');

    return false;
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
      const self = this;

      self.get('fields').forEach(field => field.send('validate'));

      const reset = function() {
        self.send('reset');
      };

      if(self.get('isValid')) {

        new Promise(function(resolve, reject) {
          self.set('_promiseState', 'pending');
          self.sendAction('action', reset, resolve, reject);
        })
        .then(function() {
          self.set('submitErrors', null);
          self.set('_promiseState', 'resolved');
        })
        .catch(function(errors) {
          self.set('submitErrors', errors);
          self.set('_promiseState', 'rejected');
        });
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
